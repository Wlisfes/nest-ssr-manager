/**管理端-菜单资源表**/
export const COMMON_WINDOWS_RESOUREC = {
    /**菜单状态**/
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
        }
    }
}

/**管理端-操作按钮权限表**/
export const COMMON_WINDOWS_RESOUREC_PERMISSIONS = {
    /**按钮状态**/
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
        }
    }
}

/**管理端-接口权限表**/
export const COMMON_WINDOWS_RESOUREC_APIFOX = {
    /**接口状态**/
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
        }
    },
    /**接口请求类型**/
    method: {
        get: {
            value: 'get',
            name: 'GET',
            json: { type: 'info' }
        },
        post: {
            value: 'post',
            name: 'POST',
            json: { type: 'success' }
        }
    }
}
