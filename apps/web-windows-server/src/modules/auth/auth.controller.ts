import { Post, Get, Body, Query, Request, Response } from '@nestjs/common'
import { ApifoxController, ApiServiceDecorator } from '@server/decorator'
import { AuthService } from '@web-windows-server/modules/auth/auth.service'
import { OmixRequest, OmixResponse, CodexCreateOptions } from '@server/interface'
import * as windows from '@web-windows-server/interface'

@ApifoxController('授权模块', 'auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiServiceDecorator(Get('/codex/write'), {
        operation: { summary: '图形验证码' },
        response: { status: 200, description: 'OK' }
    })
    public async httpAuthCodexWrite(
        @Request() request: OmixRequest,
        @Response() response: OmixResponse,
        @Query() query: CodexCreateOptions
    ) {
        return await this.authService.httpAuthCodexWrite(request, response, query)
    }

    @ApiServiceDecorator(Post('/login'), {
        operation: { summary: '账号登录' },
        response: { status: 200, description: 'OK' }
    })
    public async httpAuthAccount(@Request() request: OmixRequest, @Body() body: windows.AuthAccountOptions) {
        // return await this.authService.httpAuthCodexWrite(request,  query)
    }
}
