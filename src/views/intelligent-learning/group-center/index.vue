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
          @click="findTestListData"
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
            <el-form-item label="标题：">
              <el-input
                v-model="form.title"
                style="width: 203px"
                placeholder="请输入标题"
                @keyup.enter.native="findTestListData"
              />
            </el-form-item>
            <el-form-item label="年级：">
              <el-select
                v-model="form.grade"
                placeholder="请选择年级"
                clearable
                style="width: 203px"
                @change="findTestListData"
              >
                <el-option label="全部" value="0" />
                <el-option label="一年级上" value="1" />
                <el-option label="一年级下" value="2" />
                <el-option label="二年级上" value="3" />
                <el-option label="二年级下" value="4" />
                <el-option label="三年级上" value="5" />
                <el-option label="三年级下" value="6" />
                <el-option label="四年级上" value="7" />
                <el-option label="四年级下" value="8" />
                <el-option label="五年级上" value="9" />
                <el-option label="五年级下" value="10" />
                <el-option label="六年级上" value="11" />
                <el-option label="六年级下" value="12" />
                <el-option label="七年级上" value="13" />
                <el-option label="七年级下" value="14" />
                <el-option label="八年级上" value="15" />
                <el-option label="八年级下" value="16" />
                <el-option label="九年级上" value="17" />
                <el-option label="九年级下" value="18" />
                <el-option label="高一上" value="19" />
                <el-option label="高一下" value="20" />
                <el-option label="高二上" value="21" />
                <el-option label="高二下" value="22" />
                <el-option label="高三上" value="23" />
                <el-option label="高三下" value="24" />
                <el-option label="必修1" value="25" />
                <el-option label="必修2" value="26" />
                <el-option label="必修3" value="27" />
                <el-option label="必修4" value="28" />
                <el-option label="必修5" value="29" />
                <el-option label="选修1" value="30" />
                <el-option label="选修1-1" value="31" />
                <el-option label="选修1-2" value="32" />
                <el-option label="选修2" value="33" />
                <el-option label="选修2-1" value="34" />
                <el-option label="选修2-2" value="35" />
                <el-option label="选修2-3" value="36" />
                <el-option label="选修3" value="37" />
                <el-option label="选修3-1" value="38" />
                <el-option label="选修3-2" value="39" />
                <el-option label="选修3-3" value="40" />
                <el-option label="选修3-4" value="41" />
                <el-option label="选修3-5" value="42" />
                <el-option label="选修4" value="43" />
                <el-option label="选修4-1" value="44" />
                <el-option label="选修4-2" value="45" />
                <el-option label="选修4-3" value="46" />
                <el-option label="选修4-4" value="47" />
                <el-option label="选修4-5" value="48" />
                <el-option label="选修4-6" value="49" />
                <el-option label="选修4-7" value="50" />
                <el-option label="选修5" value="51" />
                <el-option label="选修6" value="52" />
                <el-option label="选修7" value="53" />
                <el-option label="选修8" value="54" />
                <el-option label="选修" value="55" />
              </el-select>
            </el-form-item>
            <el-form-item label="版本：">
              <el-select
                v-model="form.version"
                placeholder="请选择版本"
                clearable
                style="width: 203px"
                @change="findTestListData"
              >
                <el-option label="全部" value="0" />
                <el-option label="人教A版" value="1" />
                <el-option label="人教B版" value="2" />
                <el-option label="北师大新版" value="3" />
                <el-option label="苏教新版" value="4" />
                <el-option label="湘教版" value="5" />
                <el-option label="人教新版" value="6" />
                <el-option label="浙教新版" value="7" />
                <el-option label="北京课改新版" value="8" />
                <el-option label="沪教版" value="9" />
                <el-option label="沪科版" value="10" />
                <el-option label="冀教新版" value="11" />
                <el-option label="鲁教五四版" value="12" />
                <el-option label="青岛版" value="13" />
                <el-option label="苏科版" value="14" />
                <el-option label="西师新版" value="15" />
                <el-option label="华师大版" value="16" />
                <el-option label="沪教新版" value="17" />
                <el-option label="青岛五四制新" value="18" />
                <el-option label="青岛版六三制新" value="19" />
                <el-option label="河北版" value="20" />
                <el-option label="上海版" value="21" />
                <el-option label="北京版" value="22" />
                <el-option label="人教版" value="23" />
                <el-option label="北师大版" value="24" />
                <el-option label="苏教版" value="25" />
                <el-option label="浙教版" value="26" />
                <el-option label="冀教版" value="27" />
                <el-option label="青岛版五四制" value="28" />
                <el-option label="青岛版六三制" value="29" />
                <el-option label="西师版" value="30" />
                <el-option label="华师大新版" value="31" />
                <el-option label="苏科新版" value="32" />
                <el-option label="湘教新版" value="33" />
                <el-option label="青岛新版" value="34" />
                <el-option label="沪科新版" value="35" />
                <el-option label="鲁教五四新版" value="36" />
                <el-option label="人教五四新版" value="37" />
                <el-option label="北京课改版" value="38" />
                <el-option label="人教五四版" value="39" />
                <el-option label="人教A版（2019）" value="40" />
                <el-option label="人教B版（2019）" value="41" />
                <el-option label="大纲版" value="42" />
                <el-option label="人教新版（改）" value="43" />
                <el-option label="北师大新版（改）" value="44" />
                <el-option label="苏教新版（改）" value="45" />
                <el-option label="华师大新版（改）" value="46" />
                <el-option label="苏科新版（改）" value="47" />
                <el-option label="湘教新版（改）" value="48" />
                <el-option label="青岛新版（改）" value="49" />
                <el-option label="浙教新版（改）" value="50" />
                <el-option label="冀教新版（改）" value="51" />
                <el-option label="沪科新版（改）" value="52" />
                <el-option label="鲁教五四新版（改）" value="53" />
                <el-option label="北京课改新版（改）" value="54" />
                <el-option label="沪教新版（改）" value="55" />
                <el-option label="西师新版（改）" value="56" />
                <el-option label="高教版中职数学（基础模块）上册" value="57" />
                <el-option label="高教版中职数学（基础模块）下册" value="58" />
                <el-option label="高教版中职数学（拓展模块）" value="59" />
              </el-select>
            </el-form-item>
            <el-form-item label="试卷类型：">
              <el-select
                v-model="form.testType"
                placeholder="请选择试卷类型"
                clearable
                style="width: 203px"
                @change="findTestListData"
              >
                <el-option label="全部" value="0" />
                <el-option label="小升初" value="1" />
                <el-option label="中考" value="2" />
                <el-option label="高考" value="3" />
                <el-option label="竞赛" value="4" />
                <el-option label="期中" value="5" />
                <el-option label="期末" value="6" />
                <el-option label="月考" value="7" />
                <el-option label="单元测试" value="8" />
                <el-option label="同步练习" value="9" />
              </el-select>
            </el-form-item>
            <el-form-item label="年份：">
              <el-input
                v-model="form.year"
                style="width: 203px"
                placeholder="请输入年份"
                @keyup.enter.native="findTestListData"
              />
            </el-form-item>
            <el-form-item label="地区：">
              <el-input
                v-model="form.area"
                style="width: 203px"
                placeholder="请输入地区"
                @keyup.enter.native="findTestListData"
              />
            </el-form-item>
            <el-form-item label="创建时间：">
              <el-date-picker
                v-model="form.creationTime"
                type="daterange"
                style="width: 203px"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item label="搜索范围：">
              <el-select
                v-model="form.searchScope"
                placeholder="请选择范围"
                clearable
                style="width: 203px"
                @change="findTestListData"
              >
                <el-option label="全部" value="0" />
                <el-option label="我创建的" value="1" />
                <el-option label="本校老师创建的" value="2" />
                <el-option label="其他学校老师创建的" value="3" />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <div style="margin-top: 10px">
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-plus"
        plain
        @click="chapterAdd"
      >章节挑题</el-button>
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-plus"
        plain
        @click="knowledgeAdd"
      >知识点挑题</el-button>
    </div>

    <PageTable
      ref="dataTable"
      :data="tableData"
      :page-sizes="[5, 10]"
      :page-size="5"
      :paging="true"
      :dynamic-column-setting="true"
      :column-visibles="columnVisibles"
      :default-sort="{ prop: 'referenceNumber', order: 'descending' }"
      :hiden-column-indexs="[0, 9, 10]"
      :always-show-column-indexs="[1]"
      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column v-if="columnVisibles[0]" label="组卷ID" prop="id" />
      <el-table-column v-if="columnVisibles[1]" label="标题" prop="title" />
      <el-table-column v-if="columnVisibles[2]" label="版本" prop="version" />
      <el-table-column v-if="columnVisibles[3]" label="年级" prop="grade" />
      <el-table-column
        v-if="columnVisibles[4]"
        label="试卷类型"
        prop="testType"
      />
      <el-table-column
        v-if="columnVisibles[5]"
        label="难度"
        prop="difficulty"
      />
      <el-table-column v-if="columnVisibles[6]" label="年份" prop="year" />
      <el-table-column v-if="columnVisibles[7]" label="地区" prop="area" />
      <el-table-column
        v-if="columnVisibles[8]"
        label="被引用次数"
        sortable
        prop="referenceNumber"
      />
      <el-table-column
        v-if="columnVisibles[9]"
        label="上次被引用时间"
        prop="lastReferenceTime"
      />
      <el-table-column
        v-if="columnVisibles[10]"
        label="包含题型"
        prop="containType"
      />
      <el-table-column
        v-if="columnVisibles[11]"
        label="创建时间"
        prop="creationTime"
      />
      <el-table-column v-if="columnVisibles[14]" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="preview(scope.row.id, scope.row.title)"
          >预览</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="distribution(scope.row.id, scope.row.title)"
          >分发</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteWork(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </PageTable>
    <!--预览-->
    <el-dialog
      custom-class="customWidth"
      title="试题预览"
      :visible.sync="testVisible"
    >
      <el-card style="margin: 10px">
        <div>
          <h4 style="text-align: center; font-size: 18px">{{ testTitle }}</h4>
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
          </div>
          <h5 style="text-align: left; font-size: 15px">二、填空题</h5>
          <div
            v-for="(item, index) in fillBlanksList"
            :key="index"
            style="margin-bottom: 30px"
          >
            <p>{{ index + 1 }} . {{ item.title }}</p>
          </div>
          <h5 style="text-align: left; font-size: 15px">三、简答题</h5>
          <div
            v-for="(item, index) in shortAnswerList"
            :key="index"
            style="margin-bottom: 100px"
          >
            <p>{{ index + 1 }} . {{ item.title }}</p>
          </div>
        </div>
      </el-card>
      <div style="text-align: center">
        <el-button type="primary" @click="testVisible = false">确定</el-button>
      </div>
    </el-dialog>
    <!--分发-->
    <el-dialog
      custom-class="customWidth"
      title="试题分发"
      :visible.sync="distributionVisible"
    >
      <el-card shadow="never">
        <div>
          <i class="el-icon-search" />
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            type="primary"
            size="small"
            @click="findStudentListData"
          >查询</el-button>
          <el-button
            style="float: right; margin-right: 15px"
            size="small"
            @click="handleStudentResetSearch"
          >重置</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form
            :inline="true"
            :model="studentForm"
            size="small"
            label-width="140px"
          >
            <div style="text-align: center">
              <el-form-item label="账号：">
                <el-input
                  v-model="studentForm.id"
                  style="width: 203px"
                  placeholder="请输入账号"
                  @keyup.enter.native="findStudentListData"
                />
              </el-form-item>
              <el-form-item label="姓名：">
                <el-input
                  v-model="studentForm.name"
                  style="width: 203px"
                  placeholder="请输入姓名"
                  @keyup.enter.native="findStudentListData"
                />
              </el-form-item>
              <el-form-item label="手机号：">
                <el-input
                  v-model="studentForm.phone"
                  style="width: 203px"
                  placeholder="请输入老师姓名"
                  @keyup.enter.native="findStudentListData"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
      <div>
        <el-divider content-position="left">分发的试卷</el-divider>
        <h4 style="text-align: center; font-size: 15px">{{ testTitle }}</h4>
      </div>
      <div>
        <el-divider content-position="left">分发信息</el-divider>
        <div style="margin-left: 30px; margin-bottom: 20px">
          <p style="display: inline">分发模块：</p>
          <el-radio v-model="distributionType" label="1">单元作业</el-radio>
          <el-radio v-model="distributionType" label="2">试卷考试</el-radio>
        </div>
      </div>
      <el-table
        :data="studentListData"
        stripe
        @selection-change="selectionLineChangeHandle"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="id" label="账号" />
        <el-table-column property="name" label="姓名" />
        <el-table-column property="phone" label="手机号" />
        <el-table-column property="class" label="班级" />
        <el-table-column property="teacher" label="老师" />
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="margin: 25px 15px; text-align: center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <div style="text-align: center; margin-top: 20px;">
        <el-button
          type="primary"
          @click="distributionVisible = false"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入表格组件
import PageTable from '../../PageTable.vue'

export default {
  components: {
    PageTable // 引用表格组件
  },
  data() {
    return {
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      testVisible: false,
      distributionVisible: false,
      distributionType: '', // 分发模块
      studentListData: [],
      addStudentList: [],
      dataonLineListSelections: [],
      tableData: [],
      form: {
        title: '',
        grade: '',
        version: '',
        testType: '',
        year: '',
        area: '',
        creationTime: '',
        searchScope: ''
      },
      studentForm: {
        id: '',
        name: '',
        phone: ''
      },
      testTitle: '',
      columnVisibles: new Array(15).fill(true),
      radioList: [],
      fillBlanksList: [],
      shortAnswerList: []
    }
  },
  mounted() {
    // 发起查询请求
    this.queryData()
    this.findStudentListData()
  },
  methods: {
    queryData() {
      // 模拟后台数据
      const data = []
      for (var i = 1; i <= 23; i++) {
        data.push({
          id: i,
          title: i,
          version: i,
          grade: i,
          testType: i,
          difficulty: i,
          year: i,
          area: i,
          referenceNumber: i,
          lastReferenceTime: i,
          containType: i,
          creationTime: i
        })
      }
      this.tableData = data
    },
    preview(id, title) {
      // 预览
      this.testTitle = title
      this.testVisible = true
      this.getTest(id)
    },
    getTest(id) {
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
    },
    distribution(id, title) {
      // 分发
      this.distributionVisible = true
      this.testTitle = title
      this.findStudentListData()
    },
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.findStudentListData()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.findStudentListData()
    },
    findStudentListData() {
      // 模拟后台数据
      const data = [{
        id: 'qz70019553',
        name: '张宇杰',
        phone: '-',
        class: '初一晚辅01班',
        teacher: '雷老师'
      }, {
        id: 'qz80013232',
        name: '吴德福',
        phone: '-',
        class: '初一晚辅01班',
        teacher: '雷老师'
      }, {
        id: 'qz40035187',
        name: '郑泺泺',
        phone: '-',
        class: '小学高年级托管班',
        teacher: '蒋启文'
      }]
      this.studentListData = data
      console.log(this.studentListData)
    },
    selectionLineChangeHandle(val) {
      this.dataonLineListSelections = val
      for (var i = 0; i < this.dataonLineListSelections.length; i++) {
        this.addStudentList[i] = this.dataonLineListSelections[i].id
      }
      console.log(this.addStudentList)
    },
    handleStudentResetSearch() {
      //
      this.studentForm.id = ''
      this.studentForm.name = ''
      this.studentForm.phone = ''
    },
    deleteWork(id) {
      // 删除
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    findTestListData() {
      // 搜索
    },
    handleResetSearch() {
      this.form.title = ''
      this.form.grade = ''
      this.form.version = ''
      this.form.testType = ''
      this.form.year = ''
      this.form.area = ''
      this.form.creationTime = ''
      this.form.searchScope = ''
    },
    chapterAdd() {
      // 章节挑题
      this.$router.push({ path: '/ChapterAdd' })
    },
    knowledgeAdd() {
      // 知识点挑题
      this.$router.push({ path: '/KnowledgeAdd' })
    }
  }
}
</script>

<style lang="scss">
.customWidth {
  width: 70%;
}
</style>
