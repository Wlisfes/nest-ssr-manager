import { Injectable } from '@nestjs/common'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { DataBaseService, WindowsService } from '@server/modules/database/database.service'

@Injectable()
export class AccountService extends Logger {
    constructor(
        private readonly dataBaseService: DataBaseService,
        private readonly windowsService: WindowsService
    ) {
        super()
    }
}
