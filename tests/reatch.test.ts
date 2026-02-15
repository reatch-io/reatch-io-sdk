import {beforeEach, describe, expect, it, vi} from "vitest"
import {ReatchIO} from "../src/reatch.js"
import {addAttribute} from "../src/attributes.js"
import {logEvent} from "../src/events.js"

vi.mock("../src/attributes.js", () => ({
  addAttribute: vi.fn()
}))

vi.mock("../src/events.js", () => ({
  logEvent: vi.fn()
}))

describe("ReatchIO", () => {
  const apiKey = "test-api-key"
  const eventTime = new Date(2026, 1, 15, 13, 45, 30)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("forwards addAttribute calls with the configured apiKey", () => {
    const client = new ReatchIO({apiKey})
    const attribute = {plan: "pro"}
    const result = {ok: true}

    vi.mocked(addAttribute).mockReturnValueOnce(result as unknown as ReturnType<typeof addAttribute>)

    const response = client.addAttribute("customer-123", attribute)

    expect(addAttribute).toHaveBeenCalledWith(apiKey, "customer-123", attribute)
    expect(response).toBe(result)
  })

  it("forwards logEvent calls with properties", () => {
    const client = new ReatchIO({apiKey})
    const properties = [{plan: "pro"}, {source: "email"}]

    client.logEvent("customer-123", "Signed Up", eventTime, properties)

    expect(logEvent).toHaveBeenCalledWith(apiKey, "customer-123", "Signed Up", eventTime, properties)
  })

  it("forwards logEvent calls without properties", () => {
    const client = new ReatchIO({apiKey})

    client.logEvent("customer-123", "Signed Up", eventTime)

    expect(logEvent).toHaveBeenCalledWith(apiKey, "customer-123", "Signed Up", eventTime, undefined)
  })
})
