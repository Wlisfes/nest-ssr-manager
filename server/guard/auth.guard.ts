import { CanActivate, SetMetadata, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export interface AuthGuardOptions {
    /**开启验证**/
    check?: boolean
    /**平台标识**/
    // platform?: OmixRequest['platform'] | Array<OmixRequest['platform']>
}

@Injectable()
export class AuthGuard implements CanActivate {
    /**登录拦截入口**/
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        return true
    }
}

/**登录守卫、使用ApiGuardBearer守卫的接口会验证登录**/
export const ApiGuardBearer = (options: AuthGuardOptions) => SetMetadata(`APP_AUTH_CONTEXT`, options)
