import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '@server/app.module'
import { createViteServer } from '@server/vite.server'
import { resolve } from 'path'
import compression from 'compression'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true
    })
    if (process.env.NODE_ENV === 'production') {
        app.useStaticAssets(resolve(__dirname, '../build/client'), { index: false })
        app.use(compression())
    } else {
        const vite = await createViteServer()
        await app.use(vite.middlewares)
    }
    app.listen(4080).then(() => {
        console.log(`Nest服务启动[${process.env.NODE_ENV}]:`, `http://localhost:4080`)
    })
}
bootstrap()
