import { RouteRecordRaw } from 'vue-router'

export const MainRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        meta: { AUTH: 'AUTH_NONE' },
        component: () => import('@/views/main/login/login.vue')
    }
]
