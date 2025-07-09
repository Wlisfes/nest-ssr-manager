import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { RedisService } from '@server/modules/redis/redis.service'
import { fetchIntNumber } from '@server/utils'
import { isEmpty } from 'class-validator'
import { create } from 'svg-captcha'
import * as env from '@server/interface'

@Injectable()
export class CodexService extends Logger {
    constructor(private readonly redisService: RedisService) {
        super()
    }

    /**
     * 写入图形验证码
     * @param request Request对象
     * @param body 图形验证码基础配置
     */
    @AutoDescriptor
    public async httpBaseCommonCodexWrite(request: env.OmixRequest, response: env.OmixResponse, options: env.BaseCommonCodexWrite) {
        const logger = await this.fetchServiceTransaction(request, { deplayName: this.fetchDeplayName(this.deplayName) })
        return await this.fetchBaseCommonCodexCreate(options.body).then(async ({ sid, text, data }) => {
            const key = await this.redisService.fetchCompose(options.keyName, { sid })
            const { seconds } = await this.redisService.setStore(request, {
                deplayName: this.fetchDeplayName(this.deplayName),
                key,
                data: text,
                seconds: 300
            })
            logger.info({ message: '图形验证码发送成功', seconds, key, data: text })
            await response.cookie(options.cookieName, sid, { httpOnly: true, maxAge: 300 * 1000 })
            await response.type('svg')
            return await response.send(data)
        })
    }

    /**
     * 创建图形验证码
     * @param body 基础配置
     */
    @AutoDescriptor
    public async fetchBaseCommonCodexCreate(body: env.BaseCommonCodexCreate) {
        return await fetchIntNumber().then(async sid => {
            const { text, data } = create({
                charPreset: `ABCDEFGHJKLMNPQRSTUVWXYZ123456789`,
                width: body.width ?? 120,
                height: body.height ?? 40,
                fontSize: body.fontSize ?? 40,
                noise: 2
            })
            return Object.assign(body, { sid, text, data })
        })
    }

    /**
     * 验证请求头图形验证码sid
     * @param request Request对象
     * @param key cookie中存储sid的字段
     */
    @AutoDescriptor
    public async fetchBaseCommonCookiesCodex(request: env.OmixRequest, keyName: string): Promise<string> {
        if (isEmpty(request.cookies[keyName])) {
            throw new HttpException(`验证码不存在`, HttpStatus.BAD_REQUEST)
        }
        return request.cookies[keyName]
    }

    /**
     * 校验redis图形验证码
     * @param request Request对象
     * @param body 验证配置参数
     */
    @AutoDescriptor
    public async fetchBaseCommonCodexCheck(request: env.OmixRequest, body: env.BaseCommonCodexCheck) {
        return await this.redisService.getStore<string>(request, { key: body.keyName }).then(async code => {
            if (isEmpty(code) || body.code.toUpperCase() !== code.toUpperCase()) {
                throw new HttpException(`验证码错误或已过期`, HttpStatus.BAD_REQUEST)
            }
            return await this.redisService.delStore(request, {
                key: body.deplayName,
                deplayName: this.fetchDeplayName(body.deplayName)
            })
        })
    }
}
