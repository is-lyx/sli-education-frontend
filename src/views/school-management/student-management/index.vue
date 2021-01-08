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
          @click="findStudentListData"
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
                @keyup.enter.native="findClubsListData"
              />
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input
                v-model="form.name"
                style="width: 203px;"
                placeholder="请输入姓名"
                @keyup.enter.native="findClubsListData"
              />
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input
                v-model="form.phoneNumber"
                style="width: 203px;"
                placeholder="请输入手机号"
                @keyup.enter.native="findClubsListData"
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
          @click="add"
        >添加</el-button>
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-plus"
          plain
          @click="batchAdd"
        >批量添加</el-button>
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-plus"
          plain
          @click="batchClasses"
        >批量分配班级</el-button>
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-plus"
          plain
          @click="batchCourses"
        >批量分发课程</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="StudentList"
        :default-sort="{prop: 'totalIntegral', order: 'descending'}"
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
          label="手机号"
          prop="phoneNumber"
        />
        <el-table-column
          label="学校"
          prop="school"
        />
        <el-table-column
          label="班级"
          prop="class"
        />
        <el-table-column
          label="老师"
          prop="teacher"
        />
        <el-table-column
          label="总积分"
          prop="totalIntegral"
          sortable
        />
        <el-table-column
          label="到期时间"
          prop="dueTime"
        />
        <el-table-column
          label="操作"
          width="400px"
        >
          <el-button
            type="primary"
            size="mini"
            @click="openEnglish"
          >开通英语</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="distributionClasses"
          >分配班级</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="distributionCourses"
          >分发课程</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="rewardPoints"
          >奖励积分</el-button>
          <el-button
            type="info"
            size="mini"
            @click="edit"
          >
            修改</el-button>
          <el-button
            type="warning"
            size="mini"
            @click="reset"
          >
            重置</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteStudent"
          >
            删除</el-button>
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
      StudentList: [
        {
          id: 'qz70019553',
          name: '王小虎',
          phoneNumber: '55555',
          school: '启智文坊学堂',
          class: '小学高年级托管班',
          teacher: '蒋启文',
          totalIntegral: '294',
          dueTime: '2021-01-05 16:48:42'
        },
        {
          id: 'qz70019554',
          name: '王小虎',
          phoneNumber: '33333',
          school: '启智文坊学堂',
          class: '小学高年级托管班',
          teacher: '蒋启文',
          totalIntegral: '289',
          dueTime: '2021-01-05 16:48:42'
        },
        {
          id: 'qz70019555',
          name: '王小虎',
          phoneNumber: '22222',
          school: '启智文坊学堂',
          class: '小学高年级托管班',
          teacher: '蒋启文',
          totalIntegral: '234',
          dueTime: '2021-01-05 16:48:42'
        },
        {
          id: 'qz70019556',
          name: '王小虎',
          phoneNumber: '44444',
          school: '启智文坊学堂',
          class: '小学高年级托管班',
          teacher: '蒋启文',
          totalIntegral: '290',
          dueTime: '2021-01-05 16:48:42'
        },
        {
          id: 'qz70019557',
          name: '王小虎',
          phoneNumber: '11111',
          school: '启智文坊学堂',
          class: '小学高年级托管班',
          teacher: '蒋启文',
          totalIntegral: '212',
          dueTime: '2021-01-05 16:48:42'
        }],
      form: {
        id: '', // 账号
        name: '', // 姓名
        phoneNumber: '' // 手机号
      }
    }
  },
  methods: {
    findStudentListData() {
      this.queryInfo.page = 1
      this.getStudentListData()
    },
    getStudentListData() {
      // 获取列表
    },
    handleResetSearch() {
      this.form.id = ''
      this.form.name = ''
      this.form.phoneNumber = ''
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
    },
    add() {

    },
    batchAdd() {

    },
    batchClasses() {

    },
    batchCourses() {

    },
    openEnglish() {

    },
    distributionClasses() {

    },
    distributionCourses() {

    },
    rewardPoints() {

    },
    edit() {

    },
    reset() {

    },
    deleteStudent() {

    }
  }
}
</script>

