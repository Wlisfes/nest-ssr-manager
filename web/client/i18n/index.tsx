import { ref, computed } from 'vue'
import { createI18n, useI18n } from 'vue-i18n'
import { messages, I18nContext, I18nNode, I18nStore } from '@/i18n/messages'
import { useCoutext, AUTH } from '@webpack/hooks'

export const locale = ref<keyof typeof messages>(getDefaultLocale())
export const i18n = createI18n({
    id: 'APP_NEST_I18N',
    legacy: false,
    globalInjection: true,
    warnHtmlMessage: false,
    silentTranslationWarn: true,
    locale: locale.value,
    messages
})

/**获取默认语言**/
export function getDefaultLocale() {
    const { cookies } = useCoutext()
    return cookies.get(AUTH.APP_NEST_LOCALE) ?? 'en'
}

/**切换语言**/
export async function fetchI18nUpdate(value: keyof typeof messages) {
    const { cookies } = useCoutext()
    await cookies.set(AUTH.APP_NEST_LOCALE, value)
    locale.value = value
    return (i18n.global.locale.value = value)
}

export function useI18nContext() {
    const ctx = useI18n()

    /**重载t方法**/
    function t<T extends I18nContext>(path: T, props: Omix = {}): string {
        return ctx.t(path, props)
    }

    /**异步重载t方法**/
    function at<T extends I18nContext>(path: T, props: Omix = {}): () => string {
        return () => ctx.t(path, props)
    }

    /**载tm方法**/
    function tm<T, P extends I18nContext>(path: P): Array<Omix<I18nNode<T>>> {
        return ctx.tm(path)
    }

    /**异步载tm方法**/
    function atm<T, P extends I18nContext>(path: P): () => Array<Omix<I18nNode<T>>> {
        return () => ctx.tm(path)
    }

    /**文字转换**/
    function fallback(data: Partial<Record<keyof typeof messages, string | number>>): string | number {
        return data[locale.value] ?? ''
    }

    /**列表查找**/
    function fallStore<T>(column: Array<T>, value: any, opts: Partial<I18nStore<T>> = {}) {
        const key = opts.valueField ?? 'value'
        const node = column.find(item => (item as Omix<I18nNode<T>>)[key] == value)
        if (opts.labelField) {
            return (node ?? opts.defaultValue ?? {})[opts.labelField] as T
        }
        return (node ?? opts.defaultValue) as I18nNode<T>
    }

    return {
        ctx,
        locale,
        Locale: computed(() => messages[locale.value]),
        t,
        at,
        tm,
        atm,
        fallback,
        fallStore
    }
}
