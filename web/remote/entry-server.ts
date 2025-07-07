import { renderToString } from 'vue/server-renderer'
import { Request } from 'express'
import { isPromise } from '@webpack/utils'
import { createAppServer } from '@/main'
import { useGlobal } from '@/store'

export async function render(request: Request, manifest: Record<string, string[]>) {
    const { app, router, pinia, collect, fetchWinston } = createAppServer({ request, ssr: true })
    /**初始化日志配置**/
    const logger = await fetchWinston()
    /**进入路由页面并等待执行完成**/
    await router.push(request.originalUrl)
    await router.isReady()
    /**初始化基础数据**/
    // await useGlobal(pinia).fetchGlobaInitialize(logger)
    /**缓存当前路由相关信息**/
    const route = router.currentRoute
    const routeMatched = route.value.matched
    /**更新路由meta信息**/
    const meta = route.value.meta
    meta.keywords = meta.keywords ?? process.env.NODE_SEO_KEYWORDS ?? ''
    meta.description = meta.description ?? process.env.NODE_SEO_DESCRIPTION ?? ''
    if (meta.title && process.env.NODE_SEO_TITLE) {
        meta.title = `${process.env.NODE_SEO_TITLE} - ${meta.title}`
    } else if (process.env.NODE_SEO_TITLE) {
        meta.title = process.env.NODE_SEO_TITLE
    } else {
        meta.title = meta.title ?? ''
    }

    /**获取to路由对应所有的组件**/
    const matchedComponents: any = []
    routeMatched.map(item => {
        if (item.components) {
            matchedComponents.push(...Object.values(item.components))
        }
    })

    /**
     * config.router参数与服务端entry-server.ts中的config.router参数，router.currentRoute.value值不一致 原因:
     * 因为客户端当前路由还么有执行next()跳转，所以router.currentRoute.value的值还是from
     * 服务端entry-server.ts中先执行了await router.isReady();，所以router.currentRoute.value的值是to
     * 所以httpServer集合中执行的请求，如果需要当前页面路由参数请用route获取
     */
    const config = { logger, pinia, route: route.value, router, request, env: process.env }

    /**获取httpServer集合**/
    const httpServerOptions: any = []
    /**获取httpMetaServer,已页面为准最后一个组件**/
    let mateCallback: any = null
    matchedComponents.map(component => {
        const httpServer = component.httpServer || null
        if (httpServer) {
            if (isPromise(httpServer) === false) {
                httpServerOptions.push(Promise.resolve(httpServer(config)))
            } else {
                httpServerOptions.push(httpServer(config))
            }
        }
        mateCallback = component.httpMetaServer || null
    })

    /**执行在页面跳转之前httpServer**/
    await Promise.all(httpServerOptions)
    /**seo赋值: 在页面生成之前、httpServer之后**/
    if (mateCallback) {
        const seo = await mateCallback(config)
        meta.keywords = seo.keywords || meta.keywords
        meta.description = seo.description || meta.description
        if (seo.title && process.env.NODE_SEO_TITLE) {
            meta.title = `${process.env.NODE_SEO_TITLE} - ${seo.title}`
        } else if (seo.title) {
            meta.title = seo.title
        }
    }

    const renderCtx: { modules?: string[] } = {}
    const content = await renderToString(app, renderCtx)
    const links = renderPreloadLinks(renderCtx.modules, manifest)
    const state = JSON.stringify(pinia.state.value)
    const css = collect()

    return { content, links, meta, state, css }
}

function renderPreloadLinks(modules: undefined | string[], manifest: Record<string, string[]>): string {
    let links = ''
    const seen = new Set()
    if (modules === undefined) throw new Error()
    modules.forEach(id => {
        const files = manifest[id]
        if (files) {
            files.forEach(file => {
                if (!seen.has(file)) {
                    seen.add(file)
                    links += renderPreloadLink(file)
                }
            })
        }
    })
    return links
}

function renderPreloadLink(file: string): string {
    if (file.endsWith('.js')) {
        return `<link rel="modulepreload" crossorigin href="${file}">`
    } else if (file.endsWith('.css')) {
        return `<link rel="stylesheet" href="${file}">`
    } else if (file.endsWith('.woff')) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
    } else if (file.endsWith('.woff2')) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
    } else if (file.endsWith('.gif')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
    } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
    } else if (file.endsWith('.png')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/png">`
    } else {
        // TODO
        return ''
    }
}
