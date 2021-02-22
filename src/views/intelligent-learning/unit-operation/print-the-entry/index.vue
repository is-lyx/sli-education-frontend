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
          @click="findPreTestListData"
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
            <el-form-item label="状态：">
              <el-select
                v-model="form.state"
                placeholder="请选择状态"
                clearable
                style="width: 203px;"
                @change="findPreTestListData"
              >
                <el-option
                  label="全部"
                  value="0"
                />
                <el-option
                  label="已完成"
                  value="1"
                />
                <el-option
                  label="未完成"
                  value="2"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="学生姓名：">
              <el-input
                v-model="form.studentName"
                style="width: 203px;"
                placeholder="请输入学生姓名"
                @keyup.enter.native="findPreTestListData"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <div style="margin-top: 10px;">
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-plus"
        plain
        @click="showAdd"
      >添加</el-button>
    </div>

    <PageTable
      ref="dataTable"
      :data="tableData"
      :page-sizes="[5,10]"
      :page-size="5"

      :paging="true"
      :dynamic-column-setting="true"
      :column-visibles="columnVisibles"
      :default-sort="{prop: 'grade', order: 'descending'}"
      :hiden-column-indexs="[0,1,2,3,6]"

      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column v-if="columnVisibles[0]" label="ID" prop="id" />
      <el-table-column v-if="columnVisibles[1]" label="学生ID" prop="studentID" />
      <el-table-column v-if="columnVisibles[2]" label="班级ID" prop="classID" />
      <el-table-column v-if="columnVisibles[3]" label="班级" prop="class" />
      <el-table-column v-if="columnVisibles[4]" label="学生姓名" prop="studentName" />
      <el-table-column v-if="columnVisibles[5]" label="作业名称" prop="homeworkName" />
      <el-table-column v-if="columnVisibles[6]" label="创建时间" prop="creationTime" />
      <el-table-column v-if="columnVisibles[7]" label="录入时间" prop="entryTime" />
      <el-table-column v-if="columnVisibles[8]" label="题量" prop="amountOfTheQuestions" />
      <el-table-column v-if="columnVisibles[9]" label="完成情况" prop="finishState" />
      <el-table-column v-if="columnVisibles[10]" label="分数" sortable prop="grade" />
      <el-table-column v-if="columnVisibles[11]" label="用时" prop="usingTime" />
      <el-table-column v-if="columnVisibles[12]" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="print(scope.row)"
          >打印</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="entry(scope.row)"
          >录入</el-button>
        </template>
      </el-table-column>
    </PageTable>

    <!--添加-->
    <el-dialog
      custom-class="customWidth"
      title="添加学生"
      :visible.sync="addStudentVisible"
    >
      <el-card shadow="never">
        <div>
          <i class="el-icon-search" />
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            type="primary"
            size="small"
            @click="getStudentListData"
          >查询</el-button>
          <el-button
            style="float: right; margin-right: 15px"
            size="small"
            @click="handleStudentResetSearch"
          >重置</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form
            :inline="true"
            :model="studentForm"
            size="small"
            label-width="140px"
          >
            <div style="text-align: center">
              <el-form-item label="账号：">
                <el-input
                  v-model="studentForm.id"
                  style="width: 203px"
                  placeholder="请输入账号"
                  @keyup.enter.native="getStudentListData"
                />
              </el-form-item>
              <el-form-item label="姓名：">
                <el-input
                  v-model="studentForm.name"
                  style="width: 203px"
                  placeholder="请输入姓名"
                  @keyup.enter.native="getStudentListData"
                />
              </el-form-item>
              <el-form-item label="手机号：">
                <el-input
                  v-model="studentForm.phone"
                  style="width: 203px"
                  placeholder="请输入老师姓名"
                  @keyup.enter.native="getStudentListData"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
      <el-table
        :data="studentListData"
        stripe
        @selection-change="selectionLineChangeHandle"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="id" label="账号" />
        <el-table-column property="name" label="姓名" />
        <el-table-column property="phone" label="手机号" />
        <el-table-column property="class" label="班级" />
        <el-table-column property="teacher" label="老师" />
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin: 25px 15px; text-align: center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <div style="text-align: center; margin-top: 20px">
        <el-button type="primary" @click="add">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// 引入表格组件
import PageTable from '../../../PageTable.vue'

export default {
  components: {
    PageTable // 引用表格组件
  },
  data() {
    return {
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      tableData: [],
      form: {
        studentName: '',
        state: ''
      },
      columnVisibles: new Array(17).fill(true),
      columnStudentVisibles: new Array(6).fill(true),
      addStudentVisible: false,
      studentForm: {
        id: '',
        name: '',
        phone: ''
      },
      studentListData: [],
      dataonLineListSelections: [],
      addStudentList: []
    }
  },
  mounted() {
    // 发起查询请求
    this.queryData()
  },
  methods: {
    queryData() {
      // 模拟后台数据
      const data = []
      for (var i = 1; i <= 23; i++) {
        data.push({ id: i, studentID: i, classID: i, class: i,
          studentName: i, homeworkName: i, creationTime: i, entryTime: i,
          amountOfTheQuestions: i, finishState: i,
          grade: i, usingTime: i })
      }

      this.tableData = data
    },
    print(row) {
      // 打印
    },
    entry(row) {
      // 录入
    },
    findPreTestListData() {
      // 搜索
    },
    handleResetSearch() {
      this.form.studentName = ''
      this.form.state = ''
    },
    add() {
      // 添加作业
      this.addStudentVisible = false
      // 加接口
    },
    handleStudentResetSearch() {
      //
      this.studentForm.id = ''
      this.studentForm.name = ''
      this.studentForm.phone = ''
    },
    selectionLineChangeHandle(val) {
      this.dataonLineListSelections = val
      for (var i = 0; i < this.dataonLineListSelections.length; i++) {
        this.addStudentList[i] = this.dataonLineListSelections[i].id
      }
      console.log(this.addStudentList)
    },
    showAdd() {
      this.getStudentListData()
      this.addStudentVisible = true
    },
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getStudentListData()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getStudentListData()
    },
    getStudentListData() {
      const data = [
        {
          id: 'qz70019553',
          name: '张宇杰',
          phone: '-',
          class: '初一晚辅01班',
          teacher: '雷老师'
        },
        {
          id: 'qz80013232',
          name: '吴德福',
          phone: '-',
          class: '初一晚辅01班',
          teacher: '雷老师'
        },
        {
          id: 'qz40035187',
          name: '郑泺泺',
          phone: '-',
          class: '小学高年级托管班',
          teacher: '蒋启文'
        }
      ]
      this.studentListData = data
    }
  }
}
</script>

<style lang="scss">
.customWidth {
  width: 70%;
}
</style>
