<template>
  <div
    :style="{transform: 'translate3d(0,' + top + 'px, 0)'}"
    :class="['scroll-wrapper', isBounce ? 'transition' : '']"
    ref="wrapper">
    <slot></slot>
    <div v-if="canPull" class="scroll-load">
      <div v-if="state === 1">上拉加载更多</div>
      <div v-else-if="state === 2">松开加载更多</div>
      <div v-else-if="state === 3">加载中...</div>
      <div v-else-if="state === 4">到底啦</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobScroll',
  props: {
    canPull: { // 是否开启上拉加载工能
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      state: 1, // 1 加载更多 2 等待手松开 3 加载中 3 到底了
      startY: 0,
      winHeight: 0,
      height: 0,
      offsetTop: 0,
      diff: 0,
      top: 0,
      isPullUp: false,
      isBounce: false
    }
  },
  mounted () {
    this.$refs.wrapper.addEventListener('touchstart', this.touchStart)
    this.$refs.wrapper.addEventListener('touchmove', this.touchMove)
    this.$refs.wrapper.addEventListener('touchend', this.touchEnd)
  },
  methods: {
    refresh () {
      this.offsetTop = this.$refs.wrapper.offsetTop
      this.height = this.$refs.wrapper.scrollHeight
      this.winHeight = window.innerHeight
    },
    loadEnd (end = false) {
      if (end) {
        this.state = 4
      } else {
        this.state = 1
      }
    },
    touchStart (e) {
      this.startY = e.touches[0].pageY
    },
    touchMove (e) {
      if (!this.canPull) return
      const posY = e.touches[0].pageY
      if (posY < this.startY && this.checkBottom()) {
        this.isPullUp = true
        this.diff = this.startY - posY
        this.top = -Math.pow(this.diff, 0.82)
        if (this.state === 3 || this.state === 4) return
        if (this.diff > 60) {
          this.state = 2
        }
      }
    },
    touchEnd (e) {
      if (this.isPullUp) {
        this.isBounce = true
        this.isPullUp = false
        this.top = 0
        if (this.state === 2) {
          this.state = 3
          this.$emit('load')
        }
        setTimeout(() => {
          this.isBounce = false
        }, 300)
      }
    },
    checkBottom () {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      if (scrollTop + this.winHeight >= this.offsetTop + this.height) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="stylus">
.scroll-wrapper.transition
  transition all .3s ease

.scroll-load
  padding 30px 0 40px
  // background #f7f7f7
  font-size 24px
  color #bbb
</style>
