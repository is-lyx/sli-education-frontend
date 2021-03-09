<template>
  <div class="dashboard-editor-container">
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
        跟我学
      </p>
    </div>
    <el-row :gutter="20">
      <el-col :span="5" :xs="24">
        <img
          src="../../assets/images/study.png"
          style="width: 150px; height: 150px;"
        >
      </el-col>
      <el-col :span="19" :xs="24">
        <p style="font-size: 18px;margin-top: 50px;">
          <el-button type="warning" @click="wisdomLearning">智慧学习</el-button>
          聚沙成塔，滴水石穿，我们量身为你定制了知识点学习计划</p>
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
        学币
      </p>
    </div>
    <p style="text-align:center;">
      我的学币： {{ coin }} 个，可兑换 {{ exchange }} 个，已兑换 {{ alreadyExchange }} 个
      <el-button type="primary" size="small">兑换</el-button>
    </p>
    <el-table
      :data="coinsData"
    >
      <el-table-column
        label="奖牌"
        min-width="50px"
        prop="medal"
      />
      <el-table-column label="获奖规则" min-width="180px" prop="rules" />
      <el-table-column
        label="学习情况"
        min-width="180px"
        prop="situation"
      />
      <el-table-column
        label="进度"
        prop="progress"
      />
    </el-table>

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
        学习评价与建议
      </p>
    </div>
    <el-row :gutter="20">
      <el-col :span="19" :xs="24">
        <p style="font-size: 18px;margin: 20px 0 0 20px;">
          我的名次：
          <el-tag style="font-size:18px;margin-right:10px;" type="danger">{{ learning.ranking }}</el-tag>
          学习能力：
          <el-tag style="font-size:18px;" type="danger">{{ learning.ability }}</el-tag>
        </p>
        <p
          v-for="(item,index) in suggesstions"
          :key="index"
          style="font-size: 20px;margin: 20px 0 0 20px;"
        >
          {{ index+1 }}. {{ item }}
        </p>
      </el-col>
      <el-col :span="5" :xs="24">
        <img
          src="../../assets/images/teacher.png"
          style="width: 180px; height: 220px;"
        >
      </el-col>
    </el-row>
    <div class="chart-wrapper">
      <el-row :gutter="20">
        <el-col :span="14" :xs="24">
          <p style="font-size: 18px;margin: 50px 0 0 100px;display: flex;">
            作业完成率：
            <el-progress :percentage="homework.finish" style="width:250px;" />
          </p>
          <p style="font-size: 18px;margin: 50px 0 0 100px;display: flex;">
            作业成绩分：
            <el-progress :percentage="homework.grade" style="width:250px;" />
          </p>
          <p style="font-size: 18px;margin: 50px 0 0 100px;display: flex;">
            知识掌握分：
            <el-progress :percentage="homework.grasp" style="width:250px;" />
          </p>
        </el-col>
        <el-col :span="7" :xs="24">
          <pie-chart />
        </el-col>
      </el-row>
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
        学习历史
      </p>
    </div>
    <el-table
      :data="studyHistory"
    >
      <el-table-column
        label="类型/日期"
        min-width="150px"
        prop="type"
      />
      <el-table-column
        label="全部"
        prop="total"
      />
      <el-table-column label="今天" prop="today" />
    </el-table>

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
        学习历史详情
      </p>
    </div>
    <div class="chart-wrapper">
      <bar-chart1 />
    </div>
  </div>
</template>

<script>
import PieChart from './components/PieChart'
import BarChart1 from './components/BarChart1'

export default {
  components: {
    PieChart,
    BarChart1
  },
  data() {
    return {
      studyHistory: [],
      coinsData: [],
      coin: '26',
      exchange: '0',
      alreadyExchange: '0',
      learning: {},
      suggesstions: [],
      homework: {
        finish: 0,
        grade: 20,
        grasp: 50
      }
    }
  },
  mounted() {
    // 发起查询请求
    this.getStudyHistory()
    this.getCoins()
    this.getLearning()
    this.getSuggesstions()
  },
  methods: {
    getStudyHistory() {
      // 模拟后台数据
      const data = [
        {
          type: '题总数',
          total: '19',
          today: '0'
        },
        {
          type: '作业',
          total: '0',
          today: '0'
        },
        {
          type: '有效学习时间',
          total: '0',
          today: '0'
        },
        {
          type: '知识掌握程度',
          total: '0',
          today: '0'
        }
      ]
      this.studyHistory = data
    },
    getCoins() {
      const coinsdata = [
        {
          medal: '实战奖',
          rules: '一题做对可得3个学币，做错了扣除1个学币，学币新增100个以上可领取一次',
          situation: '共计做了19题，做错了13题，共用时5分30秒',
          progress: '9/100'
        },
        {
          medal: '修炼奖',
          rules: '每有效学习1分钟可得1个学币，学币新增60个以上可领取一次',
          situation: '共计有效时长0分钟',
          progress: '9/100'
        },
        {
          medal: '学神奖',
          rules: '每获取一次“学神”称号可领取一次，每次可获得20个学币',
          situation: '共获得0次学神称号',
          progress: '9/100'
        },
        {
          medal: '鼓励奖',
          rules: '由于你的优秀表现，老师给予你的奖励',
          situation: '共获得0次奖励',
          progress: '9/100'
        }
      ]
      this.coinsData = coinsdata
    },
    //
    wisdomLearning() {
      this.$router.push({ path: '/wisdom-learning' })
    },
    getLearning() {
      const data = {
        ranking: '0',
        ability: '3'
      }
      this.learning = data
    },
    getSuggesstions() {
      const data = [
        '基础只是掌握得较差，需要多进行边学边练，边学边练的每一步都要认真对待， 推荐的学习资料也要自己看和听，打牢基础。',
        '请必须进行变式提分，让作业成绩逐步提高',
        '只要在学习中心跟着我的推荐认真学习，成绩一定会提升的，一定要成功！'
      ]
      this.suggesstions = data
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
