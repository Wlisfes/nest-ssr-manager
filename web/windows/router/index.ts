import { createRouter as _createRouter, Router, createMemoryHistory, createWebHistory } from 'vue-router'
import { fetchConcat } from '@webpack/utils'
import { MainRoutes } from '@/router/modules/main'
import { ClientRoutes } from '@/router/modules/client'

/**路由配置**/
export const routes = fetchConcat(MainRoutes, ClientRoutes)
/**初始化路由实例**/
export function createRouter(options: Omix<{ ssr: boolean }>) {
    return setupGuardRouter(
        _createRouter({
            history: options.ssr ? createMemoryHistory() : createWebHistory(),
            routes
        })
    )
}

/**路由守卫**/
export function setupGuardRouter(router: Router) {
    router.beforeEach(async (to, from, next) => {
        console.log({ to, from })

        return next()
    })
    router.afterEach(async (to, from) => {
        // document.title = `昆仑服务平台${utils.fetchWhere(!!to.meta.title, ` - ${to.meta.title}`, '')}`
        // window.$loadingBar.finish()
        // return await utils.fetchHandler(['AUTH'].includes(to.meta.AUTH as string), async () => {
        //     return await configer.fetchMenuRouter(to).then(async menu => {
        //         return await configer.setState({ router: to.path })
        //     })
        // })
    })
    return router
}
