import { test, expect } from "@playwright/test";

test("DependenciesTable should display dependencies and support pagination", async ({
  page,
}) => {
  // Go to the application TODO: replace with the actual URL during testing
  await page.goto("http://localhost:3000");

  // Navigate to the Dependencies tab
  await page.click("text=Dependencies");

  // Check if the dependencies table is visible
  await expect(page.locator("text=Dependencies used by express")).toBeVisible();

  // Search for a dependency
  await page.fill('input[placeholder="Search dependencies..."]', "accepts");
  await expect(page.locator("text=accepts")).toBeVisible();

  // Check pagination (if more than one page exists)
  const nextPageButton = page.locator("text=Next");
  if (await nextPageButton.isEnabled()) {
    await nextPageButton.click();
    await expect(page.locator("text=Previous")).toBeVisible(); // Ensure pagination works
  }
});
