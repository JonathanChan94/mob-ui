<template>
  <transition
    name="fade"
    @after-leave="leave">
    <div v-show="show" class="toast">
      <div class="toast-wrapper">
        <p>{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      show: false,
      message: '',
      duration: 3000
    }
  },
  created () {
    this.show = true
    this.countDown()
  },
  methods: {
    countDown () {
      if (this.duration) {
        setTimeout(() => {
          this.show = false
        }, this.duration)
      }
    },
    leave () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="stylus" scoped>
.toast
  position fixed
  width 100%
  left 0
  top 50%
  z-index 1999
  transform translateY(-50%)
  display flex
  justify-content center
.toast-wrapper
  max-width 550px
  padding 26px 40px
  background rgba(50, 50, 51, 0.88)
  border-radius 8px
  font-size 28px
  line-height 40px
  color #fff
  white-space pre-wrap
  box-sizing border-box
</style>
