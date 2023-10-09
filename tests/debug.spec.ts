import { test, expect } from "@playwright/test";
import { goToLiveAttendance } from "./utils";

test("Debug", async ({ page }) => {
  await goToLiveAttendance(page);

  await expect(page.getByText("Attendance log")).toBeVisible();
});
