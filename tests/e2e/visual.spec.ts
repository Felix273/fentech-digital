import { expect, test } from "@playwright/test";

const routes = {
  home: "/",
  services: "/services",
  contact: "/contact",
  admin: "/admin",
} as const;

async function preparePage(page: import("@playwright/test").Page) {
  await page.route("**/*", async (route) => {
    const url = route.request().url();
    if (/googletagmanager|google-analytics|doubleclick|googlesyndication/.test(url)) {
      await route.abort();
      return;
    }
    await route.continue();
  });

  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        transition-duration: 0s !important;
        caret-color: transparent !important;
      }
    `,
  });
}

async function gotoStable(page: import("@playwright/test").Page, path: string) {
  await page.goto(path, { waitUntil: "networkidle" });
  await preparePage(page);
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(750);
}

test.describe("Linear public surfaces", () => {
  test("homepage visual baseline", async ({ page }) => {
    await gotoStable(page, routes.home);
    await expect(page).toHaveScreenshot("home.png");
  });

  test("services visual baseline", async ({ page }) => {
    await gotoStable(page, routes.services);
    await expect(page).toHaveScreenshot("services.png");
  });

  test("contact visual baseline", async ({ page }) => {
    await gotoStable(page, routes.contact);
    await expect(page).toHaveScreenshot("contact.png");
  });

  test("admin login visual baseline", async ({ page }) => {
    await gotoStable(page, routes.admin);
    await expect(page).toHaveScreenshot("admin.png");
  });

  test("menu-open visual baseline", async ({ page }) => {
    await gotoStable(page, routes.home);
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog", { name: "FenTech site menu" })).toBeVisible();
    await expect(page).toHaveScreenshot("home-menu-open.png");
  });
});
