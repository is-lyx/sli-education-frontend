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
            @click="getStudyReport(scope.row)"
          >学习报告</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="getKnowledgeMap(scope.row)"
          >知识图谱</el-button>
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
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      tableData: [],
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
          name: '王小虎',
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
          name: '王小虎',
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
          name: '王小虎',
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
          name: '王小虎',
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
          name: '王小虎',
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
      this.queryInfo.page = 1
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
    getStudyReport() {
      // 学习报告
    },
    getKnowledgeMap() {
      // 知识图谱
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getLearningListData()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getLearningListData()
    }
  }
}
</script>
