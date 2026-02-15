import {post} from "./http.js"

export function trackEvent(
    apiKey: string,
    customerId: string,
    name: string,
    time: number = Date.now(),
    properties?: Record<string, any>[]
) {
  return post(apiKey, `/api/customers/${customerId}/events`, {
    name,
    time,
    properties
  })
}
