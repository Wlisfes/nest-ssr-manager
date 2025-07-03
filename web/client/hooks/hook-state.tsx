import { reactive, toRefs, nextTick, type UnwrapNestedRefs } from 'vue'
export type NewState<T> = Partial<T> | ((e: UnwrapNestedRefs<T>) => Partial<T>)

export function useState<T extends Object>(props: T) {
    const state = reactive<T>(Object.assign({ ...props }))

    function setState(newState: NewState<T>, handler?: (e: typeof state) => void): Promise<UnwrapNestedRefs<T>> {
        return new Promise(resolve => {
            if (typeof newState === 'function') {
                const _newState = newState(state)
                Object.assign(state, _newState)
            } else if (typeof newState === 'object') {
                Object.assign(state, newState)
            }
            nextTick(() => {
                handler?.(state)
                resolve(state)
            })
        })
    }

    return { ...toRefs(state), state, setState }
}
