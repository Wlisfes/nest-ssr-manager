import { type Logger as LoggerService } from 'winston'
import { type Request } from 'express'
import { isNotEmpty } from 'class-validator'
import { fetchWherer } from '@/utils/utils-common'
import chalk from 'chalk'

/**封装日志输出包**/
export class Logger {
    static instance: Logger
    static initialize: boolean = false
    constructor(
        private readonly ssr: boolean,
        private readonly logger: LoggerService
    ) {
        if (!Logger.instance) {
            Logger.initialize = true
            Logger.instance = this
        }
        return Logger.instance
    }

    public static async fetchInitialize(initialize: boolean) {
        return (Logger.initialize = initialize)
    }

    public info(message: string, log) {
        if (this.ssr) {
            this.logger.info(message, { log })
        } else {
            console.info(message, ...log)
        }
        return this
    }

    public error(message: string, log) {
        if (this.ssr) {
            this.logger.error(message, { log })
        } else {
            console.error(message, ...log)
        }
        return this
    }
}

/**对象数据转换**/
export function fetchReduces(data: Omix) {
    const items = Object.keys(data ?? {}).map(key => `"${key.toString()}": ${JSON.stringify(data[key.toString()])}`)
    return items.join(`,\n    `)
}

/**写入数据组合**/
export function fetchWrite(data: Omix, log: any) {
    return `服务进程:[${process.pid}]  ${data.timestamp}  ${data.level.toUpperCase()}  执行方法:[${data.message}]  {\n    ${log}\n}`
}

export function CoutextWinston(ssr: boolean, request?: Request): Promise<Logger> {
    return new Promise(resolve => {
        if (!ssr) {
            return resolve(console as never)
        } else if (Logger.instance && Logger.initialize) {
            return resolve(Logger.instance)
        }
        return import('winston').then(async winston => {
            await import('winston-daily-rotate-file')
            const util = await import('util')
            await Logger.fetchInitialize(true)
            const logger = winston.createLogger({
                transports: [
                    new winston.transports.DailyRotateFile({
                        level: 'debug',
                        dirname: `logs/web`, //日志保存的目录
                        filename: '%DATE%.log', //日志名称，占位符 %DATE% 取值为 datePattern 值。
                        datePattern: 'YYYY-MM-DD', //日志轮换的频率，此处表示每天。
                        zippedArchive: true, //是否通过压缩的方式归档被轮换的日志文件。
                        maxSize: '20m', //设置日志文件的最大大小，m 表示 mb 。
                        maxFiles: '30d', //保留日志文件的最大天数，此处表示自动删除超过30天的日志文件。
                        format: winston.format.combine(
                            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                            winston.format.json(),
                            winston.format.printf((data: Omix) => {
                                const platform = chalk.hex('#24B89E')(`客户端日志`)
                                const pid = chalk.hex('#fc5404')(`服务进程:[${process.pid}]`)
                                const timestamp = chalk.hex('#fb9300')(`${data.timestamp}`)
                                const message = chalk.hex('#ff3d68')(`执行方法:[${data.message}]`)
                                const level = fetchWherer(data.level === 'error', {
                                    value: chalk.red('ERROR'),
                                    fallback: chalk.green(data.level.toUpperCase())
                                })
                                const module = [platform, pid, timestamp, level, message].filter(isNotEmpty).join(`  `)

                                /**异常输出日志**/
                                if (data.log instanceof Error) {
                                    console[data.level](`${module}`, data.log)
                                    return fetchWrite(data, util.inspect(data.log, { depth: null }))
                                }

                                /**常规日志**/
                                if (typeof data.log === 'string') {
                                    console.log(`常规日志:`, data.log)
                                    console[data.level](`${module}  {\n    log: ${chalk.red(data.log)}\n}`)
                                    return fetchWrite(data, `log: ${data.log}`)
                                }

                                /**其他日志输出**/
                                console[data.level](`${module}`, data.log)
                                return fetchWrite(data, fetchReduces(data.log))
                            })
                        )
                    })
                ]
            })
            return resolve(new Logger(ssr, logger))
        })
    })
}
