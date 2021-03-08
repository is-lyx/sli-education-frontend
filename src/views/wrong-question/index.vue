<template>
  <div style="padding: 30px">
    <el-card>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="错题清理" name="questionCleaning">
          <questionCleaning />
        </el-tab-pane>
        <el-tab-pane label="历史错题" name="historyQuestion">
          <historyQuestion />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import QuestionCleaning from './components/QuestionCleaning'
import HistoryQuestion from './components/HistoryQuestion'

export default {
  components: { QuestionCleaning, HistoryQuestion },
  data() {
    return {
      activeTab: 'questionCleaning'
    }
  },
  mounted() {
    // 发起查询请求
    this.queryData()
  },
  methods: {
    queryData() {
      //
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
