<template>
  <div class="home">
    <mob-button @click="handleClick1">open toast</mob-button>
    <mob-button @click="handleClick2">open loading</mob-button>
  </div>
</template>

<script>
import MobUI from '../../packages/index'
const { Toast } = MobUI

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
      Toast({
        message: 'u clicked the button'
      })
    },
    handleClick2 () {
      this.$loading.open({
        autoClose: true,
        duration: 2000
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  height 100vh
</style>
