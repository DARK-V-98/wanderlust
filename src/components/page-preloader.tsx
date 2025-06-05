
'use client';

import { Plane } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PagePreloaderProps {
  isLoading: boolean;
}

export default function PagePreloader({ isLoading }: PagePreloaderProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-xl transition-opacity duration-700 ease-in-out',
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      aria-hidden={!isLoading}
    >
      <div className="relative flex flex-col items-center p-4">
        <Plane className="h-16 w-16 text-primary animate-pulse" />
        <h1 className="mt-6 font-headline text-3xl sm:text-4xl font-bold text-primary text-center">
          Wanderlust Portfolio
        </h1>
        <p className="mt-3 text-lg text-foreground text-center">
          Loading your next adventure...
        </p>
      </div>
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 h-[200%] w-[200%] animate-spin-slow bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      </div>
      <style jsx>{`
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .animate-pulse {
         animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
