import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import { fetchConcat } from '@webpack/utils'
import { mainRoutes } from '@/router/modules/main'
import { clientRoutes } from '@/router/modules/client'
import { ssrRoutes } from '@/router/modules/ssr'

/**路由配置**/
export const routes = fetchConcat(mainRoutes, clientRoutes, ssrRoutes)
/**初始化路由实例**/
export function createRouter(options: Omix<{ ssr: boolean }>) {
    return _createRouter({
        history: options.ssr ? createMemoryHistory() : createWebHistory(),
        routes
    })
}
