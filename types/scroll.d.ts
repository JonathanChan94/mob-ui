import { MobUIComp } from './component'

export declare class Scroll extends MobUIComp {
  canPullUp: boolean

  canPullDown: boolean

  loadEnd(end: boolean): void

  reloadEnd(): void
}
