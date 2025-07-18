import { PickType, IntersectionType, PartialType } from '@nestjs/swagger'
import { OmixColumn, OmixPayload } from '@server/interface'
import { WindowsAccount } from '@server/modules/database/schema'

/**账号登录**/
export class AccountTokenOptions extends IntersectionType(
    PickType(WindowsAccount, ['number', 'password']),
    PickType(OmixPayload, ['code'])
) {}
