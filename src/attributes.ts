import {post} from "./http.js"

export function addAttributes(
    apiKey: string,
    customerId: string,
    attributes: Attribute[]
) {
  return post(apiKey, `/api/customers/${customerId}/attributes`, attributes)
}
