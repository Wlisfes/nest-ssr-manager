/**管理端账号表**/
export const COMMON_WINDOWS_ACCOUNT = {
    /**账号状态**/
    status: {
        online: {
            value: 'online',
            name: '在职',
            json: { type: 'success' }
        },
        offline: {
            value: 'disable',
            name: '离职',
            json: { type: 'error' }
        }
    }
}
