import {addAttribute} from "./attribute.js"
import {trackEvent} from "./track.js"

export class Reatch {
  private readonly apiKey: string

  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey
  }

  addAttribute(customerId: string, attribute: Record<string, any>) {
    return addAttribute(this.apiKey, customerId, attribute)
  }

  track(customerId: string, event: string, time: number, properties?: Record<string, any>[]) {
    return trackEvent(this.apiKey, customerId, event, time, properties)
  }
}
