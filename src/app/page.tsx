
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Listing } from '@/types';
import { mockListings } from '@/lib/mockData';
import ListingCard from '@/components/listing/ListingCard';
import { Button } from '@/components/ui/button';
import { RotateCcw, ThumbsUp, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useLocation } from '@/contexts/LocationContext';

export default function HomePage() {
  const { selectedLocation } = useLocation();
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // This might need adjustment based on filtering
  const [likedListingIds, setLikedListingIds] = useState<Set<string>>(new Set());
  const [dislikedListingIds, setDislikedListingIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAllListings(mockListings);
    setIsLoading(false);
    // Load liked/disliked from localStorage if implemented
  }, []);

  // Memoize sorted and filtered listings
  const processedListings = useMemo(() => {
    let listingsToProcess = [...allListings];

    // Filter by like/dislike
    listingsToProcess = listingsToProcess.filter(
      (listing) => !likedListingIds.has(listing.id) && !dislikedListingIds.has(listing.id)
    );

    // Sort by selected location
    if (selectedLocation) {
      listingsToProcess.sort((a, b) => {
        if (a.location === selectedLocation && b.location !== selectedLocation) return -1;
        if (a.location !== selectedLocation && b.location === selectedLocation) return 1;
        // Optional: further sort by date or name if locations are same or both not selected
        // For now, maintain original relative order within the two groups
        return 0; 
      });
    }
    return listingsToProcess;
  }, [allListings, selectedLocation, likedListingIds, dislikedListingIds]);

  // Current listing based on processedListings and currentIndex
  const currentListing = processedListings.length > 0 ? processedListings[currentIndex] : null;

  const advanceCard = () => {
    if (currentIndex < processedListings.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Handle end of list, currentListing will become null
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
  };

  useEffect(() => {
    // When location changes, reset currentIndex to show the first card of the new sorted list
    setCurrentIndex(0);
  }, [selectedLocation]);


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
      {currentListing ? (
        <ListingCard
          key={currentListing.id + '-' + currentIndex} 
          listing={currentListing}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      ) : (
        <div className="text-center p-10 bg-card shadow-xl rounded-lg">
          {processedListings.length === 0 && likedListingIds.size === 0 && dislikedListingIds.size === 0 && selectedLocation ? (
            <>
              <MapPin className="h-24 w-24 text-primary mx-auto mb-6" />
              <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">
                No Listings Found
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                No listings match your current location preference for "{selectedLocation}". Try a different location or view all listings.
              </p>
            </>
          ) : (
             <>
              <ThumbsUp className="h-24 w-24 text-primary mx-auto mb-6" />
              <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">
                You've Seen It All!
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You've explored all available listings based on your current filters. Check back later for new additions, or review your liked items.
              </p>
            </>
          )}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/liked">View Liked Listings</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={resetInteractions}>
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset & Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
