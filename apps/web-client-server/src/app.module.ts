// import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common'
// import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
// import { UserAgentMiddleware, LoggerMiddleware } from '@server/middleware/'
// import { UserAgentMiddleware, LoggerMiddleware } from '@server/middleware/logger.middleware'
// import { ConfigModule } from '@server/modules/config/config.module'
// import { TransformInterceptor } from '@server/interceptor/transform.interceptor'
// import { HttpExceptionFilter } from '@server/filters/http-exception.filter'
// import { LoggerModule } from '@server/modules/logger/logger.module'
// import { DatabaseModule } from '@server/modules/database/database.module'
// import { SystemModule } from '@server/modules/system/system.module'
// import { DeployModule } from '@server/modules/deploy/deploy.module'
// import { WebModule } from '@server/modules/web/web.module'

// @Module({
//     imports: [ConfigModule, LoggerModule, DatabaseModule, SystemModule, DeployModule, WebModule],
//     providers: [
//         { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
//         { provide: APP_FILTER, useClass: HttpExceptionFilter }
//     ]
// })
// export class AppModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//         consumer.apply(UserAgentMiddleware).forRoutes('*')
//         consumer.apply(LoggerMiddleware).forRoutes({ path: 'api/*', method: RequestMethod.ALL })
//     }
// }
