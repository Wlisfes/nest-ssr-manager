import { isPromise } from '@/utils/is'
import { createAppServer } from '@/main'
import { locale } from '@/i18n'
const { app, router, pinia, fetchWinston } = createAppServer({ ssr: false })

if (window.__INITIAL_DATA__) {
    pinia.state.value = window.__INITIAL_DATA__
    // fetchI18nContextUpdate(locale.value, window.__INITIAL_DATA__.APP_NEST_GLOBAL_STORE.messages)
}

/**置服务器读取ajax数据，且浏览器第一次加载当前页时，不调取ajax数据**/
router.beforeResolve(async (to, from, next) => {
    /**初始化日志配置**/
    const logger = await fetchWinston()
    /**第一次进入项目**/
    if (from && !from.name) {
        return next()
    }

    const matched = router.resolve(to).matched
    const prevMatched = router.resolve(from).matched
    const meta = to.meta || {}
    meta.title = meta.title ?? import.meta.env.NODE_SEO_TITLE
    meta.keywords = meta.keywords ?? import.meta.env.NODE_SEO_KEYWORDS
    meta.description = meta.description ?? import.meta.env.NODE_SEO_DESCRIPTION

    /**判断是否在当前路由跳转，activated如果是空说明是当前路由来回跳转**/
    let diffed = false
    const activated = matched.filter((c, i) => {
        return diffed || (diffed = prevMatched[i] !== c)
    })
    if (!activated.length) {
        /**
         * document.title = meta.title
         * 如果需要设置在当前页面onMouted中调用
         */
        return next()
    }

    /**获取to路由对应所有的组件**/
    const matchedComponents: any = []
    matched.map(item => {
        if (item.components) {
            matchedComponents.push(...Object.values(item.components))
        }
    })

    /**
     * config.router参数与服务端entry-server.ts中的config.router参数，router.currentRoute.value值不一致 原因:
     * 因为客户端当前路由还么有执行next()跳转，所以router.currentRoute.value的值还是from
     * 服务端entry-server.ts中先执行了await router.isReady();，所以router.currentRoute.value的值是to
     * 所以httpServer集合中执行的请求，如果需要当前页面路由参数请用route获取
     */
    const config = { logger, pinia, route: to, router, request: {}, env: import.meta.env }

    /**获取httpServer集合**/
    const httpServerOptions: any = []
    /**获取httpMetaServer,已页面为准最后一个组件**/
    let mateCallback: any = null
    matchedComponents.map(component => {
        const httpServer = component.httpServer || null
        if (httpServer) {
            if (isPromise(httpServer) === false) {
                httpServerOptions.push(Promise.resolve(httpServer(config)))
            } else {
                httpServerOptions.push(httpServer(config))
            }
        }
        mateCallback = component.httpMetaServer || null
    })

    /**设置seo函数**/
    const fetchMateCallback = async () => {
        if (mateCallback) {
            const seo = await mateCallback(config)
            meta.title = seo.title ? `${seo.title}` : meta.title
            meta.keywords = seo.keywords || meta.keywords
            meta.description = seo.description || meta.description
        }
        document.title = meta.title || ''
    }

    try {
        /**执行在页面跳转之前httpServer**/
        return Promise.all(httpServerOptions).then(async () => {
            /**设置seo配置**/
            await fetchMateCallback()
            return next()
        })
    } catch (err) {
        /**设置seo配置**/
        await fetchMateCallback()
        return next(err)
    }
})

/**路由加载完成后在挂载**/
router.isReady().then(() => {
    app.mount('#app')
})
