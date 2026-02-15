import {beforeEach, describe, expect, it, vi} from "vitest"
import {Reatch} from "../src/reatch.js"
import {addAttribute} from "../src/attributes.js"
import {logEvent} from "../src/events.js"

vi.mock("../src/attributes.js", () => ({
  addAttribute: vi.fn()
}))

vi.mock("../src/events.js", () => ({
  logEvent: vi.fn()
}))

describe("Reatch", () => {
  const apiKey = "test-api-key"
  const eventTime = "2024-02-15T13:45:30+02:00"

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("forwards addAttribute calls with the configured apiKey", () => {
    const client = new Reatch({apiKey})
    const attribute = {plan: "pro"}
    const result = {ok: true}

    vi.mocked(addAttribute).mockReturnValueOnce(result as unknown as ReturnType<typeof addAttribute>)

    const response = client.addAttribute("customer-123", attribute)

    expect(addAttribute).toHaveBeenCalledWith(apiKey, "customer-123", attribute)
    expect(response).toBe(result)
  })

  it("forwards logEvent calls with properties", () => {
    const client = new Reatch({apiKey})
    const properties = [{plan: "pro"}, {source: "email"}]

    client.logEvent("customer-123", "Signed Up", eventTime, properties)

    expect(logEvent).toHaveBeenCalledWith(apiKey, "customer-123", "Signed Up", eventTime, properties)
  })

  it("forwards logEvent calls without properties", () => {
    const client = new Reatch({apiKey})

    client.logEvent("customer-123", "Signed Up", eventTime)

    expect(logEvent).toHaveBeenCalledWith(apiKey, "customer-123", "Signed Up", eventTime, undefined)
  })
})
