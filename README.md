# Santiago Arredondo Torres — Profile Website

## Overview

This repository contains a secure, simple, and maintainable profile website for **Santiago Arredondo Torres**, Software Engineer.

The goal is to provide a professional, fast, and accessible presentation site with minimal operational complexity.

## Objectives

- Present a clear engineering profile (About, Skills, Projects, Experience, Contact, Resume).
- Keep implementation lightweight and maintainable.
- Prioritize accessibility, performance, and security best practices.
- Enable easy content updates without deep code changes.

## Selected Technology Stack

### Frontend

- HTML5 (semantic structure)
- CSS3 (responsive styles and design tokens via CSS variables)
- Vanilla JavaScript (small progressive enhancements)

### Content

- JSON data files for profile and projects content
- Static assets for images and resume file

### Backend

- No backend server for phase 1
- Contact via `mailto:` link
- Optional phase-2 serverless form endpoint (future scope)

### Testing and Delivery

- Playwright smoke and accessibility checks
- GitHub Actions for CI
- GitHub Pages for hosting

## Project Structure

```text
/
├─ README.md
├─ scope.md
├─ tasks.md
├─ tasks-progress.md
├─ package.json
├─ playwright.config.ts
├─ site/
│  ├─ index.html
│  ├─ assets/
│  │  ├─ css/styles.css
│  │  ├─ js/main.js
│  │  ├─ img/
│  │  └─ docs/resume.pdf
│  └─ data/
│     ├─ profile.json
│     └─ projects.json
├─ tests/
│  ├─ smoke.spec.ts
│  └─ accessibility.spec.ts
└─ .github/workflows/ci.yml
```

## Task Management Convention

Tasks use the format:

- `ID`: `<WORKSTREAM>-<NUMBER>`
- `Name`: short action title in Title Case

Workstream codes:

- `UI` (UI/UX)
- `BE` (Backend)
- `QA` (Testing)
- `CT` (Content)
- `DV` (DevOps/Delivery)
- `DOC` (Documentation/Maintenance)

Examples:

- `UI-03: Implement Semantic Page Layout`
- `QA-02: Add Accessibility Checks`

## Security and Quality Baseline

- HTTPS-only hosting
- No repository secrets
- Minimal third-party scripts
- Mobile-first responsive behavior
- Basic automated smoke and accessibility checks

## Local Preview

Prerequisite:

- Node.js 18 or higher

Install dependencies:

```bash
npm install
```

Run local preview server from the project root:

```bash
npm run start
```

Then open `http://127.0.0.1:4173`.

Run tests:

```bash
npm run test:e2e
```

## Current placeholders

- Resume placeholder is at `site/assets/docs/resume-placeholder.txt`.
- Replace it with `site/assets/docs/resume.pdf` when final resume is ready.
- Add final project/profile images under `site/assets/img/`.

## Content update workflow

1. Update profile and resume data in `site/data/profile.json`.
2. Update project entries in `site/data/projects.json`.
3. Add or replace assets in `site/assets/docs/` and `site/assets/img/`.
4. Run local preview with `npm run start` and validate all sections render.
5. Run `npm run test:e2e` when using Node.js 18+.
6. Commit and push changes after docs/task updates.

## Manual regression checklist (QA-03)

- Home page loads and title is correct.
- All key sections are visible and reachable from navigation.
- Contact details render correctly from JSON (email, phone, location, LinkedIn).
- Mobile menu toggle works on narrow screens.
- Resume download link is present and reachable.
- No obvious visual layout breakage in desktop/mobile.

## Deployment verification checklist (DV-04)

- `main` contains the intended commit.
- GitHub Actions CI passes for the commit.
- GitHub Pages deploy job succeeds and publishes from `site/`.
- Production URL returns HTTP 200 and serves latest content.
- Contact links and navigation work in production.

## Related Documentation

- [scope.md](C:/Users/santi/OneDrive/Documentos/Projects/santiarrto-webpage/scope.md) — scope, acceptance criteria, architecture baseline
- [tasks.md](C:/Users/santi/OneDrive/Documentos/Projects/santiarrto-webpage/tasks.md) — detailed task list by workstream
- [tasks-progress.md](C:/Users/santi/OneDrive/Documentos/Projects/santiarrto-webpage/tasks-progress.md) — progress board and status tracking

## Maintainer

Santiago Arredondo Torres
