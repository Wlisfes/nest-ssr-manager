import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import Client from '@/components/layouts/layout-client.vue'

export function createRouter(options: Omix<{ ssr: boolean }>) {
    return _createRouter({
        history: options.ssr ? createMemoryHistory() : createWebHistory(),
        routes: [
            {
                path: '/',
                name: Client.name,
                component: Client,
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
    })
}
