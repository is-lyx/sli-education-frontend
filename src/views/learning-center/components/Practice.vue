<template>
  <div>
    <el-row id="row" :gutter="20">
      <el-col :span="2" :xs="24">
        <p>总体指标：</p>
      </el-col>
      <el-col :span="5" :xs="24">
        <p style="display: flex">
          完成度：
          <el-progress :percentage="totalIndicators.finishDegree" />
        </p>
      </el-col>
      <el-col :span="7" :xs="24">
        <p style="display: flex">
          答题准确率：
          <el-progress :percentage="totalIndicators.accuracy" />
        </p>
      </el-col>
      <el-col :span="6" :xs="24">
        <p style="display: flex">
          能力水平：
          <el-progress :percentage="totalIndicators.ability" />
        </p>
      </el-col>
      <el-col :span="3" :xs="24">
        <p>学习能力：{{ totalIndicators.learningAbility }}</p>
      </el-col>
    </el-row>
    <div v-if="question[index]" style="margin-top: 10px;">
      <p style="font-size: 24px;display: inline;">
        {{ index + 1 }}.【{{ question[index].type }}】
        {{ question[index].question }}
      </p>
      <p style="display: inline;margin-right:200px;">
        <el-button type="warning" icon="el-icon-star-off" circle />
        <el-button type="primary" round>纠错</el-button>
      </p>
      <div v-if="question[index]" style="margin-top: 20px;">
        <el-radio
          v-if="question[index].optionA"
          id="radioLabel"
          v-model="radio"
          label="1"
        >{{ question[index].optionA }}</el-radio>
        <el-radio
          v-if="question[index].optionB"
          id="radioLabel"
          v-model="radio"
          label="2"
        >{{ question[index].optionB }}</el-radio>
        <el-radio
          v-if="question[index].optionC"
          id="radioLabel"
          v-model="radio"
          label="3"
        >{{ question[index].optionC }}</el-radio>
        <el-radio
          v-if="question[index].optionD"
          id="radioLabel"
          v-model="radio"
          label="4"
        >{{ question[index].optionD }}</el-radio>
        <el-radio
          v-if="question[index].optionE"
          id="radioLabel"
          v-model="radio"
          label="5"
        >{{ question[index].optionE }}</el-radio>
      </div>
    </div>
    <div v-if="question[index]" v-show="parsingShow">
      <el-divider />
      <p>解析：{{ question[index].parsing }}</p>
      <el-divider />
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <p>本题测评：{{ answerBack.test }}</p>
        </el-col>
        <el-col :span="6" :xs="24">
          <p style="display: flex">
            本题难度：
            <el-rate
              v-model="answerBack.difficultyValue"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            />
          </p>
        </el-col>
        <el-col :span="7" :xs="24">
          <p style="display: flex">
            平均正确率：
            <el-progress :percentage="answerBack.accuracy" />
          </p>
        </el-col>
      </el-row>
      <p>
        智能点评：本题能力测评——{{ answerBack.ability }}，{{ answerBack.remark }}
      </p>
    </div>
    <el-row id="row" style="text-align: center; margin-top: 50px">
      <el-button
        v-if="index != 0"
        type="primary"
        plain
        @click="lastQuestion"
      >上一题</el-button>
      <el-button type="primary" @click="getFinish(radio)">确认</el-button>
      <el-button
        v-if="index != question.length - 1"
        type="primary"
        plain
        @click="nextQuestion"
      >下一题</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalIndicators: {
        finishDegree: 0, // 完成度
        accuracy: 0, // 答题准确率
        ability: 0, // 能力水平
        learningAbility: '' // 学习能力
      },
      index: 0,
      question: [],
      radio: '',
      parsingShow: false,
      answerBack: {
        test: '', // 测评
        difficultyValue: 0,
        accuracy: 0,
        ability: '', // 能力测评
        remark: '' // 评语
      }
    }
  },
  mounted() {
    // 发起查询请求
    this.getIndicators()
    this.getQuestion()
  },
  methods: {
    getIndicators() {
      //
      const data = {
        finishDegree: 18,
        accuracy: 100,
        ability: 50,
        learningAbility: '不变'
      }
      this.totalIndicators = data
    },
    getQuestion() {
      const data = [
        {
          type: '单选题',
          question: '5×3÷5×3的结果是（　　）',
          optionA: '25',
          optionB: '9',
          optionC: '1',
          optionD: '6',
          optionE: '',
          parsing: '5×3÷5×3，=15÷5×3，=3×3，=9；运算的结果是9．故选：B．'
        },
        {
          type: '单选题',
          question: '下面（　　）算式的结果是240．',
          optionA: '587-357',
          optionB: '4×600',
          optionC: '6×40',
          optionD: '480÷6',
          optionE: '',
          parsing:
            'A，587-357=230；B，4×600=2400；C，6×40=240；D，480÷6=80；只有C的结果是240．故选：C．'
        },
        {
          type: '单选题',
          question: '下面不正确的算式是[     ]',
          optionA: '5×4= 4×5',
          optionB: '5×4=5+5+5+5',
          optionC: '5×4=5+4',
          optionD: '',
          optionE: '',
          parsing: 'C．'
        }
      ]
      this.question = data
    },
    getFinish(radio) {
      if (radio === '') {
        this.$alert('请先选择答案再提交！', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        this.parsingShow = true
        // 连接口,下面是模拟数据
        const data = {
          test: '4', // 测评
          difficultyValue: 3,
          accuracy: 50,
          ability: '偏难', // 能力测评
          remark: '做的不错，继续加油！' // 评语
        }
        this.answerBack = data
      }
    },
    lastQuestion() {
      this.index -= 1
      this.radio = ''
    },
    nextQuestion() {
      this.index += 1
      this.radio = ''
    }
  }
}
</script>

<style lang="scss">
#row {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #ecf5ff;
}
.el-progress {
  width: 70%;
}
#radioLabel {
  font-size: 20px;
  padding-left: 10px;
}
</style>
