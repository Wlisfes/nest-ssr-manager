import { PrimaryColumn, UpdateDateColumn, CreateDateColumn, Column, ColumnOptions } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { snowflakeId } from 'snowflake-id-maker'
import { isEmpty, IsNotEmpty } from 'class-validator'
import { moment } from '@server/utils'

/**枚举文案转换**/
export function fetchProperty<T>(data: Omix<T>) {
    return Object.values(data).map(item => `</br> ${item.name}：${item.value}`)
}

/**枚举描述转换**/ //prettier-ignore
export function fetchComment(name: string, data: Omix) {
    const text = Object.values(data).map(item => `${item.name}-${item.value}`).join('、')
    return `${name}：${text}`
}

/**时间格式装饰器**/
export function DateWithColumn(Decorator: Function, data: Omix<ColumnOptions & { format?: string }>) {
    return Decorator({
        ...data,
        transformer: {
            to: s => s,
            from: s => (isEmpty(s) ? null : moment(s).format(data.format ?? 'YYYY-MM-DD HH:mm:ss'))
        }
    })
}

/**json自定自定义装饰器**/
export function WithJsonColumn(data: Omix<ColumnOptions>) {
    return Column({
        ...data,
        type: 'text',
        transformer: {
            from: (s: string) => JSON.parse(s ?? '{}'),
            to: (s: Omix) => (s ? JSON.stringify(s) : null)
        }
    })
}

/**array自定自定义装饰器**/
export function WithArrayColumn(data: Omix<ColumnOptions>) {
    return Column({
        ...data,
        type: 'text',
        transformer: {
            from: (s: string) => (isEmpty(s) ? [] : s.toString().split(',')),
            to: (s: Array<string>) => ((s ?? []).length === 0 ? null : s.join(','))
        }
    })
}

/**基础表字段继承**/
export abstract class DataBaseAdapter {
    @ApiProperty({ description: '主键ID', example: 1000 })
    @IsNotEmpty({ message: '主键ID必填' })
    @PrimaryColumn({ name: 'key_id', comment: '表主键', update: false, length: 19, nullable: false })
    keyId: string = snowflakeId({ worker: process.pid, epoch: 1199145600000 })

    @ApiProperty({ description: '创建时间', example: '2023-10-26 16:03:38' })
    @DateWithColumn(CreateDateColumn, { name: 'create_time', comment: '创建时间', update: false })
    createTime: Date

    @ApiProperty({ description: '更新时间', example: '2023-10-26 16:03:38' })
    @DateWithColumn(UpdateDateColumn, { name: 'modify_time', comment: '更新时间' })
    modifyTime: Date
}

/**创建人关联表字段继承**/
export abstract class DataBaseByAdapter extends DataBaseAdapter {
    @ApiProperty({ description: '创建账号UID', example: '2149446185344106496' })
    @IsNotEmpty({ message: '创建账号UID必填' })
    @Column({ name: 'create_by', comment: '创建账号UID', length: 19, update: false, nullable: false })
    createBy: string

    @ApiProperty({ description: '更新账号UID', example: '2149446185344106496' })
    @IsNotEmpty({ message: '更新账号UID必填' })
    @Column({ name: 'modify_by', comment: '更新账号UID', length: 19, nullable: true })
    modifyBy: string
}
