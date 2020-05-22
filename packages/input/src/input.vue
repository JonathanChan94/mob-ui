<template>
  <div class="api-input-wrapper">
    <input
      :value="currentValue"
      :type="type"
      v-bind="$attrs"
      class="api-input"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur">
  </div>
</template>

<script>
export default {
  name: 'MobInput',
  inject: {
    formItem: {
      default: ''
    }
  },
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {
      currentValue: this.value,
      scrollTop: 0
    }
  },
  watch: {
    value (val) {
      this.currentValue = val
    }
  },
  methods: {
    handleFocus () {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.$emit('focus', event)
    },
    handleInput (event) {
      this.$emit('input', event.target.value)
    },
    handleChange (event) {
      this.$emit('change', event.target.value)
    },
    handleBlur (event) {
      document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop
      if (this.formItem) this.formItem.onBlur()
      this.$emit('blur', event)
    }
  }
}
</script>

<style lang="stylus">
.api-input
  appearance none
  outline none
  border none
  width 100%
  height 60px
  line-height 60px
  font-size 28px
  color #333
  &::placeholder
    color #ddd
</style>
