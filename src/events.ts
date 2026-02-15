import {post} from "./http.js"

const pad = (value: number) => String(value).padStart(2, "0")

const formatTimezoneOffset = (date: Date) => {
  const offsetMinutes = -date.getTimezoneOffset()
  if (offsetMinutes === 0) {
    return "Z"
  }

  const sign = offsetMinutes >= 0 ? "+" : "-"
  const absMinutes = Math.abs(offsetMinutes)
  const hours = Math.floor(absMinutes / 60)
  const minutes = absMinutes % 60

  return `${sign}${pad(hours)}:${pad(minutes)}`
}

const formatEventTime = (date: Date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
    `${formatTimezoneOffset(date)}`
}

export function logEvent(
    apiKey: string,
    customerId: string,
    name: string,
    time: Date,
    properties?: Record<string, any>[]
) {
  const formattedTime = formatEventTime(time)

  return post(apiKey, `/api/customers/${customerId}/events`, {
    name,
    time: formattedTime,
    properties
  })
}
