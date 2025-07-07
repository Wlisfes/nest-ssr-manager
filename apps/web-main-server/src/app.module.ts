import { Module } from '@nestjs/common'
import { AppController } from '@web-main-server/app.controller'
import { ConfigModule } from '@server/modules/config/config.module'

@Module({
    imports: [ConfigModule],
    controllers: [AppController]
})
export class AppModule {}
