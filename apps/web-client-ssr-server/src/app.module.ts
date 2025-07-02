import { Module } from '@nestjs/common'
import { AppController } from 'apps/web-client-ssr-server/src/app.controller'
import { ConfigModule } from '@server/modules/config/config.module'

@Module({
    imports: [ConfigModule],
    controllers: [AppController]
})
export class AppModule {}
