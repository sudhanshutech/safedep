import { test, expect } from "@playwright/test";

test("Package Vulnerabilities", async ({ page }) => {
  // Go to the application (replace with the actual URL during testing)
  await page.goto("http://localhost:3000");

  // Navigate to the Dependencies tab
  await page.click("text=Vulnerabilities");
  // Test for presence of main heading
  await expect(page.locator("h2.text-xl.font-bold")).toHaveText(
    "Vulnerabilities"
  );

  // Test if each vulnerability card is rendered
  const cards = page.locator(".border.border-gray-300.p-4.shadow-lg.bg-white");
  await expect(cards).toHaveCount(2); // in prod this should be dynamic

  // Test if first vulnerability card displays correct data and in prod this should be dynamic
  const firstCard = cards.first();
  await expect(firstCard.locator("h3.text-lg.font-semibold")).toBeVisible();
  await expect(firstCard.locator("div >> text=ID:")).toBeVisible();
  await expect(firstCard.locator("div >> text=Risk Level:")).toBeVisible();
  await expect(firstCard.locator("div >> text=Published At:")).toBeVisible();
  await expect(firstCard.locator("div >> text=Modified At:")).toBeVisible();
  await expect(firstCard.locator("p.text-sm.text-gray-500")).toBeVisible();

  // Test if second vulnerability card displays correct data
  const secondCard = cards.nth(1);
  await expect(secondCard.locator("h3.text-lg.font-semibold")).toBeVisible();
  await expect(secondCard.locator("div >> text=ID:")).toBeVisible();
  await expect(secondCard.locator("div >> text=Risk Level:")).toBeVisible();
  await expect(secondCard.locator("div >> text=Published At:")).toBeVisible();
  await expect(secondCard.locator("div >> text=Modified At:")).toBeVisible();
  await expect(secondCard.locator("p.text-sm.text-gray-500")).toBeVisible();
});
