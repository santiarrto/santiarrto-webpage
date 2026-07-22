Project Scope — Santiago Arredondo Torres Profile Website

Overview

Build a simple, secure, and easy-to-maintain website to present Santiago Arredondo Torres as a Software Engineer. The site will be static-first, fast, accessible, and straightforward to update through repository files.

Selected sections

- About
- Skills
- Projects
- Experience
- Contact
- Resume download

Technology baseline

- Frontend/UI:
  - HTML5 (semantic structure)
  - CSS3 (responsive layout and design tokens through CSS variables)
  - Vanilla JavaScript (small progressive enhancements only)
- Content management:
  - JSON files for profile and projects data
  - Static assets in dedicated folders
- Backend:
  - No traditional backend server
  - Contact via `mailto:` as default (secure and simple)
  - Optional future serverless endpoint if form submission is later required
- Testing:
  - Playwright for smoke tests
  - Axe accessibility checks (through Playwright integration)
- Hosting/DevOps:
  - GitHub Pages for static hosting
  - GitHub Actions for CI (lint/test/build checks when available)

Target file/folder structure

```text
/
├─ README.md
├─ scope.md
├─ tasks.md
├─ tasks-progress.md
├─ site/
│  ├─ index.html
│  ├─ assets/
│  │  ├─ css/
│  │  │  └─ styles.css
│  │  ├─ js/
│  │  │  └─ main.js
│  │  ├─ img/
│  │  └─ docs/
│  │     └─ resume.pdf
│  └─ data/
│     ├─ profile.json
│     └─ projects.json
├─ tests/
│  ├─ smoke.spec.ts
│  └─ accessibility.spec.ts
└─ .github/
   └─ workflows/
      └─ ci.yml
```

In scope

- Build a responsive single-page profile site with the selected sections.
- Implement accessible semantic structure and keyboard-friendly navigation.
- Render projects and profile details from editable data files.
- Add resume download link and contact links.
- Prepare baseline automated smoke and accessibility checks.
- Deploy a static site through GitHub Pages.

Out of scope

- User accounts and authentication
- Database-backed dynamic features
- Blog/CMS implementation
- E-commerce/payment flows
- Collecting personal data through custom backend forms (for phase 1)

Security, maintainability, and quality requirements

- Security:
  - HTTPS-only hosting
  - No secrets in repository
  - No unnecessary third-party scripts
- Maintainability:
  - Clear folder conventions
  - Content updates by editing JSON/data files
  - Minimal dependencies
- Quality:
  - Mobile-first responsive behavior
  - Lighthouse-oriented performance (optimized images and lean JS)
  - Basic automated smoke and accessibility test coverage

Acceptance criteria

- All selected sections are visible and correctly linked in navigation.
- Site works on modern desktop and mobile browsers.
- Content can be updated without changing core layout code.
- Resume download and contact links are functional.
- Deployment to GitHub Pages succeeds from main branch.
- Smoke tests and accessibility checks run successfully in CI.

Task tracking convention

- Tasks in planning and execution documents must use:
  - `ID`: `<WORKSTREAM>-<NUMBER>`
  - `Name`: concise action title in Title Case
- Workstream codes: `UI`, `BE`, `QA`, `CT`, `DV`, `DOC`.
