import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { CLIENT_REDIS, ClientRedis } from '@server/modules/redis/redis.provider'
import { OmixRequest, WriteRedisOption, ReadRedisOption, MgetRedisOption, DelRedisOption } from '@server/interface'
import { isEmpty, isNotEmpty, isString, isObject } from 'class-validator'

@Injectable()
export class RedisService extends Logger {
    constructor(@Inject(CLIENT_REDIS) public readonly client: ClientRedis) {
        super()
    }

    /**redis存储键组合方法**/
    @AutoDescriptor
    public async fetchCompose(...args: Array<string | Omix>): Promise<string> {
        const data = args.find(item => isObject(item)) ?? {}
        const keys = [...args].filter(name => isString(name) && isNotEmpty(name)).join(':')
        const name = keys.replace(/\{(.*?)\}/g, (match, key) => (isEmpty(data[key]) ? match : data[key]))
        return new Promise(resolve => {
            name.replace(/\{(.*?)\}/g, match => {
                throw new HttpException(`redis key ${match} 参数不可为空`, HttpStatus.BAD_REQUEST)
            })
            return resolve(name)
        })
    }

    /**redis存储**/
    @AutoDescriptor
    public async setStore(request: OmixRequest, body: WriteRedisOption) {
        const logger = await this.fetchServiceTransaction(request, { deplayName: this.fetchDeplayName(body.deplayName) })
        if (body.seconds > 0) {
            return await this.client.set(body.key, JSON.stringify(body.data), 'EX', body.seconds).then(async value => {
                if (body.logger ?? false) {
                    logger.info({ message: 'Redis存储', key: body.key, data: body.data })
                }
                return { value, seconds: body.seconds }
            })
        } else {
            return await this.client.set(body.key, JSON.stringify(body.data)).then(async value => {
                if (body.logger ?? false) {
                    logger.info({ message: 'Redis存储', key: body.key, data: body.data })
                }
                return { value, seconds: 0 }
            })
        }
    }

    /**redis读取**/
    @AutoDescriptor
    public async getStore<T>(request: OmixRequest, body: ReadRedisOption<T>): Promise<T> {
        const logger = await this.fetchServiceTransaction(request, { deplayName: this.fetchDeplayName(body.deplayName) })
        return await this.client.get(body.key).then(async data => {
            const value = data ? JSON.parse(data) : body.defaultValue
            if (body.logger ?? false) {
                logger.info({ message: 'Redis读取', ...body, data })
            }
            return value
        })
    }

    /**redis批量读取**/
    @AutoDescriptor
    public async mgetStore(request: OmixRequest, body: MgetRedisOption) {
        const logger = await this.fetchServiceTransaction(request, { deplayName: this.fetchDeplayName(body.deplayName) })
        return await this.client.mget(body.keys).then(async data => {
            const values = body.keys.map((key, index) => ({ key, value: data[index] ?? false }))
            if (body.logger ?? false) {
                logger.info({ message: 'Redis批量读取', ...body, data: values })
            }
            return values
        })
    }

    /**redis删除**/
    @AutoDescriptor
    public async delStore(request: OmixRequest, body: DelRedisOption) {
        const logger = await this.fetchServiceTransaction(request, { deplayName: this.fetchDeplayName(body.deplayName) })
        return await this.client.del(body.key).then(async value => {
            if (body.logger ?? false) {
                logger.info({ message: 'Redis删除', ...body })
            }
            return value
        })
    }
}
