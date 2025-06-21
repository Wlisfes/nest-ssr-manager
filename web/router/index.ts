import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import Layout from '@/components/layouts/layout.vue'
import BaseHome from '@/views/home/home.vue'
import Base404 from '@/views/error/404.vue'

export function createRouter(options: Omix<{ ssr: boolean }>) {
    return _createRouter({
        history: options.ssr ? createMemoryHistory() : createWebHistory(),
        routes: [
            {
                path: '/',
                name: 'HomeLayout',
                props: { name: 'HomeLayout' },
                component: Layout,
                children: [
                    { path: '/', name: BaseHome.name, meta: { AUTH: 'NONE' }, component: BaseHome },
                    { path: '/:pathMatch(.*)*', name: Base404.name, meta: { AUTH: 'NONE' }, component: Base404 }
                ]
            }
            // {
            //     path: '/',
            //     name: 'GlobalLayout',
            //     props: { name: 'GlobalLayout' },
            //     component: Layout,
            //     children: [
            //     ]
            // }
        ]
    })
}
