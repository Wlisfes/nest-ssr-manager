import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { DataBaseService, WindowsService } from '@server/modules/database/database.service'
import { OmixRequest } from '@server/interface'
import { isEmpty, isNotEmpty } from 'class-validator'
import { faker } from '@server/utils'
import * as schema from '@server/modules/database/schema'
import * as enums from '@server/modules/database/enums'
import * as windows from '@web-windows-server/interface'

@Injectable()
export class AccountService extends Logger {
    constructor(
        private readonly database: DataBaseService,
        private readonly windows: WindowsService
    ) {
        super()
    }

    /**新增账号**/
    @AutoDescriptor
    public async httpBaseSystemCreateAccount(request: OmixRequest, body: windows.CreateAccountOptions) {
        const ctx = await this.database.fetchConnectTransaction()
        try {
            await this.database.fetchConnectBuilder(this.windows.account, async qb => {
                qb.where(`t.number = :number OR t.phone = :phone`, { number: body.number, phone: body.phone })
                return await qb.getOne().then(async node => {
                    if (isNotEmpty(node) && node.number == body.number) {
                        throw new HttpException(`number:${body.number} 已存在`, HttpStatus.BAD_REQUEST)
                    } else if (isNotEmpty(node) && node.phone == body.phone) {
                        throw new HttpException(`phone:${body.phone} 已存在`, HttpStatus.BAD_REQUEST)
                    }
                    return node
                })
            })
            await this.database.fetchConnectCreate(ctx.manager.getRepository(schema.WindowsAccount), {
                deplayName: this.deplayName,
                request,
                body: body
            })
            return await this.fetchResolver({ message: '新增成功' })
        } catch (err) {
            this.logger.error(err)
            throw new HttpException(err.message, err.status, err.options)
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
