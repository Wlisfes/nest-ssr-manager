import { ref, Ref, toRefs, onMounted } from 'vue'
import { FormInst, FormItemRule } from 'naive-ui'
import { isEmpty } from 'class-validator'
import { omit } from 'lodash-es'
import { useState } from './hook-state'
import { fetchHandler } from '../../utils'
/**基础配置字段**/
export interface FormState extends Omix {
    initialize: boolean
    disabled: boolean
    visible: boolean
    loading: boolean
}
/**自定义表单Hooks入参配置**/
export interface FormStateOptions<T, K extends keyof T> extends Partial<FormState> {
    mounted?: boolean
    form: Omix<T>
    rules?: Record<K, FormItemRule | FormItemRule[]>
    callback?: Function
}
/**自定义表单Hooks**/
export function useFormService<T extends Omix, K extends keyof T, S extends Omix = {}>(opts: FormStateOptions<T, K> & S) {
    const formRef = ref<FormInst>() as Ref<FormInst & Omix<{ $el: HTMLFormElement }>>
    const form = ref<typeof opts.form>(opts.form)
    const rules = ref<typeof opts.rules>(opts.rules)
    const { state, setState } = useState({
        ...omit(opts, ['mounted', 'form', 'rules', 'callback']),
        initialize: opts.initialize ?? true,
        disabled: opts.disabled ?? false,
        visible: opts.visible ?? false,
        loading: opts.loading ?? false
    } as FormState & S)

    onMounted(async () => {
        return await fetchHandler(Boolean(opts.mounted ?? true), async () => {
            return await setState({ visible: true } as Partial<FormState & S>).then(() => {
                return opts.callback?.()
            })
        })
    })

    async function setForm(data: Partial<T>): Promise<typeof opts.form> {
        return Object.assign(form.value, data)
    }

    /**验证表单**/
    function fetchValidater(keys: Array<string> = []): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (!formRef.value) return reject('不存在formRef实例')
            try {
                return await formRef.value.validate(
                    errors => resolve(isEmpty(errors)),
                    function (rule) {
                        if (keys.length === 0 || isEmpty(rule.key)) return true
                        return keys.includes(rule.key as string)
                    }
                )
            } catch (err) {
                return resolve(false)
            }
        })
    }

    /**重置表单校验结果**/
    function fetchRestore() {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            return resolve(formRef.value.restoreValidation())
        })
    }

    return {
        formRef,
        form,
        rules,
        state,
        ...toRefs(state),
        setState,
        setForm,
        fetchValidater,
        fetchRestore
    }
}
