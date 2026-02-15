import {addAttribute} from "./attributes.js"
import {logEvent} from "./events.js"
import {Attribute, Event} from "./models.js"

export class ReatchIO {
  private readonly apiKey: string

  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey
  }

  addAttribute(customerId: string, attribute: Attribute) {
    return addAttribute(this.apiKey, customerId, {
      [attribute.key]: attribute.value,
    })
  }

  logEvent(customerId: string, event: Event) {
    const properties = event.attributes?.map(attr => ({ [attr.key]: attr.value }));
    return logEvent(this.apiKey, customerId, event.name, event.time, properties)
  }
}
