import { Entity, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length, IsObject } from 'class-validator'
import { DataBaseAdapter, WithJsonColumn } from '@server/modules/database/database.adapter'

@Entity({ name: 'tb_windows_kines', comment: '管理端-自定义json配置表' })
export class WindowsKines extends DataBaseAdapter {
    @ApiProperty({ description: '账号UID', example: '2149446185344106496' })
    @IsNotEmpty({ message: '账号UID必填' })
    @Column({ comment: '账号UID', length: 19, nullable: false })
    uid: string

    @ApiProperty({ description: 'json类型' })
    @IsNotEmpty({ message: 'json类型必填' })
    @Length(0, 32, { message: 'json类型不能超过32个字符' })
    @Column({ comment: 'json类型', length: 32, nullable: false })
    type: string

    @ApiProperty({ description: 'json描述', example: '菜单名称' })
    @IsNotEmpty({ message: 'json描述必填' })
    @Length(0, 128, { message: 'json描述不能超过128个字符' })
    @Column({ comment: 'json描述', length: 128, nullable: false })
    document: string

    @ApiProperty({ description: '自定义json', required: false })
    @IsNotEmpty({ message: '自定义json必填' })
    @IsObject({ message: '自定义json格式错误' })
    @WithJsonColumn({ type: 'text', comment: '自定义json', nullable: true })
    json: string
}
