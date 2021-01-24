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
          @click="findActivationCodeListData"
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
            <el-form-item label="激活码：">
              <el-select
                v-model="form.activationCodeState"
                placeholder="请选择激活码类别"
                clearable
                style="width: 203px;"
                @change="findActivationCodeListData"
              >
                <el-option
                  label="全部"
                  value="0"
                />
                <el-option
                  label="已使用"
                  value="1"
                />
                <el-option
                  label="未使用"
                  value="2"
                />
              </el-select>
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
      :default-sort="{prop: 'grade', order: 'descending'}"
      :hiden-column-indexs="[0]"

      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column v-if="columnVisibles[0]" label="编码" prop="code" />
      <el-table-column v-if="columnVisibles[1]" label="激活天数" prop="activationDay" />
      <el-table-column v-if="columnVisibles[2]" label="激活码" prop="activationCode" />
      <el-table-column v-if="columnVisibles[3]" label="学生账号" prop="studentID" />
      <el-table-column v-if="columnVisibles[4]" label="使用时间" prop="usingTime" />
      <el-table-column v-if="columnVisibles[5]" label="学校" prop="school" />
    </PageTable>

  </div>
</template>

<script>
// 引入表格组件
import PageTable from '../PageTable.vue'

export default {
  components: {
    PageTable // 引用表格组件
  },
  data() {
    return {
      tableData: [],
      form: {
        activationCodeState: ''
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
        data.push({ code: i, activationDay: i, activationCode: i,
          studentID: i, usingTime: i, school: i })
      }

      this.tableData = data
    },
    clickFunc(row) {
      // console.log(row);
      alert(JSON.stringify(row))
    },
    getReport(row) {
      // 详细报告
    },
    edit(row) {
      // 编辑
    },
    deleteWork() {
      // 删除作业
    },
    findActivationCodeListData() {
      // 搜索
    },
    handleResetSearch() {
      this.form.activationCodeState = ''
    },
    add() {
      // 添加作业
    }
  }
}
</script>

<style lang="scss">
</style>
