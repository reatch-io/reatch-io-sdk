import {describe, expect, it, vi, beforeEach} from "vitest"
import {logEvent} from "../src/events.js"
import {post} from "../src/http.js"

vi.mock("../src/http.js", () => ({
  post: vi.fn()
}))

describe("logEvent", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("posts the event with a formatted time", () => {
    const apiKey = "api-key"
    const customerId = "customer-123"
    const name = "Signed Up"
    const time = new Date(2026, 1, 15, 9, 10, 11)
    const properties = [{plan: "pro"}]

    const response = {ok: true}
    vi.mocked(post).mockReturnValueOnce(response as unknown as ReturnType<typeof post>)

    const result = logEvent(apiKey, customerId, name, time, properties)

    expect(post).toHaveBeenCalledWith(apiKey, `/api/customers/${customerId}/events`, {
      name,
      time: expect.stringMatching(/^2026-02-15T09:10:11(?:Z|[+-]\d{2}:\d{2})$/),
      properties
    })
    expect(result).toBe(response)
  })

  it("formats the timezone offset", () => {
    const time = new Date(2026, 1, 15, 9, 10, 11)

    logEvent("api-key", "customer-123", "Signed Up", time)

    const call = vi.mocked(post).mock.calls[0]
    const body = call?.[2] as { time: string }

    expect(body.time).toMatch(/Z|[+-]\d{2}:\d{2}$/)
  })
})
