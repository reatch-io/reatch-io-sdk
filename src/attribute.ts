import {post} from "./http.js"

export function addAttribute(
    apiKey: string,
    customerId: string,
    attribute: Record<string, any>
) {
  return post(apiKey, `/api/customers/${customerId}/attributes`, {
    attribute
  })
}
