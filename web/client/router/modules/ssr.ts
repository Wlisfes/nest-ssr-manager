import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/ssr/layouts/ssr-layout.vue'

export const ssrRoutes: Array<RouteRecordRaw> = [
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
