import { Module } from '@nestjs/common'
import { AppController } from '@web-ssr-server/app.controller'

@Module({
    controllers: [AppController]
})
export class AppModule {}
