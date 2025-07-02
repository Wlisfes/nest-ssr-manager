import { Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { ThrottlerGuard, seconds } from '@nestjs/throttler'
export const ThrottlerOptions = {
    default: { limit: 100, ttl: seconds(10) }, //10秒100次=1s/10pc
    small: { name: 'small', limit: 25, ttl: seconds(5) }, //5秒25次=1s/5pc
    large: { name: 'large', limit: 1200, ttl: seconds(60) } //60秒1200次=2/20pc
}

@Injectable()
export class AuthThrottler extends ThrottlerGuard {
    protected async throwThrottlingException(
        context: ExecutionContext,
        detail: Parameters<ThrottlerGuard['throwThrottlingException']>['1']
    ) {
        throw new HttpException('操作频繁，请稍后再试！', HttpStatus.TOO_MANY_REQUESTS)
    }
}
