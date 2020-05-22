<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/form">Form</router-link> |
      <router-link to="/calendar">Calendar</router-link> |
      <router-link to="/scroll">Scroll</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="stylus">
html,body
  height 100%
#app
  width 100%
  height 100%
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
*
  margin 0
  padding 0

.nav
  height 100px
  line-height 100px
</style>
