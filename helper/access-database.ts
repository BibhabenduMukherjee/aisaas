const upstashRedisRestUrl = process.env.NEW_UPSTASH_REDIS_REST_URL_EXE!
const ss = process.env.NEW_UPSTASH_REDIS_REST_TOKEN_EXE!

type Command = 'zrange' | 'sismember' | 'get' | 'smembers'

export async function DbAccessRest(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${ss}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`)
  }

  const data = await response.json()
  return data.result
}
