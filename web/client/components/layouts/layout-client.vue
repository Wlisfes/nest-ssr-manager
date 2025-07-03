<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useGlobal, useMouse, useStore } from '@/store'
import { useAosObserver } from '@webpack/hooks'

export default defineComponent({
    name: 'LayoutClient',
    setup(props) {
        const { fetchScrollbar } = useAosObserver()

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
                        <n-element class="h-full flex flex-1 items-center justify-end gap-48 p-inline-40">
                            <n-button text focusable={false}>
                                <div class="text-16">产品</div>
                            </n-button>
                            <n-button text focusable={false}>
                                <div class="text-16">解决方案</div>
                            </n-button>
                            <n-button text focusable={false}>
                                <div class="text-16">覆盖范围&定价</div>
                            </n-button>
                            <n-button text focusable={false}>
                                <div class="text-16">支持中心</div>
                            </n-button>
                            <n-button text focusable={false}>
                                <div class="text-16">关于我们</div>
                            </n-button>
                        </n-element>
                        <n-element class="h-full flex items-center overflow-hidden">
                            <layout-common-deploy></layout-common-deploy>
                            <n-divider vertical class="h-20! m-inline-20!" />
                            <n-button focusable={false} round type="primary">
                                免费体验
                            </n-button>
                            {/* <layout-common-consumer></layout-common-consumer> */}
                        </n-element>
                    </n-element>
                </n-layout-header>
                <n-layout-content
                    class="flex-1 overflow-hidden"
                    content-class="min-h-full flex flex-col"
                    native-scrollbar={false}
                    scrollbar-props={{ size: 100, trigger: 'none' }}
                    on-scroll={fetchScrollbar}
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
