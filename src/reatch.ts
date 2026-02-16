import {addAttributes} from "./attributes.js"
import {logEvent} from "./events.js"
import {Attribute, Event} from "./models.js"

export class ReatchIO {
  private readonly apiKey: string

  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey;
  }

  addAttributes(customerId: string, attributes: Attribute[]) {
    return addAttributes(this.apiKey, customerId, attributes);
  }

  logEvent(customerId: string, event: Event) {
    return logEvent(this.apiKey, customerId, event)
  }
}
