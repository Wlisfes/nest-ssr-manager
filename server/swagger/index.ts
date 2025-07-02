import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import express from 'express'
export interface SetupOptions extends Omix {
    title: string
    description: string
    port: number | string
}

/**文档挂载**/
export async function setupSwagger(app: NestExpressApplication, options: SetupOptions) {
    /**允许跨域**/
    app.enableCors()
    /**解析body参数**/
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    /**全局注册验证管道**/
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
    /**初始化文档**/
    const builder = new DocumentBuilder()
        .setTitle(options.title)
        .setDescription(options.description)
        .setVersion('1.0.0')
        .addBearerAuth({ type: 'apiKey', in: 'header', name: 'authorization' }, 'authorization')
        .build()
    const document = SwaggerModule.createDocument(app, builder)
    SwaggerModule.setup('/api/swagger', app, document, {
        customSiteTitle: options.title,
        swaggerOptions: {
            defaultModelsExpandDepth: -1,
            defaultModelExpandDepth: 5,
            filter: true,
            docExpansion: 'none'
        }
    })
    return await app.listen(options.port)
}
