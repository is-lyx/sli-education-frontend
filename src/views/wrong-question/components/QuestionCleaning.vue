<template>
  <div>
    <div style="text-align:center;">
      <p style="font-size:14px;color:#AD5A5A;display:inline;">当前还剩</p>
      <p style="font-size:18px;color:#743A3A;display:inline;"> {{ questionList.length }} </p>
      <p style="font-size:14px;color:#AD5A5A;display:inline;">道错题可消除（请认真清理错题，如果再次做错的题，会继续出现在错题清理里面哦）</p>
    </div>
    <div
      v-for="(item,index) in questionList"
      :key="index"
    >
      <el-row :gutter="32">
        <el-col :span="20">
          <p style="margin-left:20px;">{{ index+1 }}.【{{ item.type }}】 {{ item.question }}</p>
        </el-col>
        <el-col :span="4">
          <el-button type="warning" @click="answerQuestion(item.id)">答题</el-button>
        </el-col>
      </el-row>
      <el-divider />
      <!--答题-->
      <el-dialog
        custom-class="customWidth"
        title="答题"
        :visible.sync="answerVisible"
        @close="handleClose"
      >
        <el-dialog
          width="30%"
          title="纠错"
          :visible.sync="auditVisible"
          append-to-body
        >
          <p>题号：{{ questionID }}</p>
          <p>请输入本题的错误说明：</p>
          <el-input v-model="auditReason" placeholder="请输入内容" />
          <div style="text-align: center;margin-top:20px;">
            <el-button type="primary" @click="audit(questionID)">确定</el-button>
          </div>
        </el-dialog>
        <el-card style="margin: 10px">
          <p style="font-size: 18px;"> 【{{ question.type }}】 {{ question.question }}</p>
          <div style="margin:20px 0px 20px 20px;">
            <el-radio v-if="question.optionA" v-model="testOption" label="A">A. {{ question.optionA }}</el-radio>
            <el-radio v-if="question.optionB" v-model="testOption" label="B">B. {{ question.optionB }}</el-radio>
            <el-radio v-if="question.optionC" v-model="testOption" label="C">C. {{ question.optionC }}</el-radio>
            <el-radio v-if="question.optionD" v-model="testOption" label="D">D. {{ question.optionD }}</el-radio>
            <el-radio v-if="question.optionE" v-model="testOption" label="E">E. {{ question.optionE }}</el-radio>
          </div>
          <div v-if="checkTrueVisible">
            <p style="margin-left: 20px;color:#01814A">【提示】恭喜你，答对了哦！</p>
            <p style="margin-left: 20px;color:#01814A">{{ checkAnswer.parsing }}</p>
            <p style="margin-left: 20px;color:#01814A">正确答案：{{ checkAnswer.answer }}</p>
          </div>
          <div v-if="checkFalseVisible">
            <p style="margin-left: 20px;color:#AE0000">【提示】又错了哦，再认真思考一下！</p>
            <p style="margin-left: 20px;color:#AE0000">{{ checkAnswer.parsing }}</p>
            <p style="margin-left: 20px;color:#AE0000">正确答案：{{ checkAnswer.answer }}</p>
          </div>
        </el-card>
        <div style="text-align: center">
          <el-button type="danger" @click="auditVisible = true">纠错</el-button>
          <el-button type="primary" @click="check(questionID)">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      questionList: [],
      answerVisible: false,
      question: {},
      testOption: '', // 关注选题的答案
      checkTrueVisible: false,
      checkFalseVisible: false,
      checkAnswer: {},
      auditVisible: false,
      auditReason: '',
      questionID: ''
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
        id: '1',
        type: '单选题',
        question: '下面说法错误的是（　　）'
      },
      {
        id: '2',
        type: '单选题',
        question: '把24个苹果平均分成6份，每份是4个，列式是'
      },
      {
        id: '3',
        type: '单选题',
        question: '下面说法错误的是（　　）'
      }]
      this.questionList = data
    },
    answerQuestion(id) {
      this.answerVisible = true
      this.questionID = id
      // 获取题目信息接口
      const data = {
        type: '单选题',
        question: '把24个苹果平均分成6份，每份是4个，列式是',
        optionA: '4×6= 24',
        optionB: '24÷4= 6',
        optionC: '24÷6= 4',
        optionD: '',
        optionE: ''
      }
      this.question = data
    },
    check(id) {
      // 连接判断的接口
      const data = {
        parsing: '表内乘法（2-9的乘法口诀）,用2—9的乘法口诀求商',
        answer: 'C'
      }
      this.checkAnswer = data
      this.checkTrueVisible = true
      this.checkFalseVisible = true
    },
    audit(id) {
      // 纠错接口
      this.auditVisible = false
    },
    handleClose() {
      this.checkTrueVisible = false
      this.checkFalseVisible = false
    }
  }
}
</script>

<style lang="scss">
.customWidth {
  width: 60%;
}
</style>
