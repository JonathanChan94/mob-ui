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
      <div ref="top" class="scroll-wrapper-top"></div>
      <slot></slot>
      <div ref="bottom" v-if="canPullUp" class="scroll-load">
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
      state: 1, // 1 加载更多 2 等待手松开 3 加载中 3 到底了
      startY: 0,
      winHeight: 0,
      height: 0,
      offsetTop: 0,
      diff: 0,
      top: 0,
      isPullUp: false,
      isBounce: false,
      observer: null, // intersection observer
      firstToBottom: true, // 是否第一次触底
      pullUp: false, // 是否可以上拉
      pullDown: false, // 是否可以下拉
      reloadState: 1, // 1 继续下拉 2 释放刷新 3 加载中
      firstToTop: true, // 是否第一次到顶部
      reloadTop: -60,
      reloadHeight: 0
    }
  },
  computed: {
    stateText () {
      switch (this.state) {
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
  watch: {
    canPullUp: {
      handler: function (val) {
        this.$nextTick(() => {
          this.observer.observe(this.$refs.top)
          this.observer.observe(this.$refs.bottom)
        })
      },
      immediate: true
    }
  },
  mounted () {
    this.parent = this.$refs.container.parentNode
    console.log(this.parent)
    this.$refs.wrapper.addEventListener('touchstart', this.touchStart)
    this.$refs.wrapper.addEventListener('touchmove', this.touchMove)
    this.$refs.wrapper.addEventListener('touchend', this.touchEnd)
    // 创建一个intersection observer,在监测的元素完全可见以及完全不可见时触发回调
    this.observer = new IntersectionObserver(this.observerCb, {
      root: this.parent,
      threshold: [0, 1]
    })
  },
  beforeDestroy () {
    this.$refs.wrapper.removeEventListener('touchmove', this.touchMove)
    this.$refs.wrapper.removeEventListener('touchend', this.touchEnd)
  },
  methods: {
    observerCb (entries) {
      entries.forEach(item => {
        console.log(item.target, item.intersectionRatio)
        if (item.target === this.$refs.top) {
          if (item.intersectionRatio > 0) {
            this.pullDown = true
            this.firstToTop = true
          } else if (item.intersectionRatio === 0) {
            this.pullDown = false
          }
        } else if (item.target === this.$refs.bottom) {
          if (item.intersectionRatio === 1) {
            if (this.pullUp) return
            this.firstToBottom = true
            this.pullUp = true
          } else if (item.intersectionRatio === 0) {
            this.pullUp = false
          }
        }
      })
    },
    loadEnd (end = false) {
      if (end) {
        this.state = 4
      } else {
        this.state = 1
      }
    },
    touchStart (e) {
      this.startY = e.touches[0].clientY
    },
    touchMove (e) {
      if (!this.pullUp && !this.pullDown) return
      const posY = e.touches[0].clientY
      if (this.pullDown && posY < this.startY) return
      if (this.pullUp && posY > this.startY) return
      e.preventDefault()
      if (this.pullDown) {
        if (this.firstToTop) {
          this.startY = e.touches[0].clientY
          this.firstToTop = false
        }
        this.diff = posY - this.startY
        this.top = Math.pow(this.diff, 0.82)
      } else if (this.pullUp) {
        if (this.firstToBottom) {
          this.startY = e.touches[0].clientY
          this.firstToBottom = false
        }
        this.diff = this.startY - e.touches[0].clientY
        this.top = -Math.pow(this.diff, 0.82)
        if (this.state === 3 || this.state === 4) return
        if (this.diff > 60) {
          this.state = 2
        }
      }
    },
    touchEnd (e) {
      if (this.pullUp) {
        this.isBounce = true
        this.top = 0
        this.pullUp = false
        if (this.state === 2) {
          this.state = 3
          this.$emit('load')
        }
        setTimeout(() => {
          this.isBounce = false
        }, 300)
      } else if (this.pullDown) {
        this.isBounce = true
        this.top = 0
        setTimeout(() => {
          this.isBounce = false
        }, 300)
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
  .scroll-wrapper-top
    width 100%
    height 2px

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
