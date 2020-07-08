import Vue from 'vue'

import { MobLoading } from './loading'
import { MobToast } from './toast'
export { Button } from './button'
export { Input } from './input'
export { Calendar } from './calendar'
export { Scroll } from './scroll'
export { Form } from './form'
export { FormItem } from './form-item'

export function install (vue: typeof Vue): void
export const Loading: MobLoading
export const Toast: MobToast
