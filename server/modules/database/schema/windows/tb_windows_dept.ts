import { Entity, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length, IsOptional } from 'class-validator'
import { DataBaseByAdapter, DataBaseAdapter } from '@server/modules/database/database.adapter'

@Entity({ name: 'tb_windows_dept', comment: '管理端-部门组织表' })
export class WindowsDept extends DataBaseByAdapter {
    @ApiProperty({ description: '部门名称', example: '工作台' })
    @IsNotEmpty({ message: '部门名称必填' })
    @Length(0, 32, { message: '部门名称不能超过32个字符' })
    @Column({ comment: '部门名称', length: 32, nullable: false })
    name: string

    @ApiProperty({ description: '别名简称', required: false, example: '工作台' })
    @IsOptional()
    @Length(0, 4, { message: '别名简称不能超过4个字符' })
    @Column({ comment: '别名简称', length: 32, nullable: true })
    alias: string

    @ApiProperty({ description: '上级部门ID', required: false, example: '2149446185344106496' })
    @IsOptional()
    @Column({ comment: '上级部门ID', length: 19, nullable: true })
    pid: string
}

@Entity({ name: 'tb_windows_dept_account', comment: '管理端-部门关联账号表' })
export class WindowsDeptAccount extends DataBaseAdapter {
    @ApiProperty({ description: '账号UID', example: '2149446185344106496' })
    @IsNotEmpty({ message: '账号UID必填' })
    @Column({ comment: '账号UID', length: 19, nullable: false })
    uid: string
}
