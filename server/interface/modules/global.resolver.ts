import { IncomingHttpHeaders } from 'http'
import { Request, Response } from 'express'

/**Request headers类型**/
export interface OmixHeaders extends Omix<IncomingHttpHeaders> {}

/**Response类型**/
export interface OmixResponse extends Omix<Response> {}

/**Request类型**/
export interface OmixRequest extends Omix<Request> {
    headers: OmixHeaders
    ipv4: string
    user: Omix
}
