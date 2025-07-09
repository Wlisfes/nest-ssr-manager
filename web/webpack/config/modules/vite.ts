import { resolve } from 'path'
import dotenv from 'dotenv'

export function fetchEnvService(mode: string) {
    const config = dotenv.config({ path: resolve(process.cwd(), `./env/.env.${mode}`) }).parsed ?? {}
    const json: Record<string, any> = {}
    Object.entries(config).forEach(([key, value]) => {
        if (key.startsWith('NODE_WEB_')) {
            json[`import.meta.env.${key}`] = JSON.stringify(value)
        }
    })
    return json
}
