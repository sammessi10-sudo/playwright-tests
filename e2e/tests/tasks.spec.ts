import { test } from "../fixtures";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Tasks Page", () => {
  let taskName: string;

  test.beforeEach(() => {
    taskName = faker.word.words({ count: 5 });
  });

  test("should create a new task with creator as the assignee", async ({
    taskPage,
    page,
  }) => {
    await page.goto("/");
    await taskPage.createTaskAndVerify({ taskName });
  });

  test("should be able to mark a taks as completed", async ({
    page,
    taskPage,
  }) => {
    await page.goto("/");
    await taskPage.createTaskAndVerify({ taskName });
    await page
      .getByTestId("tasks-pending-table")
      .getByRole("row", { name: taskName })
      .getByRole("checkbox")
      .click();

    const completedTaskInDashboard = page
      .getByTestId("tasks-completed-table")
      .getByRole("row", { name: taskName });

    await completedTaskInDashboard.scrollIntoViewIfNeeded();
    await expect(completedTaskInDashboard).toBeVisible();
  });
});
