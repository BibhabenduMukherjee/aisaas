import { Redis } from '@upstash/redis'
// let s = toString(process.env.UPSTASH_REDIS_REST_URL_EXE)
// let ss = toString(process.env.UPSTASH_REDIS_REST_TOKEN_EXE)
export const db = new Redis({
    url  : "https://factual-camel-41128.upstash.io",
    token :"AaCoASQgMGI4MmJiYmMtYTg3Ny00MTkyLTgzZjgtMDJlNjcyMDUxY2ZhMjhjODU4ZTFkMTM4NGMyOTllYWM5Yzg4NzAzN2MyNWY="

});

