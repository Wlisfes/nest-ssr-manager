import { ref, Ref, toRefs, onMounted } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { isEmpty } from 'class-validator'
import { useState } from './hook-state'
import { fetchHandler } from '../../utils'

export interface FormState<R> {
    initialize: boolean
    disabled: boolean
    visible: boolean
    loading: boolean
    rules: R
}

export interface FormOption<T, R, U> extends Partial<FormState<R>> {
    mounted?: boolean
    options?: Omix<U>
    form: Omix<T>
    callback?: Function
}

/**自定义表单Hooks**/
export function useFormService<T extends Omix, R extends FormRules, U extends Omix>(opts: FormOption<T, R, U>) {
    const formRef = ref<FormInst>() as Ref<FormInst & Omix<{ $el: HTMLFormElement }>>
    const form = ref<typeof opts.form>(opts.form)
    const { state, setState } = useState({
        initialize: opts.initialize ?? true,
        disabled: opts.disabled ?? false,
        visible: opts.visible ?? false,
        loading: opts.loading ?? false,
        rules: opts.rules ?? {},
        ...(opts.options ?? {})
    } as FormState<R> & typeof opts.options)

    onMounted(async () => {
        return await fetchHandler(Boolean(opts.mounted ?? true), async () => {
            return await setState({ visible: true } as never).then(() => {
                return opts.callback?.()
            })
        })
    })

    async function setForm(data: Partial<T>) {
        return Object.assign(form.value, data)
    }

    /**验证表单**/
    function fetchValidater(keys: Array<string> = []): Promise<any> {
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
        form,
        formRef,
        state,
        ...toRefs(state),
        setState,
        setForm,
        fetchValidater,
        fetchRestore
    }
}
