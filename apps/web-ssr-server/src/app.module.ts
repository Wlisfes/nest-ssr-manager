import { Module } from '@nestjs/common'
import { WebModule } from '@server/modules/web/web.module'

@Module({
    imports: [WebModule]
})
export class AppModule {}
