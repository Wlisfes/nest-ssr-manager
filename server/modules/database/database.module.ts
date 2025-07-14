import { Module, Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataBaseService } from '@server/modules/database/database.service'
import * as schema from '@server/modules/database/schema'

@Global()
@Module({
    providers: [DataBaseService],
    exports: [DataBaseService],
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'mysql',
                    host: configService.get('NODE_ORM_MYSQL_HOST'),
                    port: configService.get('NODE_ORM_MYSQL_PORT'),
                    username: configService.get('NODE_ORM_MYSQL_USERNAME'),
                    database: configService.get('NODE_ORM_MYSQL_DATABASE'),
                    password: configService.get('NODE_ORM_MYSQL_PASSWORD'),
                    charset: configService.get('NODE_ORM_MYSQL_CHARSET'),
                    synchronize: configService.get('NODE_ENV') === 'development',
                    entities: Object.values(schema)
                }
            }
        }),
        TypeOrmModule.forFeature(Object.values(schema))
    ]
})
export class DatabaseModule {}
