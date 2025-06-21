import { toRefs, computed } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'
import { defineStore } from 'pinia'
import { themeOverrides } from '@/utils/utils-theme'
import { useState } from '@/hooks/hook-state'
import { useCoutext, AUTH } from '@/hooks/hook-context'

export const useMouse = defineStore('APP_NEST_MOUSE_STORE', () => {
    const { cookies } = useCoutext()
    const { state, setState } = useState({
        /**主题**/
        theme: cookies.get(AUTH.APP_NEST_THEME) ?? 'light',
        /**主题色**/
        primaryColor: cookies.get(AUTH.APP_NEST_PRIMARY_COLOR) ?? '#536dfe'
    })

    /**切换主题**/
    async function fetchThemeUpdate(theme?: 'light' | 'dark') {
        return await setState({ theme: theme ?? (state.theme === 'light' ? 'dark' : 'light') }).then(async () => {
            return await cookies.set(AUTH.APP_NEST_THEME, state.theme)
        })
    }

    return {
        ...toRefs(state),
        state: computed(() => state),
        /**主题反转**/
        inverted: computed(() => state.theme === 'dark'),
        /**主题配色**/
        themeStyle: computed(() => (state.theme === 'dark' ? darkTheme : lightTheme)),
        /**自定义主题配置**/
        themeOverrides: computed(() => themeOverrides(state.theme === 'dark', state)),
        setState,
        fetchThemeUpdate
    }
})
