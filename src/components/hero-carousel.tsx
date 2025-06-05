"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import type { CarouselImage } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroCarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
}

export default function HeroCarousel({ images, autoPlayInterval = 5000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (autoPlayInterval > 0 && images.length > 1) {
      const timer = setTimeout(goToNext, autoPlayInterval);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, goToNext, autoPlayInterval, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="h-[60vh] md:h-[80vh] flex items-center justify-center bg-muted text-muted-foreground">
        No images available for carousel.
      </div>
    );
  }

  return (
    <div className="relative h-[60vh] md:h-[calc(100vh-4rem)] w-full overflow-hidden group">
      {images.map((image, index) => (
        <div
          key={image.src}
          className={cn(
            "absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out",
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            layout="fill"
            objectFit="cover"
            priority={index === 0}
            className="brightness-75"
            data-ai-hint={image.dataAiHint || "travel landscape"}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/30">
            {image.headline && (
              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-down">
                {image.headline}
              </h1>
            )}
            {image.caption && (
              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl animate-fade-in-up">
                {image.caption}
              </p>
            )}
          </div>
        </div>
      ))}

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 text-white bg-black/30 hover:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {images.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={cn(
                  "p-1 rounded-full transition-colors duration-300",
                  currentIndex === slideIndex ? "bg-white/80" : "bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Go to slide ${slideIndex + 1}`}
              >
                <Circle className={cn(
                  "h-2 w-2 fill-current",
                   currentIndex === slideIndex ? "text-primary" : "text-transparent"
                  )} />
              </button>
            ))}
          </div>
        </>
      )}
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.3s forwards;
        }
      `}</style>
    </div>
  );
}
