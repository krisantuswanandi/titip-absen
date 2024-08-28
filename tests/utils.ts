import "dotenv/config";
import { readFileSync } from "fs";
import type { Page } from "@playwright/test";

export async function goToLiveAttendance(page: Page) {
  const { latitude, longitude } = getLocation();

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

function todayIs(file: string) {
  try {
    const content = readFileSync(file, "utf-8");
    const dates = content.split("\n");
    const today = new Date().toISOString().split("T")[0];
    return dates.includes(today);
  } catch {
    return false;
  }
}

export const isIgnored = () => todayIs("./data/ignore");
export const isWfo = () => todayIs("./data/wfo");

export function getLocation() {
  const latitude = isWfo()
    ? process.env.TALENTA_LATITUDE_WFO
    : process.env.TALENTA_LATITUDE_WFH;
  const longitude = isWfo()
    ? process.env.TALENTA_LONGITUDE_WFO
    : process.env.TALENTA_LONGITUDE_WFH;

  return {
    latitude: Number(latitude),
    longitude: Number(longitude),
  };
}
