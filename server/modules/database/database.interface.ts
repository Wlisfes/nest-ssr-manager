import { Repository } from 'typeorm'
import { OmixRequest } from '@server/interface'

/**基础配置**/
export interface BaseOptions extends Omix {
    /**是否停止执行**/
    next?: boolean
    /**描述**/
    comment?: string
    /**请求实例**/
    request: OmixRequest
    /**开启日志**/
    logger?: boolean
    /**输出日志方法名**/
    deplayName?: string
}

/**通用查询配置**/
export interface BaseCommonOption<T> extends BaseOptions {
    /**异常提示文案**/
    message: string
    /**findOne查询入参**/
    dispatch?: Omix<Parameters<Repository<T>['findOne']>['0']>
    /**异常状态码**/
    code?: number
    /**额外异常数据**/
    cause?: Omix
    /**自定义转换验证**/
    transform?: (data: T) => boolean | Promise<boolean>
}

/**创建数据模型**/
export interface BaseCreateOptions<T> extends BaseOptions {
    /**创建数据**/
    body: Parameters<Repository<T>['save']>['0']
}

/**批量创建数据模型**/
export interface BaseInsertOptions<T> extends BaseOptions {
    /**创建数据**/
    body: Array<Parameters<Repository<T>['save']>['0']>
}

/**更新数据模型**/
export interface BaseUpdateOptions<T> extends BaseOptions {
    /**更新条件**/
    where: Parameters<Repository<T>['update']>['0']
    /**更新数据**/
    body: Parameters<Repository<T>['update']>['1']
}

/**删除数据模型**/
export interface BaseDeleteOptions<T> extends BaseOptions {
    /**删除条件**/
    where: Parameters<Repository<T>['delete']>['0']
}
