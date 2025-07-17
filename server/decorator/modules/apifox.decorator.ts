import { ApiTags } from '@nestjs/swagger'
import { Controller, applyDecorators } from '@nestjs/common'

export function ApifoxController(name: string, path: string) {
    return applyDecorators(ApiTags(name), Controller(path))
}
