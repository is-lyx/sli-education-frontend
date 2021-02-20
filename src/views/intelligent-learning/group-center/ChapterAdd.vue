<template>
  <div style="padding: 30px">
    <el-card shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          size="small"
          @click="findChapterListData"
        >查询</el-button>
        <el-button
          style="float: right; margin-right: 15px"
          size="small"
          @click="handleResetSearch"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="form" size="small" label-width="140px">
          <div style="text-align: center">
            <el-form-item label="版本：">
              <el-select
                v-model="form.version"
                placeholder="请选择版本"
                clearable
                style="width: 203px"
                @change="findChapterListData"
              >
                <el-option
                  v-for="item in versionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="年级：">
              <el-select
                v-model="form.grade"
                placeholder="请选择年级"
                clearable
                style="width: 203px"
                @change="findChapterListData"
              >
                <el-option
                  v-for="item in gradeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="题型：">
              <el-select
                v-model="form.type"
                placeholder="请选择题型"
                clearable
                style="width: 203px"
                @change="findChapterListData"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="难度：">
              <el-select
                v-model="form.difficulty"
                placeholder="请选择难度"
                clearable
                style="width: 203px"
                @change="findChapterListData"
              >
                <el-option
                  v-for="item in difficultyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="已选题量：">
              <el-input v-model="questionNum" :disabled="true">
                <template slot="append">/40</template>
              </el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <el-row :gutter="25">
      <el-col :span="9">
        <el-card style="margin-top: 20px">
          <el-input v-model="filterText" placeholder="输入关键字进行过滤" />
          <el-tree
            ref="tree"
            class="filter-tree"
            :data="chapterOptions"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="showQuestionList"
          />
          <!--
          <div style="text-align: center">
            <el-button type="primary" size="small" @click="showQuestionList"
              >搜索题库</el-button
            >
          </div>-->
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card style="margin-top: 20px">
          <div v-for="(item, index) in questionList" :key="index">
            <p>{{ index+1 }} . {{ item.question }}</p>
            <div>
              <p style="display: inline;">简明答案:</p>
              <p style="color:#2E8B57;display: inline;">{{ item.simpleAnswer }}</p>
            </div>
            <div>
              <p style="display: inline;">详细答案:</p>
              <p style="color:#2E8B57;display: inline;">{{ item.answer }}</p>
            </div>
            <div>
              <p style="display: inline;">解析:</p>
              <p style="color:#2E8B57;display: inline;">{{ item.parsing }}</p>
            </div>
            <el-button
              v-if="questionList[index].isAdd == false"
              type="primary"
              size="small"
              @click="addQuestion(index)"
            >添加试题</el-button>
            <el-button
              v-else
              type="info"
              size="small"
              @click="deleteQuestion(index)"
            >取消添加</el-button>
            <el-divider />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        version: '',
        grade: '',
        type: '',
        difficulty: ''
      },
      versionOptions: [],
      gradeOptions: [],
      typeOptions: [],
      difficultyOptions: [],
      questionNum: 0,
      chapterOptions: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
      questionList: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    // 发起查询请求
    this.getVersionListData()
    this.getGradeListData()
    this.getTypeListData()
    this.getDifficultyListData()
    this.getChapterListData()
  },
  methods: {
    filterNode(value, chapterOptions) {
      if (!value) return true
      return chapterOptions.label.indexOf(value) !== -1
    },
    getVersionListData() {
      // 模拟后台数据
      const data = [
        {
          value: '1',
          label: '上海版'
        },
        {
          value: '2',
          label: '人教A版'
        },
        {
          value: '3',
          label: '人教B版'
        },
        {
          value: '4',
          label: '人教新版'
        },
        {
          value: '5',
          label: '北师大版'
        }
      ]
      this.versionOptions = data
    },
    getGradeListData() {
      //
      const data = [
        {
          value: '1',
          label: '三年级上'
        },
        {
          value: '2',
          label: '三年级下'
        },
        {
          value: '3',
          label: '四年级上'
        },
        {
          value: '4',
          label: '四年级下'
        },
        {
          value: '5',
          label: '五年级上'
        }
      ]
      this.gradeOptions = data
    },
    getTypeListData() {
      //
      const data = [
        {
          value: '1',
          label: '不限制题型'
        },
        {
          value: '2',
          label: '单选题'
        },
        {
          value: '3',
          label: '填空题'
        },
        {
          value: '4',
          label: '简答题'
        }
      ]
      this.typeOptions = data
    },
    getDifficultyListData() {
      //
      const data = [
        {
          value: '1',
          label: '随机'
        },
        {
          value: '2',
          label: '简单'
        },
        {
          value: '3',
          label: '较简单'
        },
        {
          value: '4',
          label: '中等'
        },
        {
          value: '5',
          label: '较困难'
        },
        {
          value: '6',
          label: '困难'
        }
      ]
      this.difficultyOptions = data
    },
    findChapterListData() {
      // 搜索
    },
    getChapterListData() {
      // id就是order，label就是name
      const data = [
        {
          id: '1',
          label: '一、复习与提高',
          children: [
            {
              id: '4',
              label: '小复习',
              children: [
                {
                  id: '11',
                  label: '测试'
                }
              ]
            }
          ]
        },
        {
          id: '2',
          label: '二、用一位数乘',
          children: [
            {
              id: '5',
              label: '乘整十数、整百数'
            },
            {
              id: '6',
              label: '看图列式'
            },
            {
              id: '7',
              label: '一位数与两位数相乘'
            },
            {
              id: '8',
              label: '一位数与三位数相乘'
            }
          ]
        },
        {
          id: '3',
          label: '三、时间的初步认识',
          children: [
            {
              id: '9',
              label: '年、月、日'
            },
            {
              id: '10',
              label: '平年与闰年'
            }
          ]
        }
      ]
      this.chapterOptions = data
    },
    handleResetSearch() {
      this.form.version = ''
      this.form.grade = ''
      this.form.type = ''
      this.form.difficulty = ''
    },
    showQuestionList(chapterOptions) {
      // node获取
      // console.log(this.$refs.tree.getCheckedNodes());
      // key获取
      // console.log(this.$refs.tree.getCheckedKeys());
      console.log(chapterOptions)
      // 模拟后台数据
      const data = [
        {
          question: 'a和b表示两个不同的自然数，分解质因数a=2×5×c，b=3×5×c，如果a和b的最小公倍数是60，那么c等于．',
          simpleAnswer: '2',
          answer: '【解答】解：分解质因数a=2×5×c，b=3×5×c，所以2×3×5×c=60，则C=2．答：c等于2．故答案为：2．',
          parsing: '【分析】利用求最小公倍数的方法：几个数的公有因数与独有因数的连乘积；由此可以解决问题．',
          isAdd: false
        },
        {
          question: '一个数的最小倍数是56，那么这个数的最大因数是，把这个数分解质因数是．',
          simpleAnswer: '56  56=2×2×2×7',
          answer: '【解答】解：一个数的最大因数和最小倍数都是它本身”，得出这个数的最大因数是56，56=2×2×2×7．故答案为：56，56=2×2×2×7．',
          parsing: '【分析】根据“一个数的最大因数和最小倍数都是它本身”，得出这个数的最大因数是56，再把56写成几个质数相乘的形式．',
          isAdd: false
        }
      ]
      this.questionList = data
    },
    addQuestion(index) {
      // 添加试题
      this.questionNum += 1
      this.questionList[index].isAdd = true
    },
    deleteQuestion(index) {
      this.questionList[index].isAdd = false
      this.questionNum -= 1
    }
  }
}
</script>

<style lang="scss">
</style>

