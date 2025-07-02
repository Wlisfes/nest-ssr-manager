import { HttpException, HttpStatus, HttpExceptionOptions } from '@nestjs/common'
import { fetchHandler } from '@server/utils/modules/common'

/**条件捕获、异常抛出**/
export async function fetchCatchWherer(
    where: boolean,
    scope: Omix<{ message: string; code?: number; cause?: Omix<HttpExceptionOptions> }>
) {
    return await fetchHandler(where, function () {
        throw new HttpException(scope.message, scope.code ?? HttpStatus.BAD_REQUEST, scope.cause)
    })
}
