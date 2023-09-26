import { test, expect } from "@playwright/test";

test("Clock out", async ({ page }) => {
  // set geolocation
  const browserContext = await page.context();
  await browserContext.grantPermissions(["geolocation"]);
  await browserContext.setGeolocation({
    latitude: +process.env.TALENTA_LATITUDE!,
    longitude: +process.env.TALENTA_LONGITUDE!,
  });

  // login mekari
  await page.goto("https://account.mekari.com/users/sign_in");

  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill(process.env.TALENTA_USERNAME!);

  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(process.env.TALENTA_PASSWORD!);

  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  // attendance page
  await page.goto("https://hr.talenta.co/live-attendance");

  await expect(page.getByText("Attendance log")).toBeVisible();
});
