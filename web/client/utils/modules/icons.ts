import { VNode } from 'vue'

/**图标示例对象**/
export const iconModules: Record<string, VNode> = import.meta.glob(`@/assets/icons/**/*.svg`, { query: '?component', eager: true })
export const iconNames = Object.keys(iconModules).reduce((icons: typeof iconModules, next) => {
    return Object.assign(icons, { [String(next.match(/([^/]+)\.svg$/)?.[1])]: iconModules[next] })
}, {})

/**图片示例对象**/
export const imageModules: Record<string, Omix> = import.meta.glob(`@/assets/images/**/*.png`, { query: '?url', eager: true })
export const imageNames = Object.keys(imageModules as Record<string, Omix>).reduce((images: typeof iconModules, next) => {
    return Object.assign(images, { [String(next.match(/([^/]+)\.png$/)?.[1])]: imageModules[next].default })
}, {})
