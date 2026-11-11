import { expect, test } from "@playwright/test";

test("loads profile page and primary sections", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Santiago Arredondo Torres/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Santiago Arredondo Torres"
  );
  await expect(page.locator(".announcement-bar")).toContainText("Last update");
  await expect(page.locator(".announcement-bar")).toContainText("November 11, 2026");
  await expect(page.locator(".announcement-bar")).toHaveClass(/is-hidden/, {
    timeout: 6000,
  });

  const sectionIds = [
    "about",
    "skills",
    "projects",
    "experience",
    "contact",
    "resume",
  ];

  for (const id of sectionIds) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }

  await expect(page.locator("#education-list li")).toHaveCount(4);
  await expect(page.locator("#education-list")).toContainText("English B1+");
  await expect(page.locator("#certifications-list li")).toHaveCount(11);
  await expect(page.locator("#certifications-list")).toContainText("Data Engineer");
  await expect(page.locator("#certifications-list")).toContainText(
    "Azure Fundamentals Certificate"
  );
  await expect(page.locator("#certifications-list")).toContainText(
    "Expires: May 2028"
  );

  const projectCards = page.locator(
    "#projects-list > .project-card-set:not([aria-hidden='true']) > .card"
  );
  await expect(projectCards).toHaveCount(5);
  await expect(projectCards.locator(".secondary-cta")).toHaveCount(3);
  await expect(projectCards.first().getByRole("heading")).toHaveText("Traffic Insights");
  await expect(projectCards.nth(1).getByRole("heading")).toHaveText(
    "ClimaSoluciones Website & Email System"
  );
  await expect(projectCards.nth(1)).toContainText(
    "Azure Static Web Apps, with Azure Functions and the Resend API"
  );
  await expect(projectCards.nth(1).getByRole("link", { name: "View project" })).toHaveAttribute(
    "href",
    "https://climasoluciones.com.co/"
  );
  const trafficInsights = projectCards.filter({
    has: page.getByRole("heading", { name: "Traffic Insights" }),
  });
  await expect(trafficInsights.getByRole("link", { name: "View project" })).toHaveAttribute(
    "href",
    "https://github.com/santiarrto/traffic-insights"
  );
  await page.getByRole("button", { name: "Pause animation" }).click();
  await expect(page.locator("#projects-list")).toHaveClass(/is-paused/);
  await expect(page.getByRole("button", { name: "Resume animation" })).toBeVisible();
  await page.getByRole("button", { name: "Resume animation" }).click();
  await expect(page.locator("#projects-list")).not.toHaveClass(/is-paused/);
  await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
  await expect(page.locator(".brand-mark img")).toHaveAttribute(
    "src",
    "./assets/img/face.jpg"
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    "./assets/img/favicon.svg"
  );
  const resumeDownload = page.locator("[data-resume-download]");
  await expect(resumeDownload).toHaveAttribute("download", "");
  await expect(resumeDownload).toHaveAttribute(
    "href",
    "./assets/docs/Santiago%20Arredondo%20CV%20English.pdf"
  );
  await page.getByRole("button", { name: "Cambiar la página a español" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator(".announcement-bar")).toContainText("11 de noviembre de 2026");
  await expect(page.locator("#about-title")).toContainText(
    "Construyo experiencias digitales confiables"
  );
  await expect(page.locator("#certifications-list")).toContainText("Vence: Mayo 2028");
  await expect(page.locator("#skills-list")).toContainText("Bases de datos relacionales");
  await expect(page.locator("#soft-skills-list")).toContainText("Liderazgo y mentoría");
  await expect(page.locator("#experience-list")).toContainText(
    "Ingeniero sénior de gestión de aplicaciones"
  );
  await expect(page.locator("#education-list")).toContainText("Ingeniería de Sistemas");
  await expect(page.locator("#languages-list")).toContainText("Español (Nativo)");
  await expect(projectCards.nth(3)).toContainText(
    "Monitor de acciones en partidos de fútbol"
  );
  await expect(projectCards.nth(1)).toContainText(
    "migré algunas páginas privadas a Azure Static Web Apps"
  );
  await expect(projectCards.first()).toContainText(
    "Tablero local e interactivo para explorar datos de víctimas de accidentes de tránsito en Colombia"
  );
  await expect(resumeDownload).toHaveAttribute(
    "href",
    "./assets/docs/Santiago%20Arredondo%20CV%20Spanish.pdf"
  );
  await page.getByRole("button", { name: "Cambiar la página a inglés" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#skills-list")).toContainText("Relational Databases");
});

test("keeps the projects carousel still for reduced-motion preferences", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("#projects-list")).toHaveCSS("animation-name", "none");
  await expect(page.locator("#projects-list > .project-card-set").first()).toBeVisible();
  await expect(
    page.locator("#projects-list > .project-card-set[aria-hidden='true']")
  ).toBeHidden();
  await expect(page.getByRole("button", { name: "Pause animation" })).toBeHidden();
});

test("loads the dedicated contact page and exposes an accessible form", async ({ page }) => {
  await page.goto("/contact.html");

  await expect(page).toHaveTitle(/Contact/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Let's build something useful."
  );
  await expect(page.getByRole("form")).toBeVisible();
  await expect(page.getByLabel("Name")).toHaveAttribute("required", "");
  await expect(page.getByLabel("Email")).toHaveAttribute("type", "email");
  await expect(page.getByRole("textbox", { name: "Message" })).toHaveAttribute(
    "required",
    ""
  );
  await expect(page.locator("#contact-form")).toHaveAttribute(
    "action",
    "mailto:santiarrto@gmail.com"
  );
  await expect(page.getByRole("link", { name: "Email directly" })).toHaveAttribute(
    "href",
    "mailto:santiarrto@gmail.com"
  );
  await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "rel",
    "noopener noreferrer"
  );
  await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/santiago-arredondo-torres-b8811616a/"
  );
  await expect(page.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/santiarrto"
  );
  await page.getByRole("button", { name: "Cambiar la página a español" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page).toHaveTitle(/Contacto/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Construyamos algo útil."
  );
  await expect(page.getByLabel("Nombre")).toBeVisible();
  await expect(page.getByRole("link", { name: "Enviar correo directamente" })).toBeVisible();
});
