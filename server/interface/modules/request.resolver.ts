import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, Min, IsArray, IsString, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { IsDateCustomize } from '@server/decorator'

export class OmixColumn {
    @ApiProperty({ description: '分页数', required: false, example: 1 })
    @IsNumber({}, { message: 'page必须是数字' })
    @Min(1, { message: 'page必须大于或等于0' })
    @Type(type => Number)
    page: number = 1

    @ApiProperty({ description: '分页数量', required: false, example: 20 })
    @IsNumber({}, { message: 'size必须是数字' })
    @Min(1, { message: 'size必须大于0' })
    @Type(type => Number)
    size: number = 20

    @ApiPropertyOptional({ description: '开始时间' })
    @IsOptional()
    @IsDateCustomize()
    startTime: string

    @ApiPropertyOptional({ description: '结束时间' })
    @IsOptional()
    @IsDateCustomize()
    endTime: string

    @ApiPropertyOptional({ description: '模糊关键字' })
    @IsOptional()
    vague: string
}

export class OmixPayload extends OmixColumn {
    @ApiProperty({ description: 'keyId', example: '2279965746312249344' })
    @IsNotEmpty({ message: 'keyId 必填' })
    keyId: string

    @ApiProperty({ description: 'keyId列表', example: [] })
    @IsNotEmpty({ message: 'keys 必填' })
    @IsArray({ message: 'keys 必须为Array<string>格式' })
    @IsString({ each: true, message: 'keys 必须为Array<string>格式' })
    keys: Array<string>

    @ApiProperty({ description: '验证码', example: '495673' })
    @IsNotEmpty({ message: '验证码 必填' })
    code: string
}
