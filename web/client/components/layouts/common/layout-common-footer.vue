<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@webpack/hooks'

export default defineComponent({
    name: 'LayoutCommonFooter',
    setup(props) {
        const { state, setState } = useState({
            chatBook: {
                title: 'ChatBook',
                document: `我们致力于创新通信解决方案，让 SMS 消息自由传递，满足您所有短信营销需求。您可以毫不费力地发送一次性验证码、通知、时事通讯、提醒和营销短信。`
            },
            about: {
                title: '关于',
                columns: [
                    { link: '/', name: '公司简介' },
                    { link: '/', name: '联系我们' },
                    { link: '/', name: '隐私政策' },
                    { link: '/', name: '动态公告' }
                ]
            },
            solutions: {
                title: '产品 & 解决方案',
                columns: [
                    { link: '/', name: '国内短信' },
                    { link: '/', name: '国际短信' },
                    { link: '/', name: '五类短信' },
                    { link: '/', name: '卡发短信' },
                    { link: '/', name: '覆盖范围 & 定价' },
                    { link: '/', name: '使用流程' },
                    { link: '/', name: '常见问题' },
                    { link: '/', name: 'API 文档' }
                ]
            }
        })

        return () => (
            <n-element class="layout-common-footer flex flex-col overflow-hidden">
                <div class="chat-connect common-width-inline flex justify-between gap-16 p-block-24">
                    <div class="flex flex-col gap-5 overflow-hidden">
                        <h1 class="m-0 text-22">订阅 ChatBook SMS 新闻</h1>
                        <n-text depth={3}>加入 20000 多人使用的 ChatBook SMS 行列</n-text>
                    </div>
                    <div class="chat-connect-input flex gap-16 items-center">
                        <n-input class="flex-1" size="large" placeholder="请输入您的邮箱" />
                        <n-button class="w-[var(--chat-connect-mail-width)]" size="large" type="primary">
                            订阅
                        </n-button>
                    </div>
                </div>
                <div class="common-width-inline overflow-hidden">
                    <n-divider class="m-0!"></n-divider>
                </div>
                <n-element class="chat-comment common-width-inline flex justify-between p-bs-48 p-be-64">
                    <div class="chat-book flex flex-col w-[var(--chat-book-width)] min-w-[var(--chat-book-min-width)] p-ie-16">
                        <router-link to="/" class="flex overflow-hidden p-be-16">
                            <n-button text focusable={false}>
                                <common-wrapper name="nest-logo" color="var(--n-text-color-hover)" size={32}></common-wrapper>
                                <h2 class="m-0 p-bs-8 p-inline-5 text-18">{state.chatBook.title}</h2>
                            </n-button>
                        </router-link>
                        <n-text depth={3}>{state.chatBook.document}</n-text>
                        <div class="flex gap-10 overflow-hidden p-bs-20">
                            <n-button focusable={false} secondary type="primary" class="p-inline-10! h-40">
                                <common-wrapper name="nest-telegram" size={20}></common-wrapper>
                            </n-button>
                            <n-button focusable={false} secondary type="primary" class="p-inline-10! h-40">
                                <common-wrapper name="nest-whatsapp" size={20}></common-wrapper>
                            </n-button>
                            <n-button focusable={false} secondary type="primary" class="p-inline-10! h-40">
                                <common-wrapper name="nest-solid-main" size={20}></common-wrapper>
                            </n-button>
                        </div>
                    </div>
                    <div class="chat-between w-[var(--chat-between-width)] flex overflow-hidden justify-between">
                        <div class="flex flex-col w-65% p-inline-[var(--chat-between-inline-width)]">
                            <h2 class="m-0 text-18 line-height-32 p-be-16">{state.solutions.title}</h2>
                            <n-grid cols={2} x-gap={20} y-gap={20}>
                                {state.solutions.columns.map((item, index) => (
                                    <n-grid-item key={index}>
                                        <router-link to={item.link}>
                                            <n-button text focusable={false} style={{ '--n-text-color': 'var(--text-color-3)' }}>
                                                <div style={{ lineHeight: 1.6 }}>{item.name}</div>
                                            </n-button>
                                        </router-link>
                                    </n-grid-item>
                                ))}
                            </n-grid>
                        </div>
                        <div class="flex flex-col w-35% p-inline-[var(--chat-between-inline-width)]">
                            <h2 class="m-0 text-18 line-height-32 p-be-16">{state.about.title}</h2>
                            <n-grid cols={1} x-gap={20} y-gap={20}>
                                {state.about.columns.map((item, index) => (
                                    <n-grid-item key={index}>
                                        <router-link to={item.link}>
                                            <n-button text focusable={false} style={{ '--n-text-color': 'var(--text-color-3)' }}>
                                                <div style={{ lineHeight: 1.6 }}>{item.name}</div>
                                            </n-button>
                                        </router-link>
                                    </n-grid-item>
                                ))}
                            </n-grid>
                        </div>
                    </div>
                </n-element>
                <n-divider class="m-0!"></n-divider>
                <n-element class="common-width-inline flex flex-wrap gap-16 text-12 items-center justify-between p-block-16 gap-y-5">
                    <n-ellipsis tooltip={false}>
                        <n-text>{`Copyright © 2021-${new Date().getFullYear()} ChatBook. All rights reserved.`}</n-text>
                    </n-ellipsis>
                    <n-a class="whitespace-nowrap decoration-none text-center" target="_blank" href="https://beian.miit.gov.cn">
                        <n-button text focusable={false} class="text-12">
                            粤ICP备18016996号-1
                        </n-button>
                    </n-a>
                </n-element>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-connect {
    position: relative;
    @media (max-width: 860px) {
        flex-direction: column;
        align-items: center;
    }
    .chat-connect-input {
        --chat-connect-input-width: 440px;
        --chat-connect-mail-width: 100px;
        width: 100%;
        max-width: var(--chat-connect-input-width);
        @media (max-width: 580px) {
            --chat-connect-input-width: 100%;
            --chat-connect-mail-width: 100%;
            flex-direction: column;
        }
    }
}
.chat-comment {
    position: relative;
    --chat-book-width: 25%;
    --chat-book-min-width: 320px;
    --chat-between-width: 60%;
    --chat-between-inline-width: 16px;
    @media (max-width: 860px) {
        row-gap: 40px;
        flex-direction: column-reverse;
        --chat-between-width: 100%;
        --chat-between-inline-width: 0px;
    }
    @media (max-width: 580px) {
        --chat-book-min-width: 100%;
        .chat-between {
            row-gap: 24px;
            flex-direction: column;
            > div.flex.flex-col {
                width: 100%;
            }
        }
    }
}
</style>
