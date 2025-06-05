export interface Destination {
  id: string;
  name: string;
  image: string;
  dataAiHint?: string;
  fullDescription: string;
  attractions: string[];
  activities: string[];
  localCulture: string;
  rating: number; // 1-5
  reviewsCount: number;
  travelTips?: string; // Optional for AI
  aiSummary?: string; // To store the generated summary
}

export interface CarouselImage {
  src: string;
  alt: string;
  dataAiHint?: string;
  headline?: string;
  caption?: string;
}

export interface SocialMediaPost {
  id: string;
  imageUrl: string;
  dataAiHint?: string;
  caption: string;
  link: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatarSrc: string;
  dataAiHint?: string;
  quote: string;
  rating: number; // 1-5
  location?: string;
}
