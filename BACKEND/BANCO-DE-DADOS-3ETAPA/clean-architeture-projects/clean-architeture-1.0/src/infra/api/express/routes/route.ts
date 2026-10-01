export type HttpMethod = "get" | "post"

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
} as const 

export interface Route {
    gethandler(): (request: Request, response: Response) => Promise<void>
    getPath(): string
    getMethod(): HttpMethod
}