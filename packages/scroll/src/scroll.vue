<template>
  <div ref="container" class="scroll-container">
    <div
      ref="reload"
      v-if="canPullDown"
      :style="{top: reloadTop + 'px'}"
      class="scroll-reload">
      <span>{{ reloadText }}</span>
    </div>
    <div
      :style="{transform: 'translate3d(0,' + top + 'px, 0)'}"
      :class="['scroll-wrapper', isBounce ? 'transition' : '']"
      ref="wrapper">
      <slot></slot>
      <div
        ref="bottom"
        v-if="canPullUp"
        class="scroll-load">
        <span>{{ stateText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobScroll',
  props: {
    canPullUp: { // 是否开启上拉加载功能
      type: Boolean,
      default: false
    },
    canPullDown: { // 是否开启下拉刷新功能
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      parent: null,
      startY: 0,
      parentHeight: 0,
      height: 0,
      offsetTop: 0,
      diff: 0,
      top: 0,
      isBounce: false, // 是否开启弹性效果
      loadState: 1, // 1 加载更多 2 等待手松开 3 加载中 3 到底了
      firstToBottom: true, // 是否第一次触底
      isPullUp: false,
      reloadState: 1, // 1 继续下拉 2 释放刷新 3 加载中
      firstToTop: true, // 是否第一次到顶部
      reloadTop: -60,
      reloadHeight: 0,
      isPullDown: false
    }
  },
  computed: {
    stateText () {
      switch (this.loadState) {
        case 1:
          return '上拉加载更多'
        case 2:
          return '松开加载更多'
        case 3:
          return '加载中...'
        case 4:
          return '到底啦'
        default:
          return ''
      }
    },
    reloadText () {
      switch (this.reloadState) {
        case 1:
          return '继续下拉'
        case 2:
          return '释放刷新'
        case 3:
          return '刷新中...'
        default:
          return ''
      }
    }
  },
  mounted () {
    this.initHeight()
    this.$refs.wrapper.addEventListener('touchstart', this.touchStart)
    this.$refs.wrapper.addEventListener('touchmove', this.touchMove, { passive: false })
    this.$refs.wrapper.addEventListener('touchend', this.touchEnd)
  },
  beforeDestroy () {
    this.$refs.wrapper.removeEventListener('touchstart', this.touchStart)
    this.$refs.wrapper.removeEventListener('touchmove', this.touchMove)
    this.$refs.wrapper.removeEventListener('touchend', this.touchEnd)
  },
  methods: {
    initHeight () {
      // 计算距离父元素的offsetTop需要父元素position不为static
      this.parent = this.$refs.container.parentNode
      const position = getComputedStyle(this.parent).getPropertyValue('position')
      if (position === 'static') {
        this.parent.style.position = 'relative'
      }
      this.parentHeight = this.parent.offsetHeight
      this.offsetTop = this.$refs.wrapper.offsetTop
      this.height = this.$refs.wrapper.scrollHeight
      if (this.canPullDown) {
        this.reloadHeight = this.$refs.reload.offsetHeight
        this.reloadTop = -this.reloadHeight
      }
    },
    loadEnd (end = false) {
      if (end) {
        this.loadState = 4
      } else {
        this.loadState = 1
      }
      this.$nextTick(() => {
        this.height = this.$refs.wrapper.scrollHeight
        this.firstToBottom = true
      })
    },
    reloadEnd () {
      this.isBounce = true
      this.reloadState = 1
      this.reloadTop = -this.reloadHeight
      this.top = 0
      setTimeout(() => {
        this.isBounce = false
        this.height = this.$refs.wrapper.scrollHeight
        this.firstToTop = true
      }, 300)
    },
    touchStart (e) {
      this.startY = e.touches[0].clientY
    },
    touchMove (e) {
      if (!this.canPullUp && !this.canPullDown) return
      const posY = e.touches[0].clientY
      if (this.canPullUp && posY < this.startY) {
        if (!this.checkBottom()) return
        e.preventDefault()
        if (this.firstToBottom) {
          this.startY = posY
          this.firstToBottom = false
        }
        this.isPullUp = true
        this.diff = this.startY - posY
        this.top = -Math.pow(this.diff, 0.82)
        if (this.loadState === 3 || this.loadState === 4) return
        if (this.diff > 60) {
          this.loadState = 2
        }
      } else if (this.canPullDown && posY > this.startY) {
        if (!this.checkTop()) return
        e.preventDefault()
        // if (this.firstToTop) {
        //   this.startY = posY
        //   this.firstToTop = false
        // }
        // this.isPullDown = true
        // this.diff = posY - this.startY
        // this.top = Math.pow(this.diff, 0.82)
        // this.reloadTop = this.top - this.reloadHeight
        // if (this.reloadState === 3) return
        // if (this.top >= this.reloadHeight) {
        //   this.reloadTop = 0
        //   this.reloadState = 2
        // }
        if (this.firstToTop) {
          this.startY = posY
          this.firstToTop = false
        }
        this.isPullDown = true
        this.diff = posY - this.startY
        this.top = this.reloadState === 3 ? Math.pow(this.diff, 0.82) + this.reloadHeight : Math.pow(this.diff, 0.82)
        this.reloadTop = this.reloadState === 3 ? 0 : this.top - this.reloadHeight
        if (this.top >= this.reloadHeight && this.reloadState !== 3) {
          this.reloadTop = 0
          this.reloadState = 2
        }
      }
    },
    touchEnd (e) {
      if (!this.isPullUp && !this.isPullDown) return
      if (this.isPullUp) {
        this.isPullUp = false
        this.top = 0
        if (this.loadState === 2) {
          this.loadState = 3
          this.$emit('load')
        }
      } else if (this.isPullDown) {
        this.isPullDown = false
        if (this.reloadState === 2) {
          this.top = this.reloadHeight
          this.reloadTop = 0
          this.reloadState = 3
          this.$emit('reload')
        } else {
          this.top = 0
          this.reloadTop = -this.reloadHeight
        }
      }
      this.isBounce = true
      setTimeout(() => {
        this.isBounce = false
      }, 300)
    },
    checkTop () {
      const scrollTop = this.parent.scrollTop
      if (scrollTop <= 0) {
        this.parent.scrollTop = 0
        return true
      }
      return false
    },
    checkBottom () {
      const scrollTop = this.parent.scrollTop
      if (scrollTop + this.parentHeight >= this.offsetTop + this.height) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="stylus">
.scroll-container
  position relative
  overflow hidden

.scroll-wrapper
  &.transition
    transition all .3s ease

.scroll-reload
  width 100%
  height 100px
  line-height 100px
  position absolute
  left 0
  font-size 24px
  color #bbb

.scroll-load
  height 100px
  line-height 100px
  font-size 24px
  color #bbb
  text-align center
</style>
