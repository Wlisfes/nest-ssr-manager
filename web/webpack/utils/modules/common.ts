import DayJS from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
DayJS.extend(timezone)
DayJS.extend(utc)

/**dayjs实例**/
export const moment = DayJS

export async function prevent(event: Event, handler?: Function) {
    event.preventDefault()
    return handler?.(event)
}

export async function stop(event: Event, handler?: Function) {
    event.preventDefault()
    event.stopPropagation()
    if (handler && typeof handler === 'function') {
        return await handler(event)
    }
    return event
}

/**回车事件**/
export async function enter(event: KeyboardEvent, handler?: Function) {
    if (event.key === 'Enter' && typeof handler === 'function') {
        return await handler()
    }
    return event
}

/**参数组合函数**/
export async function fetchParameter<T>(data: T) {
    return data
}

/**延时方法**/
export function fetchDelay<T>(delay = 100, handler?: Function): Promise<T> {
    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            resolve(handler?.())
            clearTimeout(timeout)
        }, delay)
    })
}

/**条件链式执行函数**/
export async function fetchHandler<T>(where: boolean | Function, handler?: Function): Promise<T> {
    const value = typeof where === 'function' ? await where() : where
    if (value && typeof handler === 'function') {
        return (await handler()) as T
    }
    return value as T
}

/**根据条件返回不同参数**/
export function fetchWherer<T>(where: boolean, scope: Omix<{ value: T; fallback?: T; defaultValue?: T }>): T {
    if (where) {
        return (scope.value ?? scope.defaultValue) as T
    }
    return (scope.fallback ?? scope.defaultValue) as T
}

/**枚举对象转换**/
export function fetchObsReduce(data: Array<Omix>, fieldName: string = 'value') {
    return data.reduce((obs, next) => ({ ...obs, [next[fieldName]]: next }), {})
}

/**根据条件返回列表项**/
export function fetchObsGetter<T>(data: Array<T>, value: any, opts: Partial<{ fieldName: string; default: T }> = {}): T {
    const obs = fetchObsReduce(data, opts.fieldName ?? 'value')
    return (obs[value] ?? opts.default) as T
}

/**枚举文本内容回显**/
export function fetchObsContent<T>(data: Array<T>, value: any, opts: Partial<{ key: string; fieldName: string; default: any }> = {}) {
    const obs = fetchObsGetter(data, value, { fieldName: opts.fieldName, default: {} })
    return obs[opts.key ?? 'label'] ?? opts.default ?? '-'
}
