---
{
  "title": "Raast Payment Integration for Pakistani Businesses Guide",
  "seoTitle": "Raast Payment Integration for Pakistani Businesses Guide",
  "slug": "raast-payment-integration-pakistan",
  "canonical": "https://www.abuqitmirlabs.tech/blog/raast-payment-integration-pakistan",
  "excerpt": "Raast P2M grew from 36M to 55M transactions in one quarter. But accepting payments is easy; matching them to orders is the hard part. Learn the 3 integration options and a 10-step plan to automate your payment flow.",
  "metaDescription": "Learn how Pakistani businesses can accept Raast payments. Explore merchant onboarding, QR payments, verification and software integration.",
  "category": "Development",
  "author": "Abu Qitmir Mohammad Shiraz Al-Madani",
  "publishedAt": "2026-11-20",
  "coverImage": "/images/blog-covers/raast-payment-integration-pakistan.webp",
  "coverImageAlt": "Raast payment integration for Pakistani businesses merchant guide",
  "tags": [
    "Raast payment integration for business",
    "Raast P2M integration",
    "Raast QR payment integration Pakistan",
    "Pakistan merchant payment system",
    "Raast API integration",
    "Business digital payment integration Pakistan",
    "SBP Raast",
    "AbuQitmirLabs"
  ]
}
---

## Raast Payment Integration for Pakistani Businesses: A Complete Merchant Guide

Raast P2M payments grew from 36.3 million to 55.9 million in a single quarter. Your customers are ready to pay this way. Is your order system ready to notice?

Raast payment integration for business means connecting Raast merchant payments to your orders, customer records and accounts. AbuQitmirLabs, a Karachi-based custom software agency founded in 2021, has delivered 410+ projects with 98% client retention. This guide explains how Raast P2M works, what your bank or provider handles, and what your software must do.

**Direct Answer:** Raast P2M (person-to-merchant) is the State Bank of Pakistan's service that lets customers pay businesses from their bank or wallet app. Payments use QR codes, Request to Pay, a merchant alias or an IBAN. A participating bank or provider onboards your business. Your software then matches each confirmed payment to an order.

## Quick Takeaways

- Raast P2M is a merchant payment service run under SBP rules. Your business is onboarded by a bank or provider, not by SBP directly.
- Five acceptance modes exist: static QR, dynamic QR, Request to Pay (now or later), merchant alias and IBAN.
- A static QR is simple but hard to match to orders. A dynamic QR can carry the amount for each customer.
- Use your provider's payment confirmation to mark orders as paid. Do not rely on a customer's screenshot.
- Plan refunds, transaction records and reconciliation before you go live.

## Why Pakistani Businesses Are Moving to Raast QR

**Direct Answer:** SBP launched Raast P2M with a circular dated 5 December 2023. It required banks, microfinance banks, electronic money institutions and payment providers to enable merchant payments. SBP's Q3 FY26 review shows Raast P2M transactions rose from 36.3 million to 55.9 million between the previous quarter and January to March 2026.

The growth has a clear cause. Customers already hold banking or wallet apps, and a QR code on the counter or on a parcel gives them an easy way to pay. A government subsidy for QR-based P2M transactions also ran from 1 September 2025 to 30 June 2026.

For many small businesses, the new problem is operational. If staff confirm payments by checking a banking app or asking customers for proof, the process is slow and hard to match with orders. Accounts teams then spend hours at month end working out which payment belongs to which sale.

Raast integration solves this by connecting payment confirmations to your order and accounting records.

## How Raast P2M Works for a Merchant

**Direct Answer:** A Raast P2M merchant is onboarded by a Raast Merchant Service Provider, which is a bank or other regulated provider. After due diligence, the provider gives the business a QR code and other ways to be paid. The customer pays from their own app, and the provider confirms the payment to the merchant.

SBP's circular lists the payment modes that providers must support. Here is how each one works in practice:

| Mode | How it works | Best for |
|---|---|---|
| Static QR | One QR code is printed and displayed. The customer scans it, enters the amount and pays. | A shop counter or a small stall |
| Dynamic QR | The QR code includes the amount and is generated for each customer. | Online orders, delivery and invoices |
| Request to Pay (now or later) | The merchant sends a payment request to the customer. | Invoices and repeat customers |
| Merchant alias | The business gets a readable alias, and can add separate till codes for each checkout. | Shops with several tills |
| IBAN push payment | The customer sends money to the merchant's IBAN. | Larger or planned payments |

The SBP circular also sets duties for providers. They must give merchants payment confirmation or rejection quickly after Raast advises them. They must let merchants accept or reject refund requests through the provider's merchant interface. Funds must reach merchant accounts in real time or on the timelines agreed with the merchant.

## Why Raast Integration Breaks Down

**Direct Answer:** Raast integrations break down when a business uses a static QR for online orders, relies on screenshots instead of provider confirmation, or ignores refunds and reconciliation. In the SBP framework your provider onboards you, so your software can only connect to the features that provider offers. Check those features before you build.

Five root causes appear often:

1. **No order reference.** A static QR carries no order number, so staff must match payments by hand.
2. **Manual confirmation.** Staff check an app or a screenshot, and orders wait for a person to act.
3. **Provider differences.** Banks and providers offer different dashboards, statements and technical options.
4. **Refund gaps.** The SBP framework lets customers request returns, but the business needs a process to review them.
5. **Weak records.** Without transaction IDs, timestamps and order links, reconciliation takes far longer than it should.

A common misconception is that Raast works like a card gateway. In P2M, the merchant is onboarded by a provider and paid through Raast, with no card terminal involved. Another misconception is that one standard integration fits every business. It does not, so ask your provider what technical options it supports.

## Three Ways to Accept Raast Payments in Your Business Software

**Direct Answer:** Businesses commonly accept Raast in three ways. They can show a static QR and match payments by hand, use a payment link or checkout from their provider, or build a custom integration with the provider's merchant interface. The right choice depends on order volume, how many sales channels you run and what your provider supports.

### Option 1: Static QR with manual matching

**Direct Answer:** A static QR setup means the business displays one fixed QR code and checks incoming payments manually in its provider's app or statement. It needs no software work and starts quickly. It becomes hard to manage as order volume grows, because payments carry no order reference.

- **Pros:** Quick to start and simple to explain to customers.
- **Cons:** Manual matching, slow confirmation and a higher chance of mistakes.
- **Best for:** Small counters and low daily volume.

### Option 2: Provider checkout or payment link

**Direct Answer:** A provider checkout or payment link uses tools supplied by your bank or payment provider. The provider creates the payment request, takes the payment and reports the result. This option reduces build effort. It also limits you to the features and reports the provider chooses to offer.

- **Pros:** Less engineering. The provider handles the payment screen.
- **Cons:** Limited control over the customer journey and reporting.
- **Best for:** Online stores and service businesses that want a quick start.

### Option 3: Custom integration

**Direct Answer:** A custom Raast integration connects your order system, ERP or app to the merchant interface your provider offers. It can create a payment request or dynamic QR for each order, read confirmations, update order status and store transaction records. It gives the most control, but it depends on what your provider supports.

- **Pros:** Automatic order matching, clean records and one workflow for all channels.
- **Cons:** Needs engineering time, provider cooperation and ongoing maintenance.
- **Best for:** Marketplaces, multi-branch retailers and fintech products.

### Comparison table

| Feature | Static QR | Provider checkout or link | Custom integration | AbuQitmirLabs approach |
|---|---|---|---|---|
| Setup effort | Lowest | Low | Highest | Starts with a payment-flow review |
| Order matching | Manual | Provider reports | Automatic | Matches the option to your order volume |
| Refund handling | Manual | Provider tools | Built into your workflow | Refund and exception rules defined up front |
| Control over experience | None | Limited | Full | Builds only what your provider supports |
| Best for | Small counters | Quick online start | Growing or multi-channel businesses | Recommends one option after review |

## How AbuQitmirLabs Approaches Raast Integration

**Direct Answer:** AbuQitmirLabs starts with a review of your payment flow, order system and accounting process. We help you choose between manual QR, a provider checkout and a custom integration. For custom builds, we design order matching, refund handling, transaction records and reconciliation around what your bank or provider supports.

Our offer covers custom payment integration and merchant software. This article describes our method. It does not describe a client result.

A payment-flow review looks at:

- How customers pay today and where staff confirm payments by hand
- Which provider you use or plan to use, and which technical options it offers
- How orders, invoices and accounting records connect
- How refunds and failed or pending payments are handled
- Who reconciles payments, and how often

Our [custom software development services](/custom-software) cover order systems, ERP and payment workflows. Our [fintech solutions](/solutions/fintech) and [e-commerce solutions](/solutions/e-commerce) cover merchant platforms and online stores. See our [Pakistan market page](/pakistan-market) for the work we do for Pakistani businesses.

## Raast Payment Integration: Ten Implementation Steps

**Direct Answer:** Raast payment integration follows ten steps: learn how P2M works, list your payment needs, choose a participating bank or provider, complete onboarding, pick acceptance modes, configure payment flows, link confirmations to orders, store transaction records, handle refunds and reconcile with accounting. Work through them in order and test each flow with small payments.

1. **Understand Raast P2M.** Learn the five acceptance modes and the roles of the customer, the provider and Raast. Read the SBP circular of 5 December 2023.
2. **Identify merchant payment requirements.** List your sales channels, average order values, refund volume and reporting needs.
3. **Contact a participating bank or payment provider.** Ask which Raast modes they support, what technical options they offer and what documents they need.
4. **Complete merchant onboarding.** Submit the required business documents. The provider carries out due diligence before it activates your account.
5. **Select an acceptance method.** Choose static QR, dynamic QR, Request to Pay, merchant alias or a mix, based on your channels.
6. **Configure supported QR or payment request flows.** Set up the flows your provider offers. Test each one with small payments before launch.
7. **Connect payment confirmation to business orders.** Mark an order as paid only after the provider confirms the payment. Store the provider's transaction reference with the order.
8. **Implement transaction records.** Save the amount, time, reference, status and order link for every payment, including failed and pending ones.
9. **Handle refunds and exceptions.** Create a clear process for refund requests, duplicate payments and mismatched amounts.
10. **Reconcile payments with accounting.** Compare provider statements with order and accounting records on a fixed schedule.

## How One Order Moves Through a Raast Workflow

**Direct Answer:** In a typical Raast order workflow, the system creates an order reference, requests a payment or dynamic QR from the provider, waits for the customer to pay, receives the provider's confirmation, marks the order as paid and stores the transaction reference. Finance then reconciles the provider statement against paid orders.

This is an illustrative workflow, not a client case. It shows a common design pattern for an online store. Available features depend on your provider.

1. The customer places an order and the system creates a unique order reference.
2. The system asks the provider for a payment request or dynamic QR linked to that order.
3. The customer pays from their own banking or wallet app.
4. The provider confirms the payment, and the system receives the confirmation.
5. The system marks the order as paid and stores the transaction reference.
6. If the customer asks for a refund, staff review the request in the provider's merchant interface.
7. At the end of the day, finance compares the provider statement with paid orders.

## Cost Factors for Raast Integration

**Direct Answer:** Raast integration cost has two parts: provider fees and software work. SBP's circular lets providers charge merchants a reasonable fee and encourages them to waive it at first. A subsidy for QR transactions ran until 30 June 2026. Ask your provider for its current fee schedule in writing.

Software cost depends on how many sales channels you run, which Raast modes you use, how your order system works and how much reporting you need. A static QR needs almost no software. A custom integration needs design, development, testing and maintenance.

Plan for hidden costs such as staff training, refund handling time, reconciliation effort and updates when your provider changes its tools.

## Common Mistakes in Raast Integration

**Direct Answer:** The most common Raast integration mistakes are using a static QR for online orders, trusting screenshots, ignoring refunds, skipping transaction records, assuming every provider offers the same features and never reconciling. Each one causes delays or lost payments, and each has a simple fix, listed below.

### Mistake 1: Using a static QR for online orders

The payment carries no order reference. *How to avoid it:* Use a dynamic QR or payment request tied to each order.

### Mistake 2: Trusting a screenshot as proof of payment

A screenshot is not a provider confirmation. *How to avoid it:* Mark orders paid only after your provider confirms the payment.

### Mistake 3: Ignoring refunds

Customers can request returns, and the business must respond. *How to avoid it:* Write a refund process and train staff to use the provider's merchant interface.

### Mistake 4: Skipping transaction records

Without references and timestamps, reconciliation is slow. *How to avoid it:* Store every payment, including failed and pending ones, with its order link.

### Mistake 5: Assuming every provider offers the same features

Providers differ in dashboards, statements and technical options. *How to avoid it:* Ask for a written list of supported features before you design the integration.

### Mistake 6: Never reconciling

Small gaps grow into large ones. *How to avoid it:* Compare provider statements with your records on a fixed schedule.

## Raast Merchant Integration Readiness Checklist

Copy this list into a PDF or spreadsheet for your team.

- List every sales channel (shop, online store, delivery, marketplace)
- Choose a bank or provider and request its list of supported Raast modes
- Prepare the business documents your provider needs for onboarding
- Decide which modes you will use (static QR, dynamic QR, Request to Pay, alias, IBAN)
- Define how each order gets a unique reference
- Define when an order counts as paid (provider confirmation only)
- Write a refund and exception process
- Define the transaction fields you will store
- Test small live payments for every flow
- Set a reconciliation schedule and owner
- Train staff on confirmation, refunds and failed payments


For teams scaling production architecture, explore our [AI agent development](/ai-agent-development) with AbuQitmirLabs.

## Frequently Asked Questions

### What is Raast P2M?
Raast P2M means Raast person-to-merchant. It is the State Bank of Pakistan's merchant payment service. Customers pay businesses from their bank or wallet app using static or dynamic QR codes, Request to Pay, a merchant alias or an IBAN. A participating bank or provider onboards the business and confirms payments.

### How does Raast P2M work for merchants?
A bank or provider onboards your business after due diligence and gives you a QR code and other payment options. The customer pays from their own app. The provider confirms the payment to you and credits your account in real time or on the timeline you agreed with the provider.

### Can Raast payments connect to an online store or ERP?
Often yes, but it depends on your provider. Your software connects to the merchant interface and technical options that your bank or provider supplies. Ask which features they support, such as dynamic QR, payment requests, confirmations and statements, before you plan a custom integration.

### Does Raast cost merchants anything?
SBP's circular lets providers charge merchants a reasonable fee and encourages them to waive it at first. A government subsidy for QR-based transactions ran from 1 September 2025 to 30 June 2026. Fees and terms differ by provider, so ask for your current fee schedule in writing.

### How do refunds work with Raast P2M?
Under SBP's framework, customers can request a refund or return through their app. Providers must let merchants accept or reject these requests through the provider's merchant interface. Your business needs a clear process, a record of each decision and a way to match refunds to the original orders.

### What is the difference between Raast P2P and P2M?
P2P moves money between individuals. P2M moves money from a customer to a business that has been onboarded as a merchant. P2M adds merchant tools such as QR codes, payment requests, confirmations and refund handling. Businesses that collect customer payments should ask their provider about merchant onboarding for P2M.

### Who needs Raast payment integration?
Any business that wants to accept digital payments and match them to orders needs a plan for Raast. This includes retailers, online stores, marketplaces, service companies and fintech products. A small counter can start with a static QR. Growing businesses should connect payments to their order and accounting systems.

### How long does a Raast integration take?
The timeline depends on provider onboarding, the Raast modes you choose and how your order system works. A static QR can start once the provider activates your account. A custom integration needs design, development and testing. Ask your provider for onboarding timelines before you set a launch date.

## Conclusion

Many Pakistani businesses can accept Raast payments, yet still confirm them by hand and reconcile them late. The best approach is to choose the right acceptance mode, rely on provider confirmation and connect payments to orders and accounting.

This guide is best for Pakistani SMEs, online stores, retailers, marketplaces and fintech teams. It is general information, not legal or financial advice. Confirm onboarding terms, fees and technical options with your bank or payment provider.

If you want to connect Raast payments to your orders and accounts, our team at AbuQitmirLabs is ready to help. [Request a Raast Integration Consultation](/contact) and we will review your payment flow.

If you also sell in Saudi Arabia or the UAE, see our [Saudi Arabia market page](/saudi-arabia-market) and [UAE market page](/uae-market). You can also read more guides on the [AbuQitmirLabs blog](/blog). Our [Pakistan market page](/pakistan-market) lists our services for Pakistani businesses.

### Related implementation guides

- [ZATCA ERP integration in Saudi Arabia: A practical guide](/blog/zatca-erp-integration-saudi-arabia) - a step-by-step workflow for connecting ERP and invoicing systems in Saudi Arabia.
- [Custom software development in Qatar](/blog/custom-software-development-qatar) - a practical guide to scoping and building custom business software in the GCC.
- [Digital transformation in Kuwait](/blog/kuwait-digital-transformation) - a regional comparison guide for teams modernizing operations across Gulf markets.
- [Pakistan offshore development for GCC companies](/blog/pakistan-offshore-development-gcc) - how engineering teams in Pakistan deliver production software and payment integrations.

