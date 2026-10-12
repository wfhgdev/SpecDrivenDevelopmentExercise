export interface Episode {
  slug: string;
  number: number;
  title: string;
  shortDescription: string;
  description: string;
  publishDate: string;
  durationMinutes?: number;
  coverArt?: string;
  featured: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface HostBio {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export interface AboutContent {
  hosts: HostBio[];
}

export interface SiteContent {
  name: string;
  tagline: string;
  story: string;
}
