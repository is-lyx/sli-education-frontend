<template>
  <div style="padding:30px;">
    <el-button v-print="printObj" type="warning" style="float: right;margin-right: 50px;">打印试卷</el-button>
    <div id="printContent">
      <h2 style="text-align:center;">{{ homeworkName }}</h2>
      <div
        v-for="(item,index) in testList"
        :key="index"
        style="margin-left: 50px;font-size: 18px;"
      >
        <p>{{ index+1 }}. 【{{ item.type }}】 {{ item.question }}[        ]</p>
        <div style="font-size: 16px;">
          <el-radio v-if="item.optionA" v-model="testOptionList[index]" label="A">A. {{ item.optionA }}</el-radio>
          <el-radio v-if="item.optionB" v-model="testOptionList[index]" label="B">B. {{ item.optionB }}</el-radio>
          <el-radio v-if="item.optionC" v-model="testOptionList[index]" label="C">C. {{ item.optionC }}</el-radio>
          <el-radio v-if="item.optionD" v-model="testOptionList[index]" label="D">D. {{ item.optionD }}</el-radio>
          <el-radio v-if="item.optionE" v-model="testOptionList[index]" label="E">E. {{ item.optionE }}</el-radio>
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-top: 20px;">
      <el-button type="warning">交卷</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      printObj: {
        id: 'printContent', // 这里是要打印元素的ID
        popTitle: this.$route.query.homeworkName, // 打印的标题
        extraHead: '启智文坊学堂' // 打印头部文字
      },
      homeworkName: this.$route.query.homeworkName,
      testList: [],
      testOptionList: []
    }
  },
  mounted() {
    // 发起查询请求
    this.queryData()
  },
  methods: {
    queryData() {
      // 模拟后台数据
      const data = [{
        type: '单选题',
        question: '3×4改写成加法算式是',
        optionA: '3+3+3+3',
        optionB: '3+4',
        optionC: '3+4+5',
        optionD: '',
        optionE: ''
      }, {
        type: '单选题',
        question: '6的9倍是多少？列式是',
        optionA: '6×9',
        optionB: '6+9',
        optionC: '6+6',
        optionD: '',
        optionE: ''
      }, {
        type: '单选题',
        question: '4个8相加是多少？错误的列式是',
        optionA: '8+8+8+8',
        optionB: '4+8',
        optionC: '8×4',
        optionD: '',
        optionE: ''
      }, {
        type: '单选题',
        question: '同学们拾塑料袋，第一小组7个人共拾了56个，补充一个正确的问题的是',
        optionA: '第二小组8个人',
        optionB: '平均每人拾几个',
        optionC: '一共拾了多少个',
        optionD: '',
        optionE: ''
      }]
      this.testList = data
    }
  }
}
</script>

<style lang="scss">
/*去除页眉页脚*/
@page {
  size: auto; /* auto is the initial value */
  margin: 3mm; /* this affects the margin in the printer settings */
}

html {
  background-color: #ffffff;
  margin: 0; /* this affects the margin on the html before sending to printer */
}
/*去除页眉页脚*/
</style>
