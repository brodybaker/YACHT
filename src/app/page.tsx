
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Listing } from '@/types';
import { mockListings } from '@/lib/mockData';
import ListingCard from '@/components/listing/ListingCard';
import { Button } from '@/components/ui/button';
import { RotateCcw, ThumbsUp, MapPin, Info } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedListingIds, setLikedListingIds] = useState<Set<string>>(new Set());
  const [dislikedListingIds, setDislikedListingIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Indicate component has mounted
    setAllListings(mockListings);
    setIsLoading(false);
    
    // Attempt to load user's location from localStorage
    const storedLocation = localStorage.getItem('yachtmob_userLocation');
    if (storedLocation) {
      setUserLocation(storedLocation);
    }
    // Load liked/disliked from localStorage if implemented
  }, []);

  const processedListings = useMemo(() => {
    let listingsToProcess = [...allListings];

    // Sort by user location if available
    if (userLocation) {
      listingsToProcess.sort((a, b) => {
        const aMatches = a.location.toLowerCase() === userLocation.toLowerCase();
        const bMatches = b.location.toLowerCase() === userLocation.toLowerCase();
        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0; // Keep original order for non-matching or both matching
      });
    }

    // Filter by like/dislike
    listingsToProcess = listingsToProcess.filter(
      (listing) => !likedListingIds.has(listing.id) && !dislikedListingIds.has(listing.id)
    );
    return listingsToProcess;
  }, [allListings, likedListingIds, dislikedListingIds, userLocation]);

  const currentListing = processedListings.length > 0 && currentIndex < processedListings.length ? processedListings[currentIndex] : null;

  const advanceCard = () => {
    if (currentIndex < processedListings.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(processedListings.length); 
    }
  };

  const handleLike = (id: string) => {
    setLikedListingIds((prev) => new Set(prev).add(id));
    advanceCard();
  };

  const handleDislike = (id: string) => {
    setDislikedListingIds((prev) => new Set(prev).add(id));
    advanceCard();
  };
  
  const resetInteractions = () => {
    setLikedListingIds(new Set());
    setDislikedListingIds(new Set());
    setCurrentIndex(0);
    // Optionally clear stored location for demo purposes if desired
    // if (isClient) localStorage.removeItem('yachtmob_userLocation');
    // setUserLocation(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <p className="text-xl font-semibold text-foreground">Loading listings...</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4 md:p-8 relative overflow-hidden">
      {isClient && userLocation && currentListing && (
        <Badge variant="outline" className="absolute top-0 left-1/2 -translate-x-1/2 transform mb-4 py-2 px-4 text-sm bg-background shadow">
          <MapPin className="h-4 w-4 mr-2 text-primary" />
          Prioritizing listings near: <strong className="ml-1">{userLocation}</strong>
        </Badge>
      )}
      {currentListing ? (
        <div className="mt-8"> {/* Add margin-top if badge is shown */}
            <ListingCard
            key={currentListing.id + '-' + currentIndex} 
            listing={currentListing}
            onLike={handleLike}
            onDislike={handleDislike}
            />
        </div>
      ) : (
        <div className="text-center p-10 bg-card shadow-xl rounded-lg">
          <ThumbsUp className="h-24 w-24 text-primary mx-auto mb-6" />
          <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">
            You've Seen It All!
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {userLocation ? `You've explored all available listings, including those prioritized for "${userLocation}".` : "You've explored all available listings."}
            {' '}Check back later for new additions, or review your liked items.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/liked">View Liked Listings</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={resetInteractions}>
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset & Start Over
            </Button>
          </div>
           {isClient && userLocation && (
             <p className="text-xs text-muted-foreground mt-6">
               Not in {userLocation}? You can <Link href="/signup" className="underline">update your location</Link> by signing up again (demo).
             </p>
           )}
        </div>
      )}
    </div>
  );
}
