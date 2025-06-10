'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import type { Listing } from '@/types';
import { mockListings } from '@/lib/mockData';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ship, MapPin, CalendarDays, DollarSign, Maximize, CheckCircle, Info, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ListingDetailPage() {
  const params = useParams();
  const listingId = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(() => {
    const foundListing = mockListings.find(l => l.id === listingId);
    setListing(foundListing || null);
    setIsLoading(false);
  }, [listingId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <p className="text-xl font-semibold text-foreground">Loading listing details...</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="text-center py-20 bg-card shadow-lg rounded-lg">
        <Ship className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
        <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">Listing Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the listing you're looking for. It might have been removed or the link is incorrect.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Discover
          </Link>
        </Button>
      </div>
    );
  }
  
  const mediaItems = listing.videoUrl ? [listing.videoUrl, ...listing.imageUrls] : listing.imageUrls;
  const totalMediaItems = mediaItems.length;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % listing.imageUrls.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + listing.imageUrls.length) % listing.imageUrls.length);


  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Discover
        </Link>
      </Button>
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="p-0 relative">
          {listing.videoUrl && (
            <div className="aspect-video w-full bg-muted relative overflow-hidden mb-4">
              <video
                key={listing.id + '-video-detail'}
                src={listing.videoUrl}
                poster={listing.imageUrls[0] || `https://placehold.co/800x600.png?text=${listing.name}`}
                controls
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
                data-ai-hint="boat video"
              />
            </div>
          )}
          {listing.imageUrls.length > 0 && (
            <div className="relative">
               <div className="aspect-video w-full bg-muted relative overflow-hidden">
                <Image
                    src={listing.imageUrls[currentImageIndex]}
                    alt={`${listing.name} - Image ${currentImageIndex + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                    data-ai-hint="yacht boat detail"
                    priority
                />
              </div>
              {listing.imageUrls.length > 1 && (
                <>
                  <Button onClick={prevImage} variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-none text-white"> <Maximize className="h-5 w-5 -rotate-90" /> </Button>
                  <Button onClick={nextImage} variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-none text-white"> <Maximize className="h-5 w-5 rotate-90" /> </Button>
                </>
              )}
            </div>
          )}
          {listing.imageUrls.length === 0 && !listing.videoUrl && (
             <div className="aspect-video w-full flex items-center justify-center bg-muted">
              <Ship className="w-24 h-24 text-muted-foreground" />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <CardTitle className="font-headline text-4xl text-primary mb-2">{listing.name}</CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground text-md">
              <MapPin className="h-5 w-5 text-primary" /> {listing.location}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <Badge variant="secondary" className="text-xl font-semibold py-2 px-4">
              <DollarSign className="h-6 w-6 mr-2" />
              {listing.price.toLocaleString()}
            </Badge>
            <Badge variant="outline" className="text-md py-1 px-3">
              <Ship className="h-5 w-5 mr-1.5" />
              {listing.type}
            </Badge>
          </div>
          
          <p className="text-foreground/90 leading-relaxed text-lg">{listing.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-md border-t pt-6">
            <div className="flex items-center gap-3">
              <Maximize className="h-6 w-6 text-primary" />
              <span className="font-medium">Length:</span> {listing.lengthFt} ft
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="h-6 w-6 text-primary" />
              <span className="font-medium">Year:</span> {listing.year}
            </div>
            {listing.cabins && (
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                <span className="font-medium">Cabins:</span> {listing.cabins}
              </div>
            )}
            <div className="flex items-center gap-3">
              <Info className="h-6 w-6 text-primary" />
              <span className="font-medium">Posted:</span> {new Date(listing.postedDate).toLocaleDateString()} by {listing.postedBy.name}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 border-t">
          <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg" asChild>
             <Link href={`/messages/${listing.id}?userId=${listing.postedBy.id}`}>
              <MessageSquare className="h-6 w-6 mr-3" />
              Contact Lister ({listing.postedBy.name})
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
