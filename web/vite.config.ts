import { resolve } from 'path'
import { defineConfig, ConfigEnv, UserConfig } from 'vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Compression from 'vite-plugin-compression'
import Analyzer from 'rollup-plugin-analyzer'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Vue from '@vitejs/plugin-vue'
import SvgLoader from 'vite-svg-loader'
import UnoCSS from 'unocss/vite'
import dotenv from 'dotenv'

export function fetchEnvService(mode: string) {
    const config = dotenv.config({ path: resolve(process.cwd(), `./env/.env.${mode}`) }).parsed ?? {}
    const json: Record<string, any> = {}
    Object.entries(config).forEach(([key, value]) => {
        json[`import.meta.env.${key}`] = JSON.stringify(value)
    })
    return json
}

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    return {
        root: 'web',
        define: fetchEnvService(mode),
        build: {
            rollupOptions: {
                output: [{ format: 'cjs' }, { format: 'es' }]
            }
        },
        resolve: {
            alias: {
                '~': resolve(__dirname, '../'),
                '@': resolve(__dirname, './')
            }
        },
        plugins: [
            Vue(),
            VueJsx(),
            SvgLoader({ defaultImport: 'component' }),
            UnoCSS({ mode: 'global' }),
            Analyzer({ summaryOnly: true }),
            Components({
                deep: true,
                extensions: ['vue'],
                dirs: ['./components'],
                dts: './web.components.d.ts',
                resolvers: [NaiveUiResolver()]
            }),
            // 构建压缩文件
            Compression({
                // 是否在控制台输出压缩结果，默认为 true
                verbose: true,
                // 是否禁用压缩，默认为 false
                disable: false,
                // 启用压缩的文件大小最小限制，单位字节（byte），默认为 0，1b(字节)=8bit(比特), 1KB=1024B
                threshold: 10240, // 即10kb以上即会压缩
                // 采用的压缩算法，默认是 gzip
                algorithm: 'gzip',
                // 生成的压缩包后缀
                ext: '.gz'
            })
        ]
    }
})
