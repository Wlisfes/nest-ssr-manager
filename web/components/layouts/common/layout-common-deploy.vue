<script lang="tsx">
import { defineComponent } from 'vue'
import { useMouse, useStore } from '@/store'

export default defineComponent({
    name: 'LayoutCommonDeploy',
    setup(props) {
        const { theme, fetchThemeUpdate } = useStore(useMouse)

        return () => (
            <n-element class="layout-common-deploy h-full flex items-center gap-20 overflow-hidden">
                <n-button text focusable={false}>
                    <layout-common-language></layout-common-language>
                </n-button>
                <n-button text focusable={false} onClick={() => fetchThemeUpdate()}>
                    <div class="w-24 flex justify-center items-center">
                        {theme.value === 'dark' ? (
                            <common-wrapper name="nest-light" size={24}></common-wrapper>
                        ) : (
                            <common-wrapper name="nest-dark" size={22}></common-wrapper>
                        )}
                    </div>
                </n-button>
            </n-element>
        )
    }
})
</script>
