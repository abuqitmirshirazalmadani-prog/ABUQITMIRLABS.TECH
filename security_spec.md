# Security Specifications & Threat Vector Analysis (TDD Spec)

This document outlines the core security invariants, threat models, and "Dirty Dozen" malicious payload tests designed to protect the AbuQitmirLabs database architecture.

---

## 1. Data Invariants

### BlogPost Invariant
- Only authenticated and authorized administrators (`abuqitmirshirazalmadani@gmail.com` or UID `cRAf1wZFRRXMVadj7RDaC8WM4152`) can create, update, or delete blog posts.
- Every post MUST possess an immutable `authorId` that matches the creator's verified UID.
- All timestamps (`createdAt`, `updatedAt`) must be backed by true server times (`request.time`), blocking client-sent overrides.
- Size limiters on `title`, `content`, and `excerpt` prevent "Denial of Wallet" storage abuse.

### Inquiry Invariant
- Any visitor (authenticated or anonymous) can submit a contact inquiry to establish connectivity.
- To prevent spam and resource poisoning, string sizes are capped (e.g. name <= 100, email <= 150, message <= 3000).
- The workflow `status` field defaults to `pending` upon creation.
- Once created, a standard user can NEVER modify or delete their submission. Only authorized administrators can read lists, update status to `contacted` or `closed`, or clean records.

### ContractRequest Invariant
- Any visitor can record their contract template download to maintain a reliable lead pipeline.
- Immutable fields: `name`, `email`, `phone` cannot be edited after creation.
- Standard clients are strictly restricted to create-only operations; reads and updates are reserved for admins.

### Faq Invariant
- Public read access is granted to visitors for client-side rendering.
- Write access (create, update, delete) is restricted exclusively to administrators.
- Fields must be typed and order values limited to prevent injection vectors.

---

## 2. The "Dirty Dozen" Threat Payloads

The following 12 payloads represent malicious attempts to bypass identity, integrity, state, or cost constraints. Our security rules mathematically reject every scenario.

### T1: Identity Spoofing (Blog Post)
- **Intent**: A rogue user tries to create a blog post under the administrator's `authorId`.
- **Payload**:
  ```json
  {
    "title": "Malicious Post",
    "content": "Junk...",
    "slug": "malicious-post",
    "authorId": "cRAf1wZFRRXMVadj7RDaC8WM4152", // Admin UID
    "published": true
  }
  ```
- **Result**: `PERMISSION_DENIED` (UID mismatch check `data.authorId == request.auth.uid`).

### T2: State Shortcutting (Inquiry Escalation)
- **Intent**: A visitor submits an inquiry already marked as `closed` or `contacted` to bypass admin workflow logic.
- **Payload**:
  ```json
  {
    "name": "Attacker",
    "email": "attacker@gmail.com",
    "message": "Hello...",
    "status": "closed" // Skipping the pending state
  }
  ```
- **Result**: `PERMISSION_DENIED` (Validation helper requires `incoming().status == 'pending'` on creation).

### T3: Resource Poisoning / Inflation Attack
- **Intent**: A bot tries to upload a massive 50MB string into the contact `message` field to inflate Firestore database usage and trigger "Denial of Wallet".
- **Payload**:
  ```json
  {
    "name": "Bot",
    "email": "bot@spam.com",
    "message": "[50 MegaBytes of repeating junk text...]",
    "status": "pending"
  }
  ```
- **Result**: `PERMISSION_DENIED` (Size validation check `data.message.size() <= 3000`).

### T4: Ghost Field Injection (Shadow Update)
- **Intent**: An authenticated administrator updates a post, but an attacker intercepts or injects a ghost field `isSuperAdmin: true` to gain unauthorized rights or break layout schemas.
- **Payload**:
  ```json
  {
    "title": "Updated Title",
    "content": "Normal text...",
    "isSuperAdmin": true // Unregistered shadow field
  }
  ```
- **Result**: `PERMISSION_DENIED` (Enforced key size matching and `affectedKeys().hasOnly()` during updates).

### T5: Client Timestamp Spoofing
- **Intent**: A user tries to create a record with a fake historic timestamp (e.g., 5 years in the past).
- **Payload**:
  ```json
  {
    "title": "Fake Past Article",
    "content": "Text...",
    "createdAt": "2021-01-01T00:00:00Z"
  }
  ```
- **Result**: `PERMISSION_DENIED` (Enforced timestamp match: `incoming().createdAt == request.time`).

### T6: Unauthorized Read Scraping (PII Leak)
- **Intent**: An authenticated non-admin attempts to retrieve or search all client email addresses and names in the `inquiries` database.
- **Payload**:
  - Direct query: `db.collection('inquiries').get()`
- **Result**: `PERMISSION_DENIED` (Only authorized admins are allowed `list` or `get` operations on `inquiries`).

### T7: Blind Update of System Fields (Immutability Violation)
- **Intent**: A rogue user updates a submitted `ContractRequest` to alter the registered `email` or `phone`.
- **Payload**:
  ```json
  {
    "email": "hijacked@newmail.com"
  }
  ```
- **Result**: `PERMISSION_DENIED` (Clients have zero update privileges on `contractRequests`).

### T8: Malicious Path Poisoning
- **Intent**: An attacker targets the single-document operations with custom hex, Unicode, or path-escape document IDs (e.g. `../../admins/hacker`).
- **Payload**:
  - Operation: `setDoc(doc(db, 'inquiries', '../poison-id'))`
- **Result**: `PERMISSION_DENIED` (Document path variables verified using `isValidId()`).

### T9: Self-Assigned Role Privilege Escalation
- **Intent**: A newly logged-in user attempts to write a document inside the private `/admins/` collection to declare themselves an administrator.
- **Payload**:
  - Path: `/admins/{hackerUid}`
  - Content: `{ "role": "admin" }`
- **Result**: `PERMISSION_DENIED` (Catch-all global safety deny and explicit admin-only creation limits).

### T10: Malicious FAQ Injection
- **Intent**: A malicious user tries to rewrite the homepage FAQs to display phishing links.
- **Payload**:
  ```json
  {
    "question": "Where do I enter credit cards?",
    "answer": "Go to phish-link.com...",
    "market": "global",
    "order": 1
  }
  ```
- **Result**: `PERMISSION_DENIED` (Only verified administrators can write to `faqs`).

### T11: Illegal Enumeration / Value Poisoning
- **Intent**: A user updates a blog post category to an unsupported enum value like `Hacking` or `Gamer`.
- **Payload**:
  ```json
  {
    "category": "Hacking"
  }
  ```
- **Result**: `PERMISSION_DENIED` (Validation helper strictly limits values to enum array).

### T12: Orphaned Record Creation
- **Intent**: A client creates an entity reference that bypasses database structural boundaries.
- **Payload**:
  - Request to create a sub-resource reference where the parent resource does not exist.
- **Result**: `PERMISSION_DENIED` (Relational exists/get checks verify structural parent existence before permitting creation).

---

## 3. Threat Mitigation Matrix

| Collection | Threat Vector | Prevention Rule / Gate |
| :--- | :--- | :--- |
| `posts` | Admin Impersonation / Fake Articles | Auth verification and email check + strict `isValidPost()` validator. |
| `inquiries` | PII Scraping & Spam Attacks | `list`/`get` restricted to Admins. Size restrictions on messages. Immutable properties. |
| `contractRequests`| Lead Siphoning | Non-admins possess zero read privileges. Write-only limits. |
| `faqs` | Site Defacement / Phishing | Read-only for public, writes restricted to verified admin auth credentials. |
