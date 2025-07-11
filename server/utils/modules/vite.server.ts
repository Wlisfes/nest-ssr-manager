import { createServer as _createServer, ViteDevServer } from 'vite'
import { resolve } from 'path'
import { readFileSync } from 'fs'
export { ViteDevServer }

/**创建Vite服务**/
export async function createServer(root: string) {
    return await _createServer({
        root: root,
        appType: 'custom',
        server: {
            middlewareMode: true
        }
    })
}

/**生产环境配置**/
export class WebServer {
    private static instance: WebServer
    public template: string = ''
    public manifest: Record<string, any> = {}
    public render: Function = () => ({})
    constructor(mode: 'web-windows' | 'web-client') {
        if (!WebServer.instance) {
            this.template = readFileSync(resolve(process.cwd(), `build/${mode}/client/index.html`), 'utf-8')
            this.manifest = require(`../../../build/${mode}/client/ssr-manifest.json`)
            this.render = require(`../../../build/${mode}/server/entry-server.js`).render
            WebServer.instance = this
        }
        return WebServer.instance
    }
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
export async function fetchViteRender(html: string, opts: EntryOptions) {
    return html
        .replace(`<!--app-ssr-placeholder-->`, opts.content ?? '')
        .replace(`<!--app-ssr-title-->`, opts.meta.title ?? '')
        .replace(`!--app-ssr-keywords--`, opts.meta.keywords ?? '')
        .replace(`!--app-ssr-description--`, opts.meta.description ?? '')
        .replace(`'<!--app--ssr-state-->'`, opts.state ?? '{}')
        .replace(`<!--app-ssr-style-->`, opts.css ?? '' + opts.links ?? '')
}
