<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'LayoutHomeFacts',
    setup(props) {
        const { state } = useState({
            hot: 'Important Facts About SMS',
            title: `关于 SMS 的重要事实-在移动互联网时代，SMS 是接触潜在客户的最直接方式之一`,
            document: ``,
            columns: [
                { title: '1520万', document: '全世界每分钟发送的短信条数' },
                { title: '95%', document: '短信在送达后三分钟内被阅读' },
                { title: '98%', document: '已发送的短信被用户查看' },
                { title: '10倍+', document: '选择 SMS 营销可以获得更多利润' }
            ]
        })
        return () => (
            <n-element class="layout-home-facts common-width-inline">
                <div class="facts-element flex flex-col items-center p-block-120">
                    <n-text class="chat-hot z-2 p-be-5">{state.hot}</n-text>
                    <h1 class="m-0 text-28 text-center max-w-870 z-2 p-be-20">{state.title}</h1>
                    <div class="chat-element w-full grid gap-24 p-bs-24 z-2">
                        {state.columns.map((item, index) => (
                            <div key={index} class="chat-element-column flex flex-col items-center">
                                <n-h1 type="primary" class="m-0 text-42">
                                    <n-text type="primary">{item.title}</n-text>
                                </n-h1>
                                <n-text class="16">{item.document}</n-text>
                            </div>
                        ))}
                    </div>
                </div>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.chat-hot {
    text-align: center;
    color: var(--primary-color);
    line-height: 24px;
    text-transform: uppercase;
}
.chat-element {
    position: relative;
    grid-template-columns: repeat(4, minmax(0px, 1fr));
}

.facts-element {
    position: relative;
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 1;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url('@/assets/images/shape.png');
    }
}
</style>
