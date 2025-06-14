
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Listing } from '@/types';
import { mockListings } from '@/lib/mockData';
import ListingCard from '@/components/listing/ListingCard';
import { Button } from '@/components/ui/button';
import { RotateCcw, ThumbsUp, MapPin, Sailboat, Filter, Ruler } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const BOAT_TYPES = [
  'Sailboat', 'Motor Yacht', 'Catamaran', 'Speedboat', 'Fishing Boat',
  'Skiff', 'Pontoon', 'Center Console', 'Dinghy', 'RIB', 'Trawler', 'Cuddy Cabin'
] as const;


export default function HomePage() {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedListingIds, setLikedListingIds] = useState<Set<string>>(new Set());
  const [dislikedListingIds, setDislikedListingIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [boatPreferences, setBoatPreferences] = useState<typeof BOAT_TYPES[number][]>([]);
  const [minLengthFt, setMinLengthFt] = useState<number | null>(null);
  const [maxLengthFt, setMaxLengthFt] = useState<number | null>(null);
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setAllListings(mockListings);
    setIsLoading(false);
    
    if (typeof window !== 'undefined') {
      const storedLocation = localStorage.getItem('yachtmob_userLocation');
      if (storedLocation) setUserLocation(storedLocation);

      const storedBoatPreferences = localStorage.getItem('yachtmob_boatPreferences');
      if (storedBoatPreferences) {
        try {
          const preferencesArray = JSON.parse(storedBoatPreferences);
          if (Array.isArray(preferencesArray)) {
            setBoatPreferences(preferencesArray as typeof BOAT_TYPES[number][]);
          }
        } catch (error) {
          console.error("Failed to parse boat preferences from localStorage", error);
        }
      }

      const storedMinLength = localStorage.getItem('yachtmob_minLengthFt');
      if (storedMinLength) setMinLengthFt(parseFloat(storedMinLength));
      
      const storedMaxLength = localStorage.getItem('yachtmob_maxLengthFt');
      if (storedMaxLength) setMaxLengthFt(parseFloat(storedMaxLength));
    }
  }, []);

  const processedListings = useMemo(() => {
    let listingsToProcess = [...allListings];

    // 1. Filter by boat preferences
    if (boatPreferences.length > 0) {
      listingsToProcess = listingsToProcess.filter(listing => 
        boatPreferences.includes(listing.type as typeof BOAT_TYPES[number])
      );
    }

    // 2. Filter by length range
    if (minLengthFt !== null) {
      listingsToProcess = listingsToProcess.filter(listing => listing.lengthFt >= minLengthFt);
    }
    if (maxLengthFt !== null) {
      listingsToProcess = listingsToProcess.filter(listing => listing.lengthFt <= maxLengthFt);
    }
    
    // 3. Sort by user location if available
    if (userLocation) {
      listingsToProcess.sort((a, b) => {
        const aMatches = a.location.toLowerCase().includes(userLocation.toLowerCase());
        const bMatches = b.location.toLowerCase().includes(userLocation.toLowerCase());
        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0; 
      });
    }

    // 4. Filter by like/dislike
    listingsToProcess = listingsToProcess.filter(
      (listing) => !likedListingIds.has(listing.id) && !dislikedListingIds.has(listing.id)
    );
    return listingsToProcess;
  }, [allListings, likedListingIds, dislikedListingIds, userLocation, boatPreferences, minLengthFt, maxLengthFt]);

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
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <p className="text-xl font-semibold text-foreground">Loading listings...</p>
      </div>
    );
  }
  
  const hasActiveFilters = userLocation || boatPreferences.length > 0 || minLengthFt !== null || maxLengthFt !== null;
  
  let lengthFilterText = '';
  if (minLengthFt !== null && maxLengthFt !== null) {
    lengthFilterText = `${minLengthFt} - ${maxLengthFt}ft`;
  } else if (minLengthFt !== null) {
    lengthFilterText = `Min ${minLengthFt}ft`;
  } else if (maxLengthFt !== null) {
    lengthFilterText = `Max ${maxLengthFt}ft`;
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4 md:p-8 relative overflow-hidden">
      {isClient && hasActiveFilters && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 transform mb-4 py-2 px-4 text-sm bg-background shadow rounded-md flex flex-wrap justify-center items-center gap-2 md:gap-4">
          {userLocation && (
            <Badge variant="outline" className="flex items-center">
              <MapPin className="h-4 w-4 mr-1.5 text-primary" />
              Near: <strong className="ml-1">{userLocation}</strong>
            </Badge>
          )}
          {boatPreferences.length > 0 && (
             <Badge variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-1.5 text-primary" />
              Types: <strong className="ml-1">{boatPreferences.join(', ')}</strong>
            </Badge>
          )}
          {lengthFilterText && (
            <Badge variant="outline" className="flex items-center">
                <Ruler className="h-4 w-4 mr-1.5 text-primary" />
                Length: <strong className="ml-1">{lengthFilterText}</strong>
            </Badge>
          )}
        </div>
      )}
      {currentListing ? (
        <div className={cn("w-full", hasActiveFilters ? "mt-12 md:mt-16" : "mt-0")}>
            <ListingCard
            key={currentListing.id} 
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
            {hasActiveFilters 
              ? `You've explored all listings matching your current preferences.` 
              : "You've explored all available listings."}
            {' '}Check back later for new additions, review your liked items, or adjust your profile settings.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/liked">View Liked Listings</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={resetInteractions}>
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset Interactions
            </Button>
          </div>
           {isClient && hasActiveFilters && (
             <p className="text-xs text-muted-foreground mt-6">
               Want to see more? You can adjust your <Link href="/profile" className="underline hover:text-primary">profile settings</Link>.
             </p>
           )}
        </div>
      )}
    </div>
  );
}

    
