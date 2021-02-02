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
          @click="findStudentListData"
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
            <el-form-item label="账号：">
              <el-input
                v-model="form.id"
                style="width: 203px;"
                placeholder="请输入账号"
                @keyup.enter.native="findClubsListData"
              />
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input
                v-model="form.name"
                style="width: 203px;"
                placeholder="请输入姓名"
                @keyup.enter.native="findClubsListData"
              />
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input
                v-model="form.phoneNumber"
                style="width: 203px;"
                placeholder="请输入手机号"
                @keyup.enter.native="findClubsListData"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <!-- 列表 -->
    <div style="margin-top: 20px;">
      <div style="margin-top: 10px; margin-bottom: 10px;">
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-plus"
          plain
          @click="addStudentVisible = true"
        >添加</el-button>
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-plus"
          plain
          @click="batchAddStudentVisible = true"
        >批量添加</el-button>
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-plus"
          plain
          @click="batchClasses"
        >批量分配班级</el-button>
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-plus"
          plain
          @click="batchCourses"
        >批量分发课程</el-button>
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-plus"
          plain
          @click="batchActivate"
        >批量激活</el-button>
      </div>
      <!--添加学生-->
      <el-dialog title="添加学生" :visible.sync="addStudentVisible">
        <el-form :model="addStudentForm" :rules="addStudentFormRules">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addStudentForm.name" autocomplete="off" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-select v-model="addStudentForm.sex" placeholder="请选择性别" style="width: 300px;">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="版本" :label-width="formLabelWidth" prop="version">
            <el-select
              v-model="addStudentForm.version"
              placeholder="请选择版本"
              clearable
              style="width: 300px;"
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
          <el-form-item label="年级" :label-width="formLabelWidth" prop="grade">
            <el-select
              v-model="addStudentForm.grade"
              placeholder="请选择年级"
              clearable
              style="width: 300px;"
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
          <el-form-item label="账号前缀" :label-width="formLabelWidth" prop="accountFront">
            <el-input v-model="addStudentForm.accountFront" autocomplete="off" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="addStudentForm.phone" autocomplete="off" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="addStudentForm.note" autocomplete="off" style="width: 300px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button @click="addStudentVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStudent()">确 定</el-button>
        </div>
      </el-dialog>
      <!--批量添加学生-->
      <el-dialog title="添加学生" :visible.sync="batchAddStudentVisible">
        <el-form :model="batchAddStudentForm" :rules="batchAddStudentFormRules">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="batchAddStudentForm.name" autocomplete="off" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
            <el-select v-model="batchAddStudentForm.sex" placeholder="请选择性别" style="width: 300px;">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="版本" :label-width="formLabelWidth" prop="version">
            <el-select
              v-model="batchAddStudentForm.version"
              placeholder="请选择版本"
              clearable
              style="width: 300px;"
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
          <el-form-item label="年级" :label-width="formLabelWidth" prop="grade">
            <el-select
              v-model="batchAddStudentForm.grade"
              placeholder="请选择年级"
              clearable
              style="width: 300px;"
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
          <el-form-item label="账号前缀" :label-width="formLabelWidth" prop="accountFront">
            <el-input v-model="batchAddStudentForm.accountFront" autocomplete="off" style="width: 300px;" />
          </el-form-item>
          <el-form-item label="生成数量" :label-width="formLabelWidth" prop="number">
            <el-input v-model="batchAddStudentForm.number" autocomplete="off" style="width: 300px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button @click="batchAddStudentVisible = false">取 消</el-button>
          <el-button type="primary" @click="batchAddStudent()">确 定</el-button>
        </div>
      </el-dialog>

      <PageTable
        ref="dataTable"
        :data="StudentList"
        :page-sizes="[5,10]"
        :page-size="5"

        :paging="true"
        :dynamic-column-setting="true"
        :column-visibles="columnVisibles"
        :hiden-column-indexs="[9]"
        :default-sort="{prop: 'totalIntegral', order: 'descending'}"
        :show-always-show-column-in-checkbox="true"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column v-if="columnVisibles[1]" label="账号" min-width="90" prop="id" />
        <el-table-column v-if="columnVisibles[2]" label="姓名" prop="name" />
        <el-table-column v-if="columnVisibles[3]" label="手机号" prop="phoneNumber" />
        <el-table-column v-if="columnVisibles[4]" label="学校" min-width="100" prop="school" />
        <el-table-column v-if="columnVisibles[5]" label="班级" prop="class" />
        <el-table-column v-if="columnVisibles[6]" label="老师" prop="teacher" />
        <el-table-column v-if="columnVisibles[7]" label="总积分" sortable prop="totalIntegral" />
        <el-table-column v-if="columnVisibles[8]" label="到期时间" prop="dueTime" />
        <el-table-column v-if="columnVisibles[9]" label="创建时间" prop="creationTime" />
        <el-table-column v-if="columnVisibles[10]" label="操作" min-width="350">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="openEnglishDialogVisible = true"
            >开通英语</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="distributionClassDialogVisible = true"
            >分配班级</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="getCourseList"
            >分发课程</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="rewardPoints"
            >奖励积分</el-button>
            <el-button
              type="success"
              size="mini"
              @click="activate(scope.row.id)"
            >
              激活</el-button>
            <el-button
              type="info"
              size="mini"
              @click="edit"
            >
              修改</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="reset"
            >
              重置</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="deleteStudent"
            >
              删除</el-button>
          </template>
        </el-table-column>
      </PageTable>

      <!--开通英语-->
      <el-dialog
        title="提示"
        :visible.sync="openEnglishDialogVisible"
        width="30%"
      >
        <span>是否要为该学生开通英语？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="openEnglishDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="openEnglish">确 定</el-button>
        </span>
      </el-dialog>
      <!--分配班级-->
      <el-dialog
        title="分配班级学生"
        :visible.sync="distributionClassDialogVisible"
        width="45%"
      >
        <el-form :model="form">
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-select v-model="classForm.class" placeholder="请选择班级" style="width: 300px;">
              <el-option label="初一晚辅01班" value="0" />
              <el-option label="待连接接口补充" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="老师" :label-width="formLabelWidth">
            <el-select v-model="classForm.teacher" placeholder="请选择老师" style="width: 300px;">
              <el-option label="林珍" value="0" />
              <el-option label="待连接接口补充" value="1" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button @click="distributionClassDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="distributionClasses">确 定</el-button>
        </div>
      </el-dialog>
      <!--分发课程-->
      <el-dialog
        title="分发课程"
        :visible.sync="distributionCoursesDialogVisible"
        width="80%"
      >
        <el-card shadow="never">
          <div style="margin-top: 15px;">
            <el-form
              :inline="true"
              :model="form"
              size="small"
              label-width="140px"
            >
              <div style="text-align: center;">
                <el-form-item label="选择系列：" :label-width="distributionCoursesFormLabelWidth">
                  <el-select
                    v-model="distributionCoursesForm.series"
                    placeholder="请选择系列"
                    clearable
                    style="width: 180px;"
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
                <el-form-item label="选择版本：" :label-width="distributionCoursesFormLabelWidth">
                  <el-select
                    v-model="distributionCoursesForm.version"
                    placeholder="请选择版本"
                    clearable
                    style="width: 180px;"
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
                <el-form-item label="选择年级：" :label-width="distributionCoursesFormLabelWidth">
                  <el-select
                    v-model="distributionCoursesForm.grade"
                    placeholder="请选择年级"
                    clearable
                    style="width: 180px;"
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
                <el-form-item>
                  <el-button
                    style="float: right;"
                    type="primary"
                    size="small"
                    @click="findClassListData"
                  >查询</el-button>
                  <el-button
                    style="float: right;margin-right: 15px;"
                    size="small"
                    @click="handleClassResetSearch"
                  >重置</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="distributionAllCourseDialogVisible = true"
                  >分配所有课程</el-button>
                  <el-dialog
                    title="提示"
                    :visible.sync="distributionAllCourseDialogVisible"
                    width="30%"
                    append-to-body
                  >
                    <span>是否为该学生分配所有课程？<p style="color:red">（点击确认直接分配）</p></span>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="distributionAllCourseDialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="distributionAllCourse">确 定</el-button>
                    </span>
                  </el-dialog>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-card>

        <div style="margin-top: 15px;">
          <el-form
            :inline="true"
            :model="form"
            size="small"
            label-width="140px"
          >
            <div style="text-align: center;">
              <el-form-item label="课程列表：" :label-width="distributionCoursesFormLabelWidth">
                <el-select
                  v-model="allCoursesForm.course"
                  placeholder="请选择课程"
                  clearable
                  style="width: 180px;"
                >
                  <el-option
                    v-for="item in courseData"
                    :key="item.id"
                    :label="item.courseName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="章节列表：" :label-width="distributionCoursesFormLabelWidth">
                <el-select
                  v-model="allCoursesForm.section"
                  placeholder="请选择章节"
                  clearable
                  style="width: 180px;"
                >
                  <el-option
                    v-for="item in sectionData"
                    :key="item.id"
                    :label="item.sectionName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="已分发列表：" :label-width="distributionCoursesFormLabelWidth">
                <el-select
                  v-model="allCoursesForm.distribution"
                  placeholder="请选择章节"
                  clearable
                  style="width: 180px;"
                >
                  <el-option
                    v-for="item in distributionData"
                    :key="item.id"
                    :label="item.distributionName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer" style="text-align:center">
          <el-button @click="distributionCoursesDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="distributionCourses">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
      columnVisibles: new Array(11).fill(true),
      listLoading: false, // 假数据暂时为false，等接口调试时改为true
      addStudentVisible: false, // 添加学生表单
      batchAddStudentVisible: false, // 批量添加学生表单
      formLabelWidth: '250px',
      distributionCoursesFormLabelWidth: '100px',
      openEnglishDialogVisible: false, // 开通英语
      distributionClassDialogVisible: false, // 分配班级
      distributionCoursesDialogVisible: false, // 分配课程
      distributionAllCourseDialogVisible: false, // 分配所有课程确认框
      StudentList: [],
      form: {
        id: '', // 账号
        name: '', // 姓名
        phoneNumber: '' // 手机号
      },
      addStudentForm: {
        name: '',
        sex: '',
        version: '',
        grade: '',
        accountFront: '', // 账号前缀
        phone: '',
        note: ''// 备注
      },
      addStudentFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        version: [
          { required: true, message: '请选择版本', trigger: 'change' }
        ],
        grade: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ],
        accountFront: [{ required: true, message: '请输入账号前缀', trigger: 'blur' }
        ]
      },
      batchAddStudentForm: {
        name: '',
        sex: '',
        version: '',
        grade: '',
        accountFront: '', // 账号前缀
        number: ''
      },
      batchAddStudentFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        version: [
          { required: true, message: '请选择版本', trigger: 'change' }
        ],
        grade: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ],
        accountFront: [{ required: true, message: '请输入账号前缀', trigger: 'blur' }
        ],
        number: [{ required: true, message: '请输入生成数量', trigger: 'blur' }
        ]
      },
      classForm: {
        class: '',
        teacher: ''
      },
      distributionCoursesForm: {
        series: '',
        version: '',
        grade: ''
      },
      courseData: [], // 分发课程中的课程列表
      sectionData: [], // 分发课程中的章节列表
      distributionData: [], // 分发课程中的已分发课程列表
      allCoursesForm: {
        course: '',
        section: '',
        distribution: ''
      }
    }
  },
  mounted() {
    // 发起查询请求
    this.getStudentListData()
  },
  methods: {
    findStudentListData() {
      this.queryInfo.page = 1
      this.getStudentListData()
    },
    getStudentListData() {
      // 模拟后台数据
      const studentList = [{
        id: 'qz70019553',
        name: '王小虎',
        phoneNumber: '55555',
        school: '启智文坊学堂',
        class: '小学高年级托管班',
        teacher: '蒋启文',
        totalIntegral: '294',
        dueTime: '2021-01-05 16:48:42'
      },
      {
        id: 'qz70019554',
        name: '王小虎',
        phoneNumber: '33333',
        school: '启智文坊学堂',
        class: '小学高年级托管班',
        teacher: '蒋启文',
        totalIntegral: '289',
        dueTime: '2021-01-05 16:48:42'
      },
      {
        id: 'qz70019555',
        name: '王小虎',
        phoneNumber: '22222',
        school: '启智文坊学堂',
        class: '小学高年级托管班',
        teacher: '蒋启文',
        totalIntegral: '234',
        dueTime: '2021-01-05 16:48:42'
      },
      {
        id: 'qz70019556',
        name: '王小虎',
        phoneNumber: '44444',
        school: '启智文坊学堂',
        class: '小学高年级托管班',
        teacher: '蒋启文',
        totalIntegral: '290',
        dueTime: '2021-01-05 16:48:42'
      },
      {
        id: 'qz70019557',
        name: '王小虎',
        phoneNumber: '11111',
        school: '启智文坊学堂',
        class: '小学高年级托管班',
        teacher: '蒋启文',
        totalIntegral: '212',
        dueTime: '2021-01-05 16:48:42'
      }
      ]
      this.StudentList = studentList
    },
    handleResetSearch() {
      this.form.id = ''
      this.form.name = ''
      this.form.phoneNumber = ''
    },
    addStudent() {
      this.addStudentVisible = false
      // 添加学生接口
    },
    batchAddStudent() {
      this.batchAddStudentVisible = false
      // 批量添加学生接口
    },
    batchClasses() {

    },
    batchCourses() {

    },
    batchActivate() {

    },
    openEnglish() {
      this.openEnglishDialogVisible = false
      // 开通英语接口
    },
    distributionClasses() {
      this.distributionClassDialogVisible = false
      // 分配班级接口
    },
    distributionCourses() {
      this.distributionCoursesDialogVisible = false
      // 分配课程接口
    },
    getCourseList() {
      this.distributionCoursesDialogVisible = true
      // 模拟后台数据courseData
      const testcourseData = [
        {
          id: '0',
          courseName: '北师大新版 一年级上'
        },
        {
          id: '1',
          courseName: '北师大新版 一年级下'
        },
        {
          id: '2',
          courseName: '北师大新版 二年级上'
        },
        {
          id: '3',
          courseName: '北师大新版 二年级下'
        },
        {
          id: '4',
          courseName: '模拟数据，待补充'
        }
      ]
      this.courseData = testcourseData
      // 模拟后台数据sectionData
      const testsectionData = [
        {
          id: '0',
          sectionName: '加与减'
        },
        {
          id: '1',
          sectionName: '购物'
        },
        {
          id: '2',
          sectionName: '数一数与乘法'
        },
        {
          id: '3',
          sectionName: '图形的变化'
        },
        {
          id: '4',
          sectionName: '模拟数据，待补充'
        }
      ]
      this.sectionData = testsectionData
      // 模拟后台distributionData
      const testdistributionData = [
        {
          id: '0',
          distributionName: '北师大新版 一年级上 第1章'
        },
        {
          id: '1',
          distributionName: '北师大新版 一年级下 第1章'
        },
        {
          id: '2',
          distributionName: '北师大新版 二年级上 第1章'
        },
        {
          id: '3',
          distributionName: '北师大新版 二年级下 第1章'
        },
        {
          id: '4',
          distributionName: '模拟数据，待补充'
        }
      ]
      this.distributionData = testdistributionData
    },
    findClassListData() {
      // 搜索课程
    },
    distributionAllCourse() {
      this.distributionAllCourseDialogVisible = false
      // 分配所有课程
    },
    handleClassResetSearch() {
      this.distributionCoursesForm.series = ''
      this.distributionCoursesForm.version = ''
      this.distributionCoursesForm.grade = ''
    },
    rewardPoints() {

    },
    activate(id) {
    // 激活，管理员才有，后面需要添加v-if判断身份
    },
    edit() {

    },
    reset() {

    },
    deleteStudent() {

    }
  }
}
</script>

