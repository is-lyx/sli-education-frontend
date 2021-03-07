<template>
  <div style="padding:30px;">
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

          :show-always-show-column-in-checkbox="true"
        >
          <el-table-column v-if="columnVisibles[0]" label="序号" min-width="20" prop="id" />
          <el-table-column v-if="columnVisibles[1]" label="作业名称" min-width="100" prop="homeworkName" />
          <el-table-column v-if="columnVisibles[2]" label="提交时间" prop="dueTime" />
          <el-table-column v-if="columnVisibles[3]" label="成绩" prop="grade" />
          <el-table-column v-if="columnVisibles[4]" label="用时" prop="usingTime" />
          <el-table-column v-if="columnVisibles[5]" label="达标" prop="reachStandard" />
          <el-table-column v-if="columnVisibles[6]" label="报告/测试" min-width="60">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.grade == '待测试'"
                type="success"
                size="mini"
                @click="startTest(scope.row.homeworkName)"
              >开始测试</el-button>
              <el-button
                v-else
                type="warning"
                size="mini"
                @click="getReport(scope.row.homeworkName)"
              >查看报告</el-button>
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
import PageTable from '../PageTable.vue'

export default {
  components: {
    PageTable // 引用表格组件
  },
  data() {
    return {
      columnVisibles: new Array(7).fill(true),
      tableData: []
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
          id: '1',
          homeworkName: '组合自测卷2020.02.28',
          dueTime: '-',
          grade: '待测试',
          usingTime: '待测试',
          reachStandard: '未达标'
        },
        {
          id: '2',
          homeworkName: '人教新版 三年级上 学前测试',
          dueTime: '-',
          grade: '待测试',
          usingTime: '待测试',
          reachStandard: '未达标'
        },
        {
          id: '3',
          homeworkName: '人教新版 三年级上 学前测试',
          dueTime: '-',
          grade: '待测试',
          usingTime: '待测试',
          reachStandard: '未达标'
        },
        {
          id: '4',
          homeworkName: '组合自测卷2020.03.01',
          dueTime: '-',
          grade: '30',
          usingTime: '2',
          reachStandard: '未达标'
        },
        {
          id: '5',
          homeworkName: '组合自测卷2020.03.02',
          dueTime: '-',
          grade: '待测试',
          usingTime: '待测试',
          reachStandard: '未达标'
        },
        {
          id: '6',
          homeworkName: '组合自测卷2020.02.28',
          dueTime: '-',
          grade: '待测试',
          usingTime: '待测试',
          reachStandard: '未达标'
        }]
      this.tableData = data
    },
    startTest(homeworkName) {
      this.$router.push({ path: '/Test', query: { homeworkName: homeworkName }})
    },
    getReport(homeworkName) {
      this.$router.push({ path: '/Report', query: { homeworkName: homeworkName }})
    }
  }
}
</script>
