import {addAttribute} from "./attributes.js"
import {logEvent} from "./events.js"

export class ReatchIO {
  private readonly apiKey: string

  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey
  }

  addAttribute(customerId: string, attribute: Record<string, any>) {
    return addAttribute(this.apiKey, customerId, attribute)
  }

  logEvent(customerId: string, eventName: string, eventTime: Date, eventAttributes?: Record<string, any>[]) {
    return logEvent(this.apiKey, customerId, eventName, eventTime, eventAttributes)
  }
}
