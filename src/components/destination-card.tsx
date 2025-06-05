import Image from 'next/image';
import { Star, MessageSquare } from 'lucide-react';
import type { Destination } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative w-full h-56">
          <Image
            src={destination.image}
            alt={`Image of ${destination.name}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={destination.dataAiHint || "travel destination"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-bold mb-2 text-primary font-headline">{destination.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {destination.aiSummary || destination.fullDescription.substring(0, 120) + "..."}
        </CardDescription>
        
        <div className="mb-3">
          <h4 className="font-semibold text-sm mb-1">Key Attractions:</h4>
          <div className="flex flex-wrap gap-1">
            {destination.attractions.slice(0, 3).map(attr => (
              <Badge variant="secondary" key={attr} className="text-xs">{attr}</Badge>
            ))}
          </div>
        </div>

      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center border-t mt-auto">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < Math.floor(destination.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">({destination.reviewsCount} reviews)</span>
        </div>
      </CardFooter>
    </Card>
  );
}
