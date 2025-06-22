<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useGlobal, useMouse, useStore } from '@/store'

export default defineComponent({
    name: 'LayoutClient',
    setup(props) {
        return () => (
            <n-layout class="h-full overflow-hidden" content-class="flex flex-col overflow-hidden">
                <n-layout-header class="w-full overflow-hidden">
                    <n-element class="common-width-inline h-60 flex gap-20 overflow-hidden">
                        <router-link to="/" class="flex overflow-hidden">
                            <n-button text focusable={false}>
                                <common-wrapper name="nest-logo" color="var(--n-text-color-hover)" size={40}></common-wrapper>
                                <h2 class="m-0 p-bs-8 p-inline-5">ChatBook</h2>
                            </n-button>
                        </router-link>
                        <n-element class="h-full flex-1"></n-element>
                        <n-element class="h-full flex items-center overflow-hidden">
                            <layout-common-consumer></layout-common-consumer>
                            <n-divider vertical class="h-20! m-inline-20!" />
                            <layout-common-deploy></layout-common-deploy>
                        </n-element>
                    </n-element>
                </n-layout-header>
                <n-layout-content
                    class="flex-1 overflow-hidden"
                    content-class="min-h-full flex flex-col"
                    native-scrollbar={false}
                    scrollbar-props={{ size: 100, trigger: 'none' }}
                >
                    <n-element class="flex flex-col flex-1">
                        <router-view>{{ default: ({ Component, route }) => <Component key={route.fullPath} /> }}</router-view>
                    </n-element>
                    <layout-common-footer></layout-common-footer>
                </n-layout-content>
            </n-layout>
        )
    }
})
</script>
