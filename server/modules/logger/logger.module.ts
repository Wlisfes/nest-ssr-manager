import { Module, DynamicModule } from '@nestjs/common'
import { Logger } from '@server/modules/logger/logger.service'
import { isNotEmpty } from 'class-validator'
import { WinstonModule } from 'nest-winston'
import { fetchWherer } from '@server/utils'
import winston from 'winston'
import chalk from 'chalk'
import util from 'util'
import 'winston-daily-rotate-file'

/**当前运行服务名称**/
export const CurrentServerName = __dirname.split(`\\`).pop()

/**对象数据转换**/
export function fetchReduces(data: Omix) {
    const items = Object.keys(data ?? {}).map(key => `"${key.toString()}": ${JSON.stringify(data[key.toString()])}`)
    return items.join(`,\n    `)
}

/**写入数据组合**/
export function fetchWrite(serverName: string, data: Omix, opts: Omix<{ middleware?: string; log: any }>) {
    return `服务名称:[${serverName}] 进程ID:[${process.pid}]  ${data.timestamp}  ${data.level.toUpperCase()}  上下文ID:[${data.context ?? ''}]  执行方法:[${data.message}]  ${opts.middleware ?? ''}耗时:${data.duration}  {\n    ${opts.log}\n}`
}

/**数据拆解**/
export function fetchTransports(serverName: string, data: Omix) {
    const name = chalk.hex('#ff5c93')(`服务名称:[${serverName}]`)
    const pid = chalk.hex('#fc5404')(`服务进程:[${process.pid}]`)
    const timestamp = chalk.hex('#fb9300')(`${data.timestamp}`)
    const message = chalk.hex('#ff3d68')(`执行方法:[${data.message}]`)
    const context = fetchWherer(Boolean(data.context), {
        value: chalk.hex('#536dfe')(`日志ID:[${data.context ?? ''}]`),
        defaultValue: ''
    })
    const level = fetchWherer(data.level === 'error', {
        value: chalk.red('ERROR'),
        fallback: chalk.green(data.level.toUpperCase())
    })
    const duration = fetchWherer(isNotEmpty(data.duration), {
        value: chalk.hex('#ff3d68')(`耗时:${data.duration ?? '[]'}`),
        defaultValue: ''
    })
    const url = fetchWherer(Boolean(data.log?.url), {
        value: chalk.hex('#fc5404')(`接口地址:[${data.log?.url ?? ''}]`, ''),
        defaultValue: ''
    })
    const module = [name, pid, timestamp, level, context, message].filter(isNotEmpty).join(`  `)

    return { url, module, duration }
}

@Module({
    providers: [Logger],
    exports: [Logger],
    imports: [
        WinstonModule.forRoot({
            transports: [
                new winston.transports.DailyRotateFile({
                    level: 'debug',
                    dirname: `logs/${CurrentServerName.toLowerCase()}`, //日志保存的目录
                    filename: '%DATE%.log', //日志名称，占位符 %DATE% 取值为 datePattern 值。
                    datePattern: 'YYYY-MM-DD', //日志轮换的频率，此处表示每天。
                    zippedArchive: true, //是否通过压缩的方式归档被轮换的日志文件。
                    maxSize: '20m', //设置日志文件的最大大小，m 表示 mb 。
                    maxFiles: '30d', //保留日志文件的最大天数，此处表示自动删除超过30天的日志文件。
                    format: winston.format.combine(
                        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                        winston.format.json(),
                        winston.format.printf((data: Omix) => {
                            const { url, module, duration } = fetchTransports(CurrentServerName, data)
                            /**中间件日志**/
                            if (['LoggerMiddleware'].includes(String(data.message))) {
                                console[data.level](`${module}  ${url}  ${duration}`, data.log)
                                return fetchWrite(CurrentServerName, data, {
                                    middleware: `接口地址:${data.log.url}  `,
                                    log: fetchReduces(data.log)
                                })
                            }

                            /**异常错误日志**/
                            if (data.log instanceof Error) {
                                console[data.level](`${module}  ${url}  ${duration}`, data.log)
                                return fetchWrite(CurrentServerName, data, { log: util.inspect(data.log, { depth: null }) })
                            }

                            /**常规日志**/
                            if (typeof data.log === 'string') {
                                console[data.level](`${module}  ${duration}  {\n    log: ${chalk.red(data.log)}\n}`)
                                return fetchWrite(CurrentServerName, data, { log: `log: ${data.log}` })
                            }

                            /**其他日志**/
                            console[data.level](`${module}  ${duration}`, data.log)
                            return fetchWrite(CurrentServerName, data, { log: fetchReduces(data.log) })
                        })
                    )
                })
            ]
        })
    ]
})
export class LoggerModule {}
