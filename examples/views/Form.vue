<template>
  <div class="form">
    <mob-form :model="form" :rules="rules">
      <mob-form-item label="姓名" prop="name">
        <mob-input v-model="form.name" placeholder="输入姓名"></mob-input>
      </mob-form-item>
      <mob-form-item label="电话" prop="mobile">
        <mob-input v-model="form.mobile"></mob-input>
      </mob-form-item>
    </mob-form>
  </div>
</template>

<script>
export default {
  name: 'Form',
  data () {
    return {
      form: {
        name: '',
        mobile: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
