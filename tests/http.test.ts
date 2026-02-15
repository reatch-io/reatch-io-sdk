import {afterEach, describe, expect, it, vi} from "vitest"
import {post} from "../src/http.js"

describe("post", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("posts JSON to the Reatch API with auth header", async () => {
    const json = vi.fn().mockResolvedValueOnce({ok: true})
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json
    } as unknown as Response)

    const result = await post("api-key", "/api/test", {hello: "world"})

    expect(fetchSpy).toHaveBeenCalledWith("https://api.reatch.io/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "api-key"
      },
      body: JSON.stringify({hello: "world"})
    })
    expect(json).toHaveBeenCalledTimes(1)
    expect(result).toEqual({ok: true})
  })

  it("throws when the response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 503,
      json: vi.fn()
    } as unknown as Response)

    await expect(post("api-key", "/api/test", {hello: "world"})).rejects.toThrow(
      "Reatch SDK error (503)"
    )
  })
})
