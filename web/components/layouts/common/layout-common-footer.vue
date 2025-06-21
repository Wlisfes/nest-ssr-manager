<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutCommonFooter',
    setup(props) {
        return () => (
            <n-element class="layout-common-footer overflow-hidden">
                <div class="common-width-inline flex flex-col p-block-24">
                    <div class="flex gap-16 justify-between p-be-42 md:flex-row xs:flex-col xxs:flex-col">
                        <div class="w-full max-w-500 flex gap-20">
                            <div class="flex flex-col flex-1 gap-10 overflow-hidden">
                                <n-h3 strong class="m-0" v-html="Products"></n-h3>
                                <div class="flex flex-col gap-10 line-height-22">
                                    <n-text depth={3}>SMS Gateway</n-text>
                                    <n-text depth={3}>Voice Gateway</n-text>
                                    <n-text depth={3}> Proxy Gateway</n-text>
                                    <n-text depth={3}>SMS Modem</n-text>
                                    <n-text depth={3}>Goip Gateway</n-text>
                                </div>
                            </div>
                            <div class="flex flex-col flex-1 gap-10 overflow-hidden">
                                <n-h3 strong class="m-0" v-html="Solution"></n-h3>
                                <div class="flex flex-col gap-10 line-height-22">
                                    <n-text depth={3}>SMS Gateway</n-text>
                                    <n-text depth={3}>Voice Gateway</n-text>
                                    <n-text depth={3}> Proxy Gateway</n-text>
                                    <n-text depth={3}>SMS Modem</n-text>
                                    <n-text depth={3}>Goip Gateway</n-text>
                                </div>
                            </div>
                        </div>
                        <div class="w-full max-w-400 flex flex-col">
                            <n-h3 strong class="m-0 m-be-8" v-html="Connect"></n-h3>
                            <div class="flex flex-col gap-10 line-height-22">
                                <div class="flex gap-10 items-center">
                                    <common-wrapper name="nest-telegram" color="#1296DB" size={24}></common-wrapper>
                                    <n-text depth={3}>@SMS_service_all</n-text>
                                </div>
                                <div class="flex gap-10 items-center">
                                    <common-wrapper name="nest-solid-main" size={24}></common-wrapper>
                                    <n-text depth={3}>service@chinaskyline.com</n-text>
                                </div>
                                <div class="flex gap-10 items-center">
                                    <common-wrapper name="nest-whatsapp" color="#25D366" size={24}></common-wrapper>
                                    <n-text depth={3}>+44 7543144531</n-text>
                                </div>
                                <div class="flex gap-10 items-center">
                                    <common-wrapper name="nest-skype" color="#00ADDF" size={24}></common-wrapper>
                                    <n-text depth={3}>live:.cid.91eed7c0aa7c1643</n-text>
                                </div>
                                <div class="flex gap-10">
                                    <common-wrapper name="nest-solid-location" size={24}></common-wrapper>
                                    <n-text
                                        depth={3}
                                        v-html={`ROOM 837, 8/F, BEVERLEY COMMERCIAL CENTRE, 87-105 CHATHAM ROAD SOUTH, TSIM SHA TSUI KOWLOON HONG KONG`}
                                    ></n-text>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex items-center gap-10 justify-between p-bs-16 border-t border-t-solid border-t-[var(--border-color)]"
                        style={{ transition: 'border-top-color 0.3s var(--n-bezier)' }}
                    >
                        <div class="flex items-center gap-10">
                            <n-button text focusable={false}>
                                <common-wrapper name="nest-facebook" size={28}></common-wrapper>
                            </n-button>
                            <n-button text focusable={false}>
                                <common-wrapper name="nest-linkedin" size={28}></common-wrapper>
                            </n-button>
                            <n-button text focusable={false}>
                                <common-wrapper name="nest-twitter" size={28}></common-wrapper>
                            </n-button>
                            <n-button text focusable={false}>
                                <common-wrapper name="nest-youtube" size={28}></common-wrapper>
                            </n-button>
                        </div>
                        <div class="overflow-hidden">
                            <n-a target="_blank" href="https://lisfes.cn">
                                <n-text depth={1} class="hover:underline">
                                    SKYLINE 官网
                                </n-text>
                            </n-a>
                            <n-text depth={3} class="p-inline-20">
                                © 2025 China Skyline. All rights reserved.
                            </n-text>
                            <n-text depth={1}>PrivacyPolicy</n-text>
                        </div>
                    </div>
                </div>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.layout-common-footer {
    font-size: var(--font-size);
    line-height: var(--line-height);
    color: var(--text-color-2);
    background-color: var(--layout-common-footer-background-color);
    transition:
        color 0.3s var(--n-bezier),
        background-color 0.3s var(--n-bezier);
}
</style>
