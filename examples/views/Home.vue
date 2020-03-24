<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <mob-button @click="handleClick">button</mob-button>
    <!-- <mob-input v-model="val" placeholder="请输入"></mob-input> -->
    <mob-scroll ref="scroll" :canPull="true" @load="load">
      <div class="content"></div>
    </mob-scroll>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      val: ''
    }
  },
  created () {
    this.$loading.open({
      autoClose: true,
      duration: 2000
    })
  },
  methods: {
    handleClick () {
      this.$toast({
        message: 'u clicked the button u clicked the button u clicked the button'
      })
    },
    load () {
      setTimeout(() => {
        this.$refs.scroll.loadEnd(true)
      }, 2000)
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  height 100vh
</style>
