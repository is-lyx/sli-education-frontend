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
          @click="findErrorQueationListData"
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
            <el-form-item label="问题ID：">
              <el-input
                v-model="form.questionID"
                style="width: 203px;"
                placeholder="请输入问题ID"
                @keyup.enter.native="findErrorQueationListData"
              />
            </el-form-item>
            <el-form-item label="提交学生姓名：">
              <el-input
                v-model="form.studentName"
                style="width: 203px;"
                placeholder="请输入学生姓名"
                @keyup.enter.native="findErrorQueationListData"
              />
            </el-form-item>
            <el-form-item label="审核老师姓名：">
              <el-input
                v-model="form.teacherName"
                style="width: 203px;"
                placeholder="请输入老师姓名"
                @keyup.enter.native="findErrorQueationListData"
              />
            </el-form-item>
            <el-form-item label="流程状态：">
              <el-select
                v-model="form.state"
                placeholder="请选择分类"
                clearable
                style="width: 203px;"
                @change="findErrorQueationListData"
              >
                <el-option
                  label="全部"
                  value="0"
                />
                <el-option
                  label="待纠错"
                  value="1"
                />
                <el-option
                  label="待审核"
                  value="2"
                />
                <el-option
                  label="纠错完成"
                  value="3"
                />
                <el-option
                  label="审核未通过"
                  value="4"
                />
              </el-select>
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
      :hiden-column-indexs="[0,2,6]"
      :always-show-column-indexs="[1]"

      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column v-if="columnVisibles[0]" label="记录ID" prop="id" />
      <el-table-column v-if="columnVisibles[1]" label="问题ID" prop="questionID" />
      <el-table-column v-if="columnVisibles[2]" label="提交学生ID" prop="studentID" />
      <el-table-column v-if="columnVisibles[3]" label="提交学生" prop="studentName" />
      <el-table-column v-if="columnVisibles[4]" label="提交备注" prop="submitRemark" />
      <el-table-column v-if="columnVisibles[5]" label="提交纠错时间" prop="submitErrorCorrectionTime" />
      <el-table-column v-if="columnVisibles[6]" label="审核人ID" prop="teacherID" />
      <el-table-column v-if="columnVisibles[7]" label="审核人" prop="teacherName" />
      <el-table-column v-if="columnVisibles[8]" label="审核备注" prop="auditRemark" />
      <el-table-column v-if="columnVisibles[9]" label="审核时间" prop="auditTime" />
      <el-table-column v-if="columnVisibles[10]" label="纠错备注" prop="errorRemark" />
      <el-table-column v-if="columnVisibles[11]" label="纠错时间" prop="errorCorrectionTime" />
      <el-table-column v-if="columnVisibles[12]" label="流程状态" prop="state" />
      <el-table-column v-if="columnVisibles[16]" label="操作" min-width="105">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="getQuestion(scope.row)"
          >题目</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="audit(scope.row)"
          >审核</el-button>
        </template>
      </el-table-column>
    </PageTable>

  </div>
</template>

<script>
// 引入表格组件
import PageTable from '../../PageTable.vue'

export default {
  components: {
    PageTable // 引用表格组件
  },
  data() {
    return {
      tableData: [],
      form: {
        questionID: '',
        studentName: '',
        teacherName: '',
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
        data.push({ id: i, questionID: i, studentID: i, studentName: i, submitRemark: i,
          submitErrorCorrectionTime: i, teacherID: i, teacherName: i, auditRemark: i,
          auditTime: i, errorRemark: i, errorCorrectionTime: i, state: i })
      }

      this.tableData = data
    },
    clickFunc(row) {
      // console.log(row);
      alert(JSON.stringify(row))
    },
    getQuestion(row) {
      // 获取题目
    },
    audit() {
      // 审核
    },
    findErrorQueationListData() {
      // 搜索
    },
    handleResetSearch() {
      this.form.questionID = ''
      this.form.studentName = ''
      this.form.teacherName = ''
      this.form.state = ''
    }
  }
}
</script>

<style lang="scss">
</style>
