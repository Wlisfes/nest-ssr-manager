import { ApiOperationOptions, ApiResponseOptions, getSchemaPath, ApiExtraModels } from '@nestjs/swagger'
import { ApiOperation, ApiConsumes, ApiProduces, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { applyDecorators, Type } from '@nestjs/common'

export interface OptionDecorator {
    operation: ApiOperationOptions
    response: ApiResponseOptions
    customize: { status: number; description: string; type: Type<unknown> }
    // authorize: AuthGuardOption
    consumes: string[]
    produces: string[]
    skipThrottle: boolean
    // throttle: keyof typeof thr.WEB_THROTTLE | Parameters<typeof Throttle>['0']
}

export function ApiDecorator(option: Partial<OptionDecorator> = {}) {
    const consumes = option.consumes ?? ['application/x-www-form-urlencoded', 'application/json']
    const produces = option.produces ?? ['application/json', 'application/xml']
    const decorator: Array<any> = [ApiOperation(option.operation), ApiConsumes(...consumes), ApiProduces(...produces)]

    if (option.customize) {
        decorator.push(
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
        decorator.push(ApiResponse(option.response))
    }

    return applyDecorators(...decorator)
}
