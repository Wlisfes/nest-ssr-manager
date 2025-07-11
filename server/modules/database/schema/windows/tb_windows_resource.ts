import { Entity, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, Length, IsEnum, IsNumber, IsOptional } from 'class-validator'
import { DataBaseAdapter, fetchProperty, fetchComment } from '@server/modules/database/database.adapter'
import * as ENUMS from '@server/modules/database/enums'

@Entity({ name: 'tb_windows_resource', comment: '管理端-菜单资源表' })
export class WindowsResource extends DataBaseAdapter {
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

    @ApiProperty({ description: '菜单状态', enum: fetchProperty(ENUMS.COMMON_WINDOWS_RESOUREC.status) })
    @IsNotEmpty({ message: '菜单状态必填' })
    @Length(0, 32, { message: '菜单状态不能超过32个字符' })
    @IsEnum(Object.keys(ENUMS.COMMON_WINDOWS_RESOUREC.status), { message: '菜单状态格式错误' })
    @Column({ nullable: false, comment: fetchComment('菜单状态', ENUMS.COMMON_WINDOWS_RESOUREC.status) })
    status: string
}

@Entity({ name: 'tb_windows_resource_permissions', comment: '管理端-操作按钮权限表' })
export class WindowsResourcePermissions extends DataBaseAdapter {
    @ApiProperty({ description: '用户UID' })
    @IsNotEmpty({ message: '用户UID必填' })
    @Column({ comment: '用户UID', length: 19, nullable: false })
    uid: string

    @ApiProperty({ description: '归属菜单ID' })
    @IsNotEmpty({ message: '归属菜单ID必填' })
    @Column({ comment: '归属菜单ID', length: 19, nullable: true })
    pid: string

    @ApiProperty({ description: '按钮权限标识' })
    @IsNotEmpty({ message: '按钮权限标识必填' })
    @Length(1, 128, { message: '按钮权限标识不能超过128个字符' })
    @Column({ comment: '按钮权限标识', length: 128, nullable: true })
    key: string

    @ApiProperty({ description: '按钮名称' })
    @IsNotEmpty({ message: '按钮名称必填' })
    @Length(1, 32, { message: '按钮名称不能超过32个字符' })
    @Column({ comment: '按钮名称', length: 32, nullable: false })
    name: string

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

    @ApiProperty({ description: '按钮状态', enum: fetchProperty(ENUMS.COMMON_WINDOWS_RESOUREC_PERMISSIONS.status) })
    @IsNotEmpty({ message: '按钮状态必填' })
    @Length(0, 32, { message: '按钮状态不能超过32个字符' })
    @IsEnum(Object.keys(ENUMS.COMMON_WINDOWS_RESOUREC_PERMISSIONS.status), { message: '按钮状态格式错误' })
    @Column({ nullable: false, comment: fetchComment('按钮状态', ENUMS.COMMON_WINDOWS_RESOUREC_PERMISSIONS.status) })
    status: string
}

@Entity({ name: 'tb_windows_resource_interface', comment: '管理端-接口权限表' })
export class WindowsResourceInterface extends DataBaseAdapter {
    @ApiProperty({ description: '用户UID' })
    @IsNotEmpty({ message: '用户UID必填' })
    @Column({ comment: '用户UID', length: 19, nullable: false })
    uid: string

    @ApiProperty({ description: '归属资源ID' })
    @IsNotEmpty({ message: '归属资源ID必填' })
    @Column({ comment: '归属资源ID', length: 19, nullable: true })
    pid: string

    @ApiProperty({ description: '接口名称' })
    @IsNotEmpty({ message: '接口名称必填' })
    @Length(1, 32, { message: '接口名称不能超过32个字符' })
    @Column({ comment: '接口名称', length: 32, nullable: false })
    name: string

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

    @ApiProperty({ description: '接口地址' })
    @IsNotEmpty({ message: '接口地址必填' })
    @Length(1, 255, { message: '接口地址不能超过255个字符' })
    @Column({ comment: '接口地址', length: 255, nullable: true })
    path: string

    @ApiProperty({ description: '请求类型', enum: fetchProperty(ENUMS.COMMON_WINDOWS_RESOUREC_INTERFACE.method) })
    @IsNotEmpty({ message: '请求类型必填' })
    @Length(0, 32, { message: '请求类型不能超过32个字符' })
    @IsEnum(Object.keys(ENUMS.COMMON_WINDOWS_RESOUREC_INTERFACE.method), { message: '请求类型态格式错误' })
    @Column({ nullable: false, comment: fetchComment('请求类型', ENUMS.COMMON_WINDOWS_RESOUREC_INTERFACE.method) })
    method: string

    @ApiProperty({ description: '接口状态', enum: fetchProperty(ENUMS.COMMON_WINDOWS_RESOUREC_INTERFACE.status) })
    @IsNotEmpty({ message: '接口状态必填' })
    @Length(0, 32, { message: '接口状态不能超过32个字符' })
    @IsEnum(Object.keys(ENUMS.COMMON_WINDOWS_RESOUREC_INTERFACE.status), { message: '接口状态格式错误' })
    @Column({ nullable: false, comment: fetchComment('接口状态', ENUMS.COMMON_WINDOWS_RESOUREC_INTERFACE.status) })
    status: string
}
