<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutCommonFooter',
    setup(props) {
        return () => <n-element class="layout-common-footer overflow-hidden"></n-element>
    }
})
</script>

<style lang="scss" scoped>
.layout-common-footer {
    font-size: var(--font-size);
    line-height: var(--line-height);
    color: var(--text-color-2);
    background-color: var(--layout-common-footer-background-color);
    transition:
        color 0.3s var(--n-bezier),
        background-color 0.3s var(--n-bezier);
}
</style>
