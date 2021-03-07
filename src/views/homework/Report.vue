<template>
  <div class="dashboard-editor-container">
    <h2 style="text-align: center">{{ homeworkName }}</h2>
    <h3 style="text-align: center">得分：{{ grade }}分（总分：100分）</h3>
    <div
      style="
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #0066cc;
      "
    >
      <p
        style="
          font-size: 24px;
          color: white;
          margin-left: 30px;
          margin-bottom: 0px;
        "
      >
        一、总概括
      </p>
    </div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart1 />
          <h4 style="text-align: center; font-size: 20px; margin-bottom: 5px">
            做题用时
          </h4>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart2 />
          <h4 style="text-align: center; font-size: 20px; margin-bottom: 5px">
            作业成绩
          </h4>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart3 />
          <h4 style="text-align: center; font-size: 20px; margin-bottom: 5px">
            做题正确率
          </h4>
        </div>
      </el-col>
    </el-row>

    <div
      style="
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #0066cc;
      "
    >
      <p
        style="
          font-size: 24px;
          color: white;
          margin-left: 30px;
          margin-bottom: 0px;
        "
      >
        二、试卷评价及成绩分布情况
      </p>
    </div>
    <PageTable
      ref="dataTable"
      :data="tableData"
      :page-sizes="[5, 10]"
      :page-size="5"
      :paging="true"
      :dynamic-column-setting="true"
      :column-visibles="columnVisibles"
      :always-show-column-indexs="[0]"
      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column
        v-if="columnVisibles[0]"
        label="模块"
        min-width="180px"
        prop="testModule"
      />
      <el-table-column
        v-if="columnVisibles[1]"
        label="总分"
        prop="totalGrade"
      />
      <el-table-column v-if="columnVisibles[2]" label="分值" prop="grade" />
    </PageTable>
    <div class="chart-wrapper">
      <pie-chart />
    </div>

    <div
      style="
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #0066cc;
      "
    >
      <p
        style="
          font-size: 24px;
          color: white;
          margin-left: 30px;
          margin-bottom: 0px;
        "
      >
        三、各模块答题情况详细诊断分析
      </p>
    </div>
    <PageTable
      :data="analysisData"
      :page-sizes="[5, 10]"
      :page-size="5"
      :paging="true"
      :dynamic-column-setting="true"
      :column-visibles="columnVisibles1"
      :always-show-column-indexs="[0]"
      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column
        v-if="columnVisibles1[0]"
        label="测试"
        min-width="180px"
        prop="test"
      />
      <el-table-column
        v-if="columnVisibles1[1]"
        label="得分"
        prop="grade"
      />
      <el-table-column v-if="columnVisibles1[2]" label="掌握情况" prop="masterSituation" />
      <el-table-column v-if="columnVisibles1[3]" label="分模块个性化建议" min-width="180px" prop="suggestion" />
    </PageTable>
  </div>
</template>

<script>
import PieChart from './components/PieChart'
import BarChart1 from './components/BarChart1'
import BarChart2 from './components/BarChart2'
import BarChart3 from './components/BarChart3'
import PageTable from '../PageTable.vue'

export default {
  components: {
    PieChart,
    BarChart1,
    BarChart2,
    BarChart3,
    PageTable
  },
  data() {
    return {
      homeworkName: this.$route.query.homeworkName,
      grade: this.$route.query.grade,
      tableData: [],
      analysisData: [],
      columnVisibles: new Array(4).fill(true),
      columnVisibles1: new Array(4).fill(true)
    }
  },
  mounted() {
    // 发起查询请求
    this.queryData()
    this.getAnalysis()
  },
  methods: {
    queryData() {
      // 模拟后台数据
      const data = [
        {
          testModule: '分数的意义、读写及分类',
          totalGrade: '2',
          grade: '1'
        },
        {
          testModule: '整数的加法和减法',
          totalGrade: '2',
          grade: '0'
        },
        {
          testModule: '加法和减法的关系',
          totalGrade: '2',
          grade: '1'
        },
        {
          testModule: '整数的乘法及应用',
          totalGrade: '2',
          grade: '0'
        },
        {
          testModule: '图文应用题',
          totalGrade: '1',
          grade: '0'
        }
      ]
      this.tableData = data
    },
    getAnalysis() {
      const analysisdata = [
        {
          test: '分数的意义、读写及分类',
          grade: '1',
          masterSituation: '50%',
          suggestion: '戒骄戒躁，继续努力'
        },
        {
          test: '整数的加法和减法',
          grade: '0',
          masterSituation: '0%',
          suggestion: '基础不扎实，需要重点注意此方面的知识'
        },
        {
          test: '加法和减法的关系',
          grade: '1',
          masterSituation: '50%',
          suggestion: '戒骄戒躁，继续努力'
        },
        {
          test: '整数的乘法及应用',
          grade: '0',
          masterSituation: '0%',
          suggestion: '基础不扎实，需要重点注意此方面的知识'
        }
      ]
      this.analysisData = analysisdata
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 0px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
