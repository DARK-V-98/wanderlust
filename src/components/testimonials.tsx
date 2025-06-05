import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return <p className="text-center text-muted-foreground">No testimonials to display yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
          <CardHeader className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint || "customer photo"} />
                <AvatarFallback>{testimonial.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl font-bold font-headline text-primary">{testimonial.name}</CardTitle>
                {testimonial.location && (
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0 flex-grow relative">
            <Quote className="absolute top-0 left-0 h-10 w-10 text-primary/20 transform -translate-x-2 -translate-y-2" />
            <p className="text-sm text-foreground italic leading-relaxed z-10 relative">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
          </CardContent>
          <CardFooter className="p-6 pt-0 border-t mt-auto">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400 fill-yellow-400' : (i < testimonial.rating ? 'text-yellow-400 fill-yellow-400 opacity-60' : 'text-gray-300')}`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">({testimonial.rating.toFixed(1)})</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
