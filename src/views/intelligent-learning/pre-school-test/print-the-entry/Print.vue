<template>
  <div style="padding: 30px">
    <h4 style="font-size: 18px; text-align: center">{{ homeworkName }}</h4>
    <h5 style="font-size: 15px; text-align: center">{{ studentName }}</h5>
    <div style="margin-left: 100px; margin-right: 100px;">
      <div v-if="radioList.length != '0'">
        <h5 style="text-align: left; font-size: 15px">一、选择题</h5>
        <div
          v-for="(item, index) in radioList"
          :key="index"
          style="margin-bottom: 60px"
        >
          <p>{{ index + 1 }} . {{ item.title }}</p>
          <div>
            <p
              v-if="item.optionA !== ''"
              style="font-size: 13px; float: left; width: 20%"
            >
              A.{{ item.optionA }}
            </p>
            <p
              v-if="item.optionB !== ''"
              style="font-size: 13px; float: left; width: 20%"
            >
              B.{{ item.optionB }}
            </p>
            <p
              v-if="item.optionC !== ''"
              style="font-size: 13px; float: left; width: 20%"
            >
              C.{{ item.optionC }}
            </p>
            <p
              v-if="item.optionD !== ''"
              style="font-size: 13px; float: left; width: 20%"
            >
              D.{{ item.optionD }}
            </p>
            <p
              v-if="item.optionE !== ''"
              style="font-size: 13px; float: left; width: 20%"
            >
              E.{{ item.optionE }}
            </p>
          </div>
          <div>
            <el-button type="warning">更换本题</el-button>
          </div>
        </div>
      </div>
      <div v-if="fillBlanksList.length != '0'">
        <h5 style="text-align: left; font-size: 15px">二、填空题</h5>
        <div
          v-for="(item, index) in fillBlanksList"
          :key="index"
          style="margin-bottom: 30px"
        >
          <p>{{ index + 1 }} . {{ item.title }}</p>
          <el-button type="warning">更换本题</el-button>
        </div>
      </div>
      <div v-if="shortAnswerList.length != '0'">
        <h5 style="text-align: left; font-size: 15px">三、简答题</h5>
        <div
          v-for="(item, index) in shortAnswerList"
          :key="index"
          style="margin-bottom: 100px"
        >
          <p>{{ index + 1 }} . {{ item.title }}</p>
          <el-button type="warning">更换本题</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentName: this.$route.query.studentName,
      homeworkName: this.$route.query.homeworkName,
      radioList: [],
      fillBlanksList: [],
      shortAnswerList: []
    }
  },
  mounted() {
    // 发起查询请求
    this.getQueryData()
  },
  methods: {
    getQueryData() {
      // 模拟后台数据
      const radioData = [
        {
          title:
            '宇宙中光的传播速度最快，已知光的速度是每秒3×105km，则在5×10 - 3秒内，光线通过的距离是（　　）',
          optionA: '1500km',
          optionB: '60km',
          optionC: '150km',
          optionD: '600km',
          optionE: ''
        },
        {
          title: '下列计算中正确的是（　　）',
          optionA: '3a+2a=5a2',
          optionB: '2a2•a3=2a6 ',
          optionC: '（2a+b）（2a - b）=2a2 - b2',
          optionD: '（2ab）2=4a2b2',
          optionE: ''
        },
        {
          title: '要使（x+m）（x - 3）的结果中不含x的一次项，则m等于（　　）',
          optionA: '0',
          optionB: '1',
          optionC: '2',
          optionD: '3',
          optionE: ''
        }
      ]
      this.radioList = radioData
      const fillBlanksData = [
        {
          title:
            '如果单项式 - 3x2ayb+1与13xa+2y2b - 3是同类项，那么这两个单项式的积是___________．'
        },
        {
          title:
            '请写出两个关于x的二项式，使它们的积仍为二项式，你所编写的二项式为___________，它们的积为___________．'
        },
        {
          title: '计算y•5y2•（ - 7y3）=___________.'
        }
      ]
      this.fillBlanksList = fillBlanksData
      const shortAnswerData = [
        {
          title:
            '已知有理数a、b、c满足|a﹣1|+（3b+1）2+（c+2）2=0，求（﹣3ab）•（﹣a2c）•6ab的值．'
        },
        {
          title: '已知a+b＝1，a（a2+2a）+b（﹣3a+b2）＝0.5，求ab的值．'
        }
      ]
      this.shortAnswerList = shortAnswerData
    }
  }
}
</script>
