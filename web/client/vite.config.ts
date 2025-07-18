import { resolve } from 'path'
import { defineConfig, ConfigEnv, UserConfig } from 'vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { fetchEnvService } from '../webpack/config'
import Components from 'unplugin-vue-components/vite'
import Compression from 'vite-plugin-compression'
import Analyzer from 'rollup-plugin-analyzer'
import Devtools from 'vite-plugin-devtools-json'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Vue from '@vitejs/plugin-vue'
import SvgLoader from 'vite-svg-loader'
import UnoCSS from 'unocss/vite'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    return {
        root: 'web/client',
        define: fetchEnvService(mode),
        build: {
            rollupOptions: {
                output: [{ format: 'cjs' }, { format: 'es' }]
            }
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, './'),
                '@webpack': resolve(__dirname, '../webpack/')
            }
        },
        plugins: [
            Vue(),
            VueJsx(),
            SvgLoader({ defaultImport: 'component' }),
            UnoCSS({ mode: 'global' }),
            Analyzer({ summaryOnly: true }),
            Devtools({ uuid: 'fadeb2fe-e16a-420a-a328-41a9c45a1ad3' }),
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
