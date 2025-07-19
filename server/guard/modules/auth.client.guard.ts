import { CanActivate, SetMetadata, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export interface AuthClientOptions {
    /**验证失败是否继续执行**/
    next?: boolean
}

@Injectable()
export class AuthClientGuard implements CanActivate {
    /**登录拦截入口**/
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        return true
    }
}

/**登录守卫、使用ApiClientGuardReflector守卫的接口会验证登录**/
export const ApiClientGuardReflector = (options: boolean | AuthClientOptions) => {
    return SetMetadata(`APP_AUTH_CLIENT_CONTEXT`, options)
}
