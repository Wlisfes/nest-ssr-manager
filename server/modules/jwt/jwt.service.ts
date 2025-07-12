import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService as Jwt } from '@nestjs/jwt'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { JwtParserOptions, JwtSecretOptions } from '@server/interface'

@Injectable()
export class JwtService extends Logger {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwt: Jwt
    ) {
        super()
    }

    /**jwt解析**/
    @AutoDescriptor
    public async fetchJwtParser<T>(token: string, options: Partial<JwtParserOptions> = {}): Promise<T> {
        try {
            return (await this.jwt.verifyAsync(token, { secret: this.configService.get('JWT_SECRET') })) as T
        } catch (e) {
            throw new HttpException(options.message ?? '身份验证失败', options.code ?? HttpStatus.UNAUTHORIZED)
        }
    }

    /**jwt加密**/
    @AutoDescriptor
    public async fetchJwtSecret<T>(node: Omix<T>, options: Partial<JwtSecretOptions> = {}) {
        try {
            const jwtSecret = this.configService.get('JWT_SECRET')
            const expires = Number(options.expires ?? 3600 * 24 * 30)
            const datetime = new Date().getTime()
            const token = await this.jwt.signAsync(Object.assign(node, { datetime, auth: 'token' }), {
                expiresIn: expires,
                secret: jwtSecret
            })
            const secret = await this.jwt.signAsync(Object.assign(node, { datetime, auth: 'secret' }), {
                expiresIn: expires * 2,
                secret: jwtSecret
            })
            return { expires, token, secret }
        } catch (e) {
            throw new HttpException(options.message ?? '身份验证失败', options.code ?? HttpStatus.UNAUTHORIZED)
        }
    }
}
