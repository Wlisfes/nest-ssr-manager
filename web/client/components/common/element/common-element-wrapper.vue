<script lang="tsx">
import { defineComponent, h, PropType, VNode, Fragment } from 'vue'
import { iconNames } from '@/utils'

export default defineComponent({
    name: 'CommonElementWrapper',
    emits: ['click'],
    props: {
        /**图标名称**/
        name: { type: String },
        /**图标组件**/
        component: { type: Object as PropType<VNode> }
    },
    setup(props, { slots }) {
        return () => (
            <n-icon class="common-element-wrapper">
                {slots.default ? (
                    slots.default()
                ) : props.component ? (
                    props.component
                ) : (
                    <Fragment>{props.name && iconNames[String(props.name)] && h(iconNames[String(props.name)])}</Fragment>
                )}
            </n-icon>
        )
    }
})
</script>
