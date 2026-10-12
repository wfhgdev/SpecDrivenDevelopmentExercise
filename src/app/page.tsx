import { FeaturedEpisode } from "@/components/FeaturedEpisode";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1>{site.name}</h1>
        <p className="hero-tagline">{site.tagline}</p>
      </section>
      <FeaturedEpisode />
    </>
  );
}
