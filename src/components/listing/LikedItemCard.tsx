import type { Listing } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, MapPin, MessageSquare, Ship, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LikedItemCardProps {
  listing: Listing;
}

export default function LikedItemCard({ listing }: LikedItemCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Link href={`/listing/${listing.id}`}>
          <div className="aspect-video w-full bg-muted relative">
            <Image
              src={listing.imageUrls[0] || `https://placehold.co/400x300.png?text=${listing.name}`}
              alt={listing.name}
              width={400}
              height={225}
              className="w-full h-full object-cover"
              data-ai-hint="yacht boat"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-1 hover:text-primary transition-colors">
          <Link href={`/listing/${listing.id}`}>{listing.name}</Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> {listing.location}
        </CardDescription>
        
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="py-0.5 px-2">
            <DollarSign className="h-4 w-4 mr-1" />
            {listing.price.toLocaleString()}
          </Badge>
          <Badge variant="outline" className="py-0.5 px-2">
             <Ship className="h-3.5 w-3.5 mr-1" />
            {listing.type}
          </Badge>
        </div>
        <p className="text-sm text-foreground/80 line-clamp-3">{listing.description}</p>
      </CardContent>
      <CardFooter className="p-4 border-t flex gap-2">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/messages/${listing.id}?userId=${listing.postedBy.id}`}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Message Lister
          </Link>
        </Button>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
           <Link href={`/listing/${listing.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
