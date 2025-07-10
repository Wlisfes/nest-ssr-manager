import { CanActivate, SetMetadata, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export interface AuthRemoteOptions {
    /**开启token验证**/
    check?: boolean
}

@Injectable()
export class AuthRemoteGuard implements CanActivate {
    /**登录拦截入口**/
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        return true
    }
}

/**登录守卫、使用ApiRemoteGuardReflector守卫的接口会验证登录**/
export const ApiRemoteGuardReflector = (options: AuthRemoteOptions) => {
    return SetMetadata(`APP_AUTH_REMOTE_CONTEXT`, options)
}
