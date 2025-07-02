import { ApiOperationOptions, ApiResponseOptions, getSchemaPath, ApiExtraModels } from '@nestjs/swagger'
import { ApiOperation, ApiConsumes, ApiProduces, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { applyDecorators, Type } from '@nestjs/common'
import { Throttle, SkipThrottle } from '@nestjs/throttler'
import { isEmpty, isNotEmpty, isNotEmptyObject } from 'class-validator'
import { ThrottlerOptions } from '@server/guard/auth.throttler.guard'
import { AuthGuardOptions } from '@server/guard/auth.guard'

export interface ApiDecoratorOptions {
    operation: ApiOperationOptions
    response: ApiResponseOptions
    customize: { status: number; description: string; type: Type<unknown> }
    authorize: AuthGuardOptions
    consumes: string[]
    produces: string[]
    skipThrottle: boolean
    throttle: keyof typeof ThrottlerOptions | Parameters<typeof Throttle>['0']
}

export function ApiDecorator(option: Partial<ApiDecoratorOptions> = {}) {
    const consumes = option.consumes ?? ['application/x-www-form-urlencoded', 'application/json']
    const produces = option.produces ?? ['application/json', 'application/xml']
    const decorators: Array<any> = [ApiOperation(option.operation), ApiConsumes(...consumes), ApiProduces(...produces)]
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

    return applyDecorators(...decorators)
}
