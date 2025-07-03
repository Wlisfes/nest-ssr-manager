import '@unocss/reset/normalize.css'
import '@/styles/index.scss'
import 'uno.css'
import { Request } from 'express'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter } from '@/router'
import { CoutextServer, CoutextWinston } from '@/plugins'
import { i18n } from '@/i18n'
import { setup } from '@css-render/vue3-ssr'
import App from '@/App.vue'

export interface AppOptions {
    ssr: boolean
    request?: Request
}

export function createAppServer(options: AppOptions) {
    const app = createSSRApp(App)
    const router = createRouter(options)
    const pinia = createPinia()
    const { collect } = setup(app)

    app.use(CoutextServer(options.ssr, options.request))
    app.use(router)
    app.use(pinia)
    app.use(i18n)

    /**初始化日志中间件**/
    async function fetchWinston() {
        if (process.env.NODE_ENV === 'development' && options.ssr) {
            const { Logger } = await import('@/plugins/modules/coutext-winston')
            await Logger.fetchInitialize(false)
        }
        return await CoutextWinston(options.ssr)
    }

    return { app, router, pinia, collect, fetchWinston }
}
