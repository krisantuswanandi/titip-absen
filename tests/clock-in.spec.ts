import "dotenv/config";
import { test, expect } from "@playwright/test";
import { goToLiveAttendance, isIgnored } from "./utils";

test("Clock In", async ({ page }) => {
  if (isIgnored()) return;
  await goToLiveAttendance(page);

  await page.getByText("Clock In", { exact: true }).click();
  await expect(page.getByText("Successfully clock in")).toBeVisible();
});
