<script lang="tsx">
import { defineComponent, h, PropType, VNode } from 'vue'
import { isNotEmpty } from 'class-validator'
import { enter } from '@webpack/utils'

export default defineComponent({
    name: 'FormElementInput',
    emits: ['submit'],
    props: {
        /**输入框头部内容**/
        prefix: { type: Object as PropType<Omix<VNode & { name: string; size: number }>> },
        /**输入框尾部内容**/
        suffix: { type: Object as PropType<Omix<VNode & { name: string; size: number }>> }
    },
    setup(props, { emit, slots }) {
        function fetchPrefixRender() {
            if (slots.prefix) {
                return slots.prefix()
            } else if (props.prefix && isNotEmpty(props.prefix.name)) {
                return <common-element-wrapper name={props.prefix.name} size={props.prefix.size ?? 18}></common-element-wrapper>
            }
            return h(props.prefix as VNode)
        }

        function fetchSuffixRender() {
            if (slots.suffix) {
                return slots.suffix()
            } else if (props.suffix && isNotEmpty(props.suffix.name)) {
                return <common-element-wrapper name={props.suffix.name} size={props.suffix.size ?? 18}></common-element-wrapper>
            }
            return h(props.suffix as VNode)
        }

        return () => (
            <n-input class="form-element-input" onKeydown={(evt: KeyboardEvent) => enter(evt, e => emit('submit'))}>
                {{
                    prefix: slots.prefix || props.prefix ? fetchPrefixRender : undefined,
                    suffix: slots.suffix || props.suffix ? fetchSuffixRender : undefined
                }}
            </n-input>
        )
    }
})
</script>
