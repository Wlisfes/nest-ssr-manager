/**接口通用类型**/
export interface ResultNotice extends Omix {
    message: string
}

/**接口响应类型**/
export interface ResultResolver<T> extends ResultNotice {
    data: T
    code: number
    timestamp: string
    method: string
    url: string
}

/**分页接口入参类型**/
export type BodyColumn<T> = Omix<T> & {
    page?: number
    size?: number
    vague?: string
}

/**分页接口响应类型**/
export interface ResultColumn<T = Omix> extends ResultNotice {
    page: number
    size: number
    total: number
    list: Array<Omix<T>>
}
