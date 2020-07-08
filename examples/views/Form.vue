<template>
  <div class="form">
    <mob-form ref="form" :model="form" :rules="rules">
      <mob-form-item label="姓名" prop="name">
        <mob-input v-model="form.name" placeholder="输入姓名"></mob-input>
      </mob-form-item>
      <mob-form-item label="电话" prop="mobile">
        <mob-input v-model="form.mobile" placeholder="输入电话"></mob-input>
      </mob-form-item>
      <mob-button @click="click">click</mob-button>
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
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 5, max: 10, message: '请输入5-10之间的长度', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { pattern: /^\d{11}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async click () {
      try {
        await this.$refs.form.validate()
        console.log('通过')
      } catch (e) {
        console.log('error')
      }
    }
  }
}
</script>
