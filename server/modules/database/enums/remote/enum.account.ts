/**
 * 管理端账号表
 */
export const COMMON_REMOTE_ACCOUNT = {
    /**账号状态**/
    status: {
        enable: {
            value: 'enable',
            name: '启用',
            json: { type: 'success' }
        },
        disable: {
            value: 'disable',
            name: '禁用',
            json: { type: 'error' }
        },
        suspend: {
            value: 'suspend',
            name: '挂起',
            json: { type: 'warning' }
        }
    }
}
