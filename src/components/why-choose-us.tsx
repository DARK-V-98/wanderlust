
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    imageSrc: '/h.jpg',
    altText: 'Travel consultant discussing plans with a client',
    dataAiHint: 'travel planning',
    title: 'Tailored To You',
    description: 'Forget cookie-cutter tours. We listen to your dreams, preferences, and travel style to design an itinerary that’s uniquely yours. Every suggestion, from boutique hotels to off-the-beaten-path excursions, is handpicked to match your vision.',
    Icon: Briefcase,
  },
  {
    imageSrc: '/j.jpg',
    altText: 'Happy travelers enjoying a scenic view',
    dataAiHint: 'happy travelers',
    title: 'Insider Knowledge, Seamless Execution',
    description: 'With our extensive network and local expertise, we unlock doors to authentic experiences and hidden gems. We handle all the complexities—flights, accommodations, transfers, and activities—so you can relax and immerse yourself in the adventure.',
    Icon: Users,
  },
  {
    imageSrc: '/t.jpg',
    altText: 'Couple watching a beautiful sunset on vacation',
    dataAiHint: 'romantic travel',
    title: 'Memories That Last',
    description: 'Our goal is to create more than just a vacation; we aim to weave a tapestry of unforgettable memories. From breathtaking landscapes to enriching cultural encounters, we\'re committed to making your journey extraordinary.',
    Icon: Award,
  },
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 md:px-6">
      <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-12 text-center">
        At Wanderlust Portfolio, we&apos;re not just another travel agency. We are passionate storytellers, dedicated to crafting journeys that resonate with your spirit of adventure and thirst for discovery. We believe that the best trips are deeply personal, meticulously planned, and filled with moments that stay with you long after you&apos;ve returned home.
      </p>
      <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-8">
        {features.map((feature, index) => {
          const isActive = activeIndex === index;
          const anyActive = activeIndex !== null;

          let orderClass = '';
          if (!anyActive) {
            orderClass = `md:order-${index + 1}`;
          } else {
            if (isActive) {
              orderClass = 'md:order-2';
            } else {
              // Determine order for non-active cards when one is active
              if (activeIndex === 0) { // Leftmost card is active
                orderClass = (index === 1) ? 'md:order-1' : 'md:order-3';
              } else if (activeIndex === 1) { // Middle card is active
                orderClass = (index === 0) ? 'md:order-1' : 'md:order-3';
              } else if (activeIndex === 2) { // Rightmost card is active
                orderClass = (index === 0) ? 'md:order-1' : 'md:order-3';
              }
            }
          }

          return (
            <Card
              key={feature.title}
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(index === activeIndex ? null : index)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              className={cn(
                "group overflow-hidden shadow-lg flex flex-col bg-card/80 backdrop-blur-sm border-white/30 transition-all transform duration-300 ease-in-out cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                orderClass,
                isActive ? 'scale-110 z-20' : (anyActive ? 'scale-90 opacity-75 z-10 md:opacity-60' : 'scale-100 z-0'),
                // On mobile (flex-col), ensure active card is prominent but others are still visible
                isActive && !anyActive && 'z-0', // Default state for non-md screens
                anyActive && !isActive && 'opacity-75' 
              )}
            >
              <div className="relative w-full h-72 overflow-hidden rounded-t-lg">
                <Image
                  src={feature.imageSrc}
                  alt={feature.altText}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={feature.dataAiHint}
                  className="transition-transform duration-300 ease-in-out" // Removed group-hover:scale-105
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary font-headline flex items-center">
                  <feature.Icon className="mr-2 h-6 w-6 text-accent" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
