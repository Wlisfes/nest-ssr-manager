<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useMouse, useStore } from '@/store'
import { useI18nContext } from '@/i18n'

export default defineComponent({
    name: 'App',
    setup(props) {
        const { themeStyle, themeOverrides } = useStore(useMouse)
        const { Locale } = useI18nContext()

        return () => (
            <n-config-provider
                abstract
                inline-theme-disabled
                locale={Locale.value}
                date-locale={Locale.value.i18nDate}
                theme={themeStyle.value}
                theme-overrides={themeOverrides.value}
            >
                <n-global-style />
                <RouterView></RouterView>
            </n-config-provider>
        )
    }
})
</script>
