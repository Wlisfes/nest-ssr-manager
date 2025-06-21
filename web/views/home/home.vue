<script lang="tsx">
import { defineComponent } from 'vue'
import { useGlobal, useStore } from '@/store'
import { useI18nContext } from '@/i18n'

export default defineComponent({
    name: 'BaseHome',
    async httpServer({ pinia, logger }) {
        // logger.info('[Home.vue]', {
        //     title: '大苏打33的撒大1111111dsadasdsaDDSADAASDSADASDASDASDAdas',
        //     date: Date.now()
        // })
    },
    // async httpMetaServer({ store, route }) {
    //     return {
    //         title: '大苏打33的撒大1111111'
    //     }
    // },
    setup(props) {
        return () => (
            <n-element class="flex flex-col flex-1 overflow-hidden">
                {/* <layout-home-carousel></layout-home-carousel>
                <layout-home-browse></layout-home-browse>
                <layout-home-choose></layout-home-choose>
                <div class="common-width-inline flex flex-col items-center overflow-hidden p-bs-60 p-be-76">
                    <n-h1 class="m-0 text-32 line-height-38">Contact our sales team</n-h1>
                    <n-text class="p-bs-20 p-be-40">
                        You will get the best and most 撒大苏打suitable solution from our experts. Fill out the form and we will contact you
                        within 24 hours.
                    </n-text>
                    <n-button size="large" type="primary">
                        Contact Sales
                    </n-button>
                </div> */}
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.home {
    color: red;
}
</style>
