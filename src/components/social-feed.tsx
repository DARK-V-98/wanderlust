import Image from 'next/image';
import Link from 'next/link';
import type { SocialMediaPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';

interface SocialFeedProps {
  posts: SocialMediaPost[];
}

export default function SocialFeed({ posts }: SocialFeedProps) {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-muted-foreground">No social media posts to display currently.</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 mb-8">
        {posts.map((post) => (
          <Link key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" className="group block relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Image
              src={post.imageUrl}
              alt={post.caption}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={post.dataAiHint || "social travel"}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
              <Instagram className="h-8 w-8 text-white" />
            </div>
          </Link>
        ))}
      </div>
      <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram className="mr-2 h-5 w-5" />
          Follow us on Instagram
        </Link>
      </Button>
    </div>
  );
}
