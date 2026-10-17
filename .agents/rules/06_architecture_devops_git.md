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

Mandatory Git Author Identity:
- All git commits must strictly use the official team account:
  - user.name: calcmypowerharis-app
  - user.email: calcmypowerharis@gmail.com
- Never commit with personal or secondary accounts (such as patnerj95@gmail.com). Vercel team licensing restricts builds to team members and flags unauthorized authors.

Credential Security Invariant:
- Follow Section 23.11 exclusively. Use official GitHub CLI (`gh`) for remote GitHub operations. Never extract, stage, or commit GitHub tokens or secrets.

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

### 11. GITHUB CREDENTIAL SECURITY & OFFICIAL CLI (gh) PROTOCOL

Never expose:
- GitHub Personal Access Tokens (PATs)
- OAuth tokens or session secrets
- API tokens
- Passwords or private keys
- Vercel tokens
- Environment secrets

in chat output, screenshots, commit messages, command lines, logs, or reports.

Never recover, parse, or reuse credentials from previous terminal history or transcript logs.

#### 11.1 STRICT CREDENTIAL NON-EXTRACTION & OFFICIAL GITHUB CLI FLOW
- **Official GitHub CLI Exclusivity:** All remote GitHub workflows (creating pull requests, merging, inspecting checks, releases, and repository queries) must exclusively use the authenticated GitHub CLI (`gh`).
- **Prohibited Token Extraction:** Never extract credentials from Windows Git Credential Manager via `git credential fill` or ad-hoc scripts. Never pipe or parse credentials in memory scripts.
- **Verification via `gh auth status`:** Check authentication using `gh auth status` without revealing token values or headers.
- **Interactive Owner Login:** If GitHub authentication is missing or expired, stop immediately and instruct the repository owner to run `gh auth login` interactively. Never ask the owner to paste a token into ChatGPT, Antigravity prompts, repository files, or logs.
- **Zero Embedding in Source or Config:** Never embed tokens or secrets in `.git/config`, URLs, source code, test files, markdown documentation, or environment debug outputs.
- **No Verbose or Traced Logging:** Never enable shell tracing (`set -x` or `Set-PSDebug -Trace`) or verbose HTTP header logging that prints Authorization headers.
- **Pre-Commit Secret Scan:** Before every commit, verify via `git diff --staged` that no credentials, tokens, or private patterns are being committed.
- **Mandatory Compromise Protocol:** If any token is exposed in logs, transcript, or files, treat it as compromised. Stop credential reuse immediately and request owner-authorized revocation and replacement via GitHub account settings. Never assume deleting a log makes an exposed credential safe.

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

