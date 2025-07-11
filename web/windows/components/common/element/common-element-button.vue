<script lang="tsx">
import { defineComponent, h, PropType, VNode } from 'vue'
import { isEmpty, isString } from 'class-validator'

export default defineComponent({
    name: 'CommonElementButton',
    emits: ['click'],
    props: {
        /**是否表格操作按钮**/
        database: { type: Boolean, default: false },
        /**图标名称、图标节点**/
        icon: { type: [String, Object] as PropType<string | VNode> },
        /**图标size**/
        iconSize: { type: Number, default: 18 },
        /**按钮文案**/
        content: { type: [String, Object] as PropType<string | VNode> },
        /**操作回调函数**/
        setState: { type: Function as PropType<(e: Omix) => Promise<Omix>>, default: Function }
    },
    setup(props, { emit, slots }) {
        /**渲染图标**/
        function fetchIconRender() {
            if (isEmpty(props.icon)) {
                return null
            } else if (isString(props.icon)) {
                return <common-element-wrapper size={props.iconSize} name={props.icon}></common-element-wrapper>
            }
            return h(props.icon as VNode)
        }

        function fetchContentRender() {
            return slots.default ? slots.default() : props.content
        }

        return () => (
            <n-button
                class={{ 'common-element-button': true, 'element-database': props.database }}
                style={{ '--n-icon-size': props.iconSize + 'px' }}
                focusable={false}
                onClick={(event: MouseEvent) => emit('click', event, { setState: props.setState })}
            >
                {{ icon: isEmpty(props.icon) ? undefined : fetchIconRender, default: fetchContentRender }}
            </n-button>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-element-button.element-database {
    --n-icon-margin: 3px;
}
</style>
