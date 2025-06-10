'use client';

import { useState, useEffect } from 'react';
import type { Listing } from '@/types';
import { mockListings } from '@/lib/mockData'; // Using all mockListings for now
import LikedItemCard from '@/components/listing/LikedItemCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HeartCrack, Sailboat } from 'lucide-react';

export default function LikedPage() {
  // In a real app, 'likedListings' would come from user state, context, or an API call.
  // For this demo, we'll assume the first few mock listings are liked.
  const [likedListings, setLikedListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching liked listing IDs and then the listings themselves
    // For demo, let's imagine 'listing1' and 'listing3' are liked.
    const likedIds = ['listing1', 'listing3', 'listing5']; // Example liked IDs
    const fetchedLikedListings = mockListings.filter(listing => likedIds.includes(listing.id));
    setLikedListings(fetchedLikedListings);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Loading your liked treasures...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h1 className="font-headline text-4xl font-bold text-primary mb-2">Your Liked Listings</h1>
        <p className="text-lg text-muted-foreground">
          Here are the boats and yachts you've shown interest in. Ready to take the next step?
        </p>
      </div>

      {likedListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {likedListings.map((listing) => (
            <LikedItemCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card shadow-lg rounded-lg">
          <HeartCrack className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">No Liked Listings Yet</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            You haven't liked any boats or yachts yet. Start exploring to find your perfect match!
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/">
              <Sailboat className="mr-2 h-5 w-5" />
              Discover Listings
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
