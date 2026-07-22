Tasks — Profile Website for Santiago Arredondo Torres

Overview

This task list is split by workstream to keep implementation clear and easy to maintain: UI/UX, Backend, Testing, and DevOps/Delivery.

Task ID and name convention

- Format: `<WORKSTREAM>-<NUMBER>: <Action Name>`
- Workstream codes:
  - `UI` = UI/UX
  - `BE` = Backend
  - `QA` = Testing/Quality Assurance
  - `CT` = Content
  - `DV` = DevOps/Delivery
  - `DOC` = Documentation/Maintenance
- Numbering starts at `01` in each workstream.
- Example: `UI-03: Implement Semantic Page Layout`

Technology decisions (for implementation)

- UI/UX: HTML5 + CSS3 + Vanilla JavaScript
- Data/content: JSON files in `site/data/`
- Backend: no server for phase 1 (mailto contact); optional serverless in phase 2
- Testing: Playwright smoke + accessibility checks
- Delivery: GitHub Pages + GitHub Actions

Proposed file/folder structure to implement

```text
/
├─ site/
│  ├─ index.html
│  ├─ assets/css/styles.css
│  ├─ assets/js/main.js
│  ├─ assets/img/
│  ├─ assets/docs/resume.pdf
│  └─ data/{profile.json,projects.json}
├─ tests/{smoke.spec.ts,accessibility.spec.ts}
└─ .github/workflows/ci.yml
```

Task breakdown

1) UI/UX

- [ ] UI-01: Define Information Architecture and Section Order
- [ ] UI-02: Design Responsive Mobile-First Wireframe
- [ ] UI-03: Implement Semantic Page Layout (`site/index.html`)
- [ ] UI-04: Implement Styling System (`site/assets/css/styles.css`)
- [ ] UI-05: Add Interaction Enhancements (`site/assets/js/main.js`)
- [ ] UI-06: Optimize Image and Typography Rendering

2) Backend (phase 1 static-first)

- [ ] BE-01: Implement Phase-1 Contact Strategy (`mailto:` only)
- [ ] BE-02: Validate No Secrets or Runtime Sensitive Config
- [ ] BE-03: Define Optional Phase-2 Serverless Contact Requirements

3) Testing

- [ ] QA-01: Add Smoke Tests (`tests/smoke.spec.ts`)
- [ ] QA-02: Add Accessibility Checks (`tests/accessibility.spec.ts`)
- [ ] QA-03: Add Manual Regression Checklist

4) Content

- [ ] CT-01: Create Profile Data File (`site/data/profile.json`)
- [ ] CT-02: Create Projects Data File (`site/data/projects.json`)
- [ ] CT-03: Add Resume PDF (`site/assets/docs/resume.pdf`)
- [ ] CT-04: Add and Optimize Images (`site/assets/img/`)

5) DevOps/Delivery

- [ ] DV-01: Configure GitHub Pages Deployment
- [ ] DV-02: Add CI Workflow (`.github/workflows/ci.yml`)
- [ ] DV-03: Add CI Caching and Dependency Strategy
- [ ] DV-04: Add Deployment Verification Checklist

6) Documentation and maintenance

- [ ] DOC-01: Keep Repository Documentation Aligned
- [ ] DOC-02: Define Content Update Workflow
- [ ] DOC-03: Add Release/Update Checklist

7) Content synchronization and cleanup (current cycle)

- [ ] CT-05: Synchronize Profile Content from Provided CV/LinkedIn Images
- [ ] DOC-04: Update Task and Plan Files for the Content Synchronization Phase
- [ ] OPS-01: Remove Legacy Unused Folders (e.g., `/project/`)
