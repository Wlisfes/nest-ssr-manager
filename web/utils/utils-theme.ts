import { GlobalThemeOverrides, ThemeCommonVars } from 'naive-ui'

export interface CustomThemeCommonVars extends Omix<ThemeCommonVars> {
    '--layout-common-footer-background-color': string
}

export function addLight(color: string, amount: number) {
    const cc = parseInt(color, 16) + amount
    const c = cc > 255 ? 255 : cc
    return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`
}

export function lighten(color: string, amount: number) {
    color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
    amount = Math.trunc((255 * amount) / 100)
    return `#${addLight(color.substring(0, 2), amount)}${addLight(color.substring(2, 4), amount)}${addLight(color.substring(4, 6), amount)}`
}

export function themeOverrides(inverted: boolean, state: Omix): Omix<GlobalThemeOverrides & { common: Partial<CustomThemeCommonVars> }> {
    const lightenStr = lighten(state.primaryColor, 6)
    if (inverted) {
        return {
            common: {
                primaryColor: state.primaryColor,
                primaryColorHover: lightenStr,
                primaryColorPressed: lightenStr,
                primaryColorSuppl: state.primaryColor,
                '--layout-common-footer-background-color': '#000000'
            },
            Scrollbar: { width: '6px', height: '6px' },
            Tree: { nodeHeight: '36px' }
        }
    }
    return {
        common: {
            primaryColor: state.primaryColor,
            primaryColorHover: lightenStr,
            primaryColorPressed: lightenStr,
            primaryColorSuppl: state.primaryColor,
            '--layout-common-footer-background-color': '#f8f8f8'
        },
        Scrollbar: { width: '6px', height: '6px' },
        Tree: { nodeHeight: '36px' }
    }
}
