<template>
  <div style="padding: 30px">
    <div>
      <h4 style="font-size: 18px; text-align: center">{{ homeworkName }}</h4>
      <h5 style="font-size: 15px; text-align: center">{{ studentName }}</h5>
      <p style="font-size: 15px; text-align: center">
        用时(分钟)：
        <el-input
          v-model="usingTime"
          style="width: 200px"
          placeholder="请输入时间"
        />
      </p>
      <div style="margin-left: 100px; margin-right: 100px">
        <div v-if="radioList.length != '0'">
          <h5 style="text-align: left; font-size: 15px">一、选择题</h5>
          <div
            v-for="(item, index) in radioList"
            :key="index"
            style="margin-bottom: 40px"
          >
            <p>{{ index + 1 }} . {{ item.title }}</p>
            <div>
              <p
                v-if="item.optionA !== ''"
                style="font-size: 13px; float: left; width: 25%"
              >
                A.{{ item.optionA }}
              </p>
              <p
                v-if="item.optionB !== ''"
                style="font-size: 13px; float: left; width: 25%"
              >
                B.{{ item.optionB }}
              </p>
              <p
                v-if="item.optionC !== ''"
                style="font-size: 13px; float: left; width: 25%"
              >
                C.{{ item.optionC }}
              </p>
              <p
                v-if="item.optionD !== ''"
                style="font-size: 13px; float: left; width: 25%"
              >
                D.{{ item.optionD }}
              </p>
              <p
                v-if="item.optionE !== ''"
                style="font-size: 13px; float: left; width: 25%"
              >
                E.{{ item.optionE }}
              </p>
              <div style="margin-top: 20px">
                <p style="display: inline">答案：</p>
                <p style="display: inline; color: red">
                  {{ item.rightOption }}
                </p>
                <div style="margin-top: 10px">
                  <el-button type="success">正确</el-button>
                  <el-button type="danger">错误</el-button>
                  <el-button
                    type="warning"
                    @click="audit(item.id)"
                  >纠错</el-button>
                </div>
              </div>
            </div>
            <div />
          </div>
          <!--审核-->
          <el-dialog :title="auditTitle" :visible.sync="auditVisible">
            <el-card style="margin: 10px">
              <div>
                <h4 style="text-align: left; font-size: 18px">
                  {{ questionForm.question }}
                </h4>
                <div>
                  <el-image
                    v-if="questionForm.img !== null"
                    style="width: 60px; height: 60px"
                    :src="questionForm.img"
                  />
                  <img
                    v-else
                    src="../../../../assets/404_images/404.png"
                    style="width: 60px; height: 60px"
                  >
                </div>
                <div style="margin-bottom: 60px">
                  <p
                    v-if="questionForm.optionA !== ''"
                    style="font-size: 15px; float: left; width: 20%"
                  >
                    A.{{ questionForm.optionA }}
                  </p>
                  <p
                    v-if="questionForm.optionB !== ''"
                    style="font-size: 15px; float: left; width: 20%"
                  >
                    B.{{ questionForm.optionB }}
                  </p>
                  <p
                    v-if="questionForm.optionC !== ''"
                    style="font-size: 15px; float: left; width: 20%"
                  >
                    C.{{ questionForm.optionC }}
                  </p>
                  <p
                    v-if="questionForm.optionD !== ''"
                    style="font-size: 15px; float: left; width: 20%"
                  >
                    D.{{ questionForm.optionD }}
                  </p>
                  <p
                    v-if="questionForm.optionE !== ''"
                    style="font-size: 15px; float: left; width: 20%"
                  >
                    E.{{ questionForm.optionE }}
                  </p>
                </div>
                <el-divider />
                <div>
                  <p style="font-size: 15px">
                    简明答案：{{ questionForm.rightOption }}
                  </p>
                </div>
                <el-divider />
                <p style="font-size: 15px">
                  详细答案：{{ questionForm.detailOption }}
                </p>
                <el-divider />
                <p style="font-size: 15px">解析：{{ questionForm.analysis }}</p>
                <el-divider />
                <p style="font-size: 15px">
                  知识点：{{ questionForm.knowledge }}
                </p>
                <el-divider />
                <p style="font-size: 15px">年级：{{ questionForm.grade }}</p>
              </div>
            </el-card>
            <div style="text-align: center">
              <el-button @click="auditVisible = false">题目无误</el-button>
              <el-button type="primary" @click="postAudit">题目有误</el-button>
            </div>
          </el-dialog>
        </div>
        <div v-if="fillBlanksList.length != '0'">
          <h5 style="text-align: left; font-size: 15px">二、填空题</h5>
          <div
            v-for="(item, index) in fillBlanksList"
            :key="index"
            style="margin-bottom: 30px"
          >
            <p>{{ index + 1 }} . {{ item.title }}</p>
            <div>
              <p style="display: inline">简明答案：</p>
              <p style="display: inline; color: red">{{ item.simpleAnswer }}</p>
            </div>
            <div style="margin-top: 10px">
              <p style="display: inline">详细答案：</p>
              <p style="display: inline; color: red">{{ item.answer }}</p>
            </div>
            <div style="margin-top: 10px">
              <el-button type="success">正确</el-button>
              <el-button type="danger">错误</el-button>
              <el-button type="warning" @click="auditFillBlanks(item.id)">纠错</el-button>
            </div>
            <!--审核-->
            <el-dialog :title="auditTitle" :visible.sync="fillBlanksAuditVisible">
              <el-card style="margin: 10px">
                <div>
                  <h4 style="text-align: left; font-size: 18px">
                    {{ fillBlanksForm.question }}
                  </h4>
                  <div>
                    <el-image
                      v-if="fillBlanksForm.img !== null"
                      style="width: 60px; height: 60px"
                      :src="fillBlanksForm.img"
                    />
                    <img
                      v-else
                      src="../../../../assets/404_images/404.png"
                      style="width: 60px; height: 60px"
                    >
                  </div>
                  <el-divider />
                  <div>
                    <p style="font-size: 15px">
                      简明答案：{{ fillBlanksForm.rightOption }}
                    </p>
                  </div>
                  <el-divider />
                  <p style="font-size: 15px">
                    详细答案：{{ fillBlanksForm.detailOption }}
                  </p>
                  <el-divider />
                  <p style="font-size: 15px">解析：{{ fillBlanksForm.analysis }}</p>
                  <el-divider />
                  <p style="font-size: 15px">
                    知识点：{{ fillBlanksForm.knowledge }}
                  </p>
                  <el-divider />
                  <p style="font-size: 15px">年级：{{ fillBlanksForm.grade }}</p>
                </div>
              </el-card>
              <div style="text-align: center">
                <el-button @click="fillBlanksAuditVisible = false">题目无误</el-button>
                <el-button type="primary" @click="postAudit">题目有误</el-button>
              </div>
            </el-dialog>
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
            <div>
              <p style="display: inline">简明答案：</p>
              <p style="display: inline; color: red">{{ item.simpleAnswer }}</p>
            </div>
            <div style="margin-top: 10px">
              <p style="display: inline">详细答案：</p>
              <p style="display: inline; color: red">{{ item.answer }}</p>
            </div>
            <div style="margin-top: 10px">
              <el-button type="success">正确</el-button>
              <el-button type="danger">错误</el-button>
              <el-button type="warning" @click="auditSimpleAnswer(item.id)">纠错</el-button>
            </div>
            <!--审核-->
            <el-dialog :title="auditTitle" :visible.sync="simpleAuditVisible">
              <el-card style="margin: 10px">
                <div>
                  <h4 style="text-align: left; font-size: 18px">
                    {{ fillBlanksForm.question }}
                  </h4>
                  <div>
                    <el-image
                      v-if="fillBlanksForm.img !== null"
                      style="width: 60px; height: 60px"
                      :src="fillBlanksForm.img"
                    />
                    <img
                      v-else
                      src="../../../../assets/404_images/404.png"
                      style="width: 60px; height: 60px"
                    >
                  </div>
                  <el-divider />
                  <div>
                    <p style="font-size: 15px">
                      简明答案：{{ fillBlanksForm.rightOption }}
                    </p>
                  </div>
                  <el-divider />
                  <p style="font-size: 15px">
                    详细答案：{{ fillBlanksForm.detailOption }}
                  </p>
                  <el-divider />
                  <p style="font-size: 15px">解析：{{ fillBlanksForm.analysis }}</p>
                  <el-divider />
                  <p style="font-size: 15px">
                    知识点：{{ fillBlanksForm.knowledge }}
                  </p>
                  <el-divider />
                  <p style="font-size: 15px">年级：{{ fillBlanksForm.grade }}</p>
                </div>
              </el-card>
              <div style="text-align: center">
                <el-button @click="simpleAuditVisible = false">题目无误</el-button>
                <el-button type="primary" @click="postAudit">题目有误</el-button>
              </div>
            </el-dialog>
          </div>
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
      shortAnswerList: [],
      usingTime: '', // 用时
      auditTitle: '审核题目',
      auditVisible: false,
      fillBlanksAuditVisible: false,
      simpleAuditVisible: false,
      questionForm: {
        id: '1',
        question: '12时30分，钟面上时针与分针所夹的角是（　　）',
        img: '',
        optionA: '80°',
        optionB: '100°',
        optionC: '110°',
        optionD: '165°',
        optionE: '',
        rightOption: 'D',
        detailOption:
          '【解答】解：12点半时，时针指向1和12中间，分针指向6,钟表12个数字，每相邻两个数字之间的夹角为30°，半个格是15°，因此12点半时，分针与时针的夹角正好是30°×5+15°=165°,故应选：D．',
        analysis: '【分析】画出图形，利用钟表表盘的特征解答．',
        knowledge: '时、分、秒及其关系、单位换算与计算,角的概念及其分类',
        grade: 'null@160'
      },
      fillBlanksForm: {
        id: '1',
        question: '12时30分，钟面上时针与分针所夹的角是（　　）',
        img: '',
        rightOption: '165°',
        detailOption:
          '【解答】解：12点半时，时针指向1和12中间，分针指向6,钟表12个数字，每相邻两个数字之间的夹角为30°，半个格是15°，因此12点半时，分针与时针的夹角正好是30°×5+15°=165°,故应选：D．',
        analysis: '【分析】画出图形，利用钟表表盘的特征解答．',
        knowledge: '时、分、秒及其关系、单位换算与计算,角的概念及其分类',
        grade: 'null@160'
      }
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
          id: '1',
          title:
            '宇宙中光的传播速度最快，已知光的速度是每秒3×105km，则在5×10 - 3秒内，光线通过的距离是（　　）',
          optionA: '1500km',
          optionB: '60km',
          optionC: '150km',
          optionD: '600km',
          optionE: '',
          rightOption: 'A'
        },
        {
          id: '2',
          title: '下列计算中正确的是（　　）',
          optionA: '3a+2a=5a2',
          optionB: '2a2•a3=2a6 ',
          optionC: '（2a+b）（2a - b）=2a2 - b2',
          optionD: '（2ab）2=4a2b2',
          optionE: '',
          rightOption: 'B'
        },
        {
          id: '3',
          title: '要使（x+m）（x - 3）的结果中不含x的一次项，则m等于（　　）',
          optionA: '0',
          optionB: '1',
          optionC: '2',
          optionD: '3',
          optionE: '',
          rightOption: 'C'
        }
      ]
      this.radioList = radioData
      const fillBlanksData = [
        {
          id: '4',
          title:
            '如果单项式 - 3x2ayb+1与13xa+2y2b - 3是同类项，那么这两个单项式的积是___________．',
          simpleAnswer: 'aaaaaa简明答案',
          answer: 'aaaaa详细答案'
        },
        {
          id: '5',
          title:
            '请写出两个关于x的二项式，使它们的积仍为二项式，你所编写的二项式为___________，它们的积为___________．',
          simpleAnswer: 'aaaaaa简明答案',
          answer: 'aaaaa详细答案'
        },
        {
          id: '6',
          title: '计算y•5y2•（ - 7y3）=___________.',
          simpleAnswer: 'aaaaaa简明答案',
          answer: 'aaaaa详细答案'
        }
      ]
      this.fillBlanksList = fillBlanksData
      const shortAnswerData = [
        {
          id: '7',
          title:
            '已知有理数a、b、c满足|a﹣1|+（3b+1）2+（c+2）2=0，求（﹣3ab）•（﹣a2c）•6ab的值．',
          simpleAnswer: 'aaaaaa简明答案',
          answer: 'aaaaa详细答案'
        },
        {
          id: '8',
          title: '已知a+b＝1，a（a2+2a）+b（﹣3a+b2）＝0.5，求ab的值．',
          simpleAnswer: 'aaaaaa简明答案',
          answer: 'aaaaa详细答案'
        }
      ]
      this.shortAnswerList = shortAnswerData
    },
    audit(id) {
      this.auditVisible = true
      this.auditTitle = '审核题目(' + id + ')'
      // 获取题目接口
    },
    auditFillBlanks(id) {
      this.fillBlanksAuditVisible = true
      this.auditTitle = '审核题目(' + id + ')'
    },
    auditSimpleAnswer(id) {
      this.simpleAuditVisible = true
      this.auditTitle = '审核题目(' + id + ')'
    },
    postAudit() {
      // 提交审核
      this.auditVisible = false
      this.fillBlanksAuditVisible = false
      this.simpleAuditVisible = false
      // 接口
    }
  }
}
</script>

<style lang="scss">
.falseOption {
  color: black;
}
.trueOption {
  color: brown;
}
</style>
