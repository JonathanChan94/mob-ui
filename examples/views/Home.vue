<template>
  <div class="home">
    <mob-button @click="handleClick1">open toast</mob-button>
    <mob-button @click="handleClick2">open loading</mob-button>
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
  mounted () {
    window.addEventListener('touchmove', (e) => {
      e.preventDefault()
    })
  },
  methods: {
    handleClick1 () {
      /* eslint-disable */
      WeixinJSBridge.call('closeWindow');
      // this.$toast({
      //   message: 'u clicked the button'
      // })
    },
    handleClick2 () {
      this.$loading.open({
        autoClose: true,
        duration: 2000
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
