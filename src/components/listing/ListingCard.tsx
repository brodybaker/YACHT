
'use client';

import type { Listing } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, X, Ship, MapPin, CalendarDays, DollarSign, Maximize, CheckCircle, Info, PanelRightOpen, PanelRightClose, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  listing: Listing;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  className?: string;
}

export default function ListingCard({ listing, onLike, onDislike, className }: ListingCardProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(!!listing.videoUrl);
  const [animate, setAnimate] = useState(''); // 'animate-slide-out' or 'animate-slide-in'
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);

  useEffect(() => {
    // Reset state when listing changes
    setCurrentMediaIndex(0);
    setShowVideo(!!listing.videoUrl);
    setAnimate('animate-slide-in'); // Trigger entry animation for new card
    setShowDetailsPanel(false); // Close details panel for new listing

    const timer = setTimeout(() => setAnimate(''), 300); // Clear animation class after it finishes
    return () => clearTimeout(timer);
  }, [listing]);


  const mediaItems = listing.videoUrl
    ? [listing.videoUrl, ...listing.imageUrls]
    : listing.imageUrls;

  // totalMediaItems is not used, can be removed if not needed elsewhere later
  // const totalMediaItems = mediaItems.length;

  const handleInteraction = (interactionType: 'like' | 'dislike') => {
    setAnimate('animate-slide-out');
    setTimeout(() => {
      if (interactionType === 'like') {
        onLike(listing.id);
      } else {
        onDislike(listing.id);
      }
      // The parent component will change the listing, triggering useEffect for slide-in
    }, 300); // Match animation duration
  };
  
  const nextMedia = () => {
    if (showVideo && currentMediaIndex === 0) { // transitioning from video to first image
      setShowVideo(false);
      setCurrentMediaIndex(0); // First image is at index 0 of imageUrls
    } else {
      const imageIndex = showVideo ? currentMediaIndex : currentMediaIndex + 1; // if video was shown, currentMediaIndex is 0 for it, images start at 0 in imageUrls
      if (imageIndex < listing.imageUrls.length) {
        setCurrentMediaIndex(imageIndex);
        setShowVideo(false);
      } else if (listing.videoUrl && listing.imageUrls.length > 0) { // Loop back to video if images end
        setShowVideo(true);
        setCurrentMediaIndex(0); // Reset currentMediaIndex as it refers to video
      }
    }
  };

  const prevMedia = () => {
    if (!showVideo && currentMediaIndex === 0 && listing.videoUrl) { // transitioning from first image to video
      setShowVideo(true);
      setCurrentMediaIndex(0); // Reset currentMediaIndex as it refers to video
    } else if (!showVideo && currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
    // No action if on video and trying to go prev, or on first image without video
  };


  return (
    <div className={cn(
      'relative mx-auto w-full transition-all duration-300 ease-in-out',
      showDetailsPanel ? 'max-w-4xl' : 'max-w-2xl',
      className,
      animate
    )}>
      <div className="flex w-full">
        <Card className={cn(
          'shadow-xl overflow-hidden flex-shrink-0 transition-all duration-300 ease-in-out flex flex-col',
          showDetailsPanel ? 'w-[calc(100%-20rem)] rounded-r-none' : 'w-full rounded-lg'
        )}>
          <CardHeader className="p-0 relative">
            <div className="aspect-video w-full bg-muted relative overflow-hidden">
              {showVideo && listing.videoUrl ? (
                <video
                  key={listing.id + '-video'}
                  src={listing.videoUrl}
                  poster={listing.imageUrls[0] || `https://placehold.co/800x450.png?text=${listing.name}`}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                  data-ai-hint="boat video"
                />
              ) : listing.imageUrls.length > 0 ? (
                <Image
                  src={listing.imageUrls[currentMediaIndex]}
                  alt={`${listing.name} - Image ${currentMediaIndex + 1}`}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  data-ai-hint="yacht boat"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <Ship className="w-24 h-24 text-muted-foreground" />
                </div>
              )}
              {(listing.videoUrl || listing.imageUrls.length > 1) && (
                <>
                  {((showVideo && listing.imageUrls.length > 0) || (!showVideo && currentMediaIndex < listing.imageUrls.length -1) || (!showVideo && currentMediaIndex === listing.imageUrls.length-1 && listing.videoUrl)) && (
                    <Button onClick={nextMedia} variant="outline" size="icon" className="absolute right-12 top-2 bg-black/30 hover:bg-black/50 border-none text-white"> <Maximize className="h-5 w-5 rotate-90" /> </Button>
                  )}
                  {((!showVideo && currentMediaIndex > 0) || (!showVideo && currentMediaIndex === 0 && listing.videoUrl)) && (
                    <Button onClick={prevMedia} variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 border-none text-white"> <Maximize className="h-5 w-5 -rotate-90" /> </Button>
                  )}
                </>
              )}
            </div>
            <div className="absolute top-2 right-2 z-10">
              <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetailsPanel(!showDetailsPanel)}
                  className="bg-black/40 hover:bg-black/60 border-none text-white shadow-md"
                  aria-label={showDetailsPanel ? "Close details panel" : "Open details panel"}
                >
                  {showDetailsPanel ? (
                    <>
                      <PanelRightClose />
                      Less
                    </>
                  ) : (
                    <>
                      <PanelRightOpen />
                      More
                    </>
                  )}
                </Button>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
              <CardTitle className="font-headline text-3xl text-white drop-shadow-lg">{listing.name}</CardTitle>
              <CardDescription className="text-primary-foreground/90 text-sm flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" /> {listing.location}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4 flex-grow">
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="text-lg font-semibold py-1 px-3">
                <DollarSign className="h-5 w-5 mr-1" />
                {listing.price.toLocaleString()}
              </Badge>
              <Badge variant="outline">
                <Ship className="h-4 w-4 mr-1.5" />
                {listing.type}
              </Badge>
            </div>
            
            <p className="text-foreground/80 leading-relaxed line-clamp-3">{listing.description}</p>

          </CardContent>
          <CardFooter className="flex justify-around p-4 border-t">
            <Button variant="outline" size="lg" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-32 h-16 rounded-full shadow-lg transform hover:scale-105 transition-transform" onClick={() => handleInteraction('dislike')}>
              <X className="h-8 w-8 mr-2" />
              <span className="text-lg">Nope</span>
            </Button>
            <Button variant="outline" size="lg" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white w-32 h-16 rounded-full shadow-lg transform hover:scale-105 transition-transform" onClick={() => handleInteraction('like')}>
              <Heart className="h-8 w-8 mr-2" />
              <span className="text-lg">Like</span>
            </Button>
          </CardFooter>
        </Card>

        <div className={cn(
          'transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0',
          showDetailsPanel && listing ? 'w-80 opacity-100' : 'w-0 opacity-0'
        )}>
          {showDetailsPanel && listing && (
            <Card className="h-full shadow-xl rounded-l-none flex flex-col border-l">
              <CardHeader className="p-4 border-b">
                <CardTitle className="font-headline text-xl text-primary">Full Details</CardTitle>
              </CardHeader>
              <ScrollArea className="flex-1">
                <CardContent className="p-4 space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Ship className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div><strong>Type:</strong> {listing.type}</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Maximize className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div><strong>Length:</strong> {listing.lengthFt} ft</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CalendarDays className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div><strong>Year:</strong> {listing.year}</div>
                  </div>
                  {listing.cabins && (
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div><strong>Cabins:</strong> {listing.cabins}</div>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div><strong>Location:</strong> {listing.location}</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div><strong>Price:</strong> ${listing.price.toLocaleString()}</div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div><strong>Posted:</strong> {new Date(listing.postedDate).toLocaleDateString()} by {listing.postedBy.name}</div>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-semibold text-md mb-1 text-foreground">Full Description:</h4>
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{listing.description}</p>
                  </div>
                </CardContent>
              </ScrollArea>
              <CardFooter className="p-4 border-t">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                    <Link href={`/listing/${listing.id}`}>
                        <Eye className="mr-2 h-5 w-5" />
                        Go to Full Page
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

