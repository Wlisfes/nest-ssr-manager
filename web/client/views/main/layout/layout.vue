<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MainLayout',
    setup(props) {
        return () => (
            <n-element class="main-layout w-full h-full flex flex-col justify-end items-end">
                <router-link to="/" class="flex absolute top-10 left-20">
                    <n-button text focusable={false}>
                        <common-wrapper name="nest-logo" color="var(--n-text-color-hover)" size={40}></common-wrapper>
                        <h2 class="m-0 p-bs-8 p-inline-5">ChatBook</h2>
                    </n-button>
                </router-link>
                <n-card class="max-w-480">
                    <n-button text focusable={false}>
                        <common-wrapper name="nest-logo" color="var(--n-text-color-hover)" size={36}></common-wrapper>
                        <h2 class="m-0 text-18 p-bs-8 p-inline-8">欢迎使用 ChatBook</h2>
                    </n-button>
                    <router-view></router-view>
                </n-card>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.main-layout {
    position: relative;
    background-image: url('@/assets/images/1751598847162.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    padding-inline-start: 20px;
    padding-inline-end: 210px;
    padding-block-start: 20px;
    padding-block-end: 140px;
}
</style>
