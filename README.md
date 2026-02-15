# reatch-io-sdk
SDK for client side

## Install

```zsh
npm install @reatch-io/reatch-io-sdk
```

## Usage

```ts
import {Reatch} from "@reatch-io/reatch-io-sdk"

const client = new Reatch({apiKey: "YOUR_API_KEY"})

// Add a customer attribute
await client.addAttribute("customer-123", {
  plan: "pro",
  locale: "en"
})

// Log an event with optional properties
await client.logEvent(
  "customer-123",
  "Signed Up",
  "2026-02-15T09:10:11+02:00",
  [{source: "email"}, {campaign: "winter"}]
)
```

## Event time format

`logEvent` requires the event time as a string in the format `yyyy-MM-dd'T'HH:mm:ssXXX`.
This is an ISO-8601 timestamp with a timezone offset, for example:

- `2026-02-15T09:10:11+02:00`
- `2026-02-15T09:10:11Z`

## Tests

Tests live in `tests/` and run with:

```zsh
npm test
```
