import { test, expect } from "@playwright/test";

test("desktop chat, outage, explicit review, and saved preference", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Your next move, understood." }),
  ).toBeVisible();
  if (!process.env.TEST_BASE_URL)
    await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page.getByRole("button", { name: "Explain the BTC signal" }).click();
  await expect(page.getByRole("log")).toContainText("The sample BTC snapshot");
  await expect(page.getByRole("log")).toContainText("Confidence: not assessed");
  await page.getByLabel("Simulate data outage").check();
  await page.getByLabel("Ask CoinPilot").fill("Check BTC again");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("log")).toContainText("AI couldn't verify this");
  await expect(
    page.getByRole("button", { name: "Approve demo" }),
  ).toBeDisabled();
  await page
    .getByLabel(
      "I understand this approval is a demo and cannot execute a trade.",
    )
    .check();
  await page.getByRole("button", { name: "Approve demo" }).click();
  await expect(page.getByRole("status")).toContainText("No trade was placed");
  await page.getByRole("button", { name: "Reset demo" }).click();
  await page.getByRole("button", { name: "Reject", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Demo rejected");
  await page.getByRole("button", { name: "Preferences", exact: true }).click();
  await page.getByRole("radio", { name: /cautious/ }).check();
  await page.getByRole("button", { name: "Save preference" }).click();
  await expect(page.getByRole("status")).toContainText("Preference saved");
  await page.reload();
  await expect(page.getByText("Risk preference: cautious")).toBeVisible();
  await page.getByRole("button", { name: "Portfolio", exact: true }).click();
  await expect(page.getByRole("table")).toContainText("$11,106.00");
  await page.getByRole("link", { name: "Architecture notes" }).click();
  await expect(
    page.getByRole("heading", { name: "Clear boundaries. Safer foundations." }),
  ).toBeVisible();
});

test("phone layout keeps content within the viewport and supports navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Your next move, understood." }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  if (!process.env.TEST_BASE_URL)
    await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  await page.getByRole("button", { name: "AI Copilot" }).click();
  await page.getByRole("button", { name: "Review my portfolio risk" }).click();
  await expect(page.getByRole("log")).toContainText("BTC is 45%");
  await page.getByRole("button", { name: "Preferences", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Your risk preference" }),
  ).toBeVisible();
});
