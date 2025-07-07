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
            <n-element class="w-full select-none">
                <n-form size="large" ref={formRef} model={form.value} rules={state.rules} disabled={state.loading} show-label={false}>
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
                    <div class="flex flex-1 items-center justify-between">
                        <div class="flex items-center">
                            <n-text>还没有账号？</n-text>
                            <router-link to="/main/register">
                                <n-button text type="primary" focusable={false}>
                                    去注册
                                </n-button>
                            </router-link>
                        </div>
                        <router-link to="/main/register">
                            <n-button text type="primary" focusable={false}>
                                忘记密码
                            </n-button>
                        </router-link>
                    </div>
                </n-form>
            </n-element>
        )
    }
})
</script>
