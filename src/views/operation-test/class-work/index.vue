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
          @click="findClassWorkListData"
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
            <el-form-item label="选择班级：">
              <el-select
                v-model="form.class"
                placeholder="请选择班级"
                clearable
                style="width: 203px;"
                @change="findClassWorkListData"
              >
                <el-option
                  label="全部"
                  value="0"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select
                v-model="form.state"
                placeholder="请选择状态"
                clearable
                style="width: 203px;"
                @change="findClassWorkListData"
              >
                <el-option
                  label="全部"
                  value="0"
                />
                <el-option
                  label="未发布"
                  value="1"
                />
                <el-option
                  label="已发布"
                  value="2"
                />
                <el-option
                  label="答题中"
                  value="3"
                />
                <el-option
                  label="已完成"
                  value="4"
                />
                <el-option
                  label="已过期"
                  value="5"
                />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <div style="margin-top: 10px;">
      <el-button
        type="primary"
        size="medium"
        icon="el-icon-plus"
        plain
        @click="add"
      >添加</el-button>
    </div>

    <PageTable
      ref="dataTable"
      :data="tableData"
      :page-sizes="[5,10]"
      :page-size="5"

      :paging="true"
      :dynamic-column-setting="true"
      :column-visibles="columnVisibles"
      :hiden-column-indexs="[0,1,9]"
      :always-show-column-indexs="[3]"

      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column v-if="columnVisibles[0]" label="班级作业ID" prop="classWorkID" />
      <el-table-column v-if="columnVisibles[1]" label="班级ID" prop="classID" />
      <el-table-column v-if="columnVisibles[2]" label="班级" prop="class" />
      <el-table-column v-if="columnVisibles[3]" label="作业名称" prop="homeworkName" />
      <el-table-column v-if="columnVisibles[4]" label="开始时间" prop="startTime" />
      <el-table-column v-if="columnVisibles[5]" label="结束时间" prop="endTime" />
      <el-table-column v-if="columnVisibles[6]" label="总天数" prop="totalDay" />
      <el-table-column v-if="columnVisibles[7]" label="题量" prop="amountOfTheQuestions" />
      <el-table-column v-if="columnVisibles[8]" label="创建时间" prop="foundTime" />
      <el-table-column v-if="columnVisibles[9]" label="分数" prop="score" />
      <el-table-column v-if="columnVisibles[10]" label="完成情况" prop="finishState" />
      <el-table-column v-if="columnVisibles[11]" label="平均用时" prop="avgUsingTime" />
      <el-table-column v-if="columnVisibles[12]" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="edit(scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteWork(scope.row)"
          >删除</el-button>
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
        class: '',
        state: ''
      },
      columnVisibles: new Array(13).fill(true)
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
        data.push({ classWorkID: i, classID: i, class: i,
          homeworkName: i, startTime: i, endTime: i,
          totalDay: i, amountOfTheQuestions: i, foundTime: i, score: i,
          finishState: i, avgUsingTime: i })
      }

      this.tableData = data
    },
    clickFunc(row) {
      // console.log(row);
      alert(JSON.stringify(row))
    },
    edit(row) {
      // 编辑
    },
    deleteWork() {
      // 删除作业
    },
    findClassWorkListData() {
      // 搜索
    },
    handleResetSearch() {
      this.form.class = ''
      this.form.state = ''
    },
    add() {
      // 添加作业
    }
  }
}
</script>

<style lang="scss">
</style>
