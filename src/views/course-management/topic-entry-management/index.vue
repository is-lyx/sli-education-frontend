<template>
  <div style="padding:30px;">
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-plus"
      plain
      @click="add"
    >添加</el-button>
    <PageTable
      ref="dataTable"
      :data="tableData"
      :page-sizes="[5,10]"
      :page-size="5"

      :paging="true"
      :dynamic-column-setting="true"
      :column-visibles="columnVisibles"
      :hiden-column-indexs="[0,10,11,12,13,14,15]"
      :always-show-column-indexs="[1]"

      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column v-if="columnVisibles[0]" label="ID" prop="id" />
      <el-table-column v-if="columnVisibles[1]" label="试题-题干" prop="question" />
      <el-table-column v-if="columnVisibles[2]" label="选项A" prop="optionA" />
      <el-table-column v-if="columnVisibles[3]" label="选项B" prop="optionB" />
      <el-table-column v-if="columnVisibles[4]" label="选项C" prop="optionC" />
      <el-table-column v-if="columnVisibles[5]" label="选项D" prop="optionD" />
      <el-table-column v-if="columnVisibles[6]" label="选项E" prop="optionE" />
      <el-table-column v-if="columnVisibles[7]" label="答案" prop="answer" />
      <el-table-column v-if="columnVisibles[8]" label="试题解析" prop="parsing" />
      <el-table-column v-if="columnVisibles[9]" label="试题题型" prop="topic" />
      <el-table-column v-if="columnVisibles[10]" label="试题题干的md5值" prop="md5" />
      <el-table-column v-if="columnVisibles[11]" label="年级" prop="grade" />
      <el-table-column v-if="columnVisibles[12]" label="知识点" prop="knowledge" />
      <el-table-column v-if="columnVisibles[13]" label="试题区域" prop="area" />
      <el-table-column v-if="columnVisibles[14]" label="试题年份" prop="year" />
      <el-table-column v-if="columnVisibles[15]" label="试题类型" prop="type" />
      <el-table-column v-if="columnVisibles[16]" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-close"
            @click="deleteQuestion(scope.row)"
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
        data.push({ id: i, question: i, optionA: i, optionB: i, optionC: i, optionD: i,
          optionE: i, answer: i, parsing: i, topic: i, md5: i, grade: i,
          knowledge: i, area: i, year: i, type: i })
      }

      this.tableData = data
    },
    clickFunc(row) {
      // console.log(row);
      alert(JSON.stringify(row))
    },
    add() {
      // 添加
    },
    deleteQuestion(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss">
</style>
