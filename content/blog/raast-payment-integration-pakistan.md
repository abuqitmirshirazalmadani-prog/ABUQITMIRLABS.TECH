---
{
  "title": "Raast Payment Integration in Pakistan: Merchant Guide",
  "seoTitle": "Raast Payment Integration in Pakistan: Merchant Guide",
  "slug": "raast-payment-integration-pakistan",
  "canonical": "https://www.abuqitmirlabs.tech/blog/raast-payment-integration-pakistan",
  "excerpt": "In SBP's Q3 FY26 review, Raast P2M transactions rose from 36.3M to 55.9M in Jan-Mar 2026. Learn how to connect QR, RTP, alias and IBAN confirmations to orders and accounting.",
  "metaDescription": "Learn how Pakistani businesses can accept Raast P2M payments through QR, RTP, merchant aliases or IBAN, and connect confirmations to orders and accounting.",
  "category": "Development",
  "author": "Abu Qitmir Mohammad Shiraz Al-Madani",
  "publishedAt": "2026-11-20",
  "coverImage": "/images/blog-covers/raast-payment-integration-pakistan.webp",
  "coverImageAlt": "Raast Payment Integration in Pakistan for Merchants",
  "tags": [
    "Raast payment integration in Pakistan",
    "Raast P2M integration",
    "Raast QR payment integration Pakistan",
    "Pakistan merchant payment system",
    "Raast merchant integration guide",
    "Business digital payment integration Pakistan",
    "SBP Raast P2M",
    "AbuQitmirLabs"
  ]
}
---

## How Raast P2M Integration Connects Payments to Orders

In SBP's Q3 FY26 payment review, Raast P2M transactions increased from 36.3 million in the previous quarter to 55.9 million in January-March 2026 ([SBP Q3 FY26 Payment Systems Review](https://www.sbp.org.pk/assets/documents/press-release/Pr-25-Jun-2026.pdf)). That growth makes payment confirmation and reconciliation a practical software problem for Pakistani businesses.

Raast P2M integration means connecting a merchant payment flow to orders, customer records and accounting. Raast is Pakistan's national instant payment system ([SBP Raast overview](https://www.sbp.org.pk/raast)) and its Person-to-Merchant (P2M) service supports acceptance options such as static or dynamic QR codes, Request to Pay Now or Later, merchant aliases and IBAN push payments ([SBP Raast Person to Merchant](https://www.sbp.org.pk/our-subsidiaries/raast/raast-person-to-merchant)). A regulated bank or provider onboards the business and supplies the merchant-facing tools ([SBP Raast P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023)).

The software should match only confirmed provider payments to orders. It should also store transaction references, handle pending or rejected states, support refund decisions and reconcile provider records with the accounting system. AbuQitmirLabs is a Karachi-based custom software studio. This guide explains how Raast P2M works, what the provider handles and what the connected software must do.

**Direct Answer:** Raast P2M (person-to-merchant) is the State Bank of Pakistan's merchant payment framework that lets customers pay businesses from their bank or wallet app. Raast P2M supports several acceptance options, including static and dynamic QR codes, Request to Pay Now and Later, merchant aliases or till codes, and IBAN push payments. The options available to your business depend on the regulated provider's implementation. A business normally integrates with the merchant-facing capabilities supplied by its regulated provider; it should not assume that every provider exposes the same API, webhook or refund interface.

## Quick Takeaways

- **National scheme vs. provider interface:** Raast is the national instant payment infrastructure, while a regulated bank, EMI, PSO or PSP provides merchant onboarding and the technical interface ([SBP Raast P2M 2024 clarification](https://www.sbp.org.pk/circulars/pspod-circular-letter-no-01-of-2024)).
- **Multiple acceptance options:** Raast P2M supports static and dynamic QR codes, Request to Pay (RTP) Now and Later, merchant aliases or till codes, and IBAN push payments ([SBP Raast P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023)).
- **Order matching:** Static QR is simple for counter payments but carries no order reference. Dynamic QR or Request to Pay ties a specific amount and order reference to each transaction.
- **Provider confirmation vs. initiation:** Mark an order as paid only after provider-side confirmation, never from customer-side initiation or a payment screenshot.
- **Historical subsidy context:** SBP's 2025 circular described a time-limited subsidy for eligible Raast P2M QR transactions from 1 September 2025 through 30 June 2026 ([SBP Raast P2M QR subsidy circular](https://www.sbp.org.pk/circulars/pspod-circular-no-03-of-2025)). That period has ended; confirm current merchant fees directly with your provider.

## Why Pakistani Businesses Are Moving to Raast P2M

SBP launched the Raast P2M service with its circular dated 5 December 2023 ([SBP P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023)), requiring regulated banks, microfinance banks, electronic money institutions (EMIs) and payment system operators/providers (PSOs/PSPs) to enable merchant payment acceptance. In 2024, SBP issued a follow-up circular letter clarifying provider enablement timelines and allowing institutions either to integrate directly or partner with a regulated EMI, PSO or PSP ([SBP Raast P2M 2024 clarification](https://www.sbp.org.pk/circulars/pspod-circular-letter-no-01-of-2024)).

SBP's Q3 FY26 Payment Systems Review reported that Raast P2M transactions increased from 36.3 million in the previous quarter to 55.9 million in January-March 2026 ([SBP Q3 FY26 Payment Systems Review](https://www.sbp.org.pk/assets/documents/press-release/Pr-25-Jun-2026.pdf)). Customers already hold banking and mobile wallet apps, making QR and payment requests natural checkout options across retail counters, delivery fleets and online stores.

For growing businesses, the operational bottleneck is no longer collecting a payment - it is verifying and reconciling it. When staff verify payments manually by checking a mobile app or reviewing customer screenshots on WhatsApp, orders stall and month-end reconciliation becomes error-prone. Connecting your order management or ERP software to your provider's confirmation data closes that gap.

## How Raast P2M Works: Scheme Infrastructure vs. Provider Interface

To plan a reliable integration, separate the national scheme from your provider's technical interface:

1. **Raast infrastructure:** Operated under the State Bank of Pakistan ([SBP Raast overview](https://www.sbp.org.pk/raast)), Raast routes instant interbank and wallet transactions across participating institutions.
2. **Raast Merchant Service Provider (RMSP):** A regulated bank, MFB, EMI, PSO or PSP onboards the merchant after due diligence and provides the merchant-facing tools ([SBP P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023)).
3. **Merchant software boundary:** Your e-commerce store, POS or ERP integrates with the APIs, webhooks, checkout links, dashboards or statement exports that your chosen regulated provider supplies. Different providers expose different technical capabilities.

SBP's 2023 P2M circular lists QR codes (static and dynamic), Request to Pay (RTP Now and RTP Later), Raast Alias (including till codes) and IBAN as acceptance routes, and describes the responsibilities of Raast Merchant Service Providers ([SBP P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023)):

| Acceptance Option | How It Works | Best For |
|---|---|---|
| Static QR | One fixed merchant QR code is displayed. The customer scans it, enters the amount and pays. | Physical shop counters with low transaction volume |
| Dynamic QR | A transaction-specific QR code is generated with the exact order amount and reference. | Online checkout, delivery parcels and itemized invoices |
| Request to Pay (RTP Now) | The merchant system triggers an immediate payment prompt to the customer's app. | Real-time e-commerce checkout and counter billing |
| Request to Pay (RTP Later) | The merchant sends a payment request with an expiry window for later payment. | B2B invoices, bookings and scheduled bill collection |
| Merchant Alias / Till Code | The business uses a readable alias or branch/counter till code for payment routing. | Multi-counter retail stores and branch operations |
| IBAN Push Payment | The customer initiates a transfer to the merchant's designated IBAN. | High-value B2B orders and planned invoice settlements |

Under the SBP framework, providers must communicate payment confirmation or rejection promptly to the merchant, provide a merchant interface to accept or reject customer refund/return requests, and credit merchant accounts in real time or according to the settlement timeline agreed with the merchant ([SBP P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023)).

## Why Raast Integrations Break Down in Operation

Integrations usually fail at the boundary between banking confirmation and internal order states:

1. **Missing order references:** Using a static QR code for online orders leaves no automated link between the incoming transfer and the shopping cart.
2. **Confusing initiation with confirmation:** Treating a customer screenshot or payment-request creation as proof of payment leads to uncollected orders.
3. **Assuming uniform provider APIs:** Assuming every bank or PSP offers the exact same webhook payload, dynamic QR generator or statement format causes rework during development.
4. **Incomplete refund governance:** Relying solely on a provider portal without an internal approval rule, order-status update and audit record creates accounting discrepancies.
5. **Unstructured transaction logs:** Failing to store provider transaction IDs, timestamps and status transitions makes daily reconciliation slow.

## Three Ways to Accept Raast Payments in Business Software

The right architecture depends on your daily order volume, sales channels and the technical interface your regulated provider supports.

### Option 1: Static QR with manual verification

The business displays a single printed QR code and staff check the provider's merchant app or statement before releasing the order.

- **Pros:** Zero software development required; immediate launch once onboarded.
- **Cons:** No automated order reference; slow checkout; high risk of human matching errors.
- **Best for:** Single-counter shops and low daily order volumes.

### Option 2: Provider hosted checkout or payment link

The business uses hosted payment pages, payment links or standard plugins supplied directly by its bank, EMI or PSP.

- **Pros:** Low engineering effort; the provider manages QR rendering and RTP prompts.
- **Cons:** Checkout UX and reporting fields are limited to the provider's standard template.
- **Best for:** Standard online stores and service businesses seeking a fast rollout.

### Option 3: Custom software integration with provider interfaces

Your order system, POS or ERP integrates directly with the APIs, callbacks and statement exports supported by your regulated provider.

- **Pros:** Automated order-to-payment matching, structured state tracking, unified refund logs and scheduled accounting reconciliation.
- **Cons:** Requires software engineering, sandbox/pilot testing and ongoing maintenance if the provider updates its interface.
- **Best for:** Multi-channel retailers, marketplaces, distribution networks and fintech platforms.

### Architecture comparison

| Feature | Static QR | Provider Checkout or Link | Custom Integration |
|---|---|---|---|
| Engineering effort | None | Low | Moderate to high |
| Order reference matching | Manual by staff | Managed via provider checkout | Automated in your order/ERP system |
| Refund workflow | Manual portal action | Provider dashboard tools | Linked to internal order and audit logs |
| Checkout UX control | Fixed printed QR | Provider template | Full control within provider rules |
| Best suited for | Small physical counters | Standard web stores | High-volume or multi-channel operations |

## Payment States, Confirmation Boundaries and Refund Controls

When designing a custom integration, your software should separate four distinct operational events:

1. **Customer-side payment initiation:** The customer scans a QR code or receives an RTP prompt. The order is not paid yet.
2. **Provider-side confirmation or rejection:** The regulated provider notifies your system (or dashboard) that the Raast transaction succeeded or failed.
3. **Merchant account credit / settlement timing:** Funds are credited in real time or according to the settlement schedule agreed with your provider ([SBP P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023)).
4. **Internal order fulfilment:** Your warehouse or service team releases the order only after verified provider confirmation.

Use a clear internal state machine for every order payment record:

```
created -> pending -> confirmed / rejected -> reconciled / refunded
```

### Handling refunds and returns safely

Under SBP's P2M circular, providers must enable merchants to accept or reject refund/return requests through the provider's merchant interface ([SBP P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023)). However, the provider may expose a refund or return request workflow while leaving internal governance to you. The business still needs its own approval rule, customer policy, audit record and link to the original order. Do not present provider tooling as a complete refund policy.

## Raast Payment Integration: Ten Implementation Steps

Work through these steps in sequence when connecting Raast P2M to your business software:

1. **Review the SBP P2M regulatory framework.** Understand the acceptance options (static/dynamic QR, RTP Now/Later, merchant alias/till code, IBAN) and the role of your regulated provider ([SBP P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023); [SBP 2024 clarification](https://www.sbp.org.pk/circulars/pspod-circular-letter-no-01-of-2024)).
2. **Document your merchant payment requirements.** List every sales channel, daily transaction volume, average ticket size, refund rules and accounting software.
3. **Evaluate regulated banks, EMIs, PSOs or PSPs.** Request written documentation of which Raast P2M acceptance options, APIs, webhooks, dashboards and settlement timelines each provider supports.
4. **Complete merchant onboarding and due diligence.** Submit the required corporate or business documentation to your chosen provider.
5. **Select acceptance options per channel.** Match dynamic QR or RTP Now to online checkouts, RTP Later to invoiced orders, and static QR or till aliases to physical counters.
6. **Define unique order references and data mapping.** Ensure every payment request or dynamic QR maps deterministically to an internal order ID.
7. **Enforce provider-confirmed state transitions.** Transition orders from `pending` to `confirmed` only upon verified provider confirmation, and store the provider's transaction reference and timestamp.
8. **Design internal refund and exception workflows.** Link provider refund/return decisions to inventory returns, credit notes and customer notifications.
9. **Execute a five-stage testing and pilot sequence:**
   - Test field mapping and validation with fixtures.
   - Use the provider's test or sandbox environment where available.
   - Confirm credentials, callbacks and response handling.
   - Run a controlled production pilot only after provider approval and internal reconciliation controls are ready.
   - Reconcile the pilot transactions and document the result.
10. **Automate daily accounting reconciliation.** Compare provider settlement statements against confirmed orders and flag exceptions for finance review.

## How One Order Moves Through an Illustrative Raast Workflow

This is an illustrative workflow showing a common software pattern for an online store. It is not a client case study, and exact API calls depend on your regulated provider:

1. **Order creation (`created`):** The customer places an order and your system generates a unique internal order reference.
2. **Payment request (`pending`):** Your backend requests a dynamic QR code or Request to Pay prompt from your provider's interface for that exact order amount and reference.
3. **Customer authorization:** The customer authorizes the payment inside their banking or wallet app.
4. **Provider notification (`confirmed` or `rejected`):** The provider validates the payment outcome and sends a confirmation or rejection to your system.
5. **Fulfilment trigger:** Upon `confirmed` status, your system records the provider transaction ID, updates the order to paid and releases it for fulfilment.
6. **Reconciliation (`reconciled`):** At day end, finance reconciles confirmed order records against the provider's settlement statement. If a return is approved later, the record transitions to `refunded` with a linked audit entry.

## Cost Factors and Historical Subsidy Context

Raast P2M integration costs fall into two categories: provider commercial terms and software engineering.

- **Provider fees and past subsidy:** SBP's 2023 circular permitted providers to charge merchants a reasonable fee while encouraging fee waivers initially ([SBP P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023)). SBP's 2025 circular described a time-limited subsidy for eligible Raast P2M QR transactions processed from 1 September 2025 through 30 June 2026, under which regulated entities were allocated subsidy funds and could charge up to 0.25% for onboarding and servicing merchants under that circular ([SBP Raast P2M QR subsidy circular](https://www.sbp.org.pk/circulars/pspod-circular-no-03-of-2025)). That period has ended; current fees and merchant charges must be confirmed with the provider in writing.
- **Software engineering and maintenance:** A static QR requires no software build. Connecting dynamic QR, RTP, callback verification and ERP reconciliation depends on the number of channels, your existing order system and the quality of your provider's documentation. Budget for testing, staff training and ongoing maintenance.

## How AbuQitmirLabs Approaches Merchant Payment Integration

AbuQitmirLabs is a software engineering studio, not a bank or regulated Raast Merchant Service Provider. When Pakistani businesses ask us to connect Raast P2M to their operations, we start by reviewing the technical capabilities their chosen bank, EMI or PSP provides.

Our engineering scope covers:

- Reviewing your current order lifecycle, provider documentation and reconciliation gaps
- Integrating with provider-supported APIs, dynamic QR generators, payment links or webhook callbacks
- Building order state machines (`created -> pending -> confirmed/rejected -> reconciled/refunded`) and exception queues
- Connecting confirmed transaction logs to your ERP, inventory and accounting workflows

Explore our [custom software development services](/custom-software), [fintech software solutions](/solutions/fintech), [e-commerce platforms](/solutions/e-commerce), [AI agent development](/ai-agent-development) and our [Pakistan market engineering page](/pakistan-market).

## Common Mistakes in Raast Integration

### Mistake 1: Using a static QR for online orders

Static QR payments do not embed an order reference, forcing staff to match transfers manually. *Fix:* Use dynamic QR or Request to Pay tied to a unique order ID where your provider supports it.

### Mistake 2: Trusting a screenshot as proof of payment

Customer screenshots can be delayed, duplicated or altered. *Fix:* Fulfil orders only after receiving verified confirmation from your regulated provider.

### Mistake 3: Treating provider refund tools as a complete refund policy

A button in a merchant portal does not update your inventory or accounting ledger. *Fix:* Pair the provider's refund interface with an internal approval rule, credit note and order link.

### Mistake 4: Skipping structured transaction records

Storing only an "order paid" boolean makes month-end reconciliation painful. *Fix:* Log the provider transaction ID, amount, timestamp, status history and order reference for every attempt, including failed and pending ones.

### Mistake 5: Assuming every provider exposes the same features

Banks, EMIs and PSPs differ in API maturity, callback speed and statement formats. *Fix:* Obtain written technical specifications from your provider before committing to a software architecture.

### Mistake 6: Testing directly in production without a staged test sequence

Running ad-hoc live transfers before validating field mappings and reconciliation controls creates messy ledger entries. *Fix:* Follow a structured sequence: fixture tests, provider sandbox testing, callback verification, a controlled pilot and pilot reconciliation.

## Frequently Asked Questions

### What is Raast P2M?
Raast P2M (Person-to-Merchant) is the State Bank of Pakistan's merchant payment service under Pakistan's national instant payment system ([SBP Raast overview](https://www.sbp.org.pk/raast); [SBP P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023)). It allows customers to pay businesses from banking or wallet apps using static or dynamic QR codes, Request to Pay Now or Later, merchant aliases or till codes, and IBAN push payments.

### Do businesses integrate directly with SBP Raast or with a provider?
Merchants are onboarded by a regulated Raast Merchant Service Provider - such as a bank, microfinance bank, EMI, PSO or PSP ([SBP P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023); [SBP 2024 clarification](https://www.sbp.org.pk/circulars/pspod-circular-letter-no-01-of-2024)). Your business software integrates with the merchant-facing tools, APIs or checkout links that your regulated provider supplies.

### Can Raast payments connect to an online store or ERP?
Yes, provided your bank, EMI or PSP exposes the required technical interfaces (such as dynamic QR generation, Request to Pay, webhooks or structured settlement statements). Always verify your provider's technical documentation before scoping a custom ERP or e-commerce integration.

### Is the SBP Raast QR subsidy still active?
No. SBP's 2025 circular established a time-limited subsidy for eligible Raast P2M QR transactions from 1 September 2025 through 30 June 2026 ([SBP Raast P2M QR subsidy circular](https://www.sbp.org.pk/circulars/pspod-circular-no-03-of-2025)). That period has ended. Ask your regulated provider for its current merchant fee schedule in writing.

### How do refunds work with Raast P2M?
SBP's P2M circular requires providers to let merchants accept or reject customer refund/return requests through the provider's merchant interface ([SBP P2M launch circular](https://www.sbp.org.pk/circulars/pspod-circular-no-04-of-2023)). Your business should pair that interface with an internal approval policy, audit record and link to the original order.

### What is the difference between Raast P2P and P2M?
Raast P2P transfers funds between individuals. Raast P2M is built for onboarded merchants and supports merchant QR codes, Request to Pay Now and Later, merchant aliases or till codes, provider payment confirmations and structured refund/return handling.

## Conclusion

Accepting a Raast transfer is straightforward; matching every confirmation, exception and refund to the right order and accounting entry is the real engineering work. Choose the acceptance option that fits each sales channel, rely strictly on provider confirmation rather than screenshots, and verify your regulated provider's technical capabilities before building.

This guide provides technical software planning information, not legal, regulatory or financial advice. Confirm merchant onboarding terms, fee schedules and supported interfaces directly with your bank or payment provider.

[Request a Raast integration assessment](/contact). Tell us your provider, sales channels, current order system and whether you need QR, RTP, payment confirmation or reconciliation.

### Related implementation guides

- [Fintech Software Development: Compliance-First Architecture](/blog/fintech-software-development-compliance-first-architecture) - how to design audit-ready transaction ledgers, access controls and compliance boundaries.
- [Custom Software for Fintech in 2026: Financial Technology Development Guide](/blog/custom-software-for-fintech-2026-financial-technology-development-guide) - architectural patterns for payment workflows, reconciliation and financial data integrity.
- [Custom Software Development Company in Karachi, Pakistan](/blog/custom-software-development-company-karachi-pakistan) - how our Karachi engineering studio scopes and delivers production business software.
- [Custom Retail & Logistics Software Development Guide](/blog/custom-retail-logistics-software-development-2026-enterprise) - connecting multi-branch POS, inventory, delivery and payment confirmation workflows.
- [ZATCA ERP Integration in Saudi Arabia: A Practical Guide](/blog/zatca-erp-integration-saudi-arabia) - a regional comparison of structured ERP transaction mapping, validation and reconciliation.
