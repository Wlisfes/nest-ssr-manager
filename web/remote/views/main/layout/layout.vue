<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MainLayout',
    setup(props) {
        return () => (
            <n-element class="main-layout w-full h-full flex flex-col justify-end items-end">
                <router-link to="/" class="flex absolute top-10 left-20">
                    <n-button text focusable={false}>
                        <common-element-wrapper name="nest-logo" color="var(--n-text-color-hover)" size={40}></common-element-wrapper>
                        <h2 class="m-0 p-bs-8 p-inline-5">ChatBook</h2>
                    </n-button>
                </router-link>
                <div class="main-wrapper w-full max-w-480">
                    <n-card class="b-rd-8 overflow-hidden">
                        <div class="flex justify-center p-be-36">
                            <n-button text focusable={false}>
                                <common-element-wrapper
                                    name="nest-logo"
                                    color="var(--n-text-color-hover)"
                                    size={40}
                                ></common-element-wrapper>
                                <h2 class="m-0 text-20 p-bs-8 p-inline-8">欢迎使用 ChatBook</h2>
                            </n-button>
                        </div>
                        <router-view></router-view>
                    </n-card>
                </div>
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
    padding-block-end: 210px;
    @media (max-width: 900px) {
        padding-inline-end: 20px;
        align-items: center;
    }
    @media (max-width: 420px) {
        justify-content: center;
        padding-block-end: 20px;
    }
}

.main-wrapper :deep(.n-card__content) {
    --n-padding-bottom: 48px;
    --n-padding-left: 48px;
    padding-block-start: 40px;
    @media (max-width: 420px) {
        --n-padding-left: 24px;
    }
}
</style>
