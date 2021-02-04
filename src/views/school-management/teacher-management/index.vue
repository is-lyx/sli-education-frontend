<template>
  <div style="padding:30px;">
    <el-card shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float: right;"
          type="primary"
          size="small"
          @click="findTeacherListData"
        >查询</el-button>
        <el-button
          style="float: right;margin-right: 15px;"
          size="small"
          @click="handleResetSearch"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px;">
        <el-form
          :inline="true"
          :model="form"
          size="small"
          label-width="140px"
        >
          <div style="text-align: center;">
            <el-form-item label="账号：">
              <el-input
                v-model="form.id"
                style="width: 203px;"
                placeholder="请输入账号"
                @keyup.enter.native="findTeacherListData"
              />
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input
                v-model="form.name"
                style="width: 203px;"
                placeholder="请输入姓名"
                @keyup.enter.native="findTeacherListData"
              />
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input
                v-model="form.phoneNumber"
                style="width: 203px;"
                placeholder="请输入手机号"
                @keyup.enter.native="findTeacherListData"
              />
            </el-form-item>
            <el-form-item label="用户状态：">
              <el-select
                v-model="form.state"
                placeholder="请选择用户状态"
                clearable
                style="width: 203px;"
                @change="findTeacherListData"
              >
                <el-option
                  label="全部"
                  value="0"
                />
                <el-option
                  label="正常"
                  value="1"
                />
                <el-option
                  label="停用"
                  value="2"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="最后登录时间：">
              <el-date-picker
                v-model="form.lastLoginTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <!-- 列表 -->
    <div style="margin-top: 20px;">
      <div style="margin-top: 10px; margin-bottom: 10px;">
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-plus"
          plain
          @click="addTeacherVisible = true"
        >添加</el-button>
        <!--添加老师-->
        <el-dialog title="添加老师" :visible.sync="addTeacherVisible">
          <el-form :model="addTeacherForm" :rules="addTeacherFormRules">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="addTeacherForm.name" autocomplete="off" style="width: 300px;" />
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
              <el-select v-model="addTeacherForm.sex" placeholder="请选择性别" style="width: 300px;">
                <el-option label="男" value="0" />
                <el-option label="女" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item label="账号前缀" :label-width="formLabelWidth" prop="accountFront">
              <el-input v-model="addTeacherForm.accountFront" autocomplete="off" placeholder="请输入账号前缀" style="width: 300px;" />
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="addTeacherForm.phone" autocomplete="off" placeholder="请输入手机号" style="width: 300px;" />
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
              <el-input v-model="addTeacherForm.email" autocomplete="off" placeholder="请输入邮箱" style="width: 300px;" />
            </el-form-item>
            <el-form-item label="用户状态" :label-width="formLabelWidth" prop="state">
              <el-select v-model="addTeacherForm.sex" placeholder="请选择状态" style="width: 300px;">
                <el-option label="正常" value="0" />
                <el-option label="停用" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="addTeacherForm.note" autocomplete="off" style="width: 300px;" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button @click="addTeacherVisible = false">取 消</el-button>
            <el-button type="primary" @click="addTeacher()">确 定</el-button>
          </div>
        </el-dialog>

        <PageTable
          ref="dataTable"
          :data="tableData"
          :page-sizes="[5,10]"
          :page-size="5"

          :paging="true"
          :dynamic-column-setting="true"
          :column-visibles="columnVisibles"
          :hiden-column-indexs="[3,4,6]"

          :show-always-show-column-in-checkbox="true"
        >
          <el-table-column v-if="columnVisibles[0]" label="账号" prop="id" />
          <el-table-column v-if="columnVisibles[1]" label="姓名" prop="name" />
          <el-table-column v-if="columnVisibles[2]" label="手机" prop="phone" />
          <el-table-column v-if="columnVisibles[3]" label="邮箱" prop="email" />
          <el-table-column v-if="columnVisibles[4]" label="用户状态" prop="state" />
          <el-table-column v-if="columnVisibles[5]" label="创建人" prop="creationName" />
          <el-table-column v-if="columnVisibles[6]" label="创建时间" min-width="100" prop="creationTime" />
          <el-table-column v-if="columnVisibles[7]" label="班级名称" prop="className" />
          <el-table-column v-if="columnVisibles[8]" label="操作" min-width="140">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="distributeClass(scope.row.id)"
              >分配班级</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="edit(scope.row.id)"
              >编辑</el-button>
              <el-button
                type="warning"
                size="mini"
                @click="reset(scope.row.id)"
              >重置</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="deleteTeacher(scope.row.id)"
              >删除</el-button>

            </template>
          </el-table-column>
        </PageTable>

        <!--分配班级-->
        <el-dialog title="分配班级" :visible.sync="distributeClassVisible">
          <el-card style="margin-left:30px; margin-right:30px;">
            <el-checkbox-group v-model="distributionClassData">
              <el-checkbox
                v-for="item in distributionClassData"
                :key="item.id"
                :label="item.distributionName"
                :value="item.id"
              />
            </el-checkbox-group>
          </el-card>
          <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button @click="distributeClassVisible = false">取 消</el-button>
            <el-button type="primary" @click="postDistributeClass()">确 定</el-button>
          </div>
        </el-dialog>
        <!--编辑老师信息-->
        <el-dialog title="编辑信息" :visible.sync="editVisible">
          <el-form :model="editTeacherForm" :rules="editTeacherFormRules">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="addTeacherForm.name" autocomplete="off" placeholder="请输入姓名" style="width: 300px;" />
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
              <el-select v-model="addTeacherForm.sex" placeholder="请选择性别" style="width: 300px;">
                <el-option label="男" value="0" />
                <el-option label="女" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item label="账号前缀" :label-width="formLabelWidth" prop="accountFront">
              <el-input v-model="addTeacherForm.accountFront" autocomplete="off" placeholder="请输入账号前缀" style="width: 300px;" />
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="addTeacherForm.phone" autocomplete="off" placeholder="请输入手机号" style="width: 300px;" />
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
              <el-input v-model="addTeacherForm.email" autocomplete="off" placeholder="请输入邮箱" style="width: 300px;" />
            </el-form-item>
            <el-form-item label="用户状态" :label-width="formLabelWidth" prop="state">
              <el-select v-model="addTeacherForm.sex" placeholder="请选择状态" style="width: 300px;">
                <el-option label="正常" value="0" />
                <el-option label="停用" value="1" />
              </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="addTeacherForm.note" autocomplete="off" style="width: 300px;" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align:center">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="postEdit">确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<style scoped>
.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

<script>
import PageTable from '../../PageTable.vue'

export default {
  components: {
    PageTable // 引用表格组件
  },
  data() {
    return {
      columnVisibles: new Array(9).fill(true),
      addTeacherVisible: false,
      distributeClassVisible: false, // 分配班级
      distributionClassData: [], // 可分配班级列表
      editVisible: false, // 编辑
      formLabelWidth: '250px',
      tableData: [],
      form: {
        id: '', // 账号
        name: '', // 姓名
        phoneNumber: '', // 手机号
        state: '', // 用户状态
        lastLoginTime: ''// 最后登陆时间
      },
      addTeacherForm: {
        name: '',
        sex: '',
        accountFront: '', // 账号前缀
        phone: '',
        email: '',
        state: '',
        note: ''// 备注
      },
      addTeacherFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        state: [
          { required: true, message: '请选择用户状态', trigger: 'change' }
        ],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        accountFront: [{ required: true, message: '请输入账号前缀', trigger: 'blur' }
        ]
      },
      editTeacherForm: {
        name: '',
        sex: '',
        accountFront: '', // 账号前缀
        phone: '',
        email: '',
        state: '',
        note: ''// 备注
      },
      editTeacherFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        state: [
          { required: true, message: '请选择用户状态', trigger: 'change' }
        ],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        accountFront: [{ required: true, message: '请输入账号前缀', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // 发起查询请求
    this.queryData()
  },
  methods: {
    queryData() {
      // 模拟后台数据
      const data = [
        {
          id: 'qz70019553',
          name: '王小虎1',
          phone: '15980111111',
          email: '115@qq.com',
          state: '正常',
          creationName: '启智文坊学堂',
          creationTime: '2021-02-04 19:20:07',
          className: '未分配'
        },
        {
          id: 'qz70019553',
          name: '王小虎2',
          phone: '15980222222',
          email: '115@qq.com',
          state: '正常',
          creationName: '启智文坊学堂',
          creationTime: '2021-02-04 19:20:07',
          className: '1. 连江一中初一数学AI学习实验01班（2020年秋）'
        },
        {
          id: 'qz70019553',
          name: '王小虎3',
          phone: '15980222222',
          email: '115@qq.com',
          state: '正常',
          creationName: '启智文坊学堂',
          creationTime: '2021-02-04 19:20:07',
          className: '1. 连江一中初一数学AI学习实验01班（2020年秋）'
        },
        {
          id: 'qz70019553',
          name: '王小虎4',
          phone: '15980222222',
          email: '115@qq.com',
          state: '正常',
          creationName: '启智文坊学堂',
          creationTime: '2021-02-04 19:20:07',
          className: '1. 连江一中初一数学AI学习实验01班（2020年秋）'
        },
        {
          id: 'qz70019553',
          name: '王小虎5',
          phone: '15980222222',
          email: '115@qq.com',
          state: '正常',
          creationName: '启智文坊学堂',
          creationTime: '2021-02-04 19:20:07',
          className: '1. 连江一中初一数学AI学习实验01班（2020年秋）'
        }]
      this.tableData = data
    },
    findTeacherListData() {
      this.getTeacherListData()
    },
    getTeacherListData() {
      // 获取列表
    },
    handleResetSearch() {
      this.form.id = ''
      this.form.name = ''
      this.form.phoneNumber = ''
      this.form.state = ''
      this.form.lastLoginTime = ''
    },
    addTeacher() {
      this.addTeacherVisible = false
      // 添加老师
    },
    distributeClass(id) {
      this.distributeClassVisible = true
      this.getdistributeClassList()
    },
    getdistributeClassList() {
      // 接口
      // 模拟后台数据
      const testData = [{
        id: '0',
        distributionName: '初一晚辅01班'
      }, {
        id: '1',
        distributionName: '一年级托管A班'
      }, {
        id: '2',
        distributionName: '二年级托管A班'
      }, {
        id: '3',
        distributionName: '小学高年级托管班'
      }, {
        id: '4',
        distributionName: '模拟数据，待接口补充'
      }]
      this.distributionClassData = testData
    },
    postDistributeClass() {
      this.distributeClassVisible = false
      // 接口
    },
    edit(id) {
      this.editVisible = true
      // this.postEdit()
    },
    postEdit() {
      this.editVisible = false
      // 接口
    },
    reset(id) {
      // 重置
      this.$confirm('此操作将重置该用户密码为123456, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '重置成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    },
    deleteTeacher(id) {
      // 删除老师
      this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
