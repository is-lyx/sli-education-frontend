<template>
  <el-form>
    <el-form-item label="旧密码">
      <el-input v-model.trim="user.oldPassword" />
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model.trim="user.newPassword" />
    </el-form-item>
    <el-form-item style="text-align:center">
      <el-button type="primary" @click="submit">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          oldPassword: '',
          newPassword: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$message({
        message: '用户信息修改成功',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
