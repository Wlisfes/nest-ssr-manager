import { PickType, IntersectionType, PartialType } from '@nestjs/swagger'
import { OmixColumn, OmixPayload } from '@server/interface'
import { WindowsAccount } from '@server/modules/database/schema'

/**新增用户账号**/
export class AuthCommonTokenAuthorize extends IntersectionType(
    PickType(WindowsAccount, ['name', 'number', 'phone', 'password', 'status']),
    PickType(WindowsAccount, ['avatar', 'email'])
) {}
