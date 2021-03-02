<template>
  <div>
    <p style="text-align: center; font-size: 18px; color: #005ab5">
      {{ content }}
    </p>
    <el-row :gutter="20">
      <el-col :span="18" :xs="24">
        <div style="background-color: #c4e1ff; height: 500px">视频播放器</div>
      </el-col>

      <el-col :span="6" :xs="24">
        <div v-for="item in videoList" :key="item.id" style="margin-bottom: 20px; margin-left: 30px;">
          <el-button type="primary" plain>{{ item.name }}</el-button>
        </div>
        <el-button type="warning" style="margin-left: 30px;" @click="getMoreKnowledge(learningCourseValue)">更多知识点</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    learningCourseValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      videoList: []
    }
  },
  mounted() {
    // 发起查询请求
    this.getVedioList()
  },
  methods: {
    getVedioList() {
      //
      const data = [
        {
          id: '1',
          name: '表内九九乘法表'
        },
        {
          id: '2',
          name: '模拟后台数据'
        }
      ]
      this.videoList = data
    },
    getMoreKnowledge(learningCourseValue) {
      this.$router.push({
        path: '/wisdom-learning',
        query: { learningCourseValue: learningCourseValue }
      })
    }
  }
}
</script>
