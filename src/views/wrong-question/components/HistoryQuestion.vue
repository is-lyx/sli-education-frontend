<template>
  <div>
    选择难度：
    <el-select v-model="difficultyValue" placeholder="请选择难度">
      <el-option
        v-for="item in difficultyOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    选择时间：
    <el-select v-model="timeValue" placeholder="请选择时间">
      <el-option
        v-for="item in timeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button
      type="primary"
      style="margin-left: 10px"
      @click="search(difficultyValue, timeValue)"
    >确认</el-button>
    <div
      v-if="noContent"
      style="width: 100%; height: 500px; line-height: 500px; text-align: center"
    >
      <p style="display: inline; font-size: 18px; color: #9d9d9d">
        当前难度和时间没有清理过的错题哦！可以更改参数或者去
      </p>
      <el-link type="warning" style="display: inline; font-size: 18px" @click="goToLearningCenter">
        学习中心
      </el-link>
      <p style="display: inline; font-size: 18px; color: #9d9d9d">练习哦！</p>
    </div>
    <div
      v-else
      style="width: 100%; height: 500px;"
    >
      <div v-for="(item, index) in questionList" :key="index">
        <el-row :gutter="32">
          <el-col :span="20">
            <p style="margin-left: 20px">
              {{ index + 1 }}.【{{ item.type }}】 {{ item.question }}
            </p>
            <div style="margin: 20px 0px 20px 20px">
              <p v-if="item.optionA" style="display: inline">
                A. {{ item.optionA }}
              </p>
              <p v-if="item.optionB" style="display: inline">
                B. {{ item.optionA }}
              </p>
              <p v-if="item.optionC" style="display: inline">
                C. {{ item.optionA }}
              </p>
              <p v-if="item.optionD" style="display: inline">
                D. {{ item.optionA }}
              </p>
              <p v-if="item.optionE" style="display: inline">
                E. {{ item.optionA }}
              </p>
            </div>
          </el-col>
          <el-col :span="4" />
        </el-row>
        <div style="margin-left: 50px;color:#0066CC">
          <p>{{ item.knowledge }}</p>
          <p>【分析】{{ item.analysis }}</p>
          <p>正确答案：{{ item.answer }}</p>
        </div>
        <el-divider />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      difficultyOptions: [],
      timeOptions: [],
      difficultyValue: '',
      timeValue: '',
      noContent: true,
      questionList: []
    }
  },
  mounted() {
    // 发起查询请求
    this.queryData()
  },
  methods: {
    queryData() {
      // 模拟后台数据
      const difficultyData = [
        {
          value: '1',
          label: '小于20%'
        },
        {
          value: '2',
          label: '小于40%'
        },
        {
          value: '3',
          label: '小于60%'
        },
        {
          value: '4',
          label: '小于80%'
        },
        {
          value: '5',
          label: '大于80%'
        }
      ]
      this.difficultyOptions = difficultyData
      const timeData = [
        {
          value: '1',
          label: '今天'
        },
        {
          value: '2',
          label: '昨天'
        },
        {
          value: '3',
          label: '近三天'
        },
        {
          value: '4',
          label: '近一周'
        },
        {
          value: '5',
          label: '近两周'
        },
        {
          value: '6',
          label: '近一个月'
        },
        {
          value: '7',
          label: '全部'
        }
      ]
      this.timeOptions = timeData
    },
    search(difficultyValue, timeValue) {
      // 接口
      const data = [
        {
          id: '1',
          type: '单选题',
          question: '把24个苹果平均分成6份，每份是4个，列式是',
          optionA: '4×6= 24',
          optionB: '24÷4= 6',
          optionC: '24÷6= 4',
          optionD: '',
          optionE: '',
          knowledge: '整数的加法和减法111',
          analysis: '根据被减数 - 减数=差，所以减数+差=被减数，可用115加115进行计算即可得到答案',
          answer: 'A'
        },
        {
          id: '1',
          type: '单选题',
          question: '减数和差都是115，被减数是（　　）',
          optionA: '230',
          optionB: '203',
          optionC: '0',
          optionD: '',
          optionE: '',
          knowledge: '整数的加法和减法222',
          analysis: '根据被减数 - 减数=差，所以减数+差=被减数，可用115加115进行计算即可得到答案',
          answer: 'B'
        }
      ]
      this.questionList = data
      this.noContent = false
    },
    goToLearningCenter() {
      this.$router.push({
        path: '/learning-center',
        query: { learningCourseValue: '测试标题', id: '1', title: '数据收集整理', content: '内容' }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
