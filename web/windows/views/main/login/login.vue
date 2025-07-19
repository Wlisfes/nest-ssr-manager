<script lang="tsx">
import { defineComponent } from 'vue'
import { useFormService } from '@webpack/hooks'

export default defineComponent({
    name: 'MainLogin',
    setup(props) {
        const { formRef, form, rules, state, setState, fetchValidater } = useFormService({
            form: {
                email: '',
                password: '',
                code: ''
            },
            rules: {
                email: { required: true, trigger: 'blur', message: '请输入登录账号' },
                password: { required: true, trigger: 'blur', min: 6, max: 18, message: '请输入6~18位登录密码' },
                code: { required: true, trigger: 'blur', message: '请输入验证码' }
            }
        })

        async function fetchSubmit() {
            return await fetchValidater().then(async result => {
                if (result) {
                    // return await codexRef.value.fetchRefresh(300).then(() => {
                    //     return setState({ loading: false, disabled: false })
                    // })
                }
                try {
                    // return await Service.httpBaseSystemUserTokenAuthorize({
                    //     code: form.value.code,
                    //     number: form.value.number,
                    //     password: window.btoa(encodeURIComponent(form.value.password))
                    // }).then(async ({ data }) => {
                    //     return await setCompose(data).then(async () => {
                    //         return router.push({ path: '/', replace: true })
                    //     })
                    // })
                } catch (err) {
                    // return await codexRef.value.fetchRefresh(300).then(() => {
                    //     return setState({ loading: false, disabled: false })
                    // })
                }
            })
        }

        return () => (
            <n-element class="main-layout w-full h-full flex flex-col justify-end items-end">
                <div class="flex absolute top-10 left-20">
                    <n-button text focusable={false}>
                        <common-element-wrapper name="nest-logo" color="var(--n-text-color-hover)" size={40}></common-element-wrapper>
                        <h2 class="m-0 p-bs-8 p-inline-5">ChatBook</h2>
                    </n-button>
                </div>
                <div class="main-wrapper w-full max-w-480 select-none">
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
                        <n-form
                            size="large"
                            ref={formRef}
                            model={form.value}
                            rules={state.rules}
                            disabled={state.loading}
                            show-label={false}
                        >
                            <n-form-item path="email">
                                <form-element-input
                                    maxlength={64}
                                    type="text"
                                    placeholder="请输入邮箱"
                                    v-model:value={form.value.email}
                                    input-props={{ autocomplete: 'on' }}
                                    prefix={{ name: 'nest-unset-user', size: 22 }}
                                    onSubmit={fetchSubmit}
                                ></form-element-input>
                            </n-form-item>
                            <n-form-item path="password">
                                <form-element-input
                                    maxlength={32}
                                    placeholder="请输入密码"
                                    type="password"
                                    show-password-on="click"
                                    input-props={{ autocomplete: 'password' }}
                                    style={{ '--input-password-right': '46px' }}
                                    v-model:value={form.value.password}
                                    prefix={{ name: 'nest-unset-ockes', size: 22 }}
                                    onSubmit={fetchSubmit}
                                ></form-element-input>
                            </n-form-item>
                            <n-form-item path="code">
                                <div class="flex flex-1 items-center overflow-hidden">
                                    <form-element-input
                                        class="flex-1"
                                        type="text"
                                        placeholder="验证码"
                                        maxlength={4}
                                        v-model:value={form.value.code}
                                        prefix={{ name: 'nest-unset-codex', size: 22 }}
                                        onSubmit={fetchSubmit}
                                    ></form-element-input>
                                </div>
                            </n-form-item>
                            <n-form-item>
                                <common-element-button
                                    class="w-full"
                                    type="info"
                                    disabled={state.loading}
                                    loading={state.loading}
                                    onClick={fetchSubmit}
                                >
                                    立即登录
                                </common-element-button>
                            </n-form-item>
                        </n-form>
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
