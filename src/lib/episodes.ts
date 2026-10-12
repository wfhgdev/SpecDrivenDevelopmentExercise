import { episodes } from "@/content/episodes";
import type { Episode } from "@/content/types";

export function getEpisodesNewestFirst(): Episode[] {
  return [...episodes].sort((a, b) => b.number - a.number);
}

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((episode) => episode.slug === slug);
}

export function getFeaturedEpisode(): Episode {
  const featured = episodes.find((episode) => episode.featured);
  if (featured) {
    return featured;
  }
  return getEpisodesNewestFirst()[0];
}

export function formatDuration(durationMinutes?: number): string {
  if (durationMinutes === undefined) {
    return "TBA";
  }
  return `${durationMinutes} min`;
}

export function formatPublishDate(publishDate: string): string {
  const date = new Date(`${publishDate}T00:00:00Z`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
