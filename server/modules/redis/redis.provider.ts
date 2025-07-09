import Rides, { RedisOptions } from 'ioredis'

export const CLIENT_REDIS = Symbol('CLIENT_REDIS')
export type ClientRedis = Rides

/**初始化连接Redis**/
export async function createRedisConnect(option: RedisOptions) {
    return new Rides(option)
}
