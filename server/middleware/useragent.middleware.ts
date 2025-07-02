import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as useragent from 'express-useragent'

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
    use(request: Request, response: Response, next: NextFunction) {
        useragent.express()(request, response, next)
    }
}
