import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/layouts/layout.vue'

export const ClientRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: Layout.name,
        component: Layout,
        meta: { AUTH: 'AUTH' },
        children: [
            {
                path: '/',
                meta: { AUTH: 'AUTH' },
                component: () => import('@/views/home/home.vue')
            },
            {
                path: '/:pathMatch(.*)*',
                meta: { AUTH: 'AUTH' },
                component: () => import('@/views/error/404.vue')
            }
        ]
    }
]
