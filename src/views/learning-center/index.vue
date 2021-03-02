<template>
  <div style="padding: 30px">
    <div style="margin-bottom: 20px">
      <p
        style="
          margin-left: 30px;
          font-size: 24px;
          color: #003d79;
          display: inline;
        "
      >
        {{ learningCourseValue }}
      </p>
      <p style="font-size: 22px; display: inline">{{ id }}. {{ title }}</p>
    </div>
    <el-card>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="互动学习" name="interactive">
          <interactive
            :content="content"
            :learning-course-value="learningCourseValue"
          />
          <div style="text-align: center;margin-top: 10px;">
            <el-button type="primary" @click="changePage">去练习</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="智能练习" name="practice">
          <practice />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Interactive from './components/Interactive'
import Practice from './components/Practice'

export default {
  components: { Interactive, Practice },
  data() {
    return {
      activeTab: 'interactive',
      learningCourseValue: this.$route.query.learningCourseValue,
      id: this.$route.query.id,
      title: this.$route.query.title,
      content: this.$route.query.content
    }
  },
  mounted() {
    // 发起查询请求
    this.queryData()
  },
  methods: {
    queryData() {
      //
    },
    changePage() {
      this.activeTab = 'practice'
    }
  }
}
</script>

<style lang="scss">
.el-tabs__nav-scroll {
  overflow: hidden;
  // background-color:#C4E1FF;
}
</style>
