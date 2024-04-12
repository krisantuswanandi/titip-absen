import type { Page } from "@playwright/test";
import ignoredDates from "./ignore.json";

export async function goToLiveAttendance(page: Page) {
  // get location, default to mid plaza
  const latitude = +(process.env.TALENTA_LATITUDE || -6.2091883);
  const longitude = +(process.env.TALENTA_LONGITUDE || 106.8204898);

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
  const offsetWib = 420 * 60 * 1000;
  const todayWib = new Date(Date.now() + offsetWib);
  const dateWib = todayWib.toISOString().split("T")[0];
  return ignoredDates.includes(dateWib);
}
