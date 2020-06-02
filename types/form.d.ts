import { MobUIComp } from './component'

export interface CallbackOptions {
  (valid: boolean): void
}

export declare class Form extends MobUIComp {
  model: object

  rules: object

  validate(callback: CallbackOptions): void

  validate(): Promise<boolean>
}
