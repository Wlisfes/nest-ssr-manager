/**通用对象**/
declare type Omix<T = Record<string, any>> = T & Record<string, any>

/**获取Promise返回的类型**/
declare type PromiseType<T extends Promise<any>> = T extends Promise<infer R> ? R : never

/**OmixResult输出类型**/
declare interface OmixResult<T> extends Omix {
    message: string
    list: Array<Omix<T>>
    total: number
    page: number
    size: number
}

declare interface Window {
    /**store数据类型**/
    __INITIAL_DATA__: Omix
}

declare interface EnvOptions {
    /**环境标识**/
    NODE_ENV: 'development' | 'production'
    /**网关服务端口号**/
    NODE_MAIN_SSR_PORT: number
    /**管理端SSR服务端口号**/
    NODE_REMOTE_SSR_PORT: number
    /**管理端API服务端口号**/
    NODE_REMOTE_API_PORT: number
    /**客户端SSR服务端口号**/
    NODE_CLIENT_SSR_PORT: number
    /**客户端API服务端口号**/
    NODE_CLIENT_API_PORT: number
    /**客户端SSR服务请求地址**/
    NODE_CLIENT_SSR_BASEURL: string
    /**网站标题**/
    NODE_SEO_TITLE: string
    /**网站副标题**/
    NODE_SEO_SUBTITLE: string
    /**网站搜索关键字**/
    NODE_SEO_KEYWORDS: string
    /**网站描述**/
    NODE_SEO_DESCRIPTION: string
}

/**扩展import.meta.env字段**/
interface ImportMetaEnv extends EnvOptions {}

declare namespace NodeJS {
    interface ProcessEnv extends EnvOptions {}
}
