import { ref } from 'vue'
import { Request } from 'express'
import Cookies, { CookieSetOptions } from 'universal-cookie'
export const ctx = ref<Request>({} as Request)

export enum AUTH {
    /**主题存储**/
    APP_NEST_THEME = 'APP_NEST_THEME',
    /**主题色存储**/
    APP_NEST_PRIMARY_COLOR = 'APP_NEST_PRIMARY_COLOR',
    /**语言存储存**/
    APP_NEST_LOCALE = 'APP_NEST_LOCALE',
    /**token存储**/
    APP_NEST_TOKEN = 'APP_NEST_TOKEN'
}

export function useCoutext(options: CookieSetOptions = { maxAge: 30 * 24 * 60 * 60 }) {
    const cookies = new Cookies(ctx.value.headers?.cookie, options)

    return { ctx, cookies, AUTH }
}
