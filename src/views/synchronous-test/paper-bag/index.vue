<template>
  <div style="padding:30px;">
    <el-card shadow="never">
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float: right;"
          type="primary"
          size="small"
          @click="findPaperBagListData"
        >查询</el-button>
        <el-button
          style="float: right;margin-right: 15px;"
          size="small"
          @click="handleResetSearch"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px;">
        <el-form
          :inline="true"
          :model="form"
          size="small"
          label-width="140px"
        >
          <div style="text-align: center;">
            <el-form-item label="标题：">
              <el-input
                v-model="form.title"
                style="width: 203px;"
                placeholder="请输入标题"
                @keyup.enter.native="findPaperBagListData"
              />
            </el-form-item>
            <el-form-item label="试卷类型：">
              <el-select
                v-model="form.testType"
                placeholder="请选择试卷类型"
                clearable
                style="width: 203px;"
                @change="findPaperBagListData"
              >
                <el-option
                  label="全部"
                  value="0"
                />
                <el-option
                  label="小升初"
                  value="1"
                />
                <el-option
                  label="中考"
                  value="2"
                />
                <el-option
                  label="高考"
                  value="3"
                />
                <el-option
                  label="竞赛"
                  value="4"
                />
                <el-option
                  label="期中"
                  value="5"
                />
                <el-option
                  label="期末"
                  value="6"
                />
                <el-option
                  label="月考"
                  value="7"
                />
                <el-option
                  label="单元测试"
                  value="8"
                />
                <el-option
                  label="同步练习"
                  value="9"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="学历：">
              <el-select
                v-model="form.eduBackground"
                placeholder="请选择学历"
                clearable
                style="width: 203px;"
                @change="findPaperBagListData"
              >
                <el-option
                  label="全部"
                  value="0"
                />
                <el-option
                  label="小学"
                  value="1"
                />
                <el-option
                  label="初中"
                  value="2"
                />
                <el-option
                  label="高中"
                  value="3"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="年级：">
              <el-select
                v-model="form.grade"
                placeholder="请选择年级"
                clearable
                style="width: 203px;"
                @change="findPaperBagListData"
              >
                <el-option
                  label="全部"
                  value="0"
                />
                <el-option
                  label="一年级上"
                  value="1"
                />
                <el-option
                  label="一年级下"
                  value="2"
                />
                <el-option
                  label="二年级上"
                  value="3"
                />
                <el-option
                  label="二年级下"
                  value="4"
                />
                <el-option
                  label="三年级上"
                  value="5"
                />
                <el-option
                  label="三年级下"
                  value="6"
                />
                <el-option
                  label="四年级上"
                  value="7"
                />
                <el-option
                  label="四年级下"
                  value="8"
                />
                <el-option
                  label="五年级上"
                  value="9"
                />
                <el-option
                  label="五年级下"
                  value="10"
                />
                <el-option
                  label="六年级上"
                  value="11"
                />
                <el-option
                  label="六年级下"
                  value="12"
                />
                <el-option
                  label="七年级上"
                  value="13"
                />
                <el-option
                  label="七年级下"
                  value="14"
                />
                <el-option
                  label="八年级上"
                  value="15"
                />
                <el-option
                  label="八年级下"
                  value="16"
                />
                <el-option
                  label="九年级上"
                  value="17"
                />
                <el-option
                  label="九年级下"
                  value="18"
                />
                <el-option
                  label="高一上"
                  value="19"
                />
                <el-option
                  label="高一下"
                  value="20"
                />
                <el-option
                  label="高二上"
                  value="21"
                />
                <el-option
                  label="高二下"
                  value="22"
                />
                <el-option
                  label="高三上"
                  value="23"
                />
                <el-option
                  label="高三下"
                  value="24"
                />
                <el-option
                  label="必修1"
                  value="25"
                />
                <el-option
                  label="必修2"
                  value="26"
                />
                <el-option
                  label="必修3"
                  value="27"
                />
                <el-option
                  label="必修4"
                  value="28"
                />
                <el-option
                  label="必修5"
                  value="29"
                />
                <el-option
                  label="选修1"
                  value="30"
                />
                <el-option
                  label="选修1-1"
                  value="31"
                />
                <el-option
                  label="选修1-2"
                  value="32"
                />
                <el-option
                  label="选修2"
                  value="33"
                />
                <el-option
                  label="选修2-1"
                  value="34"
                />
                <el-option
                  label="选修2-2"
                  value="35"
                />
                <el-option
                  label="选修2-3"
                  value="36"
                />
                <el-option
                  label="选修3"
                  value="37"
                />
                <el-option
                  label="选修3-1"
                  value="38"
                />
                <el-option
                  label="选修3-2"
                  value="39"
                />
                <el-option
                  label="选修3-3"
                  value="40"
                />
                <el-option
                  label="选修3-4"
                  value="41"
                />
                <el-option
                  label="选修3-5"
                  value="42"
                />
                <el-option
                  label="选修4"
                  value="43"
                />
                <el-option
                  label="选修4-1"
                  value="44"
                />
                <el-option
                  label="选修4-2"
                  value="45"
                />
                <el-option
                  label="选修4-3"
                  value="46"
                />
                <el-option
                  label="选修4-4"
                  value="47"
                />
                <el-option
                  label="选修4-5"
                  value="48"
                />
                <el-option
                  label="选修4-6"
                  value="49"
                />
                <el-option
                  label="选修4-7"
                  value="50"
                />
                <el-option
                  label="选修5"
                  value="51"
                />
                <el-option
                  label="选修6"
                  value="52"
                />
                <el-option
                  label="选修7"
                  value="53"
                />
                <el-option
                  label="选修8"
                  value="54"
                />
                <el-option
                  label="选修"
                  value="55"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="版本：">
              <el-select
                v-model="form.version"
                placeholder="请选择版本"
                clearable
                style="width: 203px;"
                @change="findPaperBagListData"
              >
                <el-option
                  label="全部"
                  value="0"
                />
                <el-option
                  label="人教A版"
                  value="1"
                />
                <el-option
                  label="人教B版"
                  value="2"
                />
                <el-option
                  label="北师大新版"
                  value="3"
                />
                <el-option
                  label="苏教新版"
                  value="4"
                />
                <el-option
                  label="湘教版"
                  value="5"
                />
                <el-option
                  label="人教新版"
                  value="6"
                />
                <el-option
                  label="浙教新版"
                  value="7"
                />
                <el-option
                  label="北京课改新版"
                  value="8"
                />
                <el-option
                  label="沪教版"
                  value="9"
                />
                <el-option
                  label="沪科版"
                  value="10"
                />
                <el-option
                  label="冀教新版"
                  value="11"
                />
                <el-option
                  label="鲁教五四版"
                  value="12"
                />
                <el-option
                  label="青岛版"
                  value="13"
                />
                <el-option
                  label="苏科版"
                  value="14"
                />
                <el-option
                  label="西师新版"
                  value="15"
                />
                <el-option
                  label="华师大版"
                  value="16"
                />
                <el-option
                  label="沪教新版"
                  value="17"
                />
                <el-option
                  label="青岛五四制新"
                  value="18"
                />
                <el-option
                  label="青岛版六三制新"
                  value="19"
                />
                <el-option
                  label="河北版"
                  value="20"
                />
                <el-option
                  label="上海版"
                  value="21"
                />
                <el-option
                  label="北京版"
                  value="22"
                />
                <el-option
                  label="人教版"
                  value="23"
                />
                <el-option
                  label="北师大版"
                  value="24"
                />
                <el-option
                  label="苏教版"
                  value="25"
                />
                <el-option
                  label="浙教版"
                  value="26"
                />
                <el-option
                  label="冀教版"
                  value="27"
                />
                <el-option
                  label="青岛版五四制"
                  value="28"
                />
                <el-option
                  label="青岛版六三制"
                  value="29"
                />
                <el-option
                  label="西师版"
                  value="30"
                />
                <el-option
                  label="华师大新版"
                  value="31"
                />
                <el-option
                  label="苏科新版"
                  value="32"
                />
                <el-option
                  label="湘教新版"
                  value="33"
                />
                <el-option
                  label="青岛新版"
                  value="34"
                />
                <el-option
                  label="沪科新版"
                  value="35"
                />
                <el-option
                  label="鲁教五四新版"
                  value="36"
                />
                <el-option
                  label="人教五四新版"
                  value="37"
                />
                <el-option
                  label="北京课改版"
                  value="38"
                />
                <el-option
                  label="人教五四版"
                  value="39"
                />
                <el-option
                  label="人教A版（2019）"
                  value="40"
                />
                <el-option
                  label="人教B版（2019）"
                  value="41"
                />
                <el-option
                  label="大纲版"
                  value="42"
                />
                <el-option
                  label="人教新版（改）"
                  value="43"
                />
                <el-option
                  label="北师大新版（改）"
                  value="44"
                />
                <el-option
                  label="苏教新版（改）"
                  value="45"
                />
                <el-option
                  label="华师大新版（改）"
                  value="46"
                />
                <el-option
                  label="苏科新版（改）"
                  value="47"
                />
                <el-option
                  label="湘教新版（改）"
                  value="48"
                />
                <el-option
                  label="青岛新版（改）"
                  value="49"
                />
                <el-option
                  label="浙教新版（改）"
                  value="50"
                />
                <el-option
                  label="冀教新版（改）"
                  value="51"
                />
                <el-option
                  label="沪科新版（改）"
                  value="52"
                />
                <el-option
                  label="鲁教五四新版（改）"
                  value="53"
                />
                <el-option
                  label="北京课改新版（改）"
                  value="54"
                />
                <el-option
                  label="沪教新版（改）"
                  value="55"
                />
                <el-option
                  label="西师新版（改）"
                  value="56"
                />
                <el-option
                  label="高教版中职数学（基础模块）上册"
                  value="57"
                />
                <el-option
                  label="高教版中职数学（基础模块）下册"
                  value="58"
                />
                <el-option
                  label="高教版中职数学（拓展模块）"
                  value="59"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="年份：">
              <el-input
                v-model="form.year"
                style="width: 203px;"
                placeholder="请输入年份"
                @keyup.enter.native="findPaperBagListData"
              />
            </el-form-item>
            <el-form-item label="地区：">
              <el-input
                v-model="form.area"
                style="width: 203px;"
                placeholder="请输入地区"
                @keyup.enter.native="findPaperBagListData"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <PageTable
      ref="dataTable"
      :data="tableData"
      :page-sizes="[5,10]"
      :page-size="5"

      :paging="true"
      :dynamic-column-setting="true"
      :column-visibles="columnVisibles"
      :hiden-column-indexs="[1,7]"

      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column v-if="columnVisibles[0]" label="标题" prop="title" />
      <el-table-column v-if="columnVisibles[1]" label="查看次数" prop="checkNumber" />
      <el-table-column v-if="columnVisibles[2]" label="下载次数" prop="downloadNumber" />
      <el-table-column v-if="columnVisibles[3]" label="试卷类型" prop="testType" />
      <el-table-column v-if="columnVisibles[4]" label="难度" prop="difficulty" />
      <el-table-column v-if="columnVisibles[5]" label="年份" prop="year" />
      <el-table-column v-if="columnVisibles[6]" label="地区" prop="area" />
      <el-table-column v-if="columnVisibles[7]" label="创建时间" prop="creationTime" />
      <el-table-column v-if="columnVisibles[8]" label="更新时间" prop="updateTime" />
      <el-table-column v-if="columnVisibles[9]" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="downloadQuestion(scope.row)"
          >下载试题</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="downloadAnswer(scope.row)"
          >下载答案</el-button>
        </template>
      </el-table-column>
    </PageTable>

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
      tableData: [],
      form: {
        title: '',
        testType: '',
        eduBackground: '',
        grade: '',
        version: '',
        year: '',
        area: ''
      },
      columnVisibles: new Array(17).fill(true)
    }
  },
  mounted() {
    // 发起查询请求
    this.queryData()
  },
  methods: {
    queryData() {
      // 模拟后台数据
      const data = []
      for (var i = 1; i <= 23; i++) {
        data.push({ title: i, checkNumber: i, downloadNumber: i,
          testType: i, difficulty: i, year: i, area: i,
          creationTime: i, updateTime: i })
      }

      this.tableData = data
    },
    clickFunc(row) {
      // console.log(row);
      alert(JSON.stringify(row))
    },
    downloadQuestion(row) {
      // 下载试题
    },
    downloadAnswer(row) {
      // 下载答案
    },
    findPaperBagListData() {
      // 搜索
    },
    handleResetSearch() {
      this.form.title = ''
      this.form.testType = ''
      this.form.eduBackground = ''
      this.form.version = ''
      this.form.year = ''
      this.form.area = ''
      this.form.grade = ''
    }
  }
}
</script>

<style lang="scss">
</style>
