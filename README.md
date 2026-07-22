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
├─ project/
│  └─ .gitkeep
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

If the site is static HTML, run from the project root:

```bash
python -m http.server
```

Then open `http://localhost:8000`.

## Related Documentation

- [scope.md](C:/Users/santi/OneDrive/Documentos/Projects/santiarrto-webpage/scope.md) — scope, acceptance criteria, architecture baseline
- [tasks.md](C:/Users/santi/OneDrive/Documentos/Projects/santiarrto-webpage/tasks.md) — detailed task list by workstream
- [tasks-progress.md](C:/Users/santi/OneDrive/Documentos/Projects/santiarrto-webpage/tasks-progress.md) — progress board and status tracking

## Maintainer

Santiago Arredondo Torres
