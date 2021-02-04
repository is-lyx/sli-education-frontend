<template>
  <el-form ref="form" :model="form" :rules="formRules">
    <el-form-item label="旧密码">
      <el-input v-model.trim="form.oldPassword" />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model.trim="form.newPassword" />
    </el-form-item>
    <el-form-item style="text-align:center">
      <el-button type="primary" @click="updatePassword">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updatePassword } from '@/api/user'
export default {
  data() {
    return {
      form: {
        // username: this.$store.getters.name,
        userId: '1',
        oldPassword: '',
        newPassword: ''
      },
      formRules: {
        newPassword: [
          { min: 6, max: 20, message: '请输入6~20位的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    updatePassword() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        updatePassword(this.form).then(response => {
          if (response.status === 200) {
            this.$message.success('修改成功')
          } else {
            this.$message.erroe('修改失败')
          }
        })
      })
    }
  }
}
</script>
