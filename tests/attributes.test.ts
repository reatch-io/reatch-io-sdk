import {beforeEach, describe, expect, it, vi} from "vitest"
import {addAttributes} from "../src/attributes.js"
import {post} from "../src/http.js"

vi.mock("../src/http.js", () => ({
  post: vi.fn()
}))

describe("addAttributes", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("posts the attribute payload", () => {
    const apiKey = "api-key"
    const customerId = "customer-123"
    const attributes = [{plan: "pro"}]
    const response = {ok: true}

    vi.mocked(post).mockReturnValueOnce(response as unknown as ReturnType<typeof post>)

    const result = addAttributes(apiKey, customerId, attributes)

    expect(post).toHaveBeenCalledWith(apiKey, `/api/customers/${customerId}/attributes`, attributes)
    expect(result).toBe(response)
  })
})
