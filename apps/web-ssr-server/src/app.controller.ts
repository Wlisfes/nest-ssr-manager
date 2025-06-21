import { Controller, Get, Header, Request } from '@nestjs/common'
import { createWebServer } from './vite.server'

@Controller()
export class AppController {
    @Get('*')
    @Header('Content-Type', 'text/html')
    async fetchBaseRender(@Request() request) {
        try {
            return await createWebServer(request)
        } catch (error) {
            console.log(error)
            return '500'
        }
    }
}
