<template>
  <div style="padding: 30px">
    <el-card shadow="never" style="margin-bottom: 20px">
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="9">
          <p style="font-size: 18px; display: inline">学科：</p>
          <el-select
            v-model="courseValue"
            placeholder="请选择"
            @change="getValue"
          >
            <el-option
              v-for="item in courseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="9">
          <p style="font-size: 18px; display: inline">版本：</p>
          <el-select
            v-model="versionValue"
            placeholder="请选择版本"
            @change="getLearningCourse(courseValue, versionValue)"
          >
            <el-option
              v-for="item in versionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="never">
      <el-row style="margin-bottom: 10px">
        <p style="font-size: 18px; display: inline">已选课程：</p>
        <el-tag type="danger" style="margin-right: 10px; font-size: 18px">{{
          courseValue
        }}</el-tag>
        <el-tag type="danger" style="margin-right: 10px; font-size: 18px">{{
          versionValue
        }}</el-tag>
        <el-tag
          v-if="learningCourseValue != ''"
          style="font-size: 18px"
          type="danger"
        >{{ learningCourseValue }}</el-tag>
        <el-divider />
        <div
          v-for="item in learningCourseOptions"
          :key="item.id"
          style="display: inline; margin: 20px"
        >
          <el-button
            style="margin-bottom: 20px"
            type="primary"
            plain
            @click="checked(item.value)"
          >{{ item.value }}</el-button>
        </div>
      </el-row>
      <div style="text-align: center">
        <el-button
          type="primary"
          @click="entryCourse(learningCourseValue)"
        >进入课程</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      versionOptions: [], // 版本
      versionValue: '',
      courseValue: '小学数学', // 学科
      courseOptions: [], // 学科选项
      learningCourseValue: '', // 课程
      learningCourseOptions: [] // 课程选项
    }
  },
  mounted() {
    this.getPrimaryMath()
    this.getCourseData()
  },
  methods: {
    getCourseData() {
      const data = [
        { id: 1, value: '小学数学' },
        { id: 2, value: '初中数学' },
        { id: 3, value: '高中数学' }
      ]
      this.courseOptions = data
    },
    getValue() {
      if (this.courseValue === '小学数学') {
        this.getPrimaryMath()
      } else if (this.courseValue === '初中数学') {
        this.getJuniorMath()
      } else {
        this.getHighMath()
      }
    },
    getPrimaryMath() {
      const data = [
        { id: 1, value: '人教新版' },
        { id: 2, value: '人教新版（改）' },
        { id: 3, value: '北师大版' }
      ]
      this.versionOptions = data
      this.versionValue = data[0].value
      this.getLearningCourse(this.courseValue, this.versionValue)
    },
    getJuniorMath() {
      //
      const data = [
        { id: 1, value: '人教版' },
        { id: 2, value: '人教A版' }
      ]
      this.versionOptions = data
      this.versionValue = data[0].value
      this.getLearningCourse(this.courseValue, this.versionValue)
    },
    getHighMath() {
      //
      const data = [
        { id: 1, value: '必修1' },
        { id: 2, value: '必修2' }
      ]
      this.versionOptions = data
      this.versionValue = data[0].value
      this.getLearningCourse(this.courseValue, this.versionValue)
    },
    getLearningCourse(courseValue, versionValue) {
      //
      const data = [
        { id: 1, value: '一年级上人教版' },
        { id: 2, value: '一年级下人教版' },
        { id: 3, value: '二年级上人教版' },
        { id: 4, value: '二年级下人教版' },
        { id: 5, value: '三年级上人教版' },
        { id: 6, value: '三年级下人教版' },
        { id: 7, value: '一年级下人教版' },
        { id: 8, value: '二年级上人教版' },
        { id: 9, value: '二年级下人教版' },
        { id: 10, value: '三年级上人教版' },
        { id: 11, value: '三年级下人教版' }
      ]
      this.learningCourseOptions = data
    },
    checked(value) {
      this.learningCourseValue = value
    },
    entryCourse(learningCourseValue) {
      // 进入课程
      // console.log(learningCourseValue)
      this.$router.push({
        path: '/wisdom-learning',
        query: { learningCourseValue: learningCourseValue }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
