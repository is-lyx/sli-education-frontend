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
            @click="detail(scope.row)"
          >详情</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="report(scope.row)"
          >报告</el-button>
        </template>
      </el-table-column>
    </PageTable>

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
      tableData: [],
      form: {
        studentName: '',
        state: ''
      },
      columnVisibles: new Array(17).fill(true)
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
    clickFunc(row) {
      // console.log(row);
      alert(JSON.stringify(row))
    },
    detail(row) {
      // 详情
    },
    report(row) {
      // 报告
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
    }
  }
}
</script>

<style lang="scss">
</style>
