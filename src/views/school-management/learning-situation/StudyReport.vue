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
          @click="findListData"
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
            <el-form-item label="状态：">
              <el-select
                v-model="form.state"
                placeholder="请选择状态"
                clearable
                style="width: 203px;"
                @change="findListData"
              >
                <el-option
                  label="全部"
                  value="0"
                />
                <el-option
                  label="已完成"
                  value="1"
                />
                <el-option
                  label="未完成"
                  value="2"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="创建日期：">
              <el-date-picker
                v-model="form.creationTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <!-- 列表 -->
    <PageTable
      ref="dataTable"
      :data="tableData"
      :page-sizes="[5,10]"
      :page-size="5"

      :paging="true"
      :dynamic-column-setting="true"
      :column-visibles="columnVisibles"
      :hiden-column-indexs="[3,4]"

      :show-always-show-column-in-checkbox="true"
    >
      <el-table-column v-if="columnVisibles[0]" label="创建日期" prop="creationTime" />
      <el-table-column v-if="columnVisibles[1]" label="提交日期" prop="submitTime" />
      <el-table-column v-if="columnVisibles[2]" label="试卷名称" prop="testName" />
      <el-table-column v-if="columnVisibles[3]" label="试卷ID" prop="testID" />
      <el-table-column v-if="columnVisibles[4]" label="知识点ID" prop="knowledgeID" />
      <el-table-column v-if="columnVisibles[5]" label="一级知识点" prop="knowledge1" />
      <el-table-column v-if="columnVisibles[6]" label="二级知识点" prop="knowledge2" />
      <el-table-column v-if="columnVisibles[7]" label="三级知识点" prop="knowledge3" />
      <el-table-column v-if="columnVisibles[8]" label="题量" prop="amountOfTheQuestions" />
      <el-table-column v-if="columnVisibles[9]" label="答对" prop="isTrue" />
      <el-table-column v-if="columnVisibles[10]" label="答错" prop="isFalse" />
      <el-table-column v-if="columnVisibles[11]" label="平均难度" prop="avgDifference" />
      <el-table-column v-if="columnVisibles[12]" label="准确率" prop="accuracy" />
      <el-table-column v-if="columnVisibles[13]" label="操作" min-width="70">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="getWorkDetail(scope.row.testID)"
          >作业详情</el-button>
        </template>
      </el-table-column>
    </PageTable>

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
      columnVisibles: new Array(14).fill(true),
      total: 0,
      tableData: [],
      form: {
        state: '',
        creationTime: ''
      }
    }
  },
  mounted() {
    // 发起查询请求
    this.queryData()
  },
  methods: {
    queryData() {
      // 模拟后台数据
      const data = [
        {
          creationTime: '2021-01-30',
          submitTime: '2021-01-31',
          testName: '组合自测卷',
          testID: '100',
          knowledgeID: '123',
          knowledge1: '数与式',
          knowledge2: '有理数',
          knowledge3: '有理数',
          amountOfTheQuestions: '25',
          isTrue: '20',
          isFalse: '5',
          avgDifference: '1.24',
          accuracy: '0.80'
        },
        {
          creationTime: '2021-01-30',
          submitTime: '2021-01-31',
          testName: '组合自测卷',
          testID: '100',
          knowledgeID: '123',
          knowledge1: '数与式',
          knowledge2: '有理数',
          knowledge3: '有理数',
          amountOfTheQuestions: '25',
          isTrue: '20',
          isFalse: '5',
          avgDifference: '1.24',
          accuracy: '0.80'
        },
        {
          creationTime: '2021-01-30',
          submitTime: '2021-01-31',
          testName: '组合自测卷',
          testID: '100',
          knowledgeID: '123',
          knowledge1: '数与式',
          knowledge2: '有理数',
          knowledge3: '有理数',
          amountOfTheQuestions: '25',
          isTrue: '20',
          isFalse: '5',
          avgDifference: '1.24',
          accuracy: '0.80'
        },
        {
          creationTime: '2021-01-30',
          submitTime: '2021-01-31',
          testName: '组合自测卷',
          testID: '100',
          knowledgeID: '123',
          knowledge1: '数与式',
          knowledge2: '有理数',
          knowledge3: '有理数',
          amountOfTheQuestions: '25',
          isTrue: '20',
          isFalse: '5',
          avgDifference: '1.24',
          accuracy: '0.80'
        }]
      this.tableData = data
    },
    findListData() {
      this.getLearningListData()
    },
    getLearningListData() {
      // 获取列表
    },
    handleResetSearch() {
      this.form.state = ''
      this.form.creationTime = ''
    },
    getWorkDetail(testID) {
      // 作业详情
      this.$router.push({ path: '/WorkDetail', query: { testID: testID }})
    }
  }
}
</script>
