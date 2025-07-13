import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core'
import { UserAgentMiddleware, LoggerMiddleware } from '@server/middleware'
import { TransformInterceptor } from '@server/interceptor'
import { HttpExceptionFilter } from '@server/filters'
import { ConfigModule } from '@server/modules/config/config.module'
import { LoggerModule } from '@server/modules/logger/logger.module'
import { DatabaseModule } from '@server/modules/database/database.module'
import { RedisModule } from '@server/modules/redis/redis.module'
import { JwtModule } from '@server/modules/jwt/jwt.module'
import { CommonModule } from '@server/modules/common/common.module'
import { AuthModule } from '@web-windows-server/modules/auth/auth.module'
import { SystemModule } from '@web-windows-server/modules/system/system.module'

@Module({
    imports: [LoggerModule, ConfigModule, DatabaseModule, RedisModule, JwtModule, CommonModule, AuthModule, SystemModule],
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
