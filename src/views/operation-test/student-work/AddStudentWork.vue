<template>
  <div style="padding: 30px">
    <div>
      <el-divider content-position="left">
        <p style="color: #004b97; font-size: 18px">基本信息</p>
      </el-divider>
      <div style="margin-left: 40px">
        <p style="display: inline">
          作业名称：
          <el-input
            v-model="studentWorkForm.workName"
            placeholder="请输入内容"
            style="width: 300px"
          />
        </p>
        <p style="display: inline">
          选择班级：
          <el-select
            v-model="studentWorkForm.className"
            style="width: 300px"
            multiple
            filterable
            placeholder="请选择班级"
          >
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </p>
        <p style="display: inline">
          选择学生：
          <el-select
            v-model="studentWorkForm.studentName"
            style="width: 300px"
            multiple
            filterable
            placeholder="请选择学生"
          >
            <el-option
              v-for="item in studentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </p>
      </div>
    </div>
    <div style="margin-top: 40px;">
      <el-divider content-position="left">
        <p style="color: #004b97; font-size: 18px">有效日期</p>
      </el-divider>
      <div style="margin-left: 40px">
        <p style="display: inline">
          时间：
          <el-date-picker
            v-model="studentWorkForm.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </p>
      </div>
    </div>
    <div style="margin-top: 40px;">
      <el-divider content-position="left">
        <p style="color: #004b97; font-size: 18px">作业内容</p>
      </el-divider>
      <div style="margin-left: 40px">
        <p style="display: inline">
          选择版本：
          <el-select
            v-model="studentWorkForm.version"
            clearable
            filterable
            style="width: 300px"
            placeholder="请选择版本"
          >
            <el-option
              v-for="item in versionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </p>
        <p style="display: inline">
          选择年级：
          <el-select
            v-model="studentWorkForm.grade"
            clearable
            filterable
            style="width: 300px"
            placeholder="请选择年级"
          >
            <el-option
              v-for="item in gradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </p>
        <p>
          考察知识列表：
          <el-radio-group v-model="studentWorkForm.testType" @change="changeTestType">
            <el-radio
              label="1"
            >通过章节目录选择</el-radio>
            <el-radio
              label="2"
            >通过知识点结构选择</el-radio>
          </el-radio-group>
        </p>
        <p v-if="studentWorkForm.testType == '1'">
          选择章节目录：
          <el-select
            v-model="studentWorkForm.chapterDirectory"
            style="width: 300px"
            multiple
            filterable
            placeholder="请选择章节目录"
          >
            <el-option
              v-for="item in chapterDirectoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          <el-button type="primary" @click="showChapterTable">确认</el-button>
        </p>
        <p v-else-if="studentWorkForm.testType == '2'">
          选择知识点结构：
          <el-select
            v-model="studentWorkForm.knowledgeStructure"
            style="width: 300px"
            multiple
            filterable
            placeholder="请选择知识点结构"
          >
            <el-option
              v-for="item in knowledgeStructureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          <el-button type="primary" @click="showKnowledgeTable">确认</el-button>
        </p>
        <div
          v-if="
            studentWorkForm.knowledgeStructure.length != '0' &&
              tableVisible == true
          "
        >
          <el-table
            :data="studentWorkForm.testContent"
            stripe
            style="width: 100%"
          >
            <el-table-column prop="testName" label="知识点" width="300" />
            <el-table-column prop="testNum" label="题数" width="180">
              <template slot-scope="scope">
                <el-input v-model="studentWorkForm.testContent[scope.$index].testNum" placeholder="请输入内容" clearable />
              </template>
            </el-table-column>
          </el-table>
          <!--测试按钮
          <el-button @click="test">测试</el-button>-->
        </div>
        <div
          v-else-if="
            studentWorkForm.chapterDirectory.length != '0' &&
              tableVisible == true
          "
        >
          <el-table
            :data="studentWorkForm.testContent"
            stripe
            style="width: 100%"
          >
            <el-table-column prop="testName" label="章节" width="300" />
            <el-table-column prop="testNum" label="题数" width="180">
              <template slot-scope="scope">
                <el-input v-model="studentWorkForm.testContent[scope.$index].testNum" placeholder="请输入内容" clearable />
              </template>
            </el-table-column>
          </el-table>
          <!--测试按钮
          <el-button @click="test">测试</el-button>-->
        </div>
      </div>
    </div>
    <div style="margin-top: 40px;">
      <el-divider content-position="left">
        <p style="color: #004b97; font-size: 18px">其他信息</p>
      </el-divider>
      <div style="margin-left: 40px">
        <p style="display: inline">
          备注：
          <el-input
            v-model="studentWorkForm.note"
            type="textarea"
            :autosize="{ minRows: 4 }"
            placeholder="请输入内容"
            style="width: 500px"
          />
        </p>
      </div>
    </div>
    <div style="margin-top: 20px;text-align: center;">
      <el-button type="primary" @click="postStudentWork">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableVisible: false,
      studentWorkForm: {
        workName: '',
        studentName: [],
        className: [],
        time: '',
        version: '',
        grade: '',
        note: '',
        testType: '', // 1是通过章节目录选择，2是通过知识点结构选择
        chapterDirectory: [], // 章节目录
        testContent: [], // 章节目录+题目数
        knowledgeStructure: [] // 知识点结构
      },
      studentOptions: [
        {
          value: '1',
          label: '测试学生1'
        },
        {
          value: '2',
          label: '测试学生2'
        },
        {
          value: '3',
          label: '测试学生3'
        },
        {
          value: '4',
          label: '测试学生4'
        },
        {
          value: '5',
          label: '测试学生5'
        }
      ],
      classOptions: [],
      versionOptions: [],
      gradeOptions: [],
      chapterDirectoryOptions: [],
      knowledgeStructureOptions: []
    }
  },
  mounted() {
    // 发起查询请求
    this.getClassOptionsData()
    this.getVersionOptionsData()
    this.getGradeOptionsData()
    this.getChapterDirectoryOptionsData()
    this.getKnowledgeStructureOptionsData()
  },
  methods: {
    getClassOptionsData() {
      const data = [
        {
          value: '1',
          label: '高一辅导01班'
        },
        {
          value: '2',
          label: '初一晚辅01班'
        },
        {
          value: '3',
          label: '初二晚辅01班'
        },
        {
          value: '4',
          label: '初一托管01班'
        },
        {
          value: '5',
          label: '数据待接口补充'
        }
      ]
      this.classOptions = data
      // 重新获取学生列表
    },
    getVersionOptionsData() {
      // 模拟后台数据
      const data = [
        {
          value: '1',
          label: '上海版'
        },
        {
          value: '2',
          label: '人教版'
        },
        {
          value: '3',
          label: '人教A版'
        },
        {
          value: '4',
          label: '人教B版'
        },
        {
          value: '5',
          label: '北师大版'
        }
      ]
      this.versionOptions = data
    },
    getGradeOptionsData() {
      const data = [
        {
          value: '1',
          label: '一年级上'
        },
        {
          value: '2',
          label: '二年级上'
        },
        {
          value: '3',
          label: '三年级上'
        },
        {
          value: '4',
          label: '四年级上'
        },
        {
          value: '5',
          label: '五年级上'
        }
      ]
      this.gradeOptions = data
    },
    getChapterDirectoryOptionsData() {
      const data = [
        {
          value: '1',
          label: '整数加法和减法'
        },
        {
          value: '2',
          label: '进位加法'
        },
        {
          value: '3',
          label: '退位减法'
        },
        {
          value: '4',
          label: '加法和减法的关系'
        },
        {
          value: '5',
          label: '表内乘法'
        }
      ]
      this.chapterDirectoryOptions = data
    },
    getKnowledgeStructureOptionsData() {
      const data = [
        {
          value: '1',
          label: '解直角三角形的应用-坡度坡角的问题'
        },
        {
          value: '2',
          label: '解直角三角形的应用-仰角俯角的问题'
        },
        {
          value: '3',
          label: '解直角三角形的应用-方向角的问题'
        },
        {
          value: '4',
          label: '解直角三角形的应用'
        },
        {
          value: '5',
          label: '测试数据待连接口补充'
        }
      ]
      this.knowledgeStructureOptions = data
    },
    showChapterTable() {
      const data = []
      for (var i = 0; i < this.studentWorkForm.chapterDirectory.length; i++) {
        data.push({
          testName: this.studentWorkForm.chapterDirectory[i],
          testNum: 0
        })
      }
      this.studentWorkForm.testContent = data
      this.tableVisible = true
    },
    showKnowledgeTable() {
      const data = []
      for (var i = 0; i < this.studentWorkForm.knowledgeStructure.length; i++) {
        data.push({
          testName: this.studentWorkForm.knowledgeStructure[i],
          testNum: 0
        })
      }
      this.studentWorkForm.testContent = data
      this.tableVisible = true
    },
    changeTestType() {
      this.tableVisible = false
    },
    postStudentWork() {
      // 保存，看情况加数据校验
      // 连post信息的接口
    },
    test() {
      console.log(this.studentWorkForm.testContent)
      console.log(this.tableVisible)
    }
  }
}
</script>

<style lang="scss">
</style>
