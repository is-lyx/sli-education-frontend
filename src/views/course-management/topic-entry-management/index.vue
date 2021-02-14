<template>
  <div style="padding:30px;">
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-plus"
      plain
      @click="addVisible = true"
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
            type="primary"
            size="mini"
            @click="edit(scope.row.id)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteQuestion(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </PageTable>
    <!--编辑-->
    <el-dialog :title="editTitle" :visible.sync="editVisible">
      <el-card style="margin:10px">
        <div>
          <h4 style="text-align: left; font-size: 18px;">
            题目：
            <el-input
              v-model="questionForm.question"
              size="small"
              type="textarea"
              style="width: 580px"
              placeholder="请输入内容"
              autosize
            />
          </h4>
          <div>
            <el-image
              v-if="questionForm.img !== null"
              style="width: 60px; height: 60px;"
              :src="questionForm.img"
            />
            <img
              v-else
              src="../../../assets/404_images/404.png"
              style="width: 60px; height: 60px;"
            >
          </div>
          <p style="font-size: 15px;display:inline;">
            难度等级：
            <el-select v-model="questionForm.difficultyValue" placeholder="请选择">
              <el-option
                v-for="item in difficultyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </p>
          <p style="font-size: 15px;display:inline;">
            题型：
            <el-select v-model="questionForm.typeValue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </p>
          <div v-if="questionForm.typeValue == '0'" style="margin-top:20px;">
            <p style="font-size: 15px;display:inline;">
              A.
              <el-input
                v-model="questionForm.optionA"
                size="small"
                style="width: 110px"
                placeholder="请输入内容"
                clearable
              />
            </p>
            <p style="font-size: 15px;display:inline;">
              B.
              <el-input
                v-model="questionForm.optionB"
                size="small"
                style="width: 110px"
                placeholder="请输入内容"
                clearable
              />
            </p>
            <p style="font-size: 15px;display:inline;">
              C.
              <el-input
                v-model="questionForm.optionC"
                size="small"
                style="width: 110px"
                placeholder="请输入内容"
                clearable
              />
            </p>
            <p style="font-size: 15px;display:inline;">
              D.
              <el-input
                v-model="questionForm.optionD"
                size="small"
                style="width: 110px"
                placeholder="请输入内容"
                clearable
              />
            </p>
            <p style="font-size: 15px;display:inline;">
              E.
              <el-input
                v-model="questionForm.optionE"
                size="small"
                style="width: 110px"
                placeholder="请输入内容"
                clearable
              />
            </p>
          </div>
          <el-divider />
          <p style="font-size: 15px;">
            简明答案：
            <el-input
              v-model="questionForm.rightOption"
              size="small"
              type="textarea"
              style="width: 550px"
              placeholder="请输入内容"
              autosize
              clearable
            />
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            详细答案：
            <el-input
              v-model="questionForm.detailOption"
              size="small"
              type="textarea"
              style="width: 550px"
              placeholder="请输入内容"
              autosize
            />
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            解析：
            <el-input
              v-model="questionForm.analysis"
              size="small"
              type="textarea"
              style="width: 580px"
              placeholder="请输入内容"
              autosize
            />
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            知识点：
            <el-input
              v-model="questionForm.knowledge"
              size="small"
              type="textarea"
              style="width: 565px"
              placeholder="请输入内容"
              autosize
            />
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            年级：
            <el-input
              v-model="questionForm.grade"
              size="small"
              type="textarea"
              style="width: 580px"
              placeholder="请输入内容"
              autosize
            />
          </p>
        </div>
      </el-card>
      <div style="text-align:center">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="postEdit">保存</el-button>
      </div>
    </el-dialog>
    <!--添加题目-->
    <el-dialog title="添加题目" :visible.sync="addVisible">
      <el-card style="margin:10px">
        <div>
          <h4 style="text-align: left; font-size: 18px;">
            题目：
            <el-input
              v-model="addQuestionForm.question"
              size="small"
              type="textarea"
              style="width: 580px"
              placeholder="请输入内容"
              autosize
            />
          </h4>
          <div>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="2"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">上传题目图片</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
          <div style="margin-top:20px">
            <p style="font-size: 15px;display:inline;">
              难度等级：
              <el-select v-model="addQuestionForm.difficultyValue" placeholder="请选择">
                <el-option
                  v-for="item in difficultyOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </p>
            <p style="font-size: 15px;display:inline;">
              题型：
              <el-select v-model="addQuestionForm.typeValue" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </p>
          </div>
          <div v-if="addQuestionForm.typeValue == '0'" style="margin-top:20px;">
            <p style="font-size: 15px;display:inline;">
              A.
              <el-input
                v-model="addQuestionForm.optionA"
                size="small"
                style="width: 110px"
                placeholder="请输入内容"
                clearable
              />
            </p>
            <p style="font-size: 15px;display:inline;">
              B.
              <el-input
                v-model="addQuestionForm.optionB"
                size="small"
                style="width: 110px"
                placeholder="请输入内容"
                clearable
              />
            </p>
            <p style="font-size: 15px;display:inline;">
              C.
              <el-input
                v-model="addQuestionForm.optionC"
                size="small"
                style="width: 110px"
                placeholder="请输入内容"
                clearable
              />
            </p>
            <p style="font-size: 15px;display:inline;">
              D.
              <el-input
                v-model="addQuestionForm.optionD"
                size="small"
                style="width: 110px"
                placeholder="请输入内容"
                clearable
              />
            </p>
            <p style="font-size: 15px;display:inline;">
              E.
              <el-input
                v-model="addQuestionForm.optionE"
                size="small"
                style="width: 110px"
                placeholder="请输入内容"
                clearable
              />
            </p>
          </div>
          <el-divider />
          <p style="font-size: 15px;">
            简明答案：
            <el-input
              v-model="addQuestionForm.rightOption"
              size="small"
              type="textarea"
              style="width: 550px"
              placeholder="请输入内容"
              autosize
              clearable
            />
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            详细答案：
            <el-input
              v-model="addQuestionForm.detailOption"
              size="small"
              type="textarea"
              style="width: 550px"
              placeholder="请输入内容"
              autosize
            />
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            解析：
            <el-input
              v-model="addQuestionForm.analysis"
              size="small"
              type="textarea"
              style="width: 580px"
              placeholder="请输入内容"
              autosize
            />
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            知识点：
            <el-input
              v-model="addQuestionForm.knowledge"
              size="small"
              type="textarea"
              style="width: 565px"
              placeholder="请输入内容"
              autosize
            />
          </p>
          <el-divider />
          <p style="font-size: 15px;">
            年级：
            <el-input
              v-model="addQuestionForm.grade"
              size="small"
              type="textarea"
              style="width: 580px"
              placeholder="请输入内容"
              autosize
            />
          </p>
        </div>
      </el-card>
      <div style="text-align:center">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="postAdd">保存</el-button>
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
      tableData: [],
      columnVisibles: new Array(17).fill(true),
      editTitle: '编辑题目',
      editVisible: false, // 编辑题目框
      questionForm: {
        id: '1',
        question: '我是题目',
        img: '',
        typeValue: '0',
        difficultyValue: '1',
        optionA: '1',
        optionB: '2',
        optionC: '3',
        optionD: '4',
        optionE: '5',
        rightOption: '1',
        detailOption: '详细答案blablabla',
        analysis: '解析',
        knowledge: '-',
        grade: '-'
      },
      options: [{
        value: '0',
        label: '选择题'
      }, {
        value: '1',
        label: '填空题'
      }],
      difficultyOptions: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }],
      addVisible: false,
      addQuestionForm: {
        question: '',
        img: '',
        typeValue: '',
        difficultyValue: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        optionE: '',
        rightOption: '',
        detailOption: '',
        analysis: '',
        knowledge: '',
        grade: ''
      },
      fileList: []
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
    postAdd() {
      this.addVisible = false
      // 添加题目接口
    },
    edit(id) {
      // 编辑
      this.editVisible = true
      this.editTitle = '编辑题目(' + id + ')'
    },
    postEdit() {
      this.editVisible = false
      // 传修改后的表单，连接口
    },
    deleteQuestion(id) {
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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="scss">
</style>
