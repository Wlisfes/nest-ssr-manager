import { VNode } from 'vue'

/**图标示例对象**/
export const iconModules: Record<string, VNode> = import.meta.glob(`@/assets/icons/**/*.svg`, { query: '?component', eager: true })
export const iconNames = Object.keys(iconModules).reduce((icons: typeof iconModules, next) => {
    return Object.assign(icons, { [String(next.match(/([^/]+)\.svg$/)?.[1])]: iconModules[next] })
}, {})
