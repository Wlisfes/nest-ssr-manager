<script lang="tsx">
import { defineComponent } from 'vue'
import { useFormService } from '@webpack/hooks'
import { enter } from '@webpack/utils'

export default defineComponent({
    name: 'MainLogin',
    setup(props) {
        const { formRef, form, state, setState, fetchValidater } = useFormService({
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
            <n-element class="w-full h-full select-none">
                <n-form size="large" ref={formRef} model={form.value} rules={state.rules} disabled={state.loading} show-label={false}>
                    <n-form-item path="email">
                        <form-common-input
                            maxlength={64}
                            type="text"
                            placeholder="请输入登录邮箱"
                            v-model:value={form.value.email}
                            input-props={{ autocomplete: 'on' }}
                            prefix={<common-element-wrapper size={22} name="nest-unset-user"></common-element-wrapper>}
                            onSubmit={fetchSubmit}
                        ></form-common-input>
                    </n-form-item>
                    <n-form-item path="password">
                        <form-common-input
                            maxlength={32}
                            placeholder="请输入登录密码"
                            type="password"
                            show-password-on="click"
                            input-props={{ autocomplete: 'password' }}
                            style={{ '--input-password-right': '46px' }}
                            v-model:value={form.value.password}
                            prefix={<common-element-wrapper size={22} name="nest-unset-ockes"></common-element-wrapper>}
                            onSubmit={fetchSubmit}
                        ></form-common-input>
                    </n-form-item>
                    <n-form-item path="code">
                        <form-common-input
                            class="flex-1"
                            type="text"
                            placeholder="验证码"
                            maxlength={4}
                            v-model:value={form.value.code}
                            prefix={<common-element-wrapper size={22} name="nest-unset-codex"></common-element-wrapper>}
                            onSubmit={fetchSubmit}
                        ></form-common-input>
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
            </n-element>
        )
    }
})
</script>
