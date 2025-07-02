import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { moment } from '@server/utils/utils.instance'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const request = ctx.getRequest()
        const Result: Omix = {
            context: request.headers.context,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
            url: request.url,
            method: request.method,
            platform: request.headers.platform,
            code: exception.status ?? HttpStatus.INTERNAL_SERVER_ERROR
        }
        if (exception.response && Array.isArray(exception.response.message)) {
            Result.message = exception.response.message[0]
        } else {
            Result.message = exception.message
        }
        Result.data = exception.options ?? null
        response.status(HttpStatus.OK)
        response.header('Content-Type', 'application/json; charset=utf-8')
        response.send(Result)
    }
}
