import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { RedisService } from '@server/modules/redis/redis.service'
import { OmixRequest } from '@server/interface'
import { fetchIntNumber } from '@server/utils'
import { isEmpty } from 'class-validator'
import { create } from 'svg-captcha'

@Injectable()
export class CodexService extends Logger {
    constructor(private readonly redisService: RedisService) {
        super()
    }

    /**写入图形验证码**/
    @AutoDescriptor
    public async httpCommonCodexWrite(request: OmixRequest, body: Omix<{ width?: number; height?: number; fontSize?: number }> = {}) {
        const logger = await this.fetchServiceTransaction(request, { deplayName: this.deplayName })
        return await fetchIntNumber().then(async sid => {
            return Object.assign(
                { sid },
                create({
                    charPreset: `ABCDEFGHJKLMNPQRSTUVWXYZ123456789`,
                    width: body.width ?? 120,
                    height: body.height ?? 40,
                    fontSize: body.fontSize ?? 40,
                    noise: 2
                })
            )
        })
    }

    // /**生成图形验证码**/
    // @AutoDescriptor
    // public async fetchCommonCodexReader2() {}

    // /**验证请求头图形验证码sid**/
    // @AutoDescriptor
    // public async fetchCommonCodexReader(request: OmixRequest, key: string): Promise<string> {
    //     if (isEmpty(request.cookies[key])) {
    //         throw new HttpException(`验证码不存在`, HttpStatus.BAD_REQUEST)
    //     }
    //     return request.cookies[key]
    // }

    // /**校验redis验证码**/
    // @AutoDescriptor
    // public async httpCommonCodexCheck(request: OmixRequest, opts: Omix<{ key: string; code: string }>) {
    //     return await this.redisService.getStore<string>(request, { key: opts.key }).then(async code => {
    //         if (isEmpty(code) || opts.code.toUpperCase() !== code.toUpperCase()) {
    //             throw new HttpException(`验证码错误或已过期`, HttpStatus.BAD_REQUEST)
    //         }
    //         return await this.redisService.delStore(request, {
    //             key: opts.key,
    //             deplayName: this.fetchDeplayName(opts.deplayName)
    //         })
    //     })
    // }
}
