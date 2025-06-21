import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
// import { ConfigModule } from '@server/modules/config/config.module'
// import { LoggerModule } from '@server/modules/logger/logger.module'

@Module({
    // imports: [ConfigModule],
    controllers: [AppController]
})
export class AppModule {}
