/**jwt解析**/
export interface JwtParserOptions extends Omix {
    message: string
    code: number
}

/**jwt加密**/
export interface JwtSecretOptions extends Omix {
    expires: number
    message: string
    code: number
}
