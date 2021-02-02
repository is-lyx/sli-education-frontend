<template>
  <div style="padding:30px;">
    <PageTable
      ref="dataTable"
      :data="tableData"
      :page-sizes="[5,10]"
      :page-size="5"

      :paging="true"
      :dynamic-column-setting="true"
      :column-visibles="columnVisibles"
      :hiden-column-indexs="[0,1,2]"

      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column v-if="columnVisibles[0]" label="试卷名称" prop="testName" />
      <el-table-column v-if="columnVisibles[1]" label="试卷ID" prop="testID" />
      <el-table-column v-if="columnVisibles[2]" label="知识点ID" prop="knowledgeID" />
      <el-table-column v-if="columnVisibles[3]" label="一级知识点" prop="knowledge1" />
      <el-table-column v-if="columnVisibles[4]" label="二级知识点" prop="knowledge2" />
      <el-table-column v-if="columnVisibles[5]" label="三级知识点" prop="knowledge3" />
      <el-table-column v-if="columnVisibles[6]" label="题量" prop="amountOfTheQuestions" />
      <el-table-column v-if="columnVisibles[7]" label="答对" prop="isTrue" />
      <el-table-column v-if="columnVisibles[8]" label="答错" prop="isFalse" />
      <el-table-column v-if="columnVisibles[9]" label="平均难度" prop="avgDifference" />
      <el-table-column v-if="columnVisibles[10]" label="准确率" prop="accuracy" />
    </PageTable>

    <!--组合自测卷内容-->
    <el-card style="margin: 15px 15px;">
      <h2 align="center">组合自测卷</h2>
      <h4 style="text-align: center; font-size: 18px;">学生：{{ name }}</h4>
      <el-card
        v-for="(item, index) in testList"
        :key="index"
        style="margin: 20px 100px;"
      >
        <div>
          <h4 style="text-align: left; font-size: 18px;">{{ item.id }}</h4>
          <p style="font-size: 15px;">
            {{ item.question }}
          </p>
          <div>
            <el-image
              v-if="item.img !== null"
              style="width: 60px; height: 60px;"
              :src="item.img"
            />
            <img
              v-else
              src="../../../assets/404_images/404.png"
              style="width: 60px; height: 60px;"
            >
          </div>
          <p v-if="item.optionA !== ''" style="font-size: 15px;">
            A.{{ item.optionA }}
          </p>
          <p v-if="item.optionB !== ''" style="font-size: 15px;">
            B.{{ item.optionB }}
          </p>
          <p v-if="item.optionC !== ''" style="font-size: 15px;">
            C.{{ item.optionC }}
          </p>
          <p v-if="item.optionD !== ''" style="font-size: 15px;">
            D.{{ item.optionD }}
          </p>
          <p v-if="item.optionE !== ''" style="font-size: 15px;">
            E.{{ item.optionE }}
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            学生答案：{{ item.studentOption }}
          </p>
          <el-button
            type="primary"
            @click="audit(item.question)"
          >纠错</el-button>

          <el-dialog
            title="审核题目"
            :visible.sync="auditDialogVisible"
            width="50%"
            center
          >
            <span>
              <p style="float:left;color:#B22222;">题目：</p>
              <p>{{ dialogQuestion }}</p>
              <div style="text-align:center">
                <el-button
                  type="primary"
                  @click="questionFalse(item.id)"
                >题目有误</el-button>
                <el-button
                  @click="auditDialogVisible = false"
                >题目无误</el-button>
              </div>
            </span>
          </el-dialog>

        </div>
      </el-card>
    </el-card>
  </div>
</template>

<style scoped>
.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

<script>
import PageTable from '../../PageTable.vue'

export default {
  components: {
    PageTable // 引用表格组件
  },
  data() {
    return {
      name: this.$route.query.name,
      columnVisibles: new Array(11).fill(true),
      auditDialogVisible: false,
      total: 0,
      tableData: [],
      testList: [],
      form: {
        state: '',
        creationTime: ''
      },
      dialogQuestion: '',
      dialogOptionA: '',
      dialogOptionB: '',
      dialogOptionC: '',
      dialogOptionD: '',
      dialogOptionE: ''
    }
  },
  mounted() {
    // 发起查询请求
    this.getQueryData()
    this.getTestData()
  },
  methods: {
    getQueryData() {
      // 模拟后台数据
      const data = [
        {
          testName: '组合自测卷',
          testID: '100',
          knowledgeID: '123',
          knowledge1: '数与式',
          knowledge2: '有理数',
          knowledge3: '有理数',
          amountOfTheQuestions: '25',
          isTrue: '20',
          isFalse: '5',
          avgDifference: '1.24',
          accuracy: '0.80'
        },
        {
          testName: '组合自测卷',
          testID: '100',
          knowledgeID: '123',
          knowledge1: '数与式',
          knowledge2: '有理数',
          knowledge3: '有理数',
          amountOfTheQuestions: '25',
          isTrue: '20',
          isFalse: '5',
          avgDifference: '1.24',
          accuracy: '0.80'
        },
        {
          testName: '组合自测卷',
          testID: '100',
          knowledgeID: '123',
          knowledge1: '数与式',
          knowledge2: '有理数',
          knowledge3: '有理数',
          amountOfTheQuestions: '25',
          isTrue: '20',
          isFalse: '5',
          avgDifference: '1.24',
          accuracy: '0.80'
        },
        {
          testName: '组合自测卷',
          testID: '100',
          knowledgeID: '123',
          knowledge1: '数与式',
          knowledge2: '有理数',
          knowledge3: '有理数',
          amountOfTheQuestions: '25',
          isTrue: '20',
          isFalse: '5',
          avgDifference: '1.24',
          accuracy: '0.80'
        }]
      this.tableData = data
    },
    getTestData() {
      const data = [
        {
          id: '1',
          question: '计算如图平行四边形的面积，正确算式是（　　）',
          img: '',
          optionA: '4.8×6',
          optionB: '10×8',
          optionC: '6×8',
          optionD: '',
          optionE: '',
          studentOption: 'A'
        },
        {
          id: '2',
          question: '把一个由木条钉成的长方形捏住对角，拉成一个平行四边形，那么这两个图形的（　　）',
          img: '',
          optionA: '面积相等，周长也相等',
          optionB: '面积不相等，周长也不相等',
          optionC: '面积相等，周长不相等',
          optionD: '面积不相等，周长相等',
          optionE: '',
          studentOption: 'B'
        },
        {
          id: '3',
          question: '如图中，长方形的面积是12平方厘米，那么，阴影部分的面积是（　　）平方厘米．',
          img: '',
          optionA: '24',
          optionB: '12',
          optionC: '6',
          optionD: '',
          optionE: '',
          studentOption: 'C'
        },
        {
          id: '4',
          question: '圆形滑冰场的一周全长是200米．沿着这一圈每隔10米安装一盏灯，一共要安（　　）盏灯．',
          img: '',
          optionA: '19',
          optionB: '20',
          optionC: '21',
          optionD: '22',
          optionE: '',
          studentOption: 'D'
        }]
      this.testList = data
    },
    findListData() {
      this.getLearningListData()
    },
    getLearningListData() {
      // 获取列表
    },
    audit(question) {
      this.auditDialogVisible = true
      this.dialogQuestion = question
      // 调用接口，根据题目id获取对应的详细答案，展示question仅为测试
    },
    questionFalse(id) {
      console.log('id:' + id)
    }
  }
}
</script>

