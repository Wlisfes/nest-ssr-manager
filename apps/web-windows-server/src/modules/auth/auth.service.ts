import { Injectable } from '@nestjs/common'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { CodexService } from '@server/modules/common/modules/codex.service'
import { OmixRequest, OmixResponse, BaseCommonCodexCreate } from '@server/interface'

@Injectable()
export class AuthService extends Logger {
    constructor(private readonly codexService: CodexService) {
        super()
    }

    /**图形验证码**/
    @AutoDescriptor
    public async httpAuthCommonCodexWrite(request: OmixRequest, response: OmixResponse, body: BaseCommonCodexCreate) {
        return await this.codexService.httpBaseCommonCodexWrite(request, response, {
            deplayName: this.deplayName,
            body,
            keyName: `windows:codex:common:{sid}`,
            cookieName: `x-windows-common-write-sid`
        })
    }
}
