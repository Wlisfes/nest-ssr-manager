import { Entity, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, Length, IsNumber, IsOptional } from 'class-validator'
import { DataBaseAdapter, WithJsonColumn } from '@server/modules/database/database.adapter'

@Entity({ name: 'tb_remote_resource', comment: '管理端-菜单资源表' })
export class RemoteResource extends DataBaseAdapter {
    @ApiProperty({ description: '用户UID' })
    @IsNotEmpty({ message: '用户UID必填' })
    @Column({ comment: '用户UID', length: 19, nullable: false })
    uid: string

    @ApiProperty({ description: '菜单权限标识' })
    @IsNotEmpty({ message: '菜单权限标识必填' })
    @Length(1, 128, { message: '菜单权限标识不能超过128个字符' })
    @Column({ comment: '菜单权限标识', length: 128, nullable: true })
    key: string

    @ApiProperty({ description: '菜单名称', example: '工作台' })
    @IsNotEmpty({ message: '菜单名称必填' })
    @Length(1, 32, { message: '菜单名称不能超过32个字符' })
    @Column({ comment: '菜单名称', length: 32, nullable: false })
    name: string

    @ApiProperty({ description: '菜单地址' })
    @IsNotEmpty({ message: '菜单地址必填' })
    @Length(1, 255, { message: '菜单地址不能超过255个字符' })
    @Column({ comment: '菜单地址', length: 255, nullable: true })
    router: string

    @ApiProperty({ description: '激活路由', required: false })
    @IsOptional()
    @Column({ name: 'active_router', comment: '激活路由', nullable: true })
    activeRouter: string

    @ApiProperty({ description: '菜单图标', required: false })
    @IsOptional()
    @Length(1, 64, { message: '菜单图标不能超过64个字符' })
    @Column({ name: 'icon_name', comment: '菜单图标', length: 64, nullable: true })
    iconName: string

    @ApiProperty({ description: '上级菜单ID', required: false })
    @IsOptional()
    @Column({ comment: '上级菜单ID', length: 19, nullable: true })
    pid: string

    @ApiProperty({ description: '菜单是否可见', example: true })
    @Type(() => Boolean)
    @IsNotEmpty({ message: '菜单是否可见必填' })
    @Column({ comment: '菜单是否可见', default: true, nullable: false })
    check: boolean

    @ApiProperty({ description: '版本号', example: 'v1.0.0' })
    @IsNotEmpty({ message: '版本号必填' })
    @Length(1, 32, { message: '版本号不能超过32个字符' })
    @Column({ comment: '版本号', length: 32, default: 'v1.0.0', nullable: false })
    version: string

    @ApiProperty({ description: '排序号', example: 0 })
    @IsNumber({}, { message: '排序号必须为number' })
    @Type(() => Number)
    @Column({ comment: '排序号', default: 0, nullable: false })
    sort: number
}

@Entity({ name: 'tb_remote_resource_when', comment: '管理端-菜单资源权限表' })
export class RemoteResourcePermissions extends DataBaseAdapter {}

// @Entity({ name: 'tb_remote_when_resource', comment: '管理端-菜单资源权限表' })
// export class SchemaResource extends DataBaseAdapter {}
