<script lang="tsx">
import { defineComponent, nextTick } from 'vue'
import { useState } from '@/hooks/hook-state'
import { locale, fetchI18nUpdate } from '@/i18n'

export default defineComponent({
    name: 'LayoutCommonLanguage',
    setup(props, ctx) {
        const { state, setState } = useState({
            visible: false,
            value: 'en',
            options: [
                { label: '简体中文', value: 'cn' },
                { label: 'English', value: 'en' }
            ]
        })

        async function fetchUpdate(data: Omix) {
            return await setState({ visible: false }).then(async () => {
                await nextTick()
                return await fetchI18nUpdate(data.value)
            })
        }

        return () => (
            <n-popover trigger="click" v-model:show={state.visible} style={{ padding: '8px' }}>
                {{
                    trigger: () => (
                        <div class="flex items-center justify-end select-none cursor-pointer">
                            <common-wrapper name="nest-i18n" size={24}></common-wrapper>
                        </div>
                    ),
                    default: () => (
                        <div class="flex flex-col">
                            {state.options.map(item => (
                                <n-button
                                    key={item.value}
                                    quaternary
                                    class="p-inline-8"
                                    type={locale.value === item.value ? 'primary' : undefined}
                                    onClick={() => fetchUpdate(item)}
                                >
                                    <div class="w-60 flex items-center justify-between overflow-hidden">{item.label}</div>
                                </n-button>
                            ))}
                        </div>
                    )
                }}
            </n-popover>
        )
    }
})
</script>
