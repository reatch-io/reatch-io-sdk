import {post} from "./http.js"

export function addAttributes(
    apiKey: string,
    customerId: string,
    attributes: Record<string, any>[]
) {
  return post(apiKey, `/api/customers/${customerId}/attributes`, attributes)
}
