import { Injectable } from '@nestjs/common'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'

@Injectable()
export class AccountService extends Logger {
    constructor() {
        super()
    }
}
