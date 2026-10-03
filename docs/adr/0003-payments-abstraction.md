# ADR-0003 — Payment gateway abstraction

**Status:** accepted · **Date:** 2026-10-03

## Context

Gateway choice is undecided (GAP-B1): SSLCommerz, bKash merchant, Nagad merchant, aamarPay locally; Stripe/PayPal internationally require a non-Bangladesh entity or an aggregator. Recurring auto-debit is not generally available on bKash/Nagad (GAP-T1).

## Decision

- `src/payments/` defines a `PaymentProvider` interface: `createCheckout(donationIntent) → redirectUrl | clientToken`, `verifyWebhook(req) → PaymentEvent`, `refund?()`, `supports: { currencies, recurring, methods }`.
- Adapters: `sslcommerz` (first, has sandbox), `bkash`, `nagad`, `stripe`, `paypal`, `manual` (bank transfer with upload of proof). Enabled adapters come from `donation-settings`.
- A donation is created as `initiated` before redirect; only a verified webhook/IPN moves it to `paid`; receipts are generated on `paid`.
- Recurring: if the active adapter supports tokenisation, store a token; otherwise create a `recurring-pledge` with `method=reminder` that emails a one-tap pay link each interval.

## Consequences

- Gateway can be swapped by configuration when the Foundation decides.
- Receipt numbering and ledger are gateway-independent.
- International donations stay off until credentials exist; the UI hides unsupported currencies.
