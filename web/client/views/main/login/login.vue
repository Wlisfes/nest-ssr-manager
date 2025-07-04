<script lang="tsx">
import { defineComponent } from 'vue'
import { useFormService } from '@webpack/hooks'

export default defineComponent({
    name: 'MainLogin',
    setup(props) {
        const { formRef, form, state, setState, fetchValidater } = useFormService({
            form: {
                number: '',
                password: '',
                code: ''
            },
            rules: {
                number: { required: true, trigger: 'blur', message: '请输入登录账号' },
                password: { required: true, trigger: 'blur', min: 6, max: 18, message: '请输入6~18位登录密码' },
                code: { required: true, trigger: 'blur', message: '请输入验证码' }
            }
        })

        return () => (
            <n-element class="w-full h-full select-none">
                <n-form size="large" ref={formRef} model={form.value} rules={state.rules} disabled={state.loading} show-label={false}>
                    <n-form-item path="number"></n-form-item>
                    <n-form-item path="password"></n-form-item>
                    <n-form-item path="code"></n-form-item>
                </n-form>
            </n-element>
        )
    }
})
</script>
