import { expect, test } from "@playwright/test";

test("loads profile page and primary sections", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Santiago Arredondo Torres/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Santiago Arredondo Torres"
  );

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

  await expect(page.locator("#projects-list .card")).toHaveCount(2);
});
