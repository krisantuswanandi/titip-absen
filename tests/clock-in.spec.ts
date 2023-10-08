import { test, expect } from "@playwright/test";
import { goToLiveAttendance } from "./utils";

test("Clock In", async ({ page }) => {
  await goToLiveAttendance(page);

  await page.getByText("Clock In").click();
  await expect(page.getByText("Successfully clock in")).toBeVisible();
});
