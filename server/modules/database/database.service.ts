import { Injectable } from '@nestjs/common'
import { Repository, DataSource, SelectQueryBuilder } from 'typeorm'
import { isNotEmpty, isEmpty } from 'class-validator'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { fetchSelection, fetchCatchWherer } from '@server/utils'
export { ClientService, WindowsService } from '@server/modules/database/database.schema'
import * as env from '@server/modules/database/database.interface'

@Injectable()
export class DataBaseService extends Logger {
    constructor(private readonly dataSource: DataSource) {
        super()
    }

    /**条件SQL组合**/
    public async fetchBrackets(where: boolean, handler?: Function) {
        if (where && handler) {
            return await handler(where)
        }
        return where
    }

    /**字段查询输出组合**/
    public async fetchSelection<T>(qb: SelectQueryBuilder<T>, keys: Array<[string, Array<string>]>) {
        const fields = new Set(keys.map(([alias, names]) => fetchSelection(alias, names)).flat(Infinity)) as never as Array<string>
        return await qb.select([...fields])
    }

    /**typeorm事务**/
    public async fetchConnectTransaction(start: boolean = true) {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        if (start) {
            await queryRunner.startTransaction()
        }
        return queryRunner
    }

    /**自定义查询**/
    public async fetchConnectBuilder<T, R>(model: Repository<T>, callback: (qb: SelectQueryBuilder<T>) => Promise<R>) {
        const qb = model.createQueryBuilder('t')
        return await callback(qb)
    }

    /**查询数据是否存在：存在会抛出异常**/
    @AutoDescriptor
    public async fetchConnectNull<T>(model: Repository<T>, data: env.BaseCommonOption<T>) {
        if ([false, 'false'].includes(data.next ?? true)) {
            /**next等于false停止执行**/
            return data
        }
        const logger = await this.fetchServiceTransaction(data.request, { deplayName: this.fetchDeplayName(data.deplayName) })
        return await model.findOne(data.dispatch).then(async node => {
            if (data.logger ?? true) {
                logger.info({ comment: data.comment, message: `[${model.metadata.name}]:查询出参`, where: data.dispatch.where, node })
            }
            if (data.transform) {
                return await fetchCatchWherer(await data.transform(node), data).then(async () => {
                    return await this.fetchResolver(node)
                })
            } else {
                return await fetchCatchWherer(isNotEmpty(node), data).then(async () => {
                    return await this.fetchResolver(node)
                })
            }
        })
    }

    /**查询数据是否不存在：不存在会抛出异常**/
    @AutoDescriptor
    public async fetchConnectNotNull<T>(model: Repository<T>, data: env.BaseCommonOption<T>) {
        if ([false, 'false'].includes(data.next ?? true)) {
            /**next等于false停止执行**/
            return data
        }
        const logger = await this.fetchServiceTransaction(data.request, { deplayName: this.fetchDeplayName(data.deplayName) })
        return await model.findOne(data.dispatch).then(async node => {
            if (data.logger ?? true) {
                logger.info({ comment: data.comment, message: `[${model.metadata.name}]:查询出参`, where: data.dispatch.where, node })
            }
            if (data.transform) {
                return await fetchCatchWherer(await data.transform(node), data).then(async () => {
                    return await this.fetchResolver(node)
                })
            } else {
                return await fetchCatchWherer(isEmpty(node), data).then(async () => {
                    return await this.fetchResolver(node)
                })
            }
        })
    }

    /**创建数据模型**/
    @AutoDescriptor
    public async fetchConnectCreate<T>(model: Repository<T>, data: env.BaseCreateOptions<T>): Promise<Awaited<T> & T> {
        if ([false, 'false'].includes(data.next ?? true)) {
            /**next等于false停止执行**/
            return data as never as Promise<Awaited<T> & T>
        }
        const logger = await this.fetchServiceTransaction(data.request, { deplayName: this.fetchDeplayName(data.deplayName) })
        const state = await model.create(data.body)
        return await model.save(state).then(async node => {
            if (data.logger ?? true) {
                logger.info({ comment: data.comment, message: `[${model.metadata.name}]:事务等待创建结果`, body: data.body, node })
            }
            return node
        })
    }

    /**批量创建数据模型**/
    @AutoDescriptor
    public async fetchConnectInsert<T>(model: Repository<T>, data: env.BaseInsertOptions<T>) {
        if ([false, 'false'].includes(data.next ?? true)) {
            /**next等于false停止执行**/
            return data
        }
        const logger = await this.fetchServiceTransaction(data.request, { deplayName: this.fetchDeplayName(data.deplayName) })
        return await model.save(data.body).then(async node => {
            if (data.logger ?? true) {
                logger.info({ comment: data.comment, message: `[${model.metadata.name}]:事务等待批量创建结果`, body: data.body, node })
            }
            return node
        })
    }

    /**更新数据模型**/
    @AutoDescriptor
    public async fetchConnectUpdate<T>(model: Repository<T>, data: env.BaseUpdateOptions<T>) {
        if ([false, 'false'].includes(data.next ?? true)) {
            /**next等于false停止执行**/
            return data
        }
        const logger = await this.fetchServiceTransaction(data.request, { deplayName: this.fetchDeplayName(data.deplayName) })
        return await model.update(data.where, data.body).then(async node => {
            if (data.logger ?? true) {
                logger.info({
                    comment: data.comment,
                    message: `[${model.metadata.name}]:事务等待更新结果`,
                    where: data.where,
                    body: data.body,
                    node
                })
            }
            return node
        })
    }

    /**删除数据模型**/
    @AutoDescriptor
    public async fetchConnectDelete<T>(model: Repository<T>, data: env.BaseDeleteOptions<T>) {
        if ([false, 'false'].includes(data.next ?? true)) {
            /**next等于false停止执行**/
            return data
        }
        const logger = await this.fetchServiceTransaction(data.request, { deplayName: this.fetchDeplayName(data.deplayName) })
        return await model.delete(data.where).then(async node => {
            if (data.logger ?? true) {
                logger.info({ comment: data.comment, message: `[${model.metadata.name}]:事务等待删除结果`, where: data.where, node })
            }
            return node
        })
    }
}
