import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'

/**创建图形验证码**/
export class CodexCreateOptions {
    @ApiProperty({ description: '图形验证码宽度', required: false, example: 120 })
    @IsNumber({}, { message: 'width必须是数字' })
    @Type(type => Number)
    width: number = 120

    @ApiProperty({ description: '图形验证码高度', required: false, example: 40 })
    @IsNumber({}, { message: 'height必须是数字' })
    @Type(type => Number)
    height: number = 40

    @ApiProperty({ description: '图形验证码字符大小', required: false, example: 40 })
    @IsNumber({}, { message: 'fontSize必须是数字' })
    @Type(type => Number)
    fontSize: number = 40
}

/**写入图形验证码**/
export class CodexWriteOptions {
    /**输出日志方法名**/
    deplayName?: string
    /**创建图形验证码配置**/
    body: CodexCreateOptions
    /**redis存储key**/
    keyName: string
    /**cookie存储字段**/
    cookieName: string
}

/**校验redis图形验证码**/
export class BaseCommonCodexCheck {
    /**输出日志方法名**/
    deplayName?: string
    /**redis存储字段**/
    keyName: string
    /**验证码**/
    code: string
}
