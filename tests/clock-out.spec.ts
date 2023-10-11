import { test, expect } from "@playwright/test";
import { goToLiveAttendance } from "./utils";

test("Clock Out", async ({ page }) => {
  await goToLiveAttendance(page);

  await page.getByText("Clock Out", { exact: true }).click();
  await expect(page.getByText("Successfully clock out")).toBeVisible();
});
