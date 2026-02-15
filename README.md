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
  new Date(2026, 1, 15, 9, 10, 11),
  [{source: "email"}, {campaign: "winter"}]
)
```

## Event time format

`logEvent` accepts a JavaScript `Date`. The SDK converts it to the required
`yyyy-MM-dd'T'HH:mm:ssXXX` string with a timezone offset before sending it.

## Tests

Tests live in `tests/` and run with:

```zsh
npm test
```
