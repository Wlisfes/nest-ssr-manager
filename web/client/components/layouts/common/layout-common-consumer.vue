<script lang="tsx">
import { defineComponent } from 'vue'
import { useGlobal, useMouse, useStore } from '@/store'

export default defineComponent({
    name: 'LayoutCommonConsumer',
    setup(props) {
        return () => (
            <n-element class="layout-common-consumer h-full flex items-center gap-28">
                {/* <n-button text focusable={false}>
                    <common-element-wrapper name="nest-search" size={24}></common-element-wrapper>
                </n-button>
                <n-button text focusable={false}>
                    <n-badge type="info" offset={[5, 0]} value={40} max={99}>
                        <common-element-wrapper name="nest-cart" size={24}></common-element-wrapper>
                    </n-badge>
                </n-button> */}
                <n-button text focusable={false}>
                    <common-element-wrapper name="nest-user" size={24}></common-element-wrapper>
                </n-button>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.layout-common-consumer {
    position: relative;
    .n-badge :deep(.n-badge-sup) {
        --n-font-size: 11px;
        height: 16px;
        min-width: 16px;
        padding: 0 4.5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
