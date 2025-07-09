/**redis set写入参数**/
export interface WriteRedisOption extends Omix {
    /**存储键**/
    key: string
    /**存储数据**/
    data: any
    /**存储有效时间**/
    seconds?: number
    /**开启日志**/
    logger?: boolean
    /**输出日志方法名**/
    deplayName?: string
}

/**redis get读取参数**/
export interface ReadRedisOption<T> extends Omit<WriteRedisOption, 'data' | 'seconds'> {
    /**未读取数据默认值**/
    defaultValue?: T
}

/**redis mget批量读取**/
export interface MgetRedisOption extends Pick<WriteRedisOption, 'logger' | 'deplayName'> {
    /**存储键列表**/
    keys: Array<string>
}

/**redis del删除**/
export interface DelRedisOption extends Pick<WriteRedisOption, 'logger' | 'key' | 'deplayName'> {}
