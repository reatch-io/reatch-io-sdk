import {post} from "./http.js"

const eventTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/

export function logEvent(
    apiKey: string,
    customerId: string,
    name: string,
    time: string,
    properties?: Record<string, any>[]
) {
  if (!eventTimePattern.test(time)) {
    throw new Error("event time must be in format yyyy-MM-dd'T'HH:mm:ssXXX")
  }

  return post(apiKey, `/api/customers/${customerId}/events`, {
    name,
    time,
    properties
  })
}
