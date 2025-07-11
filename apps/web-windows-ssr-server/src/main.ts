import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'apps/web-windows-ssr-server/src/app.module'
import { createViteServer } from 'apps/web-windows-ssr-server/src/vite.server'
import { resolve } from 'path'
import compression from 'compression'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true
    })
    if (process.env.NODE_ENV === 'production') {
        app.useStaticAssets(resolve(process.cwd(), 'build/web-windows/client'), { index: false })
        app.use(compression())
    } else {
        const vite = await createViteServer()
        await app.use(vite.middlewares)
    }
    return app.listen(process.env.NODE_WEB_WINDOWS_SSR_PORT).then(() => {
        console.log(`ChatBook管理平台SSR服务启动[${process.env.NODE_ENV}]:`, `http://localhost:${process.env.NODE_WEB_WINDOWS_SSR_PORT}`)
    })
}
bootstrap()
