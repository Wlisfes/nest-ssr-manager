import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Logger } from '@server/modules/logger/logger.service'
import { moment } from '@server/utils'

@Catch()
export class HttpExceptionFilter extends Logger implements ExceptionFilter {
    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()
        const logger = await this.fetchServiceTransaction(request, {
            date: request.headers.datetime,
            deplayName: HttpExceptionFilter.name
        })
        const Result: Omix = {
            context: request.headers.context,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
            url: request.url,
            method: request.method,
            code: exception.status ?? HttpStatus.INTERNAL_SERVER_ERROR
        }
        if (exception.response && Array.isArray(exception.response.message)) {
            Result.message = exception.response.message[0]
        } else {
            Result.message = exception.message
        }
        logger.error(Result)
        Result.data = exception.options ?? null
        response.status(HttpStatus.OK)
        response.header('Content-Type', 'application/json; charset=utf-8')
        response.send(Result)
    }
}
