module.exports = {
    apps: [
        {
            /**应用名称**/
            name: 'nestjs-app',
            /**启动文件入口路径**/
            script: 'dist/main.js',
            /**启动最大数量**/
            instances: '3',
            /**使用集群模式**/
            exec_mode: 'cluster',
            /**自动重启**/
            autorestart: true,
            /**关闭文件监听**/
            watch: false,
            /**内存超过1G时自动重启**/
            max_memory_restart: '1G',
            /**日志输出格式**/
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            /**错误日志路径**/
            error_file: 'logs/pm2/error.log',
            /**普通日志路径**/
            out_file: 'logs/pm2/out.log',
            /**合并日志**/
            combine_logs: true
        }
    ]
}
