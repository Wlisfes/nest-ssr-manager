import { Module, Global } from '@nestjs/common'
import { CodexService } from '@server/modules/common/modules/codex.service'

@Global()
@Module({
    providers: [CodexService],
    exports: [CodexService]
})
export class CommonModule {}
