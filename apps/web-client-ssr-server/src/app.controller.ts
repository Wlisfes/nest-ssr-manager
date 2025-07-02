import { Controller, Get, Header, Request } from '@nestjs/common'
import { createRouteServer } from 'apps/web-client-ssr-server/src/vite.server'

@Controller()
export class AppController {
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
