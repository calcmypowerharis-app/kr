# CalcMyPower Rulebook — Domain 07: Autonomous Execution & Automated Quality Gates

> Antigravity Modular Rule Specification: Category `07_autonomous_execution_quality_gates.md`
> Auto-discovered by Antigravity from `.agents/rules/*.md`.
> Strict Zero-Truncation Constraint: Size <= 22,000 bytes (< 24 KB per-file ceiling).

## 27. Autonomous Execution & Final-Report-Only Standard

### 1. EXECUTE END-TO-END
For an approved task, Gemini should execute the complete task in the remote RDP environment from start to finish without repeatedly asking the Lead to approve routine intermediate steps.

Complete internally:
- file inspection
- implementation
- research
- technical checks
- tests
- typecheck
- lint
- build
- browser QA
- responsive QA
- link checks
- schema/SEO checks
- documentation updates
- Git preparation

Do not stop after each sub-step merely to report progress.

### 2. FINAL-REPORT-ONLY COMMUNICATION
Do NOT produce unnecessary intermediate progress reports.

Do not report every:
- file viewed
- command executed
- component inspected
- screenshot captured
- successful test command
- routine edit

unless that information is:
- a final result,
- a blocker,
- a security issue,
- a decision that requires Lead input,
- or a materially important discrepancy.

The Lead should normally receive ONE consolidated final report after the task is complete.

### 3. USER RELAY MINIMIZATION
Do not require the Lead to copy/paste multiple intermediate Gemini responses back to ChatGPT.

The normal workflow is:

Lead gives task
→ Gemini executes end-to-end
→ Gemini completes QA
→ Gemini gives ONE final report
→ Lead sends final report + final screenshots to ChatGPT
→ ChatGPT performs final review

### 4. ROUTINE ERRORS
If a normal non-blocking error occurs:
- diagnose it
- fix it
- rerun the required check
- continue

Do not stop and ask the Lead about routine recoverable errors.

Examples:
- temporary build issue
- test failure caused by the current change
- CSS/layout issue
- lint/type error
- browser test failure
- local server restart
- transient network issue when retry is safe

Document the final resolution in the final report.

### 5. BLOCKING CONDITIONS
STOP and notify the Lead immediately only when human input is genuinely required, such as:
- missing required credentials/access
- destructive or irreversible action requiring confirmation
- security incident
- conflicting business requirement
- unclear critical user requirement
- unavailable required capability
- production-impacting issue requiring a decision

Do not stop merely because a routine task failed once.

### 6. SECURITY EXCEPTION
Never hide a security problem.

If any credential, token, password, private key, or secret becomes exposed:
- stop credential reuse immediately
- do not reproduce the secret in the report
- report that a credential was exposed
- state what must be revoked/rotated
- continue only with safe authentication if available

Never recover secrets from transcript/history/logs.

### 7. APPROVAL GATES
Routine implementation does not require repeated Lead approval.

However, keep these explicit gates:

A. New calculator:
Research → Go/No-Go brief → Lead approval → implementation

B. Production deployment:
Implementation → QA → Lead approval → production deployment

C. Other irreversible/high-impact actions:
Require explicit Lead approval where appropriate.

### 8. PUBLISHING WORKFLOW
For content or code tasks:

RESEARCH
→ IMPLEMENT
→ VERIFY
→ QA
→ CONSOLIDATED FINAL REPORT

Do not send routine progress messages between these stages.

### 9. FINAL REPORT CONTENT
When complete, return ONE consolidated report containing:

- task completed
- files changed
- important implementation decisions
- research findings when applicable
- technical verification
- tests
- typecheck
- lint
- build
- browser QA
- responsive QA
- SEO/schema checks when relevant
- Git status
- commit status
- GitHub status
- Vercel status
- production status when applicable
- remaining issues
- final screenshots/references when available

Do not omit a real failure merely to make the report look successful.

### 10. SCREENSHOT POLICY
Capture screenshots only when useful for:
- final visual review
- responsive verification
- important UX states
- production verification

Do not send a screenshot for every intermediate state.

Prefer final representative screenshots.

### 11. FINAL-RESULT PRINCIPLE
The Lead should be able to judge the task primarily from the final report and final screenshots.

The Lead should NOT need to reconstruct the work from dozens of intermediate messages.

### 12. NORMAL DEFAULT
Unless the Lead explicitly asks for live progress:

DO THE WORK
→ FIX ROUTINE ISSUES
→ VERIFY EVERYTHING
→ REPORT ONCE

STOP.

### 13. ROUTINE GIT AUTONOMY

Once a task has been explicitly authorized by the Lead, Gemini must execute the complete authorized workflow end-to-end without requiring the Lead to separately instruct routine Git actions.

For normal development tasks:

RESEARCH → IMPLEMENT → TEST → QA → COMMIT → PUSH → FINAL REPORT

Gemini must automatically:

1. Inspect git status and the diff before committing.
2. Confirm only intended task-related files are changed.
3. Run the required verification suite.
4. Fix routine issues internally and rerun verification.
5. If all required checks pass, stage the intended files.
6. Create an appropriate commit with a clear conventional commit message.
7. Push the verified commit to the configured remote branch.
8. Verify that the push succeeded and the local branch is synchronized with the remote.
9. Report the commit hash, push result, final git status, and verification results in the single consolidated final report.

The Lead must NOT need to separately say:
"commit this"
"push this"
"now push"
"commit and push"
or similar routine Git instructions after the original task has been authorized.

### 14. GIT SAFETY GATES

Before commit/push, Gemini MUST:

- Review `git diff`.
- Review `git status`.
- Ensure no unrelated files are included.
- Never commit secrets, credentials, tokens, API keys, `.env` files, or sensitive artifacts.
- Never use `git add .` blindly when unrelated files may exist.
- Stage only intended files.
- Never force-push.
- Never rewrite public Git history.
- Never delete or overwrite unrelated work.
- Never commit known failing or unverified code.

If unrelated user work is detected in the working tree, do not include it in the commit. Preserve it and report it.

### 15. PUSH AUTHORIZATION

Routine commit and push are considered part of normal execution for an explicitly authorized development task.

Separate human approval is NOT required for ordinary commits and pushes of verified task-related changes.

However, explicit Lead approval remains mandatory for:

- Production deployment when it is not an automatic consequence of the approved Git push.
- New calculator go/no-go decisions.
- Major architectural changes outside the requested scope.
- Destructive or irreversible operations.
- Security-sensitive actions.
- Credential/account changes.
- Actions involving external services that require human authorization.

### 16. DEPLOYMENT DISTINCTION

Do not confuse Git push with manual production deployment.

If the repository is configured for automatic Vercel deployment from `main`, pushing a verified approved commit is allowed under routine Git autonomy.

Do NOT perform a separate manual production deployment unless explicitly authorized.

After pushing, verify the Git/Vercel state when the available workflow allows it, but do not claim production deployment success unless it has actually been verified.

### 17. FINAL-REPORT-ONLY DEFAULT

After completing the entire authorized workflow, return ONE consolidated final report.

Do not stop after implementation and wait for the Lead to say "push it."

Do not stop after commit and wait for the Lead to say "deploy it."

Do not ask routine approval questions that are already covered by this standard.

Continue until:
- the authorized work is complete,
- verification is complete,
- routine Git actions are complete,
- or a genuine blocker / approval gate is reached.

Core principle:

DO THE AUTHORIZED WORK END-TO-END.
DO NOT OUTSOURCE ROUTINE DECISIONS BACK TO THE LEAD.
REPORT ONCE AT THE END.

## 29. Automated Quality Gates, Scenario Single Source of Truth & Image Quota Discipline

### 1. Automated Editorial & Image Quality Gate Suite (`src/lib/seo/__tests__/editorial-quality.test.ts`)
Never rely solely on manual visual review to catch recurring editorial or asset defects. Every `npm test` run automatically enforces the following checks across all editorial articles in `src/app/`:
- **Cross-Article Image Asset Non-Repetition:** Scans all editorial article files and fails the test suite if any `/images/articles/...` path is shared between two different articles.
- **Physical Asset Existence & Alt Text:** Verifies that every referenced image file physically exists on disk in `public/` (with non-zero size) and that every `<Image>` component includes a descriptive static `alt` attribute ($\ge 20$ characters).
- **Zero Em-Dash Enforcement:** Scans all editorial article source files and fails if any forbidden em-dash character (`\u2014`) is present.
- **TOC Anchor Link Integrity:** Extracts all Table of Contents (`TocItem[]`) IDs for each article and verifies that a corresponding `id="<id>"` attribute exists in the rendered JSX.

### 2. Scenario Data Single Source of Truth (DRY Verification)
- When an editorial article includes a worked load example and links to a calculator scenario (`?scenario=...`), the calculator's scenario definition (`GENERATOR_SCENARIO_PRESETS`) is the single source of truth.
- The automated test suite computes `calculateGeneratorSize()` on the linked scenario and verifies that the exact formatted outputs (`totalRunningWatts`, `largestAdditionalStartingWatts`, `peakStartingDemand`, and `planningCapacityWatts`) appear in the article's worked example text.
- Any modification to calculator scenario defaults or article worked examples must keep both in 1:1 parity or `npm test` will block the build.

### 3. Image Generation Quota & Prompt Precision Discipline
- Image generation models enforce strict rate limits and quota windows (`429 RESOURCE_EXHAUSTED`).
- Before invoking `generate_image`, craft a single, highly specific, technically accurate prompt that:
  1. Explicitly specifies the exact residential/electrical subject and environment (e.g., safe $>20\text{ ft}$ outdoor clearance, or clear 115V/60Hz appliance rating label).
  2. Explicitly forbids brand logos, manufacturer trademarks, and garbled text (`"unbranded, no brand logos, clean legible typography"`).
  3. Matches the target section's exact educational purpose so the asset succeeds on the first call without wasting quota on trial-and-error iterations.

### 4. Mandatory Date Transparency & Paragraph Readability Gates (`src/lib/seo/__tests__/date-consistency.test.ts`)
- **Mandatory Registry Dates:** Every editorial entry in `GUIDE_REGISTRY` must possess valid ISO 8601 `publishedAt` and `updatedAt` strings.
- **Mandatory Visible Date Byline:** Every editorial article route must render `ArticleDateByline` displaying genuine publication and update dates matching the registry.
- **Automated Rendered Readability Check:** Body paragraphs must meet the 2 to 3 visual lines standard (~740px to 820px reading width). Multi-sentence text blocks and dense walls of text are caught and blocked during pre-commit quality audits.


