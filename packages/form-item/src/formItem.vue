<template>
  <div class="api-form-item">
    <div class="api-form-item-line border-bottom">
      <div class="api-form-item-label">{{ label }}</div>
      <div class="api-form-item-split"></div>
      <div class="api-form-item-right">
        <slot></slot>
      </div>
    </div>
    <div v-if="error" class="api-form-item-error">
      <span class="error-icon"></span>
      <span>{{ validateMsg }}</span>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'

export default {
  name: 'MobFormItem',
  provide () {
    return {
      formItem: this
    }
  },
  inject: {
    form: {
      default: {
        model: {},
        rules: {}
      }
    }
  },
  props: {
    prop: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    itemValue () {
      return this.form.model[this.prop]
    },
    itemRules () {
      return this.form.rules[this.prop]
    }
  },
  data () {
    return {
      error: false,
      validateMsg: ''
    }
  },
  mounted () {
    if (this.prop) {
      this.$parent.addItem(this)
    }
  },
  methods: {
    onBlur () {
      this.validate('blur')
    },
    onChange () {
      this.validate('change')
    },
    getRules (trigger) {
      if (!this.itemRules) return []
      return this.itemRules.filter(rule => {
        if (rule.trigger && rule.trigger.indexOf(trigger) >= 0) {
          return true
        } else {
          return false
        }
      })
    },
    validate (trigger, callback = () => {}) {
      const rules = this.getRules(trigger)
      if (!rules || rules.length === 0) {
        callback()
        return
      }
      const descriptor = {}
      descriptor[this.prop] = rules
      const validator = new AsyncValidator(descriptor)
      const model = {}
      model[this.prop] = this.itemValue
      validator.validate(model, errors => {
        this.error = !!errors
        this.validateMsg = errors ? errors[0].message : ''
        callback(this.validateMsg)
      })
    }
  }
}
</script>

<style lang="stylus">
$imgUrl = '../../../examples/assets/'

.api-form-item-line
  height 130px
  border-bottom 1px solid #e7e7e7
  display flex
  align-items center
  &:before
    border-color #e7e7e7
  .api-form-item-label
    width 136px
    font-size 30px
    color #555
    text-align left
  .api-form-item-split
    width 2px
    height 16px
    background #e7e7e7
  .api-form-item-right
    flex 1
    padding-left 20px
    text-align left

.api-form-item-error
  margin-top 20px
  font-size 24px
  color #F85C5C
  text-align left
  .error-icon
    margin-right 10px
    display inline-block
    width 24px
    height 24px
    background url($imgUrl + 'error.png') no-repeat
    background-size contain
  span
    vertical-align middle
</style>
