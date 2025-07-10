import { PrimaryColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { snowflakeId } from 'snowflake-id-maker'
import { IsNotEmpty } from 'class-validator'

/**枚举文案转换**/
export function fetchProperty<T>(data: Omix<T>) {
    return Object.values(data).map(item => `</br> ${item.name}：${item.value}`)
}

/**枚举描述转换**/ //prettier-ignore
export function fetchComment(name: string, data: Omix) {
    const text = Object.values(data).map(item => `${item.name}-${item.value}`).join('、')
    return `${name}：${text}`
}

export abstract class DatabaseAdapter {
    @ApiProperty({ description: '主键ID', example: 1000 })
    @IsNotEmpty({ message: '主键ID必填' })
    @PrimaryColumn({ name: 'key_id', comment: '表主键', update: false, length: 19, nullable: false })
    keyId: string = snowflakeId({ worker: process.pid, epoch: 1199145600000 })

    @ApiProperty({ description: '创建时间', example: '2023-10-26 16:03:38' })
    @CreateDateColumn({ name: 'create_time', comment: '创建时间', update: false })
    createTime: Date

    @ApiProperty({ description: '更新时间', example: '2023-10-26 16:03:38' })
    @UpdateDateColumn({ name: 'modify_time', comment: '更新时间' })
    modifyTime: Date
}
