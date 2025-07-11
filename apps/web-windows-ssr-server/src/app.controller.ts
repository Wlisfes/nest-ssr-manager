import { Controller, Get, Header, Request } from '@nestjs/common'
import { createRouteServer } from 'apps/web-windows-ssr-server/src/vite.server'

@Controller()
export class AppController {
    @Get('*')
    @Header('Content-Type', 'text/html')
    async fetchBaseRender(@Request() request) {
        return await createRouteServer(request)
    }
}
