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
          label-width="auto"
        >
          <div style="text-align: center;">
            <el-form-item label="年级：">
              <el-input
                v-model="form.grade"
                style="width: 203px;"
                placeholder="请输入年级"
                @keyup.enter.native="findStudentListData"
              />
            </el-form-item>
            <el-form-item label="系列（1小2初3高）：">
              <el-input
                v-model="form.series"
                style="width: 203px;"
                placeholder="请输入系列号"
                @keyup.enter.native="findStudentListData"
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
        :data="gradeList"
        :default-sort="{prop: 'series', order: 'descending'}"
        stripe
        border
      >
        <el-table-column
          label="年级"
          prop="grade"
        />
        <el-table-column
          label="系列（1小2初3高）"
          prop="series"
          sortable
        />
        <el-table-column
          label="操作"
          width="200px"
        >
          暂无
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
      gradeList: [
        {
          grade: '一年级上',
          series: '1'
        },
        {
          grade: '一年级下',
          series: '1'
        },
        {
          grade: '初一上',
          series: '2'
        },
        {
          grade: '初二下',
          series: '2'
        },
        {
          grade: '高一上',
          series: '3'
        },
        {
          grade: '高二上',
          series: '3'
        }
      ],
      form: {
        grade: '', // 年级
        series: '' // 系列
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
      this.form.grade = ''
      this.form.series = ''
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getStudentListData()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getStudentListData()
    }
  }
}
</script>

