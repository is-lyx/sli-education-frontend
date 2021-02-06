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
          @click="findStudentRecycleListData"
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
          label-width="auto"
        >
          <div style="text-align: center;">
            <el-form-item label="学号：">
              <el-input
                v-model="form.studentNumber"
                style="width: 203px;"
                placeholder="请输入学号"
                @keyup.enter.native="findStudentRecycleListData"
              />
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input
                v-model="form.name"
                style="width: 203px;"
                placeholder="请输入姓名"
                @keyup.enter.native="findStudentRecycleListData"
              />
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input
                v-model="form.phoneNumber"
                style="width: 203px;"
                placeholder="请输入手机号"
                @keyup.enter.native="findStudentRecycleListData"
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
          :hiden-column-indexs="[0]"

          :show-always-show-column-in-checkbox="true"
        >
          <el-table-column v-if="columnVisibles[0]" label="学生ID" prop="studentID" />
          <el-table-column v-if="columnVisibles[1]" label="账号" prop="id" />
          <el-table-column v-if="columnVisibles[2]" label="姓名" prop="name" />
          <el-table-column v-if="columnVisibles[3]" label="手机号" prop="phone" />
          <el-table-column v-if="columnVisibles[4]" label="班级" prop="class" />
          <el-table-column v-if="columnVisibles[5]" label="学校" prop="school" />
          <el-table-column v-if="columnVisibles[6]" label="老师" prop="teacher" />
          <el-table-column v-if="columnVisibles[7]" label="到期时间" prop="dueTime" />
          <el-table-column v-if="columnVisibles[8]" label="操作" min-width="60">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="back(scope.row.id)"
              >回退</el-button>
            </template>
          </el-table-column>
        </PageTable>
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
      tableData: [],
      form: {
        studentNumber: '', // 学号
        name: '',
        phoneNumber: ''
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
          studentID: '136871',
          id: 'ce00013395',
          name: '任宇翔',
          phone: '123456',
          class: '初二晚辅01班',
          school: '福州一中',
          teacher: '暂无',
          dueTime: '2020-11-11 16:01:01'
        },
        {
          studentID: '136872',
          id: 'ce00013395',
          name: '吴德福',
          phone: '123456',
          class: '初二晚辅01班',
          school: '福州一中',
          teacher: '暂无',
          dueTime: '2020-11-11 16:01:01'
        },
        {
          studentID: '136873',
          id: 'ce00013395',
          name: '陈伊婕',
          phone: '123456',
          class: '初二晚辅01班',
          school: '福州一中',
          teacher: '暂无',
          dueTime: '2020-11-11 16:01:01'
        },
        {
          studentID: '136874',
          id: 'ce00013395',
          name: '兰微微',
          phone: '123456',
          class: '初二晚辅01班',
          school: '福州一中',
          teacher: '暂无',
          dueTime: '2020-11-11 16:01:01'
        },
        {
          studentID: '136875',
          id: 'ce00013395',
          name: '兰微',
          phone: '123456',
          class: '初二晚辅01班',
          school: '福州一中',
          teacher: '暂无',
          dueTime: '2020-11-11 16:01:01'
        }]
      this.tableData = data
    },
    findStudentRecycleListData() {
      this.getStudentRecycleListData()
    },
    getStudentRecycleListData() {
      // 获取列表
    },
    handleResetSearch() {
      this.form.studentNumber = ''
      this.form.name = ''
      this.form.phoneNumber = ''
    },
    back(id) {
      // 回退
      this.$confirm('此操作将回退该学生信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '回退成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消回退'
        })
      })
    }
  }
}
</script>

