<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'LayoutHomeChoose',
    setup(props) {
        const { state } = useState({
            hot: 'WHY CHOOSE US',
            title: 'ChatBook SMS 的优势',
            document: `ChatBook SMS 致力使用优质的群发 SMS 解决方案将您的营销内容将通过我们的高质量SMS网关送达至目标受众的设备。`,
            columns: [
                {
                    type: 'primary',
                    icon: 'nest-issues-signal',
                    title: `超广覆盖、自由联通`,
                    document: `ChatBook SMS 支持 190 多个国家/地区的 800 多个电信网络运营商，便于出海企业简单、安全、稳定的一站式通讯解决方案与您的全球用户实现无障碍的即时通讯连接`
                },
                {
                    type: 'warning',
                    icon: 'nest-edit',
                    title: `不限行业、内容宽松`,
                    document: `我们致力于创新通信解决方案，让 SMS 消息自由传递，满足您所有短信营销需求。覆盖互联网、金融、信贷、投资、棋牌、游戏、电商、教育等众多领域短信群发`
                },
                {
                    type: 'error',
                    icon: 'nest-choose-channel',
                    title: `优质通道、高效并发`,
                    document: `创新的通信解决方案，确保您的短信送达至目标受众的设备，分布式服务器，数据秒级触达，高效并发响应与海量数据吞吐引擎支持，安全稳定，秒级触达，高到达率`
                },
                {
                    type: 'success',
                    icon: 'nest-choose-backst',
                    title: `独立后台、实时报告`,
                    document: `通过 ChatBook SMS 强大的独立后台可以轻松、快速、高效地向客户、潜在客户发送大量短信，保障每一条信息透明化查询，所有通信服务提供可视化图表呈现`
                }
            ]
        })

        return () => (
            <n-element class="layout-home-choose common-width-inline flex flex-col p-block-64">
                <div class="flex flex-col items-center max-w-640 m-inline-auto">
                    <n-text class="chat-hot text-[var(--primary-color)]">{state.hot}</n-text>
                    <h1 class="m-0 text-28">{state.title}</h1>
                    <n-text depth={3} class="text-16 text-center!">
                        {state.document}
                    </n-text>
                </div>
                <div class="chat-choose grid gap-24 p-bs-48">
                    {state.columns.map((item, index) => (
                        <div key={index} class="chat-choose-column" data-aos="fade-up" data-aos-delay={index * 100}>
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
.chat-choose {
    position: relative;
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, minmax(0px, 1fr));
    }
}
</style>
