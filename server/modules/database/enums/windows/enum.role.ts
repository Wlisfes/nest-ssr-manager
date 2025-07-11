/**管理端-角色配置表**/
export const COMMON_WINDOWS_ROLE = {
    /**角色数据权限**/
    model: {
        self: {
            value: 'self',
            name: '本人',
            json: { type: 'success' }
        },
        self_member: {
            value: 'self_member',
            name: '本人及下属',
            json: { type: 'success' }
        },
        dept: {
            value: 'dept',
            name: '本部门',
            json: { type: 'success' }
        },
        dept_member: {
            value: 'dept_member',
            name: '本部门及下属部门',
            json: { type: 'success' }
        },
        entire: {
            value: 'entire',
            name: '全部',
            json: { type: 'success' }
        }
    }
}
