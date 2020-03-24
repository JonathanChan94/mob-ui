<template>
  <div v-show="show" class="loading-wrapper">
    <div class="loading-icon"></div>
    <p class="loading-text">加载中...</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      show: false,
      autoClose: false,
      duration: 3000
    }
  },
  methods: {
    countDown () {
      if (this.autoClose) {
        setTimeout(() => {
          this.show = false
        }, this.duration)
      }
    }
  }
}
</script>

<style lang="stylus">
$imgUrl = '../../../examples/assets/'
.loading-wrapper
  width 250px
  height 250px
  background rgba(50, 50, 51, 0.88)
  border-radius 10px
  position fixed
  top 50%
  left 50%
  z-index 1500
  transform translate(-50%, -50%)
  display flex
  flex-direction column
  justify-content center
  align-items center
  .loading-icon
    margin-bottom 50px
    width 64px
    height 64px
    background url($imgUrl + 'loading-icon.png') no-repeat
    background-size contain
    animation rotating 2s linear infinite
  .loading-text
    margin 0
    padding 0
    font-size 28px
    color #fff

@keyframes rotating
  0%
    transform rotate(0deg)
  100%
    transform rotate(1turn)
</style>
