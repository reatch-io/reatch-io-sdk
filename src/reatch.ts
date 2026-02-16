import {addAttributes} from "./attributes.js"
import {logEvent} from "./events.js"
import {Attribute, Event} from "./models.js"

export class ReatchIO {
  private readonly apiKey: string

  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey;
  }

  addAttributes(customerId: string, attributes: Attribute[]) {
    const properties = attributes.map(attr => ({ [attr.key]: attr.value }));
    return addAttributes(this.apiKey, customerId, properties);
  }

  logEvent(customerId: string, event: Event) {
    const properties = event.attributes?.map(attr => ({ [attr.key]: attr.value }));
    return logEvent(this.apiKey, customerId, event.name, event.time, properties)
  }
}
