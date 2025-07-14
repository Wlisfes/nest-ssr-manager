import { CanActivate, SetMetadata, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export interface AuthWindowsOptions {
    /**开启token验证**/
    check?: boolean
}

@Injectable()
export class AuthWindowsGuard implements CanActivate {
    /**登录拦截入口**/
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        return true
    }
}

/**登录守卫、使用ApiWindowsGuardReflector守卫的接口会验证登录**/
export const ApiWindowsGuardReflector = (options: AuthWindowsOptions) => {
    return SetMetadata(`APP_AUTH_WINDOWS_CONTEXT`, options)
}
