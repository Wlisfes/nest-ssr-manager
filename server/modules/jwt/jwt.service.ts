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
            return (await this.jwt.verifyAsync(token, { secret: this.configService.get('NODE_JWT_SECRET') })) as T
        } catch (e) {
            throw new HttpException(options.message ?? '身份验证失败', options.code ?? HttpStatus.UNAUTHORIZED)
        }
    }

    /**jwt加密**/
    @AutoDescriptor
    public async fetchJwtSecret<T>(node: Omix<T>, options: Partial<JwtSecretOptions> = {}) {
        try {
            const jwtSecret = this.configService.get('NODE_JWT_SECRET')
            const expires = Number(options.expires ?? this.configService.get('NODE_JWT_EXPIRES') ?? 7200)
            const datetime = new Date().getTime()
            return {
                expires,
                token: await this.jwt.signAsync(Object.assign(node, { datetime, auth: 'token' }), {
                    expiresIn: expires,
                    secret: jwtSecret
                })
            }
        } catch (e) {
            throw new HttpException(options.message ?? '身份验证失败', options.code ?? HttpStatus.UNAUTHORIZED)
        }
    }
}
