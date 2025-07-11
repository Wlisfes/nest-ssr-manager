import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/layouts/layout.vue'

export const ClientRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: Layout.name,
        component: Layout,
        children: [
            {
                path: '/',
                meta: { AUTH: 'NONE' },
                component: () => import('@/views/home/home.vue')
            },
            {
                path: '/:pathMatch(.*)*',
                meta: { AUTH: 'NONE' },
                component: () => import('@/views/error/404.vue')
            }
        ]
    }
]
