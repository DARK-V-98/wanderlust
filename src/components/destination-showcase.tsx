import type { Destination } from '@/types';
import DestinationCard from './destination-card';

interface DestinationShowcaseProps {
  destinations: Destination[];
}

export default function DestinationShowcase({ destinations }: DestinationShowcaseProps) {
  if (!destinations || destinations.length === 0) {
    return <p className="text-center text-muted-foreground">No destinations to display at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} destination={destination} />
      ))}
    </div>
  );
}
