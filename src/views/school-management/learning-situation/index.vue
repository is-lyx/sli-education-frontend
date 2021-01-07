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
    <div style="margin-top: 20px;">
      <el-table
        v-loading="listLoading"
        :data="learningList"
        stripe
        border
      >
        <el-table-column
          label="账号"
          prop="id"
        />
        <el-table-column
          label="姓名"
          prop="name"
        />
        <el-table-column
          label="性别"
          prop="sex"
        />
        <el-table-column
          label="当日积分"
          prop="integral"
        />
        <el-table-column
          label="总积分"
          prop="totalIntegral"
        />
        <el-table-column
          label="知识点掌握度"
          prop="knowledgePoint"
        />
        <el-table-column
          label="当日答题准确率"
          prop="accuracy"
        />
        <el-table-column
          label="总体答题准确率"
          prop="totalAccuracy"
        />
        <el-table-column
          label="上次登录时间"
          prop="lastLoginTime"
        />
        <el-table-column
          label="操作"
          width="200px"
        >
          <el-button
            type="primary"
            size="mini"
            @click="getStudyReport"
          >
            <!--<i class="el-icon-tickets"></i>-->
            学习报告</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="getKnowledgeMap"
          >
            <!--<i class="el-icon-guide"></i>-->
            知识图谱</el-button>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页区域 -->
    <div style="text-align: center; margin-top: 30px;">
      <el-pagination
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
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
export default {
  data() {
    return {
      listLoading: false, // 假数据暂时为false，等接口调试时改为true
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      learningList: [
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
        }],
      form: {
        id: '', // 账号
        name: '', // 姓名
        phoneNumber: '', // 手机号
        lastLoginTime: ''// 最后登陆时间
      }
    }
  },
  methods: {
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
