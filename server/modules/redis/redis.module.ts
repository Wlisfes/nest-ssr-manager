import { Module, Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CLIENT_REDIS, createRedisConnect } from '@server/modules/redis/redis.provider'
import { RedisService } from '@server/modules/redis/redis.service'

@Global()
@Module({
    providers: [
        {
            provide: CLIENT_REDIS,
            inject: [ConfigService],
            async useFactory(config: ConfigService) {
                return await createRedisConnect({
                    host: config.get('NODE_REDIS_HOST'),
                    port: config.get('NODE_REDIS_PORT'),
                    password: config.get('NODE_REDIS_PASSWORD'),
                    db: config.get('REDIS_DB')
                })
            }
        },
        RedisService
    ],
    exports: [RedisService]
})
export class RedisModule {}
