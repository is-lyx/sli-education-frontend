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
      <el-table
        v-loading="listLoading"
        :data="studentRecycleList"
        :default-sort="{prop: 'studentID', order: 'descending'}"
        stripe
        border
      >
        <el-table-column
          label="学生ID"
          prop="studentID"
          sortable
        />
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
          label="班级"
          prop="class"
        />
        <el-table-column
          label="学校"
          prop="school"
        />
        <el-table-column
          label="老师"
          prop="teacher"
        />
        <el-table-column
          label="到期时间"
          prop="dueTime"
        />
        <el-table-column
          label="回退"
        >回退
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
      studentRecycleList: [
        {
          studentID: '136871',
          id: 'ce00013395',
          name: '任宇翔',
          phoneNumber: '123456',
          class: '初二晚辅01班',
          school: '福州一中',
          teacher: '暂无',
          dueTime: '2020-11-11 16:01:01'
        },
        {
          studentID: '136872',
          id: 'ce00013395',
          name: '吴德福',
          phoneNumber: '123456',
          class: '初二晚辅01班',
          school: '福州一中',
          teacher: '暂无',
          dueTime: '2020-11-11 16:01:01'
        },
        {
          studentID: '136873',
          id: 'ce00013395',
          name: '陈伊婕',
          phoneNumber: '123456',
          class: '初二晚辅01班',
          school: '福州一中',
          teacher: '暂无',
          dueTime: '2020-11-11 16:01:01'
        },
        {
          studentID: '136874',
          id: 'ce00013395',
          name: '兰微微',
          phoneNumber: '123456',
          class: '初二晚辅01班',
          school: '福州一中',
          teacher: '暂无',
          dueTime: '2020-11-11 16:01:01'
        },
        {
          studentID: '136875',
          id: 'ce00013395',
          name: '兰微',
          phoneNumber: '123456',
          class: '初二晚辅01班',
          school: '福州一中',
          teacher: '暂无',
          dueTime: '2020-11-11 16:01:01'
        }
      ],
      form: {
        studentNumber: '', // 学号
        name: '',
        phoneNumber: ''
      }
    }
  },
  methods: {
    findStudentRecycleListData() {
      this.queryInfo.page = 1
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
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getStudentRecycleListData()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getStudentRecycleListData()
    }
  }
}
</script>

