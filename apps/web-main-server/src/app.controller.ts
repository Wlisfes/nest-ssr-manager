import { Controller, Get, Redirect } from '@nestjs/common'
import { fetchGlobalEnv } from '@server/utils'
const env = fetchGlobalEnv()

@Controller()
export class AppController {
    @Get('/')
    @Redirect(`http://localhost:${env.NODE_MAIN_SSR_PORT}/doc.html`, 302)
    public async httpBaseRedirect() {}
}
