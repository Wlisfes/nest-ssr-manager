import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { UserAgentMiddleware, LoggerMiddleware } from '@server/middleware'
import { TransformInterceptor } from '@server/interceptor'
import { HttpExceptionFilter } from '@server/filters'
// import { ConfigModule } from '@server/modules/config/config.module'
// import { LoggerModule } from '@server/modules/logger/logger.module'
// import { DatabaseModule } from '@server/modules/database/database.module'
// import { SystemModule } from '@server/modules/system/system.module'
// import { DeployModule } from '@server/modules/deploy/deploy.module'
// import { WebModule } from '@server/modules/web/web.module'

@Module({
    imports: [],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
        { provide: APP_FILTER, useClass: HttpExceptionFilter }
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserAgentMiddleware, LoggerMiddleware).forRoutes('*')
    }
}
