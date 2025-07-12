import { Module, Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule as NestJwtModule, JwtService as NestJwtService } from '@nestjs/jwt'
import { JwtService } from '@server/modules/jwt/jwt.service'

@Global()
@Module({
    imports: [
        NestJwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get('NODE_JWT_SECRET')
            })
        })
    ],
    controllers: [],
    providers: [NestJwtService, JwtService],
    exports: [NestJwtService, JwtService]
})
export class JwtModule {}
