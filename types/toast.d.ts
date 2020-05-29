import Vue from 'vue'

export interface MobToastOptions {
  message: string

  duration?: number
}

export interface MobToast {
  (options: MobToastOptions): void
}

declare module 'vue/types/vue' {
  interface Vue {
    /** Displays a global notification message at the upper right corner of the page */
    $toast: MobToast
  }
}
