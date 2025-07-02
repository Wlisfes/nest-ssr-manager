import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config'
import { resolve } from 'path'

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            envFilePath: resolve(__dirname, `../../../env/.env.${process.env.NODE_ENV}`)
        })
    ],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule {}
