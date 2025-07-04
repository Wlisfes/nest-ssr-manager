import { HttpException, HttpStatus, HttpExceptionOptions } from '@nestjs/common'
import { fetchHandler } from '@server/utils/modules/common'
import { isNotEmpty } from 'class-validator'

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
