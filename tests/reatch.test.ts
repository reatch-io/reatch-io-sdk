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
    const attribute = {key: "plan", value: "pro"}
    const result = {ok: true}

    vi.mocked(addAttribute).mockReturnValueOnce(result as unknown as ReturnType<typeof addAttribute>)

    const response = client.addAttribute("customer-123", attribute)

    expect(addAttribute).toHaveBeenCalledWith(apiKey, "customer-123", {
      [attribute.key]: attribute.value,
    })
    expect(response).toBe(result)
  })

  it("forwards logEvent calls with properties", () => {
    const client = new ReatchIO({apiKey})
    const event = {
      name: "Signed Up",
      time: eventTime,
      attributes: [{key: "plan", value: "pro"}, {key: "source", value: "email"}]
    }

    client.logEvent("customer-123", event)

    expect(logEvent).toHaveBeenCalledWith(apiKey, "customer-123", "Signed Up", eventTime, [{plan: "pro"}, {source: "email"}])
  })

  it("forwards logEvent calls without properties", () => {
    const client = new ReatchIO({apiKey})
    const event = {
      name: "Signed Up",
      time: eventTime
    }

    client.logEvent("customer-123", event)

    expect(logEvent).toHaveBeenCalledWith(apiKey, "customer-123", "Signed Up", eventTime, undefined)
  })
})
