import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroCarousel from '@/components/hero-carousel';
import DestinationShowcase from '@/components/destination-showcase';
import InquiryForm from '@/components/inquiry-form';
import SocialFeed from '@/components/social-feed';
import WhyChooseUs from '@/components/why-choose-us';
import { generateDestinationSummary } from '@/ai/flows/destination-summary';
import type { Destination, CarouselImage, SocialMediaPost } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const MOCK_CAROUSEL_IMAGES: CarouselImage[] = [
  { src: '/1.jpg', alt: 'Breathtaking landscape view', dataAiHint: 'adventure landscape', headline: "Explore New Horizons", caption: "Your next adventure is just a click away." },
  { src: '/2.jpg', alt: 'Traveler exploring a vibrant market', dataAiHint: 'travel discovery', headline: "Unforgettable Journeys", caption: "Crafting memories that last a lifetime." },
  { src: '/3.jpg', alt: 'Serene natural wonder', dataAiHint: 'nature wonder', headline: "World of Wonders", caption: "Discover the beauty our planet has to offer." },
  { src: '/4.jpg', alt: 'Modern cityscape contrasting with natural beauty', dataAiHint: 'city nature', headline: "City Escapes & Nature Retreats", caption: "From bustling metropolises to serene landscapes." },
  { src: '/5.jpg', alt: 'Personalized travel map with pins', dataAiHint: 'custom travel', headline: "Personalized Adventures", caption: "Trips tailored to your dreams." },
  { src: '/6.jpg', alt: 'Happy couple enjoying a seamless travel experience', dataAiHint: 'easy travel', headline: "Seamless Travel Experiences", caption: "We handle the details, you enjoy the journey." },
];

const MOCK_DESTINATIONS_RAW: Omit<Destination, 'aiSummary'>[] = [
  {
    id: 'paris',
    name: 'Paris, France',
    image: '/par.jpg',
    dataAiHint: 'Paris EiffelTower',
    fullDescription: 'Paris, the capital of France, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.',
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre Dame'],
    activities: ['Seine River Cruise', 'Visit Montmartre', 'Shopping'],
    localCulture: 'Rich artistic heritage, café culture, haute couture.',
    rating: 4.8,
    reviewsCount: 1250,
    travelTips: 'Use the metro for easy transport. Book popular attractions in advance. Try local pastries.'
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    image: '/japan.jpg',
    dataAiHint: 'Tokyo temple',
    fullDescription: 'Tokyo, Japan’s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods.',
    attractions: ['Shibuya Crossing', 'Tokyo Skytree', 'Senso-ji Temple'],
    activities: ['Sushi Making Class', 'Explore Akihabara', 'Visit Ghibli Museum'],
    localCulture: 'Blend of ancient traditions and futuristic technology, vibrant pop culture.',
    rating: 4.9,
    reviewsCount: 1500,
    travelTips: 'Get a Japan Rail Pass if traveling extensively. Learn basic Japanese phrases. Carry cash as not all places accept cards.'
  },
  {
    id: 'rome',
    name: 'Rome, Italy',
    image: '/rome.jpg',
    dataAiHint: 'Rome Colosseum',
    fullDescription: 'Rome, Italy’s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire.',
    attractions: ['Colosseum', 'Roman Forum', 'Vatican City'],
    activities: ['Pasta Making Class', 'Explore Trastevere', 'Toss a coin in Trevi Fountain'],
    localCulture: 'Deep historical roots, delicious cuisine, passionate locals.',
    rating: 4.7,
    reviewsCount: 1100,
    travelTips: 'Wear comfortable shoes for walking. Beware of pickpockets in crowded areas. Drink from the public water fountains (nasone).'
  },
];

const MOCK_SOCIAL_POSTS: SocialMediaPost[] = [
  { id: '1', imageUrl: 'https://placehold.co/300x300/FFC107/FFFFFF.png', dataAiHint: 'beach selfie', caption: 'Sunny days!', link: '#' },
  { id: '2', imageUrl: 'https://placehold.co/300x300/9C27B0/FFFFFF.png', dataAiHint: 'mountain hike', caption: 'Mountain views', link: '#' },
  { id: '3', imageUrl: 'https://placehold.co/300x300/4CAF50/FFFFFF.png', dataAiHint: 'city food', caption: 'Delicious street food', link: '#' },
  { id: '4', imageUrl: 'https://placehold.co/300x300/F44336/FFFFFF.png', dataAiHint: 'cultural festival', caption: 'Local festival fun', link: '#' },
  { id: '5', imageUrl: 'https://placehold.co/300x300/03A9F4/FFFFFF.png', dataAiHint: 'underwater snorkeling', caption: 'Exploring underwater', link: '#' },
];

// Helper component for consistent section styling
const SectionWrapper = ({ id, title, children, className }: { id: string; title: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`py-12 md:py-16 lg:py-20 px-4 md:px-6 ${className}`}>
    <div className="container mx-auto">
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-8 md:mb-12 text-center">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

export default async function Home() {
  const destinationsWithSummaries: Destination[] = await Promise.all(
    MOCK_DESTINATIONS_RAW.map(async (dest) => {
      try {
        const summaryResult = await generateDestinationSummary({
          destinationName: dest.name,
          description: dest.fullDescription,
          travelTips: dest.travelTips,
        });
        return { ...dest, aiSummary: summaryResult.summary };
      } catch (error) {
        console.error(`Failed to generate summary for ${dest.name}:`, error);
        // Fallback summary in case AI fails
        return { ...dest, aiSummary: `Discover the unique charm of ${dest.name}. Explore its famous landmarks: ${dest.attractions.join(', ')}, and enjoy activities like ${dest.activities.join(', ')}. A truly unforgettable experience awaits!` };
      }
    })
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroCarousel images={MOCK_CAROUSEL_IMAGES} />

        <section id="welcome" className="py-12 md:py-16 lg:py-20 px-4 md:px-6 text-center">
          <div className="container mx-auto">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
              Your Journey Begins Here
            </h1>
            <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-8">
              Explore the world with Wanderlust Portfolio. We craft unforgettable journeys, curate unique experiences, and provide personalized travel plans. Let your adventure begin!
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#destinations">Explore Destinations</Link>
            </Button>
          </div>
        </section>

        <SectionWrapper id="destinations" title="Popular Destinations">
          <DestinationShowcase destinations={destinationsWithSummaries} />
        </SectionWrapper>

        <SectionWrapper id="why-us" title="Why Choose Wanderlust Portfolio?">
          <WhyChooseUs />
        </SectionWrapper>

        <SectionWrapper id="contact" title="Plan Your Next Adventure" className="bg-muted/50">
          <InquiryForm />
        </SectionWrapper>

        <SectionWrapper id="social" title="Follow Our Adventures">
          <SocialFeed posts={MOCK_SOCIAL_POSTS} />
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}
