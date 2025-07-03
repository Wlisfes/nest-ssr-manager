import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetTagify from '@unocss/preset-tagify'
import presetRemToPx from '@unocss/preset-rem-to-px'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
    presets: [presetUno(), presetAttributify(), presetTagify(), presetRemToPx({ baseFontSize: 4 })],
    rules: [
        ['border-transition', { transition: 'border-color .3s var(--cubic-bezier-ease-in-out)' }],
        ['text-transition', { transition: 'color .3s var(--cubic-bezier-ease-in-out)' }],
        ['bg-transition', { transition: 'background-color 0.3s var(--cubic-bezier-ease-in-out)' }],
        [/^grid-columns-(\d+)$/, ([, d]) => ({ display: 'grid', 'grid-template-columns': `repeat(${d}, minmax(0px, 1fr))` })]
    ],
    shortcuts: [{ [`common-width-inline`]: 'w-full max-w-1280 m-inline-auto p-inline-20' }]
})
