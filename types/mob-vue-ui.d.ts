import Vue from 'vue'

import { Button } from './button'
import { Input } from './input'
import { Calendar } from './calendar'
import { Scroll } from './scroll'
import { Form } from './form'
import { FormItem } from './form-item'
import { MobLoading } from './loading'
import { MobToast } from './toast'

export function install (vue: typeof Vue): void

export class MobButton extends Button {}
export class MobInput extends Input {}
export class MobCalendar extends Calendar {}
export class MobScroll extends Scroll {}
export class MobForm extends Form {}
export class MobFormItem extends FormItem {}

export const Loading: MobLoading
export const Toast: MobToast
