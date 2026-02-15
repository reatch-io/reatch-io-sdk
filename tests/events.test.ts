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

  it("posts the event when time uses the required format", () => {
    const apiKey = "api-key"
    const customerId = "customer-123"
    const name = "Signed Up"
    const time = "2026-02-15T09:10:11+02:00"
    const properties = [{plan: "pro"}]

    const response = {ok: true}
    vi.mocked(post).mockReturnValueOnce(response as unknown as ReturnType<typeof post>)

    const result = logEvent(apiKey, customerId, name, time, properties)

    expect(post).toHaveBeenCalledWith(apiKey, `/api/customers/${customerId}/events`, {
      name,
      time,
      properties
    })
    expect(result).toBe(response)
  })

  it("accepts a Zulu timezone offset", () => {
    const time = "2026-02-15T09:10:11Z"

    logEvent("api-key", "customer-123", "Signed Up", time)

    expect(post).toHaveBeenCalledTimes(1)
  })

  it("rejects a time string without a timezone offset", () => {
    expect(() =>
      logEvent("api-key", "customer-123", "Signed Up", "2026-02-15T09:10:11")
    ).toThrow("event time must be in format yyyy-MM-dd'T'HH:mm:ssXXX")
  })
})
