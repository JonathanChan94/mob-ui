import MobCalendar from './src/calendar.vue'

MobCalendar.install = (Vue) => {
  Vue.component(MobCalendar.name, MobCalendar)
}

export default MobCalendar
