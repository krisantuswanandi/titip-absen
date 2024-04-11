import { test, expect } from "@playwright/test";
import { goToLiveAttendance, skip } from "./utils";

test("Clock In", async ({ page }) => {
  if (skip()) return;
  await goToLiveAttendance(page);

  await page.getByText("Clock In", { exact: true }).click();
  await expect(page.getByText("Successfully clock in")).toBeVisible();
});
