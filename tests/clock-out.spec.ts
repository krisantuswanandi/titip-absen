import "dotenv/config";
import { test, expect } from "@playwright/test";
import { goToLiveAttendance, isIgnored } from "./utils";

test("Clock Out", async ({ page }) => {
  if (isIgnored()) return;
  await goToLiveAttendance(page);

  await page.getByText("Clock Out", { exact: true }).click();
  await expect(page.getByText("Successfully clock out")).toBeVisible();
});
