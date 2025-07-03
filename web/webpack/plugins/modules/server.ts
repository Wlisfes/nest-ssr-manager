import { App } from 'vue'
import { Request } from 'express'
import { fetchSetCoutext } from '../../hooks'

export function CoutextServer(ssr: boolean, request?: Request) {
    return {
        install(app: App) {
            if (ssr && request) {
                fetchSetCoutext(request)
            }
        }
    }
}
