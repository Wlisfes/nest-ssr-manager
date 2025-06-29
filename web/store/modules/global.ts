import { toRefs, computed } from 'vue'
import { defineStore } from 'pinia'
import { useState } from '@/hooks/hook-state'
import { Logger } from '@/plugins'
import * as Service from '@/api'

export const useGlobal = defineStore('APP_NEST_GLOBAL_STORE', () => {
    const { state, setState } = useState({
        /**开启初始化**/
        initialize: true
    })

    return {
        state: computed(() => state),
        ...toRefs(state),
        setState
    }
})
