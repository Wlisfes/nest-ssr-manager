import { Controller, Post, Get, Body, Query, Request, Response } from '@nestjs/common'
import { ApiServiceDecorator } from '@server/decorator'
import { AuthService } from '@web-remote-server/modules/auth/auth.service'
import { OmixRequest, OmixResponse, BaseCommonCodexCreate } from '@server/interface'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('授权模块')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiServiceDecorator(Get('/codex/write'), {
        operation: { summary: '图形验证码' },
        response: { status: 200, description: 'OK' }
    })
    public async httpAuthCommonCodexWrite(
        @Request() request: OmixRequest,
        @Response() response: OmixResponse,
        @Query() query: BaseCommonCodexCreate
    ) {
        return await this.authService.httpAuthCommonCodexWrite(request, response, query)
    }
}
