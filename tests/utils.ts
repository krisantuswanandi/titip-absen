import type { Page } from "@playwright/test";
import ignoredDates from "./ignore.json";

import "dotenv/config";

export async function goToLiveAttendance(page: Page) {
  const latitude = +process.env.TALENTA_LATITUDE!;
  const longitude = +process.env.TALENTA_LONGITUDE!;

  // set geolocation
  const browserContext = await page.context();
  await browserContext.grantPermissions(["geolocation"]);
  await browserContext.setGeolocation({ latitude, longitude });

  // login mekari
  await page.goto("https://account.mekari.com/users/sign_in");

  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill(process.env.TALENTA_USERNAME!);

  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(process.env.TALENTA_PASSWORD!);

  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  // attendance page
  await page.goto("https://hr.talenta.co");
  await page.getByText("Live attendance", { exact: true }).click();
}

export function skip() {
  const dateWib = new Date().toISOString().split("T")[0];
  return ignoredDates.includes(dateWib);
}
