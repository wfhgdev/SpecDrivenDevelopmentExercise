import type { FaqItem } from "@/content/types";

export const faqItems: FaqItem[] = [
  {
    id: "what-is-save-point",
    question: "What is SAVE POINT?",
    answer:
      "SAVE POINT is a weekly podcast about 16-bit era games and the culture " +
      "around them. Each episode loads up one classic topic and plays it " +
      "through to the end.",
    order: 1,
  },
  {
    id: "release-schedule",
    question: "How often do new episodes release?",
    answer:
      "New episodes drop every Sunday. The feed on this site is updated with " +
      "each release — check the Episodes page for the full archive.",
    order: 2,
  },
  {
    id: "how-to-listen",
    question: "How do I listen to an episode?",
    answer:
      "Streaming playback is coming soon. For now, each episode page has all " +
      "the show notes, and the player slot is clearly marked as a placeholder " +
      "until the audio drops.",
    order: 3,
  },
  {
    id: "where-to-follow",
    question: "Where can I follow the show?",
    answer:
      "Follow along on the Episodes page here on the site, and watch this " +
      "space — social links and feed subscription options are on the way.",
    order: 4,
  },
  {
    id: "suggest-a-topic",
    question: "Can I suggest a game or topic?",
    answer:
      "Absolutely. SAVE POINT thrives on playground arguments that never got " +
      "settled. Topic suggestions open with the next season — stay tuned.",
    order: 5,
  },
];
