import { HttpException, HttpStatus, HttpExceptionOptions } from '@nestjs/common'
import { fetchHandler } from '@server/utils/modules/common'
import { isNotEmpty } from 'class-validator'

/**
 * 条件捕获、异常抛出
 * @param where 异常条件、为真会抛出异常
 * @param options.message 异常描述
 * @param options.code 异常状态码
 * @param options.cause 额外异常数据
 */
export async function fetchCatchWherer(
    where: boolean,
    options: Omix<{ message: string; code?: number; cause?: Omix<HttpExceptionOptions> }>
) {
    return await fetchHandler(where, function () {
        throw new HttpException(options.message, options.code ?? HttpStatus.BAD_REQUEST, options.cause)
    })
}

/**
 * 字段输出控制
 * @param alias 表别名
 * @param fields 表字段
 * @returns 表字段查询组合键
 */
export function fetchSelection(alias: string, fields: string[]) {
    return (fields ?? []).map(field => (isNotEmpty(alias) ? `${alias}.${field}` : field))
}
