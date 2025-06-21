import { Controller, Get, Header, Request } from '@nestjs/common'
import { createRouteServer } from '@server/vite.server'

@Controller()
export class WebController {
    @Get('*')
    @Header('Content-Type', 'text/html')
    async fetchBaseRender(@Request() request) {
        try {
            return await createRouteServer(request)
        } catch (error) {
            return '500'
        }
    }
}
