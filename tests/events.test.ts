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
    const event = {
      name: "Signed Up",
      time: new Date(2026, 1, 15, 9, 10, 11),
      attributes: [{key: "plan", value: "pro"}]
    }

    const response = {ok: true}
    vi.mocked(post).mockReturnValueOnce(response as unknown as ReturnType<typeof post>)

    const result = logEvent(apiKey, customerId, event)

    expect(post).toHaveBeenCalledWith(apiKey, `/api/customers/${customerId}/events`, {
      name: event.name,
      time: expect.stringMatching(/^2026-02-15T09:10:11(?:Z|[+-]\d{2}:\d{2})$/),
      attributes: event.attributes
    })
    expect(result).toBe(response)
  })

  it("formats the timezone offset", () => {
    const event = {
      name: "Signed Up",
      time: new Date(2026, 1, 15, 9, 10, 11)
    }

    logEvent("api-key", "customer-123", event)

    const call = vi.mocked(post).mock.calls[0]
    const body = call?.[2] as { time: string }

    expect(body.time).toMatch(/Z|[+-]\d{2}:\d{2}$/)
  })
})
