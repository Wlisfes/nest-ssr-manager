import { CanActivate, SetMetadata, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@server/modules/jwt/jwt.service'
import { OmixRequest } from '@server/interface'
import { Reflector } from '@nestjs/core'

export interface AuthWindowsOptions {
    /**验证失败是否继续执行**/
    next?: boolean
}

@Injectable()
export class AuthWindowsGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
    ) {}

    /**默认配置**/
    public async fetchCtxOptions(context: ExecutionContext): Promise<AuthWindowsOptions> {
        const node = this.reflector.get<boolean | AuthWindowsOptions>(`APP_AUTH_WINDOWS_CONTEXT`, context.getHandler())
        if (typeof node === 'boolean') {
            return { next: false }
        }
        return node
    }

    /**token解析**/
    public async fetchGuardHandler(request: Omix<OmixRequest>, token: string, options: AuthWindowsOptions) {
        try {
            request.user = await this.jwtService.fetchJwtParser(token)
        } catch (err) {
            if (!options.next) {
                throw new HttpException(err.message ?? '身份验证失败', err.status ?? HttpStatus.UNAUTHORIZED)
            }
            return err
        }
    }

    /**登录拦截入口**/
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<OmixRequest>()
        const options = await this.fetchCtxOptions(context)
        const token = (request.headers.authorization ?? '').replace(/^Bearer\s+/i, '')
        await new Promise(resolve => setTimeout(resolve, 100))
        return await this.fetchGuardHandler(request, token, options).then(() => {
            return true
        })
    }
}

/**登录守卫、使用ApiWindowsGuardReflector守卫的接口会验证登录**/
export const ApiWindowsGuardReflector = (options: boolean | AuthWindowsOptions) => {
    return SetMetadata(`APP_AUTH_WINDOWS_CONTEXT`, options)
}
