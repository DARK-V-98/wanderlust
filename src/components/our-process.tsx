import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Edit3, Send, CheckCircle } from 'lucide-react'; // Updated icons

const processSteps = [
  {
    Icon: Lightbulb,
    title: '1. Share Your Dream',
    description: "Tell us about your ideal vacation – your desired destinations, activities, and travel style. We're here to listen and understand your vision.",
    dataAiHint: "travel consultation",
  },
  {
    Icon: Edit3,
    title: '2. We Plan & Personalize',
    description: "Our experts craft a bespoke itinerary tailored to you. We'll refine every detail, from unique accommodations to exclusive experiences, ensuring it's a perfect fit.",
    dataAiHint: "custom itinerary",
  },
  {
    Icon: CheckCircle,
    title: '3. Confirm & Anticipate',
    description: "Review your personalized plan. Once you're thrilled, we handle all bookings and logistics, so you can relax and look forward to your adventure.",
    dataAiHint: "travel booking",
  },
  {
    Icon: Send,
    title: '4. Travel & Treasure',
    description: 'Embark on your seamless journey! Create unforgettable memories, knowing we offer support every step of the way for a worry-free experience.',
    dataAiHint: "enjoy vacation",
  },
];

export default function OurProcess() {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto mb-12 text-center">
        Planning your dream getaway with Wanderlust Portfolio is simple and enjoyable. Here’s how we turn your travel aspirations into reality:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {processSteps.map((step) => (
          <Card key={step.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col text-center bg-card/90">
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                <step.Icon className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-primary font-headline">
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
