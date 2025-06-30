<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'LayoutHomeIssues',
    setup(props) {
        const { state } = useState({
            hot: 'FAQS',
            title: '关于 SMS 的常见问题',
            document: `ChatBook SMS 目标是让您轻松开始使用群发短信并充分利用它的诸多优势。无论您是群发 SMS 的新手还是经验丰富的用户，您都会找到有关功能、定价等常见问题的答案。`,
            columns: [
                {
                    type: 'primary',
                    icon: 'nest-issues-chat',
                    title: `可以发送哪些内容，限制行业吗？`,
                    document: `ChatBook SMS 可以发送博彩、贷款、催款、众筹、股票、保险、房地产、教育、直播、培训、信用卡提额、投资理财、中奖、抽奖、A货、交友、发票、加群、加QQ或者加微信、App推广等类型的短信；没有行业限制`
                },
                {
                    type: 'success',
                    icon: 'nest-issues-signal',
                    title: `三网（移动、联通和电信）都可以发吗？`,
                    document: `三网都支持，全国号码都可以发，同时 ChatBook SMS 还支持国际短信、国际短信发送大陆地区(791/886/852/853)，支持 190 多个国家/地区的 800 多个电信网络运营商，无论您需要发送什么内容，都可以找到适合的短信方案`
                },
                {
                    type: 'warning',
                    icon: 'nest-issues-book',
                    title: `如何通过 ChatBook SMS 发送短信？`,
                    document: `ChatBook SMS 提供两种发送批量短信的方式-通过独立后台和通过我们的短信 API。无论您选择独立后台还是 API，使用ChatBook SMS 都可以轻松发送批量 SMS 消息，从而提升业务成果。`
                },
                {
                    type: 'error',
                    icon: 'nest-issues-cost',
                    title: `批量发送短信如何计费？`,
                    document: `ChatBook SMS 零月租费零服务费，所有通道价格透明，根据需求自助选择价格方案；计费清晰合理，按照实际发送量计费，保障每一条信息透明化查询，所有通信服务提供可视化图表呈现`
                },
                {
                    type: 'primary',
                    icon: 'nest-issues-security',
                    title: `数据在后台是否安全？`,
                    document: `银行级数据加密技术、 256位密钥证书、HTTPS加密、访问权限控制、用户数据隔离等多重数据安全保护机制，自研监控系统、短信自动分流、支持故障无缝切换、业内领先的技术保障`
                },
                {
                    type: 'success',
                    icon: 'nest-issues-support',
                    title: `你们提供哪些方面的支持？`,
                    document: `ChatBook SMS 提供的支持取决于您的具体需求和要求。包括：帮助中心、客服支持、技术支持和商务支持，您可以根据遇到的问题选择相应的支持服务`
                }
            ]
        })

        return () => (
            <n-element class="layout-home-issues common-width-inline flex flex-col p-bs-24 p-be-48">
                <n-text class="chat-hot">{state.hot}</n-text>
                <div class="chat-issues flex justify-between p-be-24">
                    <div class="w-full max-w-[var(--chat-issues-max-width)] flex flex-col gap-5 p-ie-16">
                        <h1 class="m-0 text-28">{state.title}</h1>
                        <n-text depth={3} class="text-16">
                            {state.document}
                        </n-text>
                    </div>
                    <div class="flex items-end justify-center gap-16">
                        <n-button size="large" type="primary" data-aos="fade-left">
                            前往支持中心
                        </n-button>
                        <n-button size="large" type="primary" ghost data-aos="fade-left">
                            联系我们
                        </n-button>
                    </div>
                </div>
                <div class="chat-block grid gap-24 p-bs-24">
                    {state.columns.map((item, index) => (
                        <div key={index} class="chat-block-column" data-aos="fade-up" data-aos-delay={index * 100}>
                            <n-card hoverable content-class="p-24!" class="b-rd-8 h-full">
                                <n-button secondary circle focusable={false} type={item.type} class="w-64 h-64">
                                    <common-wrapper name={item.icon} size={32}></common-wrapper>
                                </n-button>
                                <div class="flex flex-col gap-5 m-bs-10">
                                    <h1 class="m-0 text-18">{item.title}</h1>
                                    <n-text depth={3}>{item.document}</n-text>
                                </div>
                            </n-card>
                        </div>
                    ))}
                </div>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-hot {
    color: var(--primary-color);
    @media (max-width: 768px) {
        text-align: center;
    }
}

.chat-issues {
    --chat-issues-max-width: 540px;
    position: relative;
    @media (max-width: 768px) {
        --chat-issues-max-width: 100%;
        flex-direction: column;
        text-align: center;
        row-gap: 20px;
    }
}

.chat-block {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
    position: relative;
    @media (max-width: 1280px) {
        grid-template-columns: repeat(2, minmax(0px, 1fr));
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, minmax(0px, 1fr));
    }
}
</style>
