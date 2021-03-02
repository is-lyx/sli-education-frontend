<template>
  <div style="padding: 30px">
    <p style="text-align: center; font-size: 26px">{{ learningCourseValue }}</p>
    <div style="text-align: center">
      <el-button type="primary" style="font-size:18px;">综合组卷</el-button>
    </div>
    <div style="margin: 20px">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="item in details"
          :key="item.id"
          :name="item.id"
        >
          <template slot="title">
            <div style="margin-left: 20px">{{ item.id }}. {{ item.title }}</div>
          </template>
          <div>
            <el-row :gutter="22" style="margin-top: 10px;">
              <el-col :span="5" style="margin-left: 40px;">
                <p style="font-size: 18px; display: inline">
                  {{ item.content }}
                </p>
              </el-col>
              <el-col :span="5">
                <p style="font-size: 18px; display: inline">
                  题正确率：{{ item.correct }}
                </p>
              </el-col>
              <el-col :span="5">
                <p style="font-size: 18px; display: inline">
                  学习进度：{{ item.correct }}
                </p>
              </el-col>
              <el-col :span="5">
                <p style="font-size: 18px; display: inline">
                  熟悉程度：{{ item.familiar }}
                </p>
              </el-col>
              <el-col :span="2">
                <el-button type="warning" @click="wisdomLearning(learningCourseValue, item.id, item.title, item.content)">智慧学习</el-button>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      learningCourseValue: '',
      activeName: '1',
      details: []
    }
  },
  mounted() {
    // 发起查询请求
    this.queryData()
    this.getlearningCourseValue()
  },
  methods: {
    getlearningCourseValue() {
      //
      this.learningCourseValue = '测试标题'
      if (this.$route.query.learningCourseValue) {
        this.learningCourseValue = this.$route.query.learningCourseValue
      }
    },
    queryData() {
      //
      const data = [
        {
          id: '1',
          title: '数据收集整理',
          content: '数据收集整理内容',
          correct: '0%',
          plan: '0%',
          familiar: '未学'
        },
        {
          id: '2',
          title: '表内除法（一）',
          content: '数据收集整理内容',
          correct: '0%',
          plan: '0%',
          familiar: '未学'
        },
        {
          id: '3',
          title: '表内除法（二）',
          content: '数据收集整理内容',
          correct: '0%',
          plan: '0%',
          familiar: '未学'
        },
        {
          id: '4',
          title: '图形的运动（一）',
          content: '数据收集整理内容',
          correct: '0%',
          plan: '0%',
          familiar: '未学'
        },
        {
          id: '5',
          title: '表内除法（二）',
          content: '数据收集整理内容',
          correct: '0%',
          plan: '0%',
          familiar: '未学'
        }
      ]
      this.details = data
    },
    wisdomLearning(learningCourseValue, id, title, content) {
      this.$router.push({
        path: '/learning-center',
        query: { learningCourseValue: learningCourseValue, id: id, title: title, content: content }
      })
    }
  }
}
</script>

<style lang="scss">
.el-collapse-item__header {
  background: #003d79;
  color: white;
  font-size: 18px;
}
.el-collapse-item__header.is-active {
  border-bottom-color: transparent;
  background: #0072e3;
}
</style>
