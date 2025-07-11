import { Module } from '@nestjs/common'
import { AuthService } from '@web-windows-server/modules/auth/auth.service'
import { AuthController } from '@web-windows-server/modules/auth/auth.controller'

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
