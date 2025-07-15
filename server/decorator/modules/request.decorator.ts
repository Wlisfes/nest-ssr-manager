import { ApiOperationOptions, ApiResponseOptions, getSchemaPath, ApiExtraModels } from '@nestjs/swagger'
import { ApiOperation, ApiConsumes, ApiProduces, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { applyDecorators, Type } from '@nestjs/common'
import { Throttle, SkipThrottle } from '@nestjs/throttler'
import { isEmpty } from 'class-validator'
import { AuthClientOptions, AuthWindowsOptions, ThrottlerOptions, ApiClientGuardReflector, ApiWindowsGuardReflector } from '@server/guard'

export interface ApiDecoratorOptions {
    /**接口描述**/
    operation: ApiOperationOptions
    /**接口响应描述**/
    response: ApiResponseOptions
    /**分页列表类型**/
    customize: { status: number; description: string; type: Type<unknown> }
    /**客户端登录校验**/
    clinet?: AuthClientOptions
    /**管理登录校验**/
    windows?: AuthWindowsOptions
    /**入参类型定义**/
    consumes: string[]
    /**出类型定义**/
    produces: string[]
    /**开启接口QPS控制：使用default配置**/
    skipThrottle: boolean
    /**开启接口QPS控制：使用自定义配置**/
    throttle: keyof typeof ThrottlerOptions | Parameters<typeof Throttle>['0']
}

export function ApiServiceDecorator(mthodRequest: MethodDecorator, option: Partial<ApiDecoratorOptions> = {}) {
    const consumes = option.consumes ?? ['application/json']
    const produces = option.produces ?? ['application/json', 'application/xml']
    const decorators: Array<any> = [mthodRequest, ApiOperation(option.operation), ApiConsumes(...consumes), ApiProduces(...produces)]
    if (option.skipThrottle) {
        decorators.push(SkipThrottle())
    } else if (isEmpty(option.throttle)) {
        decorators.push(Throttle({ default: ThrottlerOptions.default }))
    } else if (option.throttle && typeof option.throttle === 'string') {
        decorators.push(Throttle({ [option.throttle]: ThrottlerOptions[option.throttle] }))
    } else if (typeof option.throttle === 'object') {
        decorators.push(Throttle(option.throttle))
    }

    if (option.customize) {
        decorators.push(
            ApiExtraModels(option.customize.type),
            ApiResponse({
                status: option.customize.status,
                description: option.customize.description,
                schema: {
                    allOf: [
                        {
                            properties: {
                                page: { type: 'number', default: 1 },
                                size: { type: 'number', default: 10 },
                                total: { type: 'number', default: 0 },
                                list: {
                                    type: 'array',
                                    items: { $ref: getSchemaPath(option.customize.type) }
                                }
                            }
                        }
                    ]
                }
            })
        )
    } else {
        decorators.push(ApiResponse(option.response))
    }

    /**开启客户端登录校验**/
    if (option.clinet && option.clinet.check) {
        decorators.push(ApiBearerAuth('authorization'), ApiClientGuardReflector(option.clinet))
    } else if (option.windows && option.windows.check) {
        /**开启管理端登录校验**/
        decorators.push(ApiBearerAuth('authorization'), ApiWindowsGuardReflector(option.clinet))
    }

    return applyDecorators(...decorators)
}
