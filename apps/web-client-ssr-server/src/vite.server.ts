import { createServer, ViteDevServer } from 'vite'
import { Request } from 'express'
import { resolve } from 'path'
import { readFileSync } from 'fs'

let viteServer: ViteDevServer
export async function createViteServer() {
    if (viteServer) {
        return viteServer
    }
    return (viteServer = await createServer({
        root: 'web',
        appType: 'custom',
        server: {
            middlewareMode: true
        }
    }))
}

export interface EntryOptions extends Omix {
    /**渲染内容**/
    content: string
    /**预加载配置**/
    links: string
    /**naive-ui组件库样式**/
    css: string
    /**httpServer缓存数据**/
    state: string
    /**动态seo配置**/
    meta: {
        /**标题**/
        title?: string
        /**关键字**/
        keywords?: string
        /**说明**/
        description?: string
    }
}
/**ssr渲染内容替换**/
export async function fetchContentRender(html: string, opts: EntryOptions) {
    return html
        .replace(`<!--app-ssr-placeholder-->`, opts.content ?? '')
        .replace(`<!--app-ssr-title-->`, opts.meta.title ?? '')
        .replace(`!--app-ssr-keywords--`, opts.meta.keywords ?? '')
        .replace(`!--app-ssr-description--`, opts.meta.description ?? '')
        .replace(`'<!--app--ssr-state-->'`, opts.state ?? '{}')
        .replace(`<!--app-ssr-style-->`, opts.css ?? '' + opts.links ?? '')
}

/**生产环境配置**/
export class WebClient {
    private static instance: WebClient
    public template: string = ''
    public manifest: Record<string, any> = {}
    public render: Function = () => ({})
    constructor() {
        if (!WebClient.instance) {
            this.template = readFileSync(resolve(process.cwd(), 'build/web/client/index.html'), 'utf-8')
            this.manifest = require('../../../build/web/client/ssr-manifest.json')
            this.render = require('../../../build/web/server/entry-server.js').render
            WebClient.instance = this
        }
        return WebClient.instance
    }
}

/**Web路由渲染**/
export async function createRouteServer(request: Request) {
    if (process.env.NODE_ENV === 'production') {
        const client = new WebClient()
        const options = await client.render(request, client.manifest)
        return await fetchContentRender(client.template, options)
    } else {
        const vite = await createViteServer()
        const html = readFileSync(resolve(process.cwd(), 'web/index.html'), 'utf-8')
        const element = await vite.transformIndexHtml(request.originalUrl, html)
        return await vite.ssrLoadModule('./entry-server.ts').then(async ({ render }) => {
            const options = await render(request, {})
            return await fetchContentRender(element, options)
        })
    }
}
