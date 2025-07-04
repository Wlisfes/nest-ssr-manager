import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/layouts/layout.vue'

export const mainRoutes: Array<RouteRecordRaw> = [
    {
        path: '/main',
        name: Layout.name,
        component: Layout,
        children: [
            {
                path: '/main/:pathMatch(.*)*',
                meta: { AUTH: 'NONE' },
                component: () => import('@/views/error/404.vue')
            }
        ]
    }
]
