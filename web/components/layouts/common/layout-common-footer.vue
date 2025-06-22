<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutCommonFooter',
    setup(props) {
        return () => (
            <n-element class="layout-common-footer flex flex-col">
                <n-divider class="m-0!"></n-divider>
                <n-element class="common-width-inline flex flex-wrap items-center justify-between p-block-16 gap-y-5">
                    <n-ellipsis tooltip={false}>
                        <n-text>{`Copyright © 2021-${new Date().getFullYear()} ChatBoost - `}</n-text>
                        <n-button text focusable={false}>
                            MIT License
                        </n-button>
                    </n-ellipsis>
                    <n-a class="whitespace-nowrap decoration-none text-center text-14" target="_blank" href="https://beian.miit.gov.cn">
                        <n-button text focusable={false}>
                            粤ICP备18016996号-1
                        </n-button>
                    </n-a>
                </n-element>
            </n-element>
        )
    }
})
</script>
