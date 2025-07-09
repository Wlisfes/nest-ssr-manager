import { Injectable } from '@nestjs/common'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { RedisService } from '@server/modules/redis/redis.service'
import { CodexService } from '@server/modules/common/modules/codex.service'
import { OmixRequest, OmixResponse } from '@server/interface'

@Injectable()
export class AuthService extends Logger {
    constructor(
        private readonly redisService: RedisService,
        private readonly codexService: CodexService
    ) {
        super()
    }

    /**图形验证码**/
    @AutoDescriptor
    public async httpAuthCommonCodexWrite(request: OmixRequest, response: OmixResponse) {
        // return await this.codexService.httpCommonCodexWrite(request, response)
        // const logger = await this.fetchServiceTransaction(request, { deplayName: this.deplayName })
        // return await this.codexService.httpCommonCodexWrite(request).then(async ({ sid, text, data }) => {
        //     const key = await this.redisService.fetchCompose(`client:codex:common:{sid}`, { sid })
        //     const { seconds } = await this.redisService.setStore(request, {
        //         key,
        //         data: text,
        //         seconds: 300,
        //         deplayName: this.deplayName
        //     })
        //     logger.info({ message: '图形验证码发送成功', seconds, key, data: text })
        //     await response.cookie(`x-client-common-write-sid`, sid, { httpOnly: true, maxAge: 300 * 1000 })
        //     await response.type('svg')
        //     return await response.send(data)
        // })
    }
}
