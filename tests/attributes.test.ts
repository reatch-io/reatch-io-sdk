import {beforeEach, describe, expect, it, vi} from "vitest"
import {addAttribute} from "../src/attributes.js"
import {post} from "../src/http.js"

vi.mock("../src/http.js", () => ({
  post: vi.fn()
}))

describe("addAttribute", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("posts the attribute payload", () => {
    const apiKey = "api-key"
    const customerId = "customer-123"
    const attribute = {plan: "pro"}
    const response = {ok: true}

    vi.mocked(post).mockReturnValueOnce(response as unknown as ReturnType<typeof post>)

    const result = addAttribute(apiKey, customerId, attribute)

    expect(post).toHaveBeenCalledWith(apiKey, `/api/customers/${customerId}/attributes`, {
      attribute
    })
    expect(result).toBe(response)
  })
})
