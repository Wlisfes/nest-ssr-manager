import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from '@web-client-server/app.module'
import { setupSwagger } from '@server/swagger'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true
    })
    app.setGlobalPrefix('/api/client')
    return await setupSwagger(app, {
        title: `ChatBook开放平台API服务`,
        description: `ChatBook Open Platform API Service`,
        port: process.env.NODE_WEB_CLIENT_API_PORT
    }).then(() => {
        console.log(
            `ChatBook开放平台API服务端启动[${process.env.NODE_ENV}]:`,
            `http://localhost:${process.env.NODE_WEB_CLIENT_API_PORT}`,
            `http://localhost:${process.env.NODE_WEB_CLIENT_API_PORT}/api/swagger`
        )
    })
}
bootstrap()
