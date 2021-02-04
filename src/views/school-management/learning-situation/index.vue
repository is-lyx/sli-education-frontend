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
          @click="findLearningSituationData"
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
                @keyup.enter.native="findLearningSituationData"
              />
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input
                v-model="form.name"
                style="width: 203px;"
                placeholder="请输入姓名"
                @keyup.enter.native="findLearningSituationData"
              />
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input
                v-model="form.phoneNumber"
                style="width: 203px;"
                placeholder="请输入手机号"
                @keyup.enter.native="findLearningSituationData"
              />
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
    <PageTable
      ref="dataTable"
      :data="tableData"
      :page-sizes="[5,10]"
      :page-size="5"

      :paging="true"
      :dynamic-column-setting="true"
      :column-visibles="columnVisibles"
      :always-show-column-indexs="[1]"
      :default-sort="{prop: 'integral', order: 'descending'}"

      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column v-if="columnVisibles[0]" label="账号" prop="id" />
      <el-table-column v-if="columnVisibles[1]" label="姓名" prop="name" />
      <el-table-column v-if="columnVisibles[2]" label="性别" prop="sex" />
      <el-table-column v-if="columnVisibles[3]" label="当日积分" sortable prop="integral" />
      <el-table-column v-if="columnVisibles[4]" label="总积分" prop="totalIntegral" />
      <el-table-column v-if="columnVisibles[5]" label="知识点掌握度" prop="knowledgePoint" />
      <el-table-column v-if="columnVisibles[6]" label="当日答题准确率" min-width="100" prop="accuracy" />
      <el-table-column v-if="columnVisibles[7]" label="总体答题准确率" min-width="100" prop="totalAccuracy" />
      <el-table-column v-if="columnVisibles[8]" label="上次登录时间" min-width="115" prop="lastLoginTime" />
      <el-table-column v-if="columnVisibles[9]" label="操作" min-width="140">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="getStudyReport(scope.row.id,scope.row.name)"
          >学习报告</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="getKnowledgeMap(scope.row.id, scope.row.name)"
          >知识图谱</el-button>
          <!--知识图谱-->
          <el-dialog :title="knowledgeMapName + &quot;的知识图谱&quot;" :visible.sync="dialogTableVisible">
            <PageTable
              ref="dataTable"
              :data="selfKnowledgeMapData"
              :page-sizes="[5,10]"
              :page-size="5"

              :paging="true"
              :dynamic-column-setting="true"
              :column-visibles="columnVisibles"
              :show-always-show-column-in-checkbox="true"
            >
              <el-table-column v-if="columnVisibles[0]" label="一级知识点" prop="knowledge1" />
              <el-table-column v-if="columnVisibles[1]" label="二级知识点" prop="knowledge2" />
              <el-table-column v-if="columnVisibles[2]" label="三级知识点" min-width="200" prop="knowledge3" />
              <el-table-column v-if="columnVisibles[3]" label="用时(天)" min-width="60" prop="usingTime" />
              <el-table-column v-if="columnVisibles[4]" label="掌握程度" min-width="50" prop="masteryDegree" />
            </PageTable>
          </el-dialog>

        </template>
      </el-table-column>
    </PageTable>

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
      listLoading: false, // 假数据暂时为false，等接口调试时改为true
      dialogTableVisible: false,
      tableData: [],
      selfKnowledgeMapData: [], // 知识图谱
      knowledgeMapName: '', // 当前是哪个学生的知识图谱
      form: {
        id: '', // 账号
        name: '', // 姓名
        phoneNumber: '', // 手机号
        lastLoginTime: ''// 最后登陆时间
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
          sex: '男',
          integral: '115',
          totalIntegral: '7425',
          knowledgePoint: '3.45',
          accuracy: '0.65',
          totalAccuracy: '0.59',
          lastLoginTime: '2021-01-07 21:00:45'
        },
        {
          id: 'qz70019553',
          name: '王小虎2',
          sex: '男',
          integral: '115',
          totalIntegral: '7425',
          knowledgePoint: '3.45',
          accuracy: '0.65',
          totalAccuracy: '0.59',
          lastLoginTime: '2021-01-07 21:00:45'
        },
        {
          id: 'qz70019553',
          name: '王小虎3',
          sex: '男',
          integral: '115',
          totalIntegral: '7425',
          knowledgePoint: '3.45',
          accuracy: '0.65',
          totalAccuracy: '0.59',
          lastLoginTime: '2021-01-07 21:00:45'
        },
        {
          id: 'qz70019553',
          name: '王小虎4',
          sex: '男',
          integral: '115',
          totalIntegral: '7425',
          knowledgePoint: '3.45',
          accuracy: '0.65',
          totalAccuracy: '0.59',
          lastLoginTime: '2021-01-07 21:00:45'
        },
        {
          id: 'qz70019553',
          name: '王小虎5',
          sex: '男',
          integral: '115',
          totalIntegral: '7425',
          knowledgePoint: '3.45',
          accuracy: '0.65',
          totalAccuracy: '0.59',
          lastLoginTime: '2021-01-07 21:00:45'
        }]
      this.tableData = data
    },
    findLearningSituationData() {
      this.getLearningListData()
    },
    getLearningListData() {
      // 获取列表
    },
    handleResetSearch() {
      this.form.id = ''
      this.form.name = ''
      this.form.phoneNumber = ''
      this.form.lastLoginTime = ''
    },
    getStudyReport(id, name) {
      // 学习报告
      this.$router.push({ path: '/StudyReport', query: { id: id, name: name }})
    },
    getKnowledgeMap(id, name) {
      // 知识图谱
      this.dialogTableVisible = true
      this.knowledgeMapName = name
      // 调用接口展示个人数据
      // 以下为模拟数据
      const testData = [
        {
          knowledge1: '数与代数',
          knowledge2: '常见的量',
          knowledge3: '时、分、秒及其关系、单位换算与计算',
          usingTime: '8',
          masteryDegree: '80%'
        },
        {
          knowledge1: '数学思维',
          knowledge2: '数的认识',
          knowledge3: '整千整百数的加减法',
          usingTime: '4',
          masteryDegree: '60%'
        },
        {
          knowledge1: '数学思维',
          knowledge2: '生活中的单位',
          knowledge3: '长度单位（米，厘米）',
          usingTime: '6',
          masteryDegree: '60%'
        },
        {
          knowledge1: '数与代数',
          knowledge2: '常见的量',
          knowledge3: '质量及质量的常用单位',
          usingTime: '4',
          masteryDegree: '80%'
        }
      ]
      this.selfKnowledgeMapData = testData
    }
  }
}
</script>
