import { Request } from 'express'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { WebServer, createServer, ViteDevServer, fetchViteRender } from '@server/utils'

let viteServer: ViteDevServer
export async function createViteServer() {
    if (viteServer) {
        return viteServer
    }
    return (viteServer = await createServer('web/client'))
}

/**Web路由渲染**/
export async function createRouteServer(request: Request) {
    try {
        if (process.env.NODE_ENV === 'production') {
            const webServer = new WebServer('web-client')
            const options = await webServer.render(request, webServer.manifest)
            return await fetchViteRender(webServer.template, options)
        } else {
            const vite = await createViteServer()
            const html = readFileSync(resolve(process.cwd(), 'web/client/index.html'), 'utf-8')
            const element = await vite.transformIndexHtml(request.originalUrl, html)
            return await vite.ssrLoadModule('./entry-server.ts').then(async ({ render }) => {
                const options = await render(request, {})
                return await fetchViteRender(element, options)
            })
        }
    } catch (err) {
        return '500'
    }
}
