<template>
  <div style="padding: 30px">
    <div>
      <el-divider content-position="left">
        <p style="color: #004b97; font-size: 18px">基本信息</p>
      </el-divider>
      <div style="margin-left: 40px">
        <div>
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
              collapse-tags
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
        <div style="margin-top: 20px;">
          <p style="display: inline">
            当前年级：
            <el-input
              v-model="studentWorkForm.grade"
              style="width: 300px"
              :disabled="true"
            />
          </p>
          <p style="display: inline">
            当前版本：
            <el-input
              v-model="studentWorkForm.version"
              style="width: 300px"
              :disabled="true"
            />
          </p>
        </div>
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
          题目数量：
          <el-input
            v-model="studentWorkForm.testNum"
            style="width: 300px"
            :disabled="true"
          />
        </p>
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
      studentWorkForm: {
        workName: '',
        studentName: [],
        className: [],
        testNum: '', // 题目数量
        time: '',
        version: '',
        grade: '',
        note: ''
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
      gradeOptions: []
    }
  },
  mounted() {
    // 发起查询请求
    this.getClassOptionsData()
    this.getVersionOptionsData()
    this.getGradeOptionsData()
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
    postStudentWork() {
      // 保存，看情况加数据校验
      // 连post信息的接口
    }
  }
}
</script>

<style lang="scss">
</style>
