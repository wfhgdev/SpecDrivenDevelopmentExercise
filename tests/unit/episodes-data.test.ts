import { describe, expect, it } from "vitest";
import { episodes } from "@/content/episodes";
import { faqItems } from "@/content/faq";
import { about } from "@/content/about";
import {
  getEpisodeBySlug,
  getEpisodesNewestFirst,
  getFeaturedEpisode,
} from "@/lib/episodes";

describe("episodes data invariants", () => {
  it("INV-1: exactly 20 episodes", () => {
    expect(episodes).toHaveLength(20);
  });

  it("INV-2: slugs are unique and kebab-case", () => {
    const slugs = episodes.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("INV-3: episode numbers are unique integers", () => {
    const numbers = episodes.map((e) => e.number);
    expect(new Set(numbers).size).toBe(numbers.length);
    for (const number of numbers) {
      expect(Number.isInteger(number)).toBe(true);
    }
  });

  it("INV-4: publishDates are valid ISO dates", () => {
    for (const episode of episodes) {
      expect(episode.publishDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(episode.publishDate))).toBe(false);
    }
  });

  it("INV-5: exactly one featured episode", () => {
    const featured = episodes.filter((e) => e.featured);
    expect(featured).toHaveLength(1);
  });

  it("required episode fields are non-empty", () => {
    for (const episode of episodes) {
      expect(episode.title.length).toBeGreaterThan(0);
      expect(episode.shortDescription.length).toBeGreaterThan(0);
      expect(episode.description.length).toBeGreaterThan(0);
    }
  });
});

describe("episode accessors", () => {
  it("INV-8: newest-first sort by number descending", () => {
    const sorted = getEpisodesNewestFirst();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].number).toBeGreaterThan(sorted[i].number);
    }
  });

  it("INV-9: featured episode resolves and never returns undefined", () => {
    const featured = getFeaturedEpisode();
    expect(featured).toBeDefined();
    expect(featured.featured).toBe(true);
  });

  it("getEpisodeBySlug finds and misses correctly", () => {
    expect(getEpisodeBySlug("press-start-hello-world")?.number).toBe(1);
    expect(getEpisodeBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("faq data invariants", () => {
  it("INV-6: at least 5 items with unique ids", () => {
    expect(faqItems.length).toBeGreaterThanOrEqual(5);
    const ids = faqItems.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("about data invariants", () => {
  it("INV-7: at least one host with unique ids", () => {
    expect(about.hosts.length).toBeGreaterThanOrEqual(1);
    const ids = about.hosts.map((h) => h.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
