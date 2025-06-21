import { Module } from '@nestjs/common'
import { WebModule } from './modules/web/web.module'

@Module({
    imports: [WebModule]
})
export class AppModule {}
