import { Module } from '@nestjs/common'
import { WebController } from '@server/modules/web/web.controller'

@Module({
    controllers: [WebController]
})
export class WebModule {}
