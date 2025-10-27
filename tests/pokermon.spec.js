// @ts-check
import { test, expect } from "@playwright/test";

const URL = "";
const REG = /\/pokemon/;

test("list container is shown", async ({ page }) => {
  await page.goto(URL);

  const locator = await page.locator(".list-container");

  // Expect a title "to contain" a substring.
  await expect(locator).toBeVisible();
});
test("list item is shown", async ({ page }) => {
  await page.goto(URL);

  const list = await page.locator(".list-container");
  const all = await list.locator(".list-item-name").all();

  expect(all.length > 0).toBeTruthy();

  await all[0].click();

  await page.waitForURL(REG);
  await expect(page).toHaveURL(REG);
  await page.waitForSelector(".links");
  const home = page.getByText("Home");
  await expect(home).toBeVisible(); // confirms page is loaded
  //await expect(page.getByText("GET")).toBeVisible(); // confirms page is loaded
  //await expect(page.getByTestId("body")).toBeVisible(); // confirms page is loaded

  const locators = await page.locator("*").all();
  const cns = [];
  for (const locator of locators) {
    const className = await locator.getAttribute("class");
    if (className === "links") {
      console.log("Found matching locator:", className);
      cns.push(className);
    }
  }
  console.log("-----", cns);
  expect(cns.length).toBe(1);

  await home.click();
  await page.waitForURL(URL);
  const main = await page.locator(".list-container");

  // Expect a title "to contain" a substring.
  await expect(main).toBeVisible();
  console.log("main class=", await main.getAttribute("class"));
});
