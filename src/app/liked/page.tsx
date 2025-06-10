
'use client';

import { useState, useEffect } from 'react';
import type { Listing } from '@/types';
import { mockListings } from '@/lib/mockData';
import LikedItemCard from '@/components/listing/LikedItemCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, HeartCrack, Sailboat, UserCircle, LogIn } from 'lucide-react';

export default function LikedPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulate auth
  const [viewMode, setViewMode] = useState<'liked' | 'disliked'>('liked');
  const [likedListings, setLikedListings] = useState<Listing[]>([]);
  const [dislikedListingsState, setDislikedListingsState] = useState<Listing[]>([]); // Renamed to avoid conflict
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, check actual auth status.
    // For demo, setIsAuthenticated(true) can be used to bypass the prompt.

    // Simulate fetching liked listing IDs
    const likedIds = ['listing1', 'listing3', 'listing5']; // Example liked IDs
    const fetchedLikedListings = mockListings.filter(listing => likedIds.includes(listing.id));
    setLikedListings(fetchedLikedListings);

    // Simulate fetching/knowing disliked listing IDs
    // In a real app, these would come from user state/backend, potentially passed from HomePage or global state.
    const dislikedIds = ['listing2', 'listing4']; 
    const fetchedDislikedListings = mockListings.filter(listing => dislikedIds.includes(listing.id));
    setDislikedListingsState(fetchedDislikedListings);

    setIsLoading(false);
  }, []);

  const handleSignIn = () => {
    setIsAuthenticated(true); // Simulate successful sign-in
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center p-8">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <UserCircle className="h-20 w-20 text-primary mx-auto mb-6" />
          <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">Sign In Required</h2>
          <p className="text-muted-foreground mb-8">
            Please sign in to view your liked and disliked listings, and to manage your preferences.
          </p>
          <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSignIn}>
            <LogIn className="mr-2 h-5 w-5" />
            Sign In to Continue
          </Button>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Loading your treasures...</p>
      </div>
    );
  }

  const listingsToShow = viewMode === 'liked' ? likedListings : dislikedListingsState;
  const PageTitle = viewMode === 'liked' ? "Your Liked Listings" : "Your Disliked Listings";
  const PageDescription = viewMode === 'liked' 
    ? "Here are the boats and yachts you've shown interest in."
    : "These are the listings you've previously dismissed. You can review them here.";
  const EmptyStateIcon = viewMode === 'liked' ? Heart : HeartCrack;
  const EmptyStateTitle = viewMode === 'liked' ? "No Liked Listings Yet" : "No Disliked Listings Yet";
  const EmptyStateDescription = viewMode === 'liked'
    ? "You haven't liked any boats or yachts yet. Start exploring to find your perfect match!"
    : "You haven't disliked any listings yet, or you've chosen not to review them here.";

  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h1 className="font-headline text-4xl font-bold text-primary mb-2">{PageTitle}</h1>
        <p className="text-lg text-muted-foreground">{PageDescription}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 mb-6">
        <Button 
          variant={viewMode === 'liked' ? 'default' : 'outline'} 
          onClick={() => setViewMode('liked')}
          className={`w-full sm:w-auto ${viewMode === 'liked' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'text-foreground'}`}
        >
          <Heart className="mr-2 h-5 w-5" /> Liked ({likedListings.length})
        </Button>
        <Button 
          variant={viewMode === 'disliked' ? 'destructive' : 'outline'} 
          onClick={() => setViewMode('disliked')}
          className={`w-full sm:w-auto ${viewMode === 'disliked' ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' : 'text-foreground'}`}
        >
          <HeartCrack className="mr-2 h-5 w-5" /> Disliked ({dislikedListingsState.length})
        </Button>
      </div>

      {listingsToShow.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listingsToShow.map((listing) => (
            <LikedItemCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card shadow-lg rounded-lg">
          <EmptyStateIcon className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">{EmptyStateTitle}</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {EmptyStateDescription}
          </p>
          {viewMode === 'liked' && (
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/">
                <Sailboat className="mr-2 h-5 w-5" />
                Discover Listings
              </Link>
            </Button>
          )}
           {viewMode === 'disliked' && (
             <p className="text-sm text-muted-foreground">Disliked listings are managed on the Discover page.</p>
           )}
        </div>
      )}
    </div>
  );
}

