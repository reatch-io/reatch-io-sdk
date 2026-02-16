const BASE_URL = "https://api.reatch.io"

export async function post(
    apiKey: string,
    path: string,
    body: unknown
) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": `${apiKey}`
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    throw new Error(`Reatch SDK error (${res.status})`)
  }

  const text = await res.text()
  if (!text) {
    return null
  }

  return JSON.parse(text)
}
