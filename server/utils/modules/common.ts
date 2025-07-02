import { snowflakeId } from 'snowflake-id-maker'
import { zh_CN, Faker } from '@faker-js/faker'
import { isNotEmpty } from 'class-validator'
import { Request } from 'express'
import { getClientIp } from 'request-ip'
import DayJS from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
DayJS.extend(timezone)
DayJS.extend(utc)

/**dayjs实例**/
export const moment = DayJS

/**虚拟数据实例**/
export const faker = new Faker({ locale: zh_CN })

/**生成纯数字的雪花ID、随机字符串**/
export function fetchIntNumber(opts: Omix<{ bit?: number }> = {}) {
    if (isNotEmpty(opts.bit) && opts.bit > 0) {
        return Array.from({ length: opts.bit }, x => Math.floor(Math.random() * 9) + 1).join('')
    }
    return snowflakeId({ worker: process.pid, epoch: 1199145600000 })
}

/**条件值返回**/
export function fetchWherer<T>(where: boolean, scope: Omix<{ value: T; fallback?: T; defaultValue?: T }>): T {
    if (where) {
        return scope.value ?? scope.defaultValue
    }
    return scope.fallback ?? scope.defaultValue
}

/**获取IP**/
export function fetchIPClient(request: Omix<Request>) {
    const ipv4 = getClientIp(request)
    return ['localhost', '::1', '::ffff:127.0.0.1'].includes(ipv4) ? '127.0.0.1' : ipv4.replace(/^.*:/, '')
}

/**条件链式执行函数**/
export async function fetchHandler<T>(where: boolean | Function, handler?: Function): Promise<T> {
    const value = typeof where === 'function' ? await where() : where
    if (value && typeof handler === 'function') {
        return (await handler()) as T
    }
    return value as T
}
