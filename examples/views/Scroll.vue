<template>
  <div class="scroll-content">
    <mob-scroll
      ref="scroll"
      :can-pull-up="true"
      :can-pull-down="true"
      @load="load"
      @reload="reload">
      <ul>
        <li v-for="n in count" :key="n">{{n}}</li>
      </ul>
    </mob-scroll>
  </div>
</template>

<script>
export default {
  name: 'Scroll',
  data () {
    return {
      count: 40,
      canPull: true
    }
  },
  methods: {
    load () {
      console.log('load')
      setTimeout(() => {
        this.count += 10
        this.$refs.scroll.loadEnd(false)
      }, 1000)
    },
    reload () {
      console.log('reload')
      setTimeout(() => {
        this.$refs.scroll.reloadEnd()
      }, 1000)
    }
  }
}
</script>

<style lang="stylus" scoped>
.scroll-content
  width 100%
  height calc(100% - 120px)
  overflow auto
  // touch-action none
</style>
