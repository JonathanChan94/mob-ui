<template>
  <div class="api-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MobForm',
  provide () {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      default () {
        return {}
      }
    },
    rules: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      formItems: []
    }
  },
  methods: {
    addItem (val) {
      this.formItems.push(val)
    },
    validate (callback) {
      return new Promise(resolve => {
        let valid = true
        let count = 0
        if (this.formItems.length === 0) {
          callback(valid)
          return
        }
        this.formItems.forEach(item => {
          item.validate('', error => {
            count++
            if (error) {
              valid = false
            }
            if (count === this.formItems.length) {
              if (typeof callback === 'function') {
                callback(valid)
              }
              resolve(valid)
            }
          })
        })
      })
    }
  }
}
</script>

<style lang="stylus">
.api-form
  width 690px
  // min-height 527px
  margin 0 auto
  padding 0 40px
  box-sizing border-box
  // box-shadow 0px 2px 41px 2px rgba(183,200,224,0.34)
  // border-radius 20px
  // background #fff
</style>
