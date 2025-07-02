import { CanActivate, SetMetadata, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export interface AuthSystemOptions {
    /**开启token验证**/
    check?: boolean
}

@Injectable()
export class AuthSystemGuard implements CanActivate {
    /**登录拦截入口**/
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        return true
    }
}

/**登录守卫、使用ApiSystemGuardReflector守卫的接口会验证登录**/
export const ApiSystemGuardReflector = (options: AuthSystemOptions) => {
    return SetMetadata(`APP_AUTH_SYSTEM_CONTEXT`, options)
}
