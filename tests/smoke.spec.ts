import { expect, test } from "@playwright/test";

test("loads profile page and primary sections", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Santiago Arredondo Torres/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Santiago Arredondo Torres"
  );
  await expect(page.locator(".announcement-bar")).toContainText("Last update");
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

  await expect(page.locator("#projects-list .card")).toHaveCount(3);
  await expect(page.locator("#projects-list .card .secondary-cta")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
  await expect(page.locator(".brand-mark img")).toHaveAttribute(
    "src",
    "./assets/img/face.jpg"
  );
  const resumeDownload = page.locator("[data-resume-download]");
  await expect(resumeDownload).toHaveAttribute("download", "");
  await expect(resumeDownload).toHaveAttribute(
    "href",
    "./assets/docs/Santiago%20Arredondo%20CV%20English.pdf"
  );
  await page.getByRole("button", { name: "Cambiar la página a español" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator("#about-title")).toContainText(
    "Construyo experiencias digitales confiables"
  );
  await expect(page.locator("#projects-list .card").nth(1)).toContainText(
    "Monitor de acciones en partidos de fútbol"
  );
  await expect(resumeDownload).toHaveAttribute(
    "href",
    "./assets/docs/Santiago%20Arredondo%20CV%20Spanish.pdf"
  );
  await page.getByRole("button", { name: "Switch page to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
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
});
