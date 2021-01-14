<template>
  <div>
    <pre>
      前端分页+动态列案例：
      （使用方式基本和原生 el-table 一样）

      1、开启动态列功能：设置dynamicColumnSetting属性为true。
      2、设置列可见性：设置columnVisibles属性（初始为全true），并在每个列标签中使用v-if引用对应列下标的值。列下标从0开始。
      3、设置初始隐藏的列的下标数组：设置hidenColumnIndexs属性，列下标从0开始。
      4、设置不允许隐藏的列的下标数组：设置alwaysShowColumnIndexs属性，列下标从0开始。
      5、设置是否在checkbox显示不允许隐藏的列信息：设置showAlwaysShowColumnInCheckbox属性。
      6、通过表格字段定制功能动态设置展示列
    </pre>
    <PageTable
      ref="dataTable"
      :data="tableData"
      :page-sizes="[5,10]"
      :page-size="5"

      :paging="true"
      :dynamic-column-setting="true"
      :column-visibles="columnVisibles"
      :hiden-column-indexs="[3]"
      :always-show-column-indexs="[1,5]"

      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column v-if="columnVisibles[0]" type="selection" width="55" />
      <el-table-column v-if="columnVisibles[1]" label="账号" prop="name" />
      <el-table-column v-if="columnVisibles[2]" label="名称" prop="nickname" />
      <el-table-column v-if="columnVisibles[3]" label="邮箱" prop="email" />
      <el-table-column v-if="columnVisibles[4]" label="状态">
        <template slot-scope="scope">{{ scope.row.state%2===0?'正常':'锁定' }}</template>
      </el-table-column>
      <el-table-column v-if="columnVisibles[5]" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click.stop="clickFunc(scope.row)">操作按钮</el-button>
        </template>
      </el-table-column>
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
      columnVisibles: new Array(6).fill(true)
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
        data.push({ name: i, nickname: i, email: i, state: i })
      }

      this.tableData = data
    },
    clickFunc(row) {
      // console.log(row);
      alert(JSON.stringify(row))
    }
  }
}
</script>

<style lang="scss">
</style>
