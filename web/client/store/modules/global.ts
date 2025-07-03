import { toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'

export const useGlobal = defineStore('APP_NEST_GLOBAL_STORE', () => {
    const { state, setState } = useState({
        /**开启初始化**/
        initialize: true
    })

    return {
        ...toRefs(state),
        state,
        setState
    }
})
