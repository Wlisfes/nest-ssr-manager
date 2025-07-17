import { Controller, Post, Get, Body, Query, Request, Response } from '@nestjs/common'
import { ApiServiceDecorator } from '@server/decorator'
import { AuthService } from '@web-windows-server/modules/auth/auth.service'
import { ApiTags } from '@nestjs/swagger'
import * as env from '@server/interface'

@ApiTags('授权模块')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiServiceDecorator(Get('/codex/write'), {
        operation: { summary: '图形验证码' },
        response: { status: 200, description: 'OK' }
    })
    public async httpAuthCommonCodexWrite(
        @Request() request: env.OmixRequest,
        @Response() response: env.OmixResponse,
        @Query() query: env.CodexCreateOptions
    ) {
        return await this.authService.httpAuthCommonCodexWrite(request, response, query)
    }

    @ApiServiceDecorator(Get('/login'), {
        operation: { summary: '图形验证码' },
        response: { status: 200, description: 'OK' }
    })
    public async httpAuthCommonLogin(@Request() request: env.OmixRequest, @Query() query) {
        // return await this.authService.httpAuthCommonCodexWrite(request,  query)
    }
}
