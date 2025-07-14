import { Injectable } from '@nestjs/common'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { DataBaseService, WindowsService } from '@server/modules/database/database.service'
import { OmixRequest } from '@server/interface'
import * as windows from '@web-windows-server/interface'

@Injectable()
export class AccountService extends Logger {
    constructor(
        private readonly database: DataBaseService,
        private readonly windowsService: WindowsService
    ) {
        super()
    }

    /**新增账号**/
    @AutoDescriptor
    public async httpBaseSystemCreateAccount(request: OmixRequest, body: windows.CreateAccountOptions) {
        const ctx = await this.database.fetchConnectTransaction()
        try {
        } catch (err) {
            return await this.fetchCatchRollback(this.deplayName, err, ctx)
        } finally {
            await ctx.release()
        }
    }

    /**账号列表**/
    @AutoDescriptor
    public async httpBaseSystemColumnAccount(request: OmixRequest, body: windows.ColumnAccountOptions) {}

    /**编辑账号状态**/
    @AutoDescriptor
    public async httpBaseSystemUpdateSwitchAccount(request: OmixRequest, body: windows.UpdateSwitchAccountOptions) {}
}
