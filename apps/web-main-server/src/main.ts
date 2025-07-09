import { NestFactory } from '@nestjs/core'
import { knife4jSetup } from 'nest-knife4j'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { AppModule } from '@web-main-server/app.module'
import { fetchGlobalEnv } from '@server/utils'
import { omit } from 'lodash-es'
const env = fetchGlobalEnv()

export const mainOptions = [
    {
        name: 'web-client-server',
        swaggerVersion: '1.0.0',
        prefix: '/api/client',
        baseUrl: `http://localhost:${env.NODE_WEB_CLIENT_API_PORT}`,
        url: `/api/swagger-json`,
        location: `/api/swagger`
    },
    {
        name: 'web-remote-server',
        swaggerVersion: '1.0.0',
        prefix: '/api/remote',
        baseUrl: `http://localhost:${env.NODE_WEB_REMOTE_API_PORT}`,
        url: `/api/swagger-json`,
        location: `/api/swagger`
    }
]

export const knife4jOption = mainOptions.map(item => {
    return Object.assign(omit(item, ['prefix', 'baseUrl']), {
        url: `${item.baseUrl}${item.url}`,
        location: `${item.baseUrl}${item.location}`
    })
})

export async function fetchProxyMiddleware(app: any) {
    await knife4jSetup(app, knife4jOption)
    mainOptions.forEach(item => {
        app.use(
            item.prefix,
            createProxyMiddleware({ target: item.baseUrl, changeOrigin: true, pathRewrite: path => `${item.prefix}${path}` })
        )
    })
    return app
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    return await fetchProxyMiddleware(app).then(async () => {
        return await app.listen(process.env.NODE_WEB_MAIN_SSR_PORT).then(() => {
            console.log(
                `网关服务启动:`,
                `http://localhost:${process.env.NODE_WEB_MAIN_SSR_PORT}`,
                `http://localhost:${process.env.NODE_WEB_MAIN_SSR_PORT}/doc.html`
            )
        })
    })
}
bootstrap()
