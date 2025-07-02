import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { isNotEmpty } from 'class-validator'
import moment from 'dayjs'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
        const response = context.switchToHttp().getResponse()
        if (isNotEmpty(response.getHeader('Content-Type'))) {
            return next.handle()
        }
        return next.handle().pipe(
            map(data => {
                return {
                    data: data || null,
                    code: HttpStatus.OK,
                    message: typeof data?.message === 'object' ? 'success' : (data?.message ?? 'success'),
                    timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
                }
            })
        )
    }
}
