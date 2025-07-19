import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { isEmpty } from 'class-validator'
import { compareSync } from 'bcryptjs'
import { pick } from 'lodash-es'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { DataBaseService, WindowsService } from '@server/modules/database/database.service'
import { CodexService } from '@server/modules/common/modules/codex.service'
import { RedisService } from '@server/modules/redis/redis.service'
import { JwtService } from '@server/modules/jwt/jwt.service'
import { OmixRequest, OmixResponse, CodexCreateOptions } from '@server/interface'
import * as enums from '@server/modules/database/enums'
import * as windows from '@web-windows-server/interface'

@Injectable()
export class AuthService extends Logger {
    constructor(
        private readonly database: DataBaseService,
        private readonly windows: WindowsService,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
        private readonly codexService: CodexService
    ) {
        super()
    }

    /**图形验证码**/
    @AutoDescriptor
    public async httpAuthCodexWrite(request: OmixRequest, response: OmixResponse, body: CodexCreateOptions) {
        return await this.codexService.httpBaseCommonCodexWrite(request, response, {
            deplayName: this.deplayName,
            body,
            keyName: `windows:codex:common:{sid}`,
            cookieName: `x-windows-common-write-sid`
        })
    }

    /**账号登录**/
    @AutoDescriptor
    public async httpAuthAccountToken(request: OmixRequest, body: windows.AccountTokenOptions) {
        try {
            await this.codexService.fetchBaseCommonCookiesCodex(request, `x-windows-common-write-sid`).then(async sid => {
                return await this.codexService.fetchBaseCommonCodexCheck(request, {
                    keyName: `windows:codex:common:${sid}`,
                    deplayName: this.deplayName,
                    code: body.code
                })
            })
            return await this.database.fetchConnectBuilder(this.windows.account, async qb => {
                qb.addSelect('t.password')
                qb.where(`t.number = :number OR t.phone = :number OR t.email = :number`, { number: body.number })
                return await qb.getOne().then(async node => {
                    console.log(node)
                    if (isEmpty(node)) {
                        throw new HttpException(`账号不存在`, HttpStatus.BAD_REQUEST)
                    } else if (!compareSync(body.password, node.password)) {
                        throw new HttpException(`账号密码不正确`, HttpStatus.BAD_REQUEST)
                    } else if (node.status === enums.COMMON_WINDOWS_ACCOUNT.status.offline.value) {
                        throw new HttpException(`员工账号已离职`, HttpStatus.FORBIDDEN)
                    }
                    return await this.jwtService.fetchJwtSecret(pick(node, ['uid', 'number', 'name', 'status']))
                })
            })
        } catch (err) {
            return await this.fetchCatchRollback(this.deplayName, err)
        }
    }

    /**登录续时**/
    @AutoDescriptor
    public async httpAuthAccountTokenContinue(request: OmixRequest) {
        try {
        } catch (err) {}
    }
}
