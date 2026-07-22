import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("meets baseline accessibility checks", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("main")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);

  const scanResults = await new AxeBuilder({ page }).analyze();
  expect(scanResults.violations).toEqual([]);
});
