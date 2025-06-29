import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@web-ssr-server/app.module'
import { createViteServer } from '@web-ssr-server/vite.server'
import { resolve } from 'path'
import compression from 'compression'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true
    })
    if (process.env.NODE_ENV === 'production') {
        app.useStaticAssets(resolve(process.cwd(), 'build/client'), { index: false })
        app.use(compression())
    } else {
        const vite = await createViteServer()
        await app.use(vite.middlewares)
    }
    app.listen(process.env.NODE_CLIENT_PORT).then(() => {
        console.log(`Nest客户端服务启动[${process.env.NODE_ENV}]:`, `http://localhost:${process.env.NODE_CLIENT_PORT}`)
    })
}
bootstrap()
