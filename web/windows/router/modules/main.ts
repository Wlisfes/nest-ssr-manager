import { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/main/layout/layout.vue'

export const MainRoutes: Array<RouteRecordRaw> = [
    {
        path: '/main',
        name: Layout.name,
        component: Layout,
        children: [
            {
                path: '/main/login',
                meta: { AUTH: 'AUTH_NONE' },
                component: () => import('@/views/main/login/login.vue')
            },
            {
                path: '/main/:pathMatch(.*)*',
                meta: { AUTH: 'NONE' },
                component: () => import('@/views/error/404.vue')
            }
        ]
    }
]
