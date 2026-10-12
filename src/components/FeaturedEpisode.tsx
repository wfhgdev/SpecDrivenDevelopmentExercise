import Link from "next/link";
import { RetroButton } from "@/components/RetroButton";
import {
  formatDuration,
  formatPublishDate,
  getFeaturedEpisode,
} from "@/lib/episodes";

export function FeaturedEpisode() {
  const episode = getFeaturedEpisode();

  return (
    <section aria-labelledby="featured-heading" className="retro-panel featured-episode">
      <span className="badge-featured">Featured Episode</span>
      <h2 id="featured-heading">
        <Link href={`/episodes/${episode.slug}`}>
          EP {episode.number}: {episode.title}
        </Link>
      </h2>
      <p className="episode-meta">
        {formatPublishDate(episode.publishDate)} · {formatDuration(episode.durationMinutes)}
      </p>
      <p>{episode.shortDescription}</p>
      <div className="featured-actions">
        <RetroButton href={`/episodes/${episode.slug}`}>View Episode</RetroButton>
        <RetroButton href="/episodes" secondary>
          All Episodes
        </RetroButton>
      </div>
    </section>
  );
}
