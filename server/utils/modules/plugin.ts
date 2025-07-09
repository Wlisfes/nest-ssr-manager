import { HttpException, HttpStatus, HttpExceptionOptions } from '@nestjs/common'
import { fetchHandler } from '@server/utils/modules/common'
import { isEmpty, isNotEmpty, isString, isObject } from 'class-validator'

/**条件捕获、异常抛出**/
export async function fetchCatchWherer(
    where: boolean,
    scope: Omix<{ message: string; code?: number; cause?: Omix<HttpExceptionOptions> }>
) {
    return await fetchHandler(where, function () {
        throw new HttpException(scope.message, scope.code ?? HttpStatus.BAD_REQUEST, scope.cause)
    })
}

/**字段输出控制**/
export function fetchSelection(alias: string, fields: string[]) {
    return (fields ?? []).map(field => (isNotEmpty(alias) ? `${alias}.${field}` : field))
}

/**redis存储键组合方法**/
export function fetchKeysCompose(...args: Array<string | Omix>): Promise<string> {
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
