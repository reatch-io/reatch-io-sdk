import {beforeEach, describe, expect, it, vi} from "vitest"
import {ReatchIO} from "../src/reatch.js"
import {addAttributes} from "../src/attributes.js"
import {logEvent} from "../src/events.js"

vi.mock("../src/attributes.js", () => ({
  addAttributes: vi.fn()
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

  it("forwards addAttributes calls with the configured apiKey", () => {
    const client = new ReatchIO({apiKey})
    const attributes = [{key: "plan", value: "pro"}, {key: "locale", value: "en"}]
    const result = {ok: true}

    vi.mocked(addAttributes).mockReturnValueOnce(result as unknown as ReturnType<typeof addAttributes>)

    const response = client.addAttributes("customer-123", attributes)

    expect(addAttributes).toHaveBeenCalledWith(apiKey, "customer-123", attributes)
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

    expect(logEvent).toHaveBeenCalledWith(apiKey, "customer-123", event)
  })

  it("forwards logEvent calls without properties", () => {
    const client = new ReatchIO({apiKey})
    const event = {
      name: "Signed Up",
      time: eventTime
    }

    client.logEvent("customer-123", event)

    expect(logEvent).toHaveBeenCalledWith(apiKey, "customer-123", event)
  })
})
