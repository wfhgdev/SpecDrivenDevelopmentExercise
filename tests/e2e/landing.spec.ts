import { expect, test } from "@playwright/test";

test.describe("landing page (US1)", () => {
  test("shows podcast name, tagline, and exactly one featured episode block", async ({
    page,
  }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveText("SAVE POINT");
    await expect(page.locator(".hero-tagline")).toBeVisible();

    const featuredBlocks = page.locator(".featured-episode");
    await expect(featuredBlocks).toHaveCount(1);
    await expect(page.getByText("Featured Episode")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "View Episode" }),
    ).toBeVisible();
  });

  test("featured block links to episode detail and episodes list", async ({
    page,
  }) => {
    await page.goto("/");
    const viewEpisode = page.getByRole("link", { name: "View Episode" });
    const href = await viewEpisode.getAttribute("href");
    expect(href).toMatch(/^\/episodes\//);

    await expect(page.getByRole("link", { name: "All Episodes" })).toHaveAttribute(
      "href",
      "/episodes",
    );
  });

  test("header nav exposes all four routes (SC-001)", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Episodes" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "FAQ" })).toBeVisible();
  });
});
