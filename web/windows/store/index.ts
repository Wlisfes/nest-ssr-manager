export * from '@/store/modules/mouse'
export * from '@/store/modules/global'
import { defineStore, storeToRefs } from 'pinia'

/**导出解构函数**/
export function useStore<T extends ReturnType<typeof defineStore>>(useDataStore: T) {
    const data = useDataStore() as ReturnType<T>
    const refs = storeToRefs(data)
    return { ...data, ...refs }
}
