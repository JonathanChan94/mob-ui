<template>
  <div class="calendar">
    <div class="calendar-title">
      <div class="calendar-btn" @click="prev">上个月</div>
      <div class="calendar-text">{{ `${year}-${month + 1}` }}</div>
      <div class="calendar-btn" @click="next">下个月</div>
    </div>
    <div class="calendar-content">
      <div v-for="item in weekDays" :key="item" class="calendar-item head">{{ item }}</div>
      <div v-for="item in prevArr" :key="item.key" class="calendar-item prev">{{ item.value }}</div>
      <div
        v-for="item in currentArr"
        :key="item.key"
        class="calendar-item current"
        @click="choose(item)">
        <div :class="[item.key === today ? 'is-today' : '', item.key === select ? 'is-select' : '']">
          {{ item.key === today ? '今日' : item.value }}
        </div>
      </div>
      <div v-for="item in nextArr" :key="item.key" class="calendar-item next">{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobCalendar',
  data () {
    return {
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      year: 0,
      month: 0,
      today: 0,
      prevArr: [],
      currentArr: [],
      nextArr: [],
      select: 0
    }
  },
  created () {
    const date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth()
    this.today = `${this.year}-${this.month}-${date.getDate()}`
    this.select = this.today
    this.getArr()
  },
  methods: {
    getArr () {
      this.prevArr = []
      this.currentArr = []
      this.nextArr = []
      const prevYear = this.month - 1 < 0 ? this.year - 1 : this.year
      const prevMonth = this.month - 1 < 0 ? 11 : this.month - 1
      const nextYear = this.month + 1 > 11 ? this.year + 1 : this.year
      const nextMonth = this.month + 1 > 11 ? 0 : this.month + 1
      const firstDay = new Date(this.year, this.month, 1)
      const firstDayWeek = firstDay.getDay()
      const prevLength = firstDayWeek
      const monthLength = this.getMonthLength(this.year, this.month)
      const leftLength = monthLength - (7 - firstDayWeek)
      const nextLength = leftLength % 7 ? 7 - (leftLength % 7) : 0

      if (prevLength > 0) {
        const prevMonthLength = this.getMonthLength(prevYear, prevMonth)
        for (let i = prevMonthLength - prevLength + 1; i <= prevMonthLength; i++) {
          this.prevArr.push({
            key: `${prevYear}-${prevMonth}-${i}`,
            value: i
          })
        }
      }

      for (let i = 1; i <= monthLength; i++) {
        this.currentArr.push({
          key: `${this.year}-${this.month}-${i}`,
          value: i
        })
      }

      for (let i = 1; i <= nextLength; i++) {
        this.nextArr.push({
          key: `${nextYear}-${nextMonth}-${i}`,
          value: i
        })
      }
    },
    getMonthLength (year, month) {
      const arr = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (arr[month]) return arr[month]
      const date = new Date(year, month + 1, 0)
      return parseInt(date.getDate())
    },
    prev () {
      if (this.month - 1 < 0) {
        this.year--
        this.month = 11
      } else {
        this.month--
      }
      this.getArr()
    },
    next () {
      if (this.month + 1 > 11) {
        this.year++
        this.month = 0
      } else {
        this.month++
      }
      this.getArr()
    },
    choose (item) {
      this.select = item.key
    }
  }
}
</script>

<style lang="stylus" scoped>
.calendar
  width 700px
  margin 0 auto
  padding 20px 0

.calendar-title
  display flex
  justify-content center
  align-items center
  font-size 26px
  color #606266
  .calendar-btn
    width 150px
    height 70px
    line-height 68px
    text-align center
    border 1px solid #eeeeee
    border-radius 5px
  .calendar-text
    width 200px
    text-align center

.calendar-content
  margin-top 20px
  border-top 1px solid #eeeeee
  border-left 1px solid #eeeeee
  display flex
  flex-wrap wrap
.calendar-item
  flex 1 0 14%
  height 70px
  line-height 70px
  text-align center
  border-right 1px solid #eeeeee
  border-bottom 1px solid #eeeeee
  font-size 28px
  color #606266
  &.head
    font-weight bold
  &.prev
    color #c0c4cc
  &.next
    color #c0c4cc
  .is-today
    color #40aeff
  .is-select
    background-color #f2f8fe
    color #1989fa
</style>
