# CalcMyPower Rulebook — Domain 06: Architecture, Testing, DevOps & Git Discipline

> Antigravity Modular Rule Specification: Category `06_architecture_devops_git.md`
> Auto-discovered by Antigravity from `.agents/rules/*.md`.
> Strict Zero-Truncation Constraint: Size <= 22,000 bytes (< 24 KB per-file ceiling).

## 15. Architecture Rules
Prefer reusable components and data-driven calculator definitions.
Do not duplicate calculator logic across pages.
Centralize:
- units
- formulas
- validation
- SEO metadata patterns
- related-tool relationships
- calculation test cases

Any shared change must be checked against every calculator using it.

## 16. Testing Requirements
Before marking a feature complete:
- run lint/type checks if configured
- run production build
- test calculator inputs and outputs
- test invalid/edge inputs
- test mobile layout
- test navigation and internal links
- verify no console errors
- verify metadata and canonical URLs
- verify sitemap/robots if affected

For formulas, create explicit test cases with known expected results.

## 17. Mistake Prevention
Do not repeat any bug or mistake already documented in the repository.
Maintain a `DECISIONS.md` or `LESSONS.md` file for:
- bugs found
- root causes
- fixes
- important architectural decisions
- SEO/content mistakes
- deployment issues

When a new issue appears, document the lesson before moving on.

## 18. Git Discipline
Use small, descriptive commits.
Never silently overwrite working features.
Before destructive changes:
- explain what will be removed
- confirm the replacement exists
- keep the change reversible when practical

## 23. Remote Development, Testing & Deployment Standard

### 1. REMOTE-FIRST DEVELOPMENT

All CalcMyPower development work must be performed inside the designated
remote Windows/RDP development environment.

"Local development" means the project workspace on the designated remote
RDP machine.

It does NOT mean the Lead's personal/local computer.

Do not instruct the Lead to install Node, npm, dependencies, build tools,
or project tooling on their personal computer when the remote RDP
environment is available.

### 2. REMOTE PROJECT WORKSPACE

The project source code, node_modules, build process, tests, linting,
type checking, screenshots, and browser QA should be performed from the
designated remote RDP workspace.

Use the existing project workspace unless the Lead explicitly changes it.

### 3. REMOTE COMMAND EXECUTION

Run development commands on the remote RDP machine, including:

- npm install
- npm test
- npx tsc --noEmit
- npm run lint
- npm run build
- npm run start
- other project-specific verification commands

Do not require the Lead's personal computer to execute these commands.

### 4. REMOTE BROWSER QA

Use the remote Chrome/browser environment for visual and functional testing.

For UI changes:
- run the application in the remote environment
- open it in remote Chrome
- test the relevant flows
- capture screenshots where useful
- check console errors
- check hydration errors
- check responsive layouts
- check horizontal overflow
- check keyboard/touch behavior where relevant

### 5. PREVIEW BEFORE PRODUCTION

Do NOT treat the production site as the development/test environment.

For changes requiring deployment verification:

REMOTE WORKSPACE
→ GitHub
→ Vercel Preview Deployment
→ Remote Chrome QA
→ Lead approval
→ Production Deployment
→ Remote Chrome Production QA

Use Vercel Preview deployments for pre-production validation when available.

### 6. PRODUCTION QA

After an approved production deployment, perform a short production smoke test
from the remote browser.

Verify:
- production URL returns 200
- affected page loads correctly
- key interactive behavior works
- no console/hydration errors
- important links work
- images/assets load
- mobile behavior remains correct
- sitemap/robots/metadata are not accidentally broken when relevant

Do not run destructive tests on production.

### 7. LIVE SITE SAFETY

Never use the live production website as a sandbox for:
- destructive data operations
- unapproved experiments
- database mutations
- test accounts that could affect real users
- load testing
- repeated automated requests that could burden production

Use local remote development or Vercel Preview for such testing.

### 8. DEPLOYMENT ORDER

When the Lead explicitly requests deployment:

1. Verify the remote workspace is clean or changes are intentional.
2. Run required tests/typecheck/lint/build remotely.
3. Create the required commit(s).
4. Push to GitHub.
5. Verify GitHub branch/commit.
6. Verify Vercel deployment.
7. Verify Preview if applicable.
8. Complete remote browser QA.
9. Only proceed to Production when the Lead has explicitly approved.
10. After production deployment, perform production smoke QA remotely.

### 9. DO NOT DEPLOY AUTOMATICALLY WITHOUT AUTHORIZATION

Gemini must not push or deploy merely because:
- a task is complete
- tests passed
- the build passed
- the code is ready

Push/deployment requires explicit Lead authorization unless an existing approved
workflow specifically authorizes that action.

### 10. NO PERSONAL-PC DEPENDENCY

Do not tell the Lead to:
- open a local terminal
- run npm commands locally
- install dependencies locally
- build locally
- run tests locally
- use local Chrome

when the designated remote RDP environment can perform the task.

The Lead may use their browser to review screenshots/results and provide approval.

### 11. REMOTE CREDENTIAL SECURITY & LOCAL-ONLY ISOLATION

Never expose:
- GitHub PATs
- API tokens
- passwords
- private keys
- Vercel tokens
- environment secrets

in chat output, screenshots, commit messages, logs, or reports.

Do not recover credentials from previous terminal history or transcript logs.

Use the configured authentication mechanism of the remote environment.

If a credential becomes exposed, stop credential reuse and report that it
must be rotated/revoked.

#### 11.1 STRICT LOCAL-ONLY STORAGE (ZERO-LEAKAGE INVARIANT)
- **Local Machine Only:** GitHub Personal Access Tokens (PATs), API keys, and deployment secrets must live strictly on the local remote machine disk (inside `.git/config` which is local metadata and never tracked by Git).
- **Never on GitHub:** Never commit, stage, or push credentials to any repository file, markdown doc, code file, or version control.
- **Never in Visible Output:** Never print or echo raw PAT strings in chat messages, reports, or PR descriptions.
- **Pre-Commit Secret Scan:** Before every commit, verify via `git diff --staged` that no credentials or private token patterns are being added to version control.
- **Ephemeral Usage:** If credentials must be referenced in automation scripts, use in-memory ephemeral variables that do not persist in script files or commit history.

### 12. FINAL REPORT

When remote execution is complete, report:

- remote environment verification
- tests
- typecheck
- lint
- build
- Git commit
- GitHub status
- Vercel deployment status
- preview QA
- production QA when deployed
- any remaining discrepancy

Do not claim production is verified until the remote browser has actually
checked the production URL.

### 13. DEFAULT WORKFLOW

Unless the Lead explicitly overrides it:

REMOTE RDP WORKSPACE
→ IMPLEMENT
→ REMOTE TEST
→ REMOTE BUILD
→ COMMIT
→ GITHUB
→ VERCEL PREVIEW
→ REMOTE BROWSER QA
→ LEAD APPROVAL
→ PRODUCTION
→ REMOTE PRODUCTION QA

End of Section 23.

