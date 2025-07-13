import { Module } from '@nestjs/common'
import { AccountService } from '@web-windows-server/modules/system/account/account.service'
import { AccountController } from '@web-windows-server/modules/system/account/account.controller'

@Module({
    providers: [AccountService],
    controllers: [AccountController],
    exports: [AccountService]
})
export class SystemModule {}
