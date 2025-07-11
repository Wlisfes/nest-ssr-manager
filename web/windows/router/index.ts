import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import { fetchConcat } from '@webpack/utils'
import { MainRoutes } from '@/router/modules/main'
import { ClientRoutes } from '@/router/modules/client'

/**路由配置**/
export const routes = fetchConcat(MainRoutes, ClientRoutes)
/**初始化路由实例**/
export function createRouter(options: Omix<{ ssr: boolean }>) {
    return _createRouter({
        history: options.ssr ? createMemoryHistory() : createWebHistory(),
        routes
    })
}
