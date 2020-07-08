import Vue from 'vue'

export interface MobLoadingOptions {
  autoClose?: boolean

  duration?: number
}

export interface MobLoading {
  open (options?: MobLoadingOptions): void

  close (): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $loading: MobLoading
  }
}
