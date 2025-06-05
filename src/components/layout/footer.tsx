import Link from 'next/link';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-muted py-8 text-muted-foreground">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm mb-4 md:mb-0">
          &copy; {currentYear} Wanderlust Portfolio. All rights reserved. Made By ESystemLk (Vishwa Vidarshana).
        </p>
        <div className="flex items-center space-x-4">
          {socialLinks.map(({ Icon, href, label }) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors">
              <Icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
