import { Injectable } from '@nestjs/common'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { OmixRequest } from '@server/interface'
import { fetchIntNumber } from '@server/utils'
import { create } from 'svg-captcha'

@Injectable()
export class CodexService extends Logger {
    /**图形验证码**/
    @AutoDescriptor
    public async httpCommonCodexWrite(request: OmixRequest, body: Omix<{ width?: number; height?: number; fontSize?: number }>) {
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
}
