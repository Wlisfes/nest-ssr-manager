import { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/layouts/layout.vue'

export const clientRoutes: Array<RouteRecordRaw> = [
    {
        path: '/client',
        name: Layout.name,
        component: Layout,
        children: [
            {
                path: '/client/:pathMatch(.*)*',
                meta: { AUTH: 'NONE' },
                component: () => import('@/views/error/404.vue')
            }
        ]
    }
]
