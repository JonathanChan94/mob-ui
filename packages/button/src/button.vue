<template>
  <div
    :class="['api-button', type, loading ? 'is-loading' : '']"
    @click="handleClick">
    <span v-if="loading" class="loading"></span>
    <span><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'MobButton',
  props: {
    type: {
      type: String,
      default: 'dark'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick (e) {
      if (this.loading) return
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="stylus" scoped>
.api-button
  margin 0 auto
  width 480px
  height 100px
  line-height 100px
  border-radius 50px
  font-size 32px
  font-weight bold
  letter-spacing 5px
  display flex
  justify-content center
  align-items center
  &.dark
    background #006AFF
    box-shadow 0px 9px 34px 1px rgba(91,147,222,0.55)
    color #F5F8FC
  &.light
    background #fff
    border 2px solid #006AFF
    color #006AFF
  .loading
    margin-right 18px
    display block
    width 32px
    height 32px
    // background url($imgUrl + 'button-loading.png') no-repeat
    background-size contain
    animation rotating 2s linear infinite
  span
    vertical-align middle
  &.is-loading
    position relative
    &:before
      pointer-events none
      content ''
      position absolute
      left 0px
      top 0px
      right 0px
      bottom 0px
      border-radius inherit
      background-color hsla(0, 0%, 100%, .35)

@keyframes rotating
  0%
    transform rotate(0deg)
  100%
    transform rotate(1turn)
</style>
