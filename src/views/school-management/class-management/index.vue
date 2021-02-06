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
          @click="findClassListData"
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
            <el-form-item label="班级名称：">
              <el-input
                v-model="form.className"
                style="width: 203px;"
                placeholder="请输入班级名称"
                @keyup.enter.native="findClassListData"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <!-- 列表 -->
    <div style="margin-top: 20px;">
      <div style="margin-top: 10px; margin-bottom: 10px;">
        <PageTable
          ref="dataTable"
          :data="tableData"
          :page-sizes="[5,10]"
          :page-size="5"

          :paging="true"
          :dynamic-column-setting="true"
          :column-visibles="columnVisibles"
          :hiden-column-indexs="[0,2,3,6,8]"

          :show-always-show-column-in-checkbox="true"
        >
          <el-table-column v-if="columnVisibles[0]" label="班级ID" prop="classID" />
          <el-table-column v-if="columnVisibles[1]" label="班级名称" min-width="140" prop="className" />
          <el-table-column v-if="columnVisibles[2]" label="学校名称" prop="schoolName" />
          <el-table-column v-if="columnVisibles[3]" label="年级" prop="grade" />
          <el-table-column v-if="columnVisibles[4]" label="创建时间" min-width="100" prop="creationTime" />
          <el-table-column v-if="columnVisibles[5]" label="创建人" prop="founder" />
          <el-table-column v-if="columnVisibles[6]" label="修改时间" min-width="100" prop="editTime" />
          <el-table-column v-if="columnVisibles[7]" label="老师" prop="teacher" />
          <el-table-column v-if="columnVisibles[8]" label="修改人" prop="editName" />
          <el-table-column v-if="columnVisibles[9]" label="操作" min-width="60">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="edit(scope.row.classID,scope.row.className)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="deleteClass(scope.row.classID)"
              >删除</el-button>
            </template>
          </el-table-column>
        </PageTable>
        <!--编辑-->
        <el-dialog title="编辑信息" :visible.sync="editVisible">
          <el-form :model="editClassForm" :rules="editClassFormRules">
            <el-form-item label="班级名称" :label-width="formLabelWidth" prop="className">
              <el-input v-model="editClassForm.className" autocomplete="off" placeholder="请输入班级名称" style="width: 300px;" />
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
      columnVisibles: new Array(10).fill(true),
      editVisible: false,
      formLabelWidth: '250px',
      tableData: [],
      form: {
        className: '' // 班级名称
      },
      editClassForm: {
        className: ''
      },
      editClassFormRules: {
        className: [
          { required: true, message: '请输入班级名称', trigger: 'blur' }
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
          classID: '255',
          className: '	初一晚辅01班',
          schoolName: '福州一中',
          grade: '初一',
          creationTime: '2020-11-08 15:43:06',
          founder: '启智文坊学堂',
          modifyTime: '-',
          editTime: '-',
          editName: '-',
          teacher: '傅雄,林珍,蒋启文',
          modifier: '-'
        },
        {
          classID: '255',
          className: '	初一晚辅01班',
          schoolName: '福州一中',
          grade: '初一',
          creationTime: '2020-11-08 15:43:06',
          founder: '启智文坊学堂',
          modifyTime: '-',
          editTime: '-',
          editName: '-',
          teacher: '傅雄,林珍,蒋启文',
          modifier: '-'
        },
        {
          classID: '255',
          className: '	初一晚辅01班',
          schoolName: '福州一中',
          grade: '初一',
          creationTime: '2020-11-08 15:43:06',
          founder: '启智文坊学堂',
          modifyTime: '-',
          editTime: '-',
          editName: '-',
          teacher: '傅雄,林珍,蒋启文',
          modifier: '-'
        },
        {
          classID: '255',
          className: '	初一晚辅01班',
          schoolName: '福州一中',
          grade: '初一',
          creationTime: '2020-11-08 15:43:06',
          founder: '启智文坊学堂',
          modifyTime: '-',
          editTime: '-',
          editName: '-',
          teacher: '傅雄,林珍,蒋启文',
          modifier: '-'
        },
        {
          classID: '255',
          className: '	初一晚辅01班',
          schoolName: '福州一中',
          grade: '初一',
          creationTime: '2020-11-08 15:43:06',
          founder: '启智文坊学堂',
          modifyTime: '-',
          editTime: '-',
          editName: '-',
          teacher: '傅雄,林珍,蒋启文',
          modifier: '-'
        },
        {
          classID: '255',
          className: '	初一晚辅01班',
          schoolName: '福州一中',
          grade: '初一',
          creationTime: '2020-11-08 15:43:06',
          founder: '启智文坊学堂',
          modifyTime: '-',
          editTime: '-',
          editName: '-',
          teacher: '傅雄,林珍,蒋启文',
          modifier: '-'
        }]
      this.tableData = data
    },
    getClassListData() {
      // 获取列表
    },
    handleResetSearch() {
      this.form.className = ''
    },
    findClassListData() {
      this.getClassListData()
    },
    edit(classID, className) {
      this.editVisible = true
      this.editClassForm.className = className
      //
    },
    postEdit() {
      this.editVisible = false
      // 接口
    },
    deleteClass(classID) {
      // 删除班级
      this.$confirm('此操作将永久删除该班级信息, 是否继续?', '提示', {
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
