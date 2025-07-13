import { Controller, Post, Get, Body, Query, Request, Response } from '@nestjs/common'
import { AccountService } from '@web-windows-server/modules/system/account/account.service'
import { ApiServiceDecorator } from '@server/decorator'
import { OmixRequest, OmixResponse } from '@server/interface'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('账号模块')
@Controller('system/account')
export class AccountController {}
