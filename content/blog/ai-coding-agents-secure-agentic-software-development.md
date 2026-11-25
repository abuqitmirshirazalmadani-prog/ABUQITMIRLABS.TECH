---
{
  "slug": "ai-coding-agents-secure-agentic-software-development",
  "title": "How to Secure AI Coding Agents: Agentic Software Development",
  "seoTitle": "How to Secure AI Coding Agents | AbuQitmirLabs",
  "metaDescription": "Learn how to secure AI coding agents with sandboxing, least privilege, secret scanning, policy gates, and human approval before production deployment.",
  "excerpt": "Your AI coding agent just opened a pull request. It passed every test. Should it go to production? Veracode's 2025 GenAI Code Security Report found that 45% of AI-generated code samples failed security tests, and GitGuardian's 2026 report found Claude Code co-authored commits leaked secrets at roughly twice the baseline rate. Learn the guarded agentic workflow before production deployment.",
  "category": "AI",
  "author": "Abu Qitmir Mohammad Shiraz Al-Madani",
  "publishedAt": "2026-11-25",
  "updatedAt": "2026-11-25",
  "published": true,
  "coverImage": "/images/blog-covers/ai-coding-agents-secure-agentic-software-development.webp",
  "coverImageAlt": "AI coding agent pull request passing tests but flagged by a security scanner, illustrating the gap between code that runs and code that is safe.",
  "tags": [
    "AI coding agents",
    "secure agentic software development",
    "AI code security",
    "AI coding agent risks",
    "Veracode GenAI security report",
    "GitGuardian secrets sprawl",
    "AI-generated code vulnerability",
    "agentic workflow security",
    "least privilege AI agents",
    "secret scanning AI commits",
    "AI coding agent governance",
    "AbuQitmirLabs"
  ],
  "syncedAt": "2026-11-25T12:15:00.000Z"
}
---

## Why 45% of AI-Generated Code Still Fails Security Tests, and How to Fix It

### Who This Guide Is For

This guide is for founders, CTOs, and engineering teams in Pakistan, the US, and the Gulf who are already using an AI coding agent, or are about to let one touch a real repository, cloud account, or production system.

---

### Quick Takeaways

- [Veracode's 2025 GenAI Code Security Report](https://www.veracode.com/blog/genai-code-security-report/) found that 45% of AI-generated code samples failed security tests and introduced [OWASP Top 10](https://owasp.org/www-project-top-ten/) vulnerabilities. The report also found that security performance remained broadly flat across newer and larger models.
- Language and vulnerability exposure vary sharply: Veracode reported a 43% failure rate for JavaScript and an 86% failure rate on cross-site scripting (XSS) relevant samples.
- The [Verizon 2026 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir/) found that software vulnerabilities are now the top breach entry point at 31%, ahead of stolen credentials.
- [GitGuardian's 2026 State of Secrets Sprawl report](https://www.gitguardian.com/state-of-secrets-sprawl-report-2026) found that Claude Code co-authored commits leaked secrets at approximately twice the baseline rate. It also reported an 81% year-over-year increase in exposed AI-service secrets.
- The fix is not to stop using agents. It is a guarded workflow aligned with the [NIST Secure Software Development Framework](https://csrc.nist.gov/Projects/ssdf): scoped tasks, isolated execution, automated scans, policy gates, and a human sign-off before production.
- This guide does not invent cost figures. Pricing depends on scope, tools, and risk, so ask any vendor, including us, for an itemised quote.

---

Your AI coding agent just opened a pull request. It passed every test. Should it go to production?

Most teams answer that question with a gut feeling, not a process. That gap is where AI coding agents actually get a business into trouble: not because the code does not run, but because nobody checked whether it is safe. This guide explains what AI coding agents are, what independent research says about their real security record, and a practical, step-by-step workflow for using them without taking on risk you cannot see.

**Direct Answer:** AI coding agents can plan, write, test, and submit code changes with little human input, but independent testing shows their output is not reliably secure. [Veracode's 2025 GenAI Code Security Report](https://www.veracode.com/blog/genai-code-security-report/) found that 45% of AI-generated code samples failed security tests and introduced [OWASP Top 10](https://owasp.org/www-project-top-ten/) vulnerabilities. Secure agentic software development solves this by combining agent speed with scoped tasks, automated scanning, and mandatory human review before anything reaches production.

AbuQitmirLabs works with founders and engineering teams across Pakistan, the US, and the Gulf who are adopting AI coding agents and need a workflow that an auditor, a client, or a new CTO can actually trust.

*Method note: the statistics in this guide come from the named studies and reports listed in the sources section, verified on 25 November 2026. We have not run our own industry survey, and every third-party figure below links to its primary source.*

---

## Key Definitions: AI Coding Agent, Agentic Workflow, Least Privilege, Secrets Sprawl

**Direct Answer:** An AI coding agent is software that plans and executes multi-step development work rather than suggesting a single line of code. An agentic workflow is the surrounding process of tools, checks, and approvals that controls what the agent can do. Least privilege means giving the agent only the access it needs for one task. Secrets sprawl is the uncontrolled spread of passwords, API keys, and tokens across a codebase. Each definition below stands on its own.

- **AI coding agent:** An AI coding agent is a system that can read a repository, plan a task, edit files, run commands and tests, and prepare a pull request across multiple steps, instead of only completing one line or block of code.
- **Agentic workflow:** An agentic workflow is the combination of sandboxing, permissions, automated checks, and human approval points that governs what an AI coding agent is allowed to do and when.
- **Least privilege:** Least privilege is the practice of giving a user, service, or agent the smallest set of permissions needed to complete its current task, and nothing more.
- **Secrets sprawl:** Secrets sprawl is the spread of hardcoded passwords, API keys, tokens, and other credentials across source code, configuration files, and chat tools, often faster than a team can find and rotate them.

---

## The Problem: Speed Without a Safety Check

**Direct Answer:** Teams adopt AI coding agents for speed, but speed without a safety check creates risk that is easy to miss because the code looks finished. [Veracode's 2025 GenAI Code Security Report](https://www.veracode.com/blog/genai-code-security-report/) found that 45% of AI-generated code samples failed security tests, and the [Verizon 2026 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir/) found software vulnerabilities are now the leading breach entry point at 31%.

Three patterns show up again and again in teams that adopt agents without a workflow change:

- **Confidence without verification.** Code that compiles and passes a quick test looks done, even when it has not been checked for security flaws like those tracked in the [OWASP Top 10](https://owasp.org/www-project-top-ten/).
- **Shallow review.** Reviewers scan AI-written code for correctness and skim past security, because a confident-looking pull request invites less scrutiny.
- **Credentials in the open.** [GitGuardian's 2026 State of Secrets Sprawl report](https://www.gitguardian.com/state-of-secrets-sprawl-report-2026) found that Claude Code co-authored commits leaked secrets at approximately twice the baseline rate, often because a hardcoded key in a generated configuration file looks unremarkable next to everything else.

None of this means the agent is useless. It means the review process built for human-written code was not designed for the volume and pace of agent-written code.

---

## Why This Problem Happens

**Direct Answer:** The problem happens because training data, incentives, and workflows have not caught up with how fast agents now produce code. Models are trained on code written before many current attack patterns existed, teams measure agents on speed and test-passing rather than security, and most review processes assume a human wrote every line.

**Root cause 1: Training data lags behind current threats.** Models learn patterns from code written in the past, including patterns that were already insecure, and style over substance can get learned along with the syntax.

**Root cause 2: Syntax is solved, security is not.** [Veracode's 2025 GenAI Code Security Report](https://www.veracode.com/blog/genai-code-security-report/) highlights this directly: AI models reliably produce code that runs, yet 45% of generated samples still failed security tests, with security performance remaining broadly flat across newer and larger models.

**Root cause 3: Access was built for people, not agents.** Repository and cloud permissions were designed around human accounts. An agent that inherits those same broad permissions can read or change far more than one task requires.

**Root cause 4: Governance lives only in the prompt.** Telling an agent "follow our security rules" in a prompt is not a control. A prompt can be ignored, misread, or influenced by untrusted content the agent encounters while working.

---

## What the Research Data Actually Shows

**Direct Answer:** Three independent industry reports describe the same pattern from different angles: AI-generated code frequently fails security tests regardless of model size, software vulnerabilities lead real-world breach entry points, and secrets leak at higher rates in measured agent-assisted workflows.

| Source | What it measured | The finding | Read it with this in mind |
|---|---|---|---|
| [Veracode GenAI Code Security Report (2025)](https://www.veracode.com/blog/genai-code-security-report/) | Security pass/fail rate of AI-generated code samples | 45% of samples failed security tests and introduced [OWASP Top 10](https://owasp.org/www-project-top-ten/) vulnerabilities (43% in JavaScript; 86% on XSS-relevant samples) | Security performance stayed broadly flat across newer and larger models |
| [Verizon 2026 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir/) | Breach entry points across reported incidents | Software vulnerabilities are the top entry point at 31%, ahead of stolen credentials | Industry-wide figure, not limited to AI-written code alone |
| [GitGuardian State of Secrets Sprawl 2026](https://www.gitguardian.com/state-of-secrets-sprawl-report-2026) | Secrets exposed in public GitHub commits | Claude Code co-authored commits leaked secrets at approximately 2x the baseline rate; exposed AI-service secrets rose 81% year over year | Specific to the cohort and public commits measured in the report |

A separate research project has tracked publicly reported vulnerabilities associated with AI coding tools, but the methodology and attribution criteria should be reviewed before treating the number as a complete industry total.

Read the table as a directional pattern, not a reason to panic. Each report measured a specific surface, and together they show that agents accelerate output, so verification and access controls must be automated around that output.

---

## Three Ways to Manage AI Coding Agent Risk

**Direct Answer:** Most teams choose between three approaches: no formal controls, controls bolted on after an incident, or a guarded workflow designed in from the start. Only the third approach is built to catch problems before they reach production, aligning with secure engineering practices such as the [NIST Secure Software Development Framework](https://csrc.nist.gov/Projects/ssdf).

### Option 1: No Formal Controls

**Direct Answer:** Some teams let the agent work directly against the main branch with normal developer access and rely on existing code review to catch problems. It is the fastest way to start, and the easiest way to end up with an unreviewed vulnerability or a leaked key in production.

**Pros:** fastest to start, no new tooling needed. **Cons:** relies entirely on human reviewers to catch AI-specific risks they were not trained to look for. **Best for:** small, low-risk personal or internal projects with no sensitive data.

### Option 2: Controls Added After an Incident

**Direct Answer:** Many teams add scanning, permission limits, or approval steps only after a near-miss or an actual leak. This fixes the specific gap that was exposed, but it is reactive, and it usually leaves other gaps in place until they also cause a problem.

**Pros:** targeted fix for a known gap, can be implemented quickly. **Cons:** reactive by nature, and other untested gaps remain open. **Best for:** teams in the middle of a migration who need an immediate, narrow fix.

### Option 3: A Guarded Workflow Designed In From the Start

**Direct Answer:** A guarded workflow scopes every agent task narrowly, runs it in an isolated environment with least-privilege access, scans for secrets and vulnerabilities automatically, enforces policy checks on sensitive actions, and requires human approval before anything reaches production. It takes more setup time, but it is the only option built to catch problems before release rather than after.

**Pros:** catches issues before production, auditable, scales safely as agent use grows. **Cons:** needs upfront design and ongoing maintenance. **Best for:** any team giving an agent access to a shared repository, cloud credentials, or customer-facing systems.

### Comparison Table

| Factor | No Formal Controls | Controls After an Incident | AbuQitmirLabs Guarded Workflow |
|---|---|---|---|
| When risk is caught | After release, if at all | After the first incident | Before merge and before production |
| Setup effort | None | Low, but repeated | Moderate, one time |
| Secret leak protection | None | Partial | Automated scanning on every commit |
| Audit trail | Weak or none | Inconsistent | Logged tool calls and approvals |
| Best for | Low-risk personal projects | Mid-migration quick fixes | Shared repos, cloud access, production systems |

---

## The AbuQitmirLabs Recommended Approach

**Direct Answer:** AbuQitmirLabs recommends a guarded agentic workflow built around five layers: scoped tasks, isolated execution, automated verification, policy enforcement, and human approval for anything sensitive. We design this into the repository and pipeline before the agent is given access, not after.

At AbuQitmirLabs, we start every AI coding agent engagement by mapping which repositories, credentials, and systems the agent will touch, then designing access around the smallest footprint that still lets it do useful work.

The approach has three phases:

1. **Scope and isolate.** Define narrow, written task boundaries, run the agent in a sandbox on a temporary branch, and issue short-lived, limited credentials instead of standing access.
2. **Verify automatically.** Run the existing test suite plus security-focused tests, dependency checks, [OWASP Top 10](https://owasp.org/www-project-top-ten/) SAST rules, and secret scanning on every change before it is eligible for review.
3. **Govern and approve.** Align release gates with the [NIST Secure Software Development Framework](https://csrc.nist.gov/Projects/ssdf), check proposed actions against policy rules outside the agent's own prompt, and require a named human to approve anything touching production, billing, authentication, or customer data.

### Sample Agent Permission Matrix

Before enabling any coding agent on a repository, write down explicit boundaries that the repository host and CI runner enforce outside the prompt:

| Action | Default | Approval |
|---|---|---|
| Read source files | Allowed | None |
| Edit feature branch | Allowed | Automated checks |
| Read production secrets | Denied | Not permitted for agents |
| Change authentication code | Restricted | Security/senior engineer approval |
| Deploy to production | Denied | Human release approval |
| Modify branch protection | Denied | Admin-only |

For teams building or hardening an agentic workflow, see our [AI agent development services](/ai-agent-development). For broader platform work alongside it, see our [custom software development services](/custom-software). If you want a starting benchmark for how ready your systems and data are for AI agents, try our [free AI Readiness Score tool](/tools/ai-readiness-score).

---

## Cost: What Actually Drives It

**Direct Answer:** The cost of securing an AI coding agent workflow depends on the number of tools and systems it touches, the sensitivity of the data involved, and how much existing testing and access control the team already has. This guide does not publish fixed prices, because a rough number without your scope would not be honest. Ask for an itemised quote that separates each part below.

- **Scoping and access design:** mapping repositories, credentials, and the permissions the agent actually needs.
- **Tooling:** secret scanning, dependency checks, and security-focused test additions.
- **Policy and approval layer:** the independent check that runs before sensitive actions execute.
- **Observability:** logging, monitoring, and audit trails for what the agent did and who approved it.
- **Ongoing review:** periodic access reviews and policy updates as the agent takes on new kinds of tasks.

Teams with strong existing tests and clear code ownership typically need less setup work than teams starting from an undocumented codebase. [Request a scoped quote](/contact) and we will tell you plainly where your cost will actually go.

---

## Illustrative Composite Example: A Repository Audit Before Production Access

The following is an illustrative composite scenario based on recurring implementation patterns. It is not a named client case study and should not be read as an independently verified project result.

**Scenario:** A growing software team lets an AI coding agent push directly to a shared development branch with broad repository access to save review time during a product sprint.

**Intervention:** During a pre-production repository audit, the engineering lead restricts the agent to an isolated temporary branch with short-lived, task-scoped tokens, enables automated secret scanning and dependency vulnerability checks in CI, and configures `CODEOWNERS` so any change touching authentication or payment modules requires manual approval from a senior engineer.

**Outcome:** Before any code ships to production, the automated pipeline flags a hardcoded API test key in a generated config file and an outdated package with a known CVE. Feature delivery continues on scoped branches, while secret scanning, policy gates, and human approval run automatically on every pull request.

---

## Step-by-Step: Building a Secure Agentic Workflow

**Direct Answer:** A practical rollout has ten steps, starting with scope and ending with a regular access review. Each step produces something concrete, such as a written rule, a sandbox, or a CI policy gate, so you can verify the workflow is enforced rather than assumed.

1. **Write the task boundary.** Before the agent starts, define exactly what it is allowed to change, what it must not touch, and what tests must pass.
2. **Create an isolated workspace.** Run the agent in a sandbox or container on a temporary branch, separate from production code and data.
3. **Issue scoped, short-lived credentials.** Give the agent its own identity with the minimum permissions needed for the current task, and expire access when the task ends.
4. **Run the existing test suite.** A passing test suite checks correctness, not security, so treat it as the first gate, not the only one.
5. **Add security-focused tests.** Write tests for authorization checks, input validation, and known [OWASP Top 10](https://owasp.org/www-project-top-ten/) failure cases the existing suite does not cover.
6. **Scan for secrets on every change.** Run automated secret detection before any commit can be merged, not as a periodic sweep.
7. **Scan dependencies.** Check every new or updated package against known vulnerability databases before it is accepted.
8. **Check actions against policy rules.** Validate proposed tool calls and file changes against business rules in a layer the agent cannot edit or bypass.
9. **Require human approval for sensitive changes.** Route anything touching production, authentication, payments, or customer data to a named reviewer before deployment.
10. **Log and review regularly.** Keep an audit trail of what the agent did, who approved it, and review access and policy rules on a fixed schedule.

### Example CI Gate: Automated Secret Scanning and Protected-Path Review

Below is a practical GitHub Actions workflow that enforces secret scanning, dependency auditing, and a protected-path policy check before any agent-opened pull request can merge:

```yaml
name: Agent PR Security Gate

on:
  pull_request:
    branches: [main, staging]

permissions:
  contents: read
  pull-requests: read

jobs:
  secret-and-dependency-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Scan commits for leaked secrets
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Audit dependencies for known vulnerabilities
        run: npm audit --audit-level=high

      - name: Fail if agent PR modifies protected files without label
        run: |
          CHANGED=$(git diff --name-only origin/${{ github.base_ref }}...HEAD)
          if echo "$CHANGED" | grep -qE '^(src/auth/|src/payments/|\.github/workflows/)'; then
            echo "Protected path modified — senior engineer CODEOWNERS approval required."
          fi
```

Pair that workflow with branch protection and a `.github/CODEOWNERS` file so the agent cannot bypass human sign-off on sensitive directories:

```text
# Enforce named human approval outside the agent prompt
/src/auth/        @security-lead
/src/payments/    @lead-systems-architect
/.github/         @platform-admins
```

---

## Common Mistakes When Using AI Coding Agents

**Direct Answer:** The costliest mistakes happen before a single line of code is reviewed. Teams give agents standing production access too early, treat a passing test suite as proof of security, merge oversized pull requests, and assume a written prompt is the same thing as a control.

**Mistake 1: Giving production access too early.** Broad access magnifies the impact of one wrong decision. Start in a sandbox with scoped, temporary credentials.

**Mistake 2: Writing vague task instructions.** A vague task creates unpredictable scope. Define what must change, what must not, and which tests must pass before the agent starts.

**Mistake 3: Trusting a passing test suite.** Existing tests may not cover authorization, abuse cases, or failure recovery. Add security-focused tests separately.

**Mistake 4: Merging large, generated pull requests.** Large diffs slow review and hide the one line that matters. Ask the agent for small, focused changes.

**Mistake 5: Scanning only for obviously formatted secrets.** Real credentials do not always match a known pattern. Combine pattern-based scanning with context-aware checks and prompt rotation when something is found.

**Mistake 6: Putting all governance inside the prompt.** A prompt can be ignored or misread, or influenced by content the agent reads while working. Add a policy check outside the agent's own instructions.

**Mistake 7: Letting an agent change its own controls.** Branch protection, approval rules, and audit settings should require separate human authorization to change.

**Mistake 8: Skipping observability.** A deployment that passes every test can still fail in production. Connect logs, metrics, and release history to the workflow.

**Mistake 9: Treating a vendor benchmark as your own result.** A reported productivity or security number reflects specific conditions. Test the agent against your own repository and risk profile before trusting the claim.

---

## FAQ: AI Coding Agents and Secure Agentic Software Development

### What are AI coding agents?

AI coding agents are tools that plan a development task, read a repository, edit files, run commands, write tests, and prepare a pull request on their own. They work across many steps, not just one suggested line of code, which is why they need more oversight than a simple autocomplete tool.

### Is AI-generated code actually less secure?

Independent testing shows clear security gaps. Veracode's 2025 GenAI Code Security Report found that 45% of AI-generated code samples failed security tests and introduced OWASP Top 10 vulnerabilities, including a 43% failure rate in JavaScript and an 86% failure rate on XSS-relevant samples. Security performance also remained broadly flat across newer and larger models.

### How long does secure agentic software development take?

A focused pilot with scoped tasks and basic guardrails usually takes four to eight weeks. A production-grade workflow with policy controls, audit logs, and monitored deployment typically takes eight to sixteen weeks, depending on the number of tools and systems the agent needs to touch.

### Do AI coding agents leak secrets and credentials?

Yes, in measured coding-agent workflows. GitGuardian's 2026 State of Secrets Sprawl report found that Claude Code co-authored commits leaked secrets at approximately twice the baseline rate, alongside an 81% year-over-year increase in exposed AI-service secrets. Automated secret scanning in the commit pipeline is now a baseline requirement, not an optional extra.

### Who needs a guarded AI coding agent workflow?

Product companies, software agencies, and internal engineering teams that let an agent touch a shared repository, cloud credentials, or production systems need one. Teams with strong existing tests, clear code ownership, and documented review processes gain value from agents faster and more safely than teams without them.

### What are the main security risks of AI coding agents?

The main risks are vulnerable code shipped without review, leaked credentials and API keys, excessive tool or system access, prompt injection from untrusted content, unapproved file changes, and risky dependencies suggested by the agent. Each risk has a specific, testable control rather than a single catch-all fix.

### How can a company secure an AI coding agent?

A company can secure an AI coding agent by scoping each task narrowly, running it in an isolated workspace on a temporary branch, giving it the smallest set of permissions it needs, scanning for secrets and vulnerabilities before merge, enforcing policy checks on sensitive actions, and requiring human approval before anything reaches production.

### Are AI coding agents worth the risk for a small team?

For most small teams, yes, if the guardrails are scaled to the risk. A solo founder working on a low-risk internal tool needs lighter controls than a team shipping to paying customers. The core steps, scoping, scanning, and human approval for sensitive changes, still apply either way, just at a smaller scale.

---

## Conclusion

AI coding agents can genuinely reduce repetitive engineering work, but independent data is clear that their output is not safe by default. Veracode's 2025 GenAI Code Security Report found 45% of AI-generated code samples failed security tests, and GitGuardian's 2026 report found Claude Code co-authored commits leaked secrets at roughly twice the baseline rate. Those are not reasons to avoid agents. They are reasons to build the workflow around them properly.

The recommended approach is a guarded workflow: scoped tasks, isolated execution, automated scanning, policy enforcement, and human approval for anything sensitive, so the agent's speed does not outrun your ability to verify its work.

This approach suits founders, product teams, software agencies, and technology leaders who want faster delivery without removing engineering judgment from high-impact decisions.

If you want help designing a secure AI-assisted development workflow, our team at AbuQitmirLabs is ready to help. [Book a consultation](/contact) and we will review your repository, tools, and delivery goals, and tell you plainly what a secure rollout would actually involve.

Read more practical guides on the [AbuQitmirLabs software development blog](/blog), or see verified delivery outcomes on our [TajweedPage case study](/case-studies/tajweedpage) and [case studies page](/case-studies).

---

## Sources

- [Veracode GenAI Code Security Report](https://www.veracode.com/blog/genai-code-security-report/)
- [GitGuardian State of Secrets Sprawl 2026](https://www.gitguardian.com/state-of-secrets-sprawl-report-2026)
- [Verizon 2026 Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Secure Software Development Framework](https://csrc.nist.gov/Projects/ssdf)

---

**Author:** Abu Qitmir Mohammad Shiraz Al-Madani, Founder & Lead Systems Architect, AbuQitmirLabs

**Related guides for Pakistan, US and Gulf technology teams:**

- [GCC AI Readiness Gap: Why 64% of UAE IT Leaders Worry](/blog/ai-readiness-uae-gcc) - the same governance discipline this guide applies to AI coding agents, applied to AI agents reading your business data.
- [Software Development Kuwait: Offshore Partner Guide 2026](/blog/kuwait-digital-transformation) - how to evaluate a development partner's security and access controls before they touch your systems.
- [Custom Software Development Qatar: Data Protection Laws](/blog/custom-software-development-qatar) - why data access and hosting decisions have to be settled before any code, AI-written or not, ships to production.
- [Inventory Management Software Saudi Arabia](/blog/inventory-management-software-saudi-arabia) - a requirements-led buying method you can reuse when evaluating any software tool, including AI coding agent platforms.
