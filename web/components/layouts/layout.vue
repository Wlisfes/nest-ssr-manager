<script lang="tsx">
import { defineComponent, Fragment } from 'vue'
import { useGlobal, useMouse, useStore } from '@/store'

export default defineComponent({
    name: 'Layout',
    props: {
        /**容器配置模式**/
        name: { type: String, required: true }
    },
    setup(props) {
        const { classify } = useStore(useGlobal)
        const { search } = useStore(useMouse)

        return () => (
            <n-layout class="h-full overflow-hidden" content-class="flex flex-col overflow-hidden">
                <n-layout-header class="w-full overflow-hidden">
                    <n-element class="common-width-inline h-48 flex gap-20 overflow-hidden">
                        <router-link to="/" class="flex overflow-hidden">
                            <n-button text focusable={false}>
                                <common-wrapper name="nest-logo" size={42}></common-wrapper>
                            </n-button>
                        </router-link>
                        {search.value ? (
                            <layout-common-search></layout-common-search>
                        ) : (
                            <Fragment>
                                {['GlobalLayout'].includes(props.name) ? (
                                    <layout-common-classify data-source={classify.value}></layout-common-classify>
                                ) : (
                                    <n-element class="h-full flex-1"></n-element>
                                )}
                                <n-element class="h-full flex items-center overflow-hidden">
                                    <layout-common-consumer></layout-common-consumer>
                                    <n-divider vertical class="h-20! m-inline-20!" />
                                    <layout-common-deploy></layout-common-deploy>
                                </n-element>
                            </Fragment>
                        )}
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
