import { Module } from '@nestjs/common'
import { AuthService } from '@web-remote-server/modules/auth/auth.service'
import { AuthController } from '@web-remote-server/modules/auth/auth.controller'

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
