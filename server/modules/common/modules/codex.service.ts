import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { RedisService } from '@server/modules/redis/redis.service'
import { OmixRequest, OmixResponse, CommonCodexWrite } from '@server/interface'
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
    public async httpCommonCodexWrite(request: OmixRequest, body: CommonCodexWrite) {
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

    /**
     * 验证请求头图形验证码sid
     * @param request Request对象
     * @param key cookie中存储sid的字段
     */
    @AutoDescriptor
    public async fetchCommonCookiesCodex(request: OmixRequest, key: string): Promise<string> {
        if (isEmpty(request.cookies[key])) {
            throw new HttpException(`验证码不存在`, HttpStatus.BAD_REQUEST)
        }
        return request.cookies[key]
    }

    /**
     * 校验redis图形验证码
     * @param request Request对象
     * @param opts
     */
    @AutoDescriptor
    public async fetchCommonCodexCheck(request: OmixRequest, opts: Omix<{ key: string; code: string }>) {
        return await this.redisService.getStore<string>(request, { key: opts.key }).then(async code => {
            if (isEmpty(code) || opts.code.toUpperCase() !== code.toUpperCase()) {
                throw new HttpException(`验证码错误或已过期`, HttpStatus.BAD_REQUEST)
            }
            return await this.redisService.delStore(request, {
                key: opts.key,
                deplayName: this.fetchDeplayName(opts.deplayName)
            })
        })
    }
}
