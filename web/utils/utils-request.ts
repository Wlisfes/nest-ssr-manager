import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export const request: AxiosRequest = axios.create({
    baseURL: import.meta.env.NODE_API_BASEURL,
    timeout: 90000
})

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // const token = getToken()
        // if (token) {
        //     config.headers.Authorization = token
        // }
        return config
    },
    error => Promise.reject(error)
)

request.interceptors.response.use(fetchInizeNotice, error => Promise.reject(error))

function fetchInizeNotice(response: AxiosResponse) {
    if (response.data.code !== 200) {
        return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
}
