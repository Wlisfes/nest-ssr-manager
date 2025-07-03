import { ref, onMounted, nextTick } from 'vue'
import AOS from 'aos-observer'

export function useAosObserver() {
    const element = ref<Array<AOS.AosElement>>([])

    onMounted(fetchInitialize)
    async function fetchInitialize() {
        return await nextTick(() => {
            return (element.value = AOS.init({
                scroll: false,
                once: true,
                disable: window.innerWidth < 1080
            }))
        })
    }

    /**滚动容器刷新**/
    async function fetchScrollbar(event: Omix<Event & { target: HTMLElement }>) {
        return AOS.handleScroll(element.value, event.target.scrollTop)
    }

    return { AOS, element, fetchScrollbar }
}
