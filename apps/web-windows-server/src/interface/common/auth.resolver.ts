import { PickType, IntersectionType, PartialType } from '@nestjs/swagger'
import { OmixColumn, OmixPayload } from '@server/interface'
import { WindowsAccount } from '@server/modules/database/schema'

/**新增用户账号**/
export class AuthAccountOptions extends IntersectionType(
    PickType(WindowsAccount, ['number', 'password']),
    PickType(OmixPayload, ['code'])
) {}
