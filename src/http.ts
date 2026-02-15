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
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    throw new Error(`Reatch SDK error (${res.status})`)
  }

  return res.json()
}
