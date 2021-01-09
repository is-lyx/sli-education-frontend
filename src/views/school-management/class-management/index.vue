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
          @click="findClassListData"
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
            <el-form-item label="班级名称：">
              <el-input
                v-model="form.className"
                style="width: 203px;"
                placeholder="请输入班级名称"
                @keyup.enter.native="findClassListData"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <!-- 列表 -->
    <div style="margin-top: 20px;">
      <div style="margin-top: 10px; margin-bottom: 10px;">
        <el-checkbox-group v-model="checkboxVal">
          <el-checkbox label="classID">
            班级ID
          </el-checkbox>
          <el-checkbox label="className">
            班级名称
          </el-checkbox>
          <el-checkbox label="schoolName">
            学校名称
          </el-checkbox>
          <el-checkbox label="grade">
            年级
          </el-checkbox>
          <el-checkbox label="creationTime">
            创建时间
          </el-checkbox>
          <el-checkbox label="founder">
            创建人
          </el-checkbox>
          <el-checkbox label="modifyTime">
            修改时间
          </el-checkbox>
          <el-checkbox label="teacher">
            老师
          </el-checkbox>
          <el-checkbox label="modifier">
            修改人
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <el-table :key="key" :data="classListData" border fit highlight-current-row style="width: 100%">
      <el-table-column v-for="classData in formThead" :key="classData" :label="classData">
        <template slot-scope="scope">
          {{ scope.row[classData] }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        暂无操作
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div style="text-align: center; margin-top: 30px;">
      <el-pagination
        :current-page="queryInfo.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
const defaultFormThead = ['classID', 'className', 'creationTime', 'founder', 'teacher']

export default {
  data() {
    return {
      form: {
        className: '' // 班级名称
      },
      queryInfo: {
        page: 1,
        limit: 5
      },
      total: 0,
      classListData: [
        {
          classID: '255',
          className: '	初一晚辅01班',
          schoolName: '福州一中',
          grade: '初一',
          creationTime: '2020-11-08 15:43:06',
          founder: '启智文坊学堂',
          modifyTime: '-',
          teacher: '傅雄,林珍,蒋启文',
          modifier: '-'
        },
        {
          classID: '255',
          className: '	初一晚辅01班',
          schoolName: '福州一中',
          grade: '初一',
          creationTime: '2020-11-08 15:43:06',
          founder: '启智文坊学堂',
          modifyTime: '-',
          teacher: '傅雄,林珍,蒋启文',
          modifier: '-'
        },
        {
          classID: '255',
          className: '	初一晚辅01班',
          schoolName: '福州一中',
          grade: '初一',
          creationTime: '2020-11-08 15:43:06',
          founder: '启智文坊学堂',
          modifyTime: '-',
          teacher: '傅雄,林珍,蒋启文',
          modifier: '-'
        },
        {
          classID: '255',
          className: '	初一晚辅01班',
          schoolName: '福州一中',
          grade: '初一',
          creationTime: '2020-11-08 15:43:06',
          founder: '启智文坊学堂',
          modifyTime: '-',
          teacher: '傅雄,林珍,蒋启文',
          modifier: '-'
        },
        {
          classID: '255',
          className: '	初一晚辅01班',
          schoolName: '福州一中',
          grade: '初一',
          creationTime: '2020-11-08 15:43:06',
          founder: '启智文坊学堂',
          modifyTime: '-',
          teacher: '傅雄,林珍,蒋启文',
          modifier: '-'
        },
        {
          classID: '255',
          className: '	初一晚辅01班',
          schoolName: '福州一中',
          grade: '初一',
          creationTime: '2020-11-08 15:43:06',
          founder: '启智文坊学堂',
          modifyTime: '-',
          teacher: '傅雄,林珍,蒋启文',
          modifier: '-'
        }
      ],
      key: 1, // table key
      formTheadOptions: ['classID', 'className', 'schoolName', 'grade', 'creationTime', 'founder', 'modifyTime', 'teacher', 'modifier'],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead // 默认表头
    }
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
      this.key = this.key + 1// 为了保证table 每次都会重渲
    }
  },
  methods: {
    getClassListData() {
      // 获取列表
    },
    handleResetSearch() {
      this.form.className = ''
    },
    findClassListData() {
      this.queryInfo.page = 1
      this.getClassListData()
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getClassListData()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.page = newPage
      this.getClassListData()
    }
  }
}
</script>
