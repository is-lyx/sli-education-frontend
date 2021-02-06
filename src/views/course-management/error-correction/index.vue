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
      <el-table-column v-if="columnVisibles[13]" label="操作" min-width="60">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="audit(scope.row.id)"
          >审核</el-button>
        </template>
      </el-table-column>
    </PageTable>
    <!--审核-->
    <el-dialog :title="auditTitle" :visible.sync="auditVisible">
      <el-card style="margin:10px">
        <div>
          <h4 style="text-align: left; font-size: 18px;">{{ questionForm.question }}</h4>
          <div>
            <el-image
              v-if="questionForm.img !== null"
              style="width: 60px; height: 60px;"
              :src="questionForm.img"
            />
            <img
              v-else
              src="../../../assets/404_images/404.png"
              style="width: 60px; height: 60px;"
            >
          </div>
          <p v-if="questionForm.optionA !== ''" style="font-size: 15px;display:inline;">
            A.{{ questionForm.optionA }}
          </p>
          <p v-if="questionForm.optionB !== ''" style="font-size: 15px;display:inline;">
            B.{{ questionForm.optionB }}
          </p>
          <p v-if="questionForm.optionC !== ''" style="font-size: 15px;display:inline;">
            C.{{ questionForm.optionC }}
          </p>
          <p v-if="questionForm.optionD !== ''" style="font-size: 15px;display:inline;">
            D.{{ questionForm.optionD }}
          </p>
          <p v-if="questionForm.optionE !== ''" style="font-size: 15px;display:inline;">
            E.{{ questionForm.optionE }}
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            简明答案：{{ questionForm.rightOption }}
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            详细答案：{{ questionForm.detailOption }}
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            解析：{{ questionForm.analysis }}
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            知识点：{{ questionForm.knowledge }}
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            年级：{{ questionForm.grade }}
          </p>
        </div>
      </el-card>
      <div style="text-align:center">
        <el-button @click="auditVisible = false">题目无误</el-button>
        <el-button type="primary" @click="postAudit">题目有误</el-button>
      </div>
    </el-dialog>
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
      columnVisibles: new Array(14).fill(true),
      auditVisible: false,
      auditTitle: '审核题目',
      questionForm: {
        id: '1',
        question: '题目',
        img: '',
        optionA: '1',
        optionB: '2',
        optionC: '3',
        optionD: '4',
        optionE: '5',
        rightOption: '1',
        detailOption: '详细答案blablabla',
        analysis: '解析',
        knowledge: '',
        grade: ''
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
      const data = []
      for (var i = 1; i <= 23; i++) {
        data.push({ id: i, questionID: i, studentID: i, studentName: i, submitRemark: i,
          submitErrorCorrectionTime: i, teacherID: i, teacherName: i, auditRemark: i,
          auditTime: i, errorRemark: i, errorCorrectionTime: i, state: i })
      }

      this.tableData = data
    },
    getQuestion() {
      // 获取题目
    },
    audit(id) {
      // 审核
      this.auditVisible = true
      this.questionForm.id = id
      this.auditTitle = '审核题目(' + id + ')'
      // this.getQuestion()
    },
    postAudit() {
      this.auditVisible = false
      // 提交审核接口
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
