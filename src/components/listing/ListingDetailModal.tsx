
'use client';

import type { Listing } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ArrowLeft, ArrowRight, MessageSquare, X as CloseIcon, Video, Image as ImageIcon } from 'lucide-react';

interface ListingDetailModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnailUrl: string;
  altText: string;
}

export default function ListingDetailModal({ listing, isOpen, onClose }: ListingDetailModalProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (listing) {
      const items: MediaItem[] = [];
      if (listing.videoUrl) {
        items.push({
          type: 'video',
          url: listing.videoUrl,
          thumbnailUrl: listing.imageUrls[0] || `https://placehold.co/100x75.png?text=Video`,
          altText: `${listing.name} video`,
        });
      }
      listing.imageUrls.forEach((imgUrl, idx) => {
        items.push({ 
          type: 'image', 
          url: imgUrl, 
          thumbnailUrl: imgUrl,
          altText: `${listing.name} image ${idx + 1}`,
        });
      });
      setMediaItems(items);
      setActiveMediaIndex(0);
    } else {
      setMediaItems([]);
    }
  }, [listing]);

  if (!listing) return null;

  const currentMedia = mediaItems[activeMediaIndex];

  const goToNextMedia = () => setActiveMediaIndex(prev => (prev + 1) % mediaItems.length);
  const goToPrevMedia = () => setActiveMediaIndex(prev => (prev - 1 + mediaItems.length) % mediaItems.length);

  return (
    <Dialog open={isOpen} onOpenChange={(openStatus) => !openStatus && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col p-0 sm:rounded-lg">
        <DialogHeader className="p-4 border-b sticky top-0 bg-background z-10 flex-row items-center justify-between">
          <DialogTitle className="font-headline text-2xl text-primary truncate pr-10">{listing.name}</DialogTitle>
          <DialogClose asChild>
             <Button variant="ghost" size="icon" className="rounded-full"><CloseIcon className="h-5 w-5" /></Button>
          </DialogClose>
        </DialogHeader>
        
        <ScrollArea className="flex-1 bg-muted/20">
          <div className="p-4 space-y-4">
            {mediaItems.length > 0 && currentMedia && (
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-2 shadow-md">
                {currentMedia.type === 'video' ? (
                  <video
                    key={currentMedia.url}
                    src={currentMedia.url}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                    data-ai-hint="boat video"
                    poster={listing.imageUrls[0]}
                  />
                ) : (
                  <Image
                    src={currentMedia.url}
                    alt={currentMedia.altText}
                    layout="fill"
                    objectFit="contain"
                    className="w-full h-full"
                    data-ai-hint="yacht boat detail"
                    priority={activeMediaIndex === (listing?.videoUrl ? 1 : 0)} 
                  />
                )}
                {mediaItems.length > 1 && (
                  <>
                    <Button onClick={goToPrevMedia} variant="outline" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 border-none text-white rounded-full h-10 w-10"> <ArrowLeft className="h-5 w-5" /> </Button>
                    <Button onClick={goToNextMedia} variant="outline" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 border-none text-white rounded-full h-10 w-10"> <ArrowRight className="h-5 w-5" /> </Button>
                  </>
                )}
              </div>
            )}

            {mediaItems.length > 1 && (
              <ScrollArea className="w-full whitespace-nowrap rounded-md pb-2">
                <div className="flex space-x-2 p-1">
                  {mediaItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveMediaIndex(index)}
                      aria-label={`View ${item.type} ${index + 1}`}
                      className={`relative w-24 h-16 rounded-md overflow-hidden border-2 shrink-0 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                                  ${index === activeMediaIndex ? 'border-primary shadow-md scale-105' : 'border-transparent hover:border-muted-foreground/50 opacity-70 hover:opacity-100'}`}
                    >
                      <Image
                        src={item.thumbnailUrl}
                        alt={`Thumbnail for ${item.altText}`}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={item.type === 'video' ? 'video thumbnail' : 'photo thumbnail'}
                        className="bg-muted"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Video className="h-6 w-6 text-white" />
                        </div>
                      )}
                       {index === activeMediaIndex && <div className="absolute inset-0 ring-2 ring-primary ring-inset"></div>}
                    </button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            )}
            
            <div className="bg-card p-4 rounded-lg shadow">
              <h3 className="font-headline text-xl font-semibold text-foreground mb-2">Description</h3>
              <p className="text-foreground/90 leading-relaxed whitespace-pre-line">{listing.description}</p>
            </div>

            <div className="bg-card p-4 rounded-lg shadow">
              <h3 className="font-headline text-lg font-semibold text-foreground mb-3">Key Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center"><strong className="w-20 shrink-0">Price:</strong> <span className="text-primary font-semibold">${listing.price.toLocaleString()}</span></div>
                  <div className="flex items-center"><strong className="w-20 shrink-0">Location:</strong> {listing.location}</div>
                  <div className="flex items-center"><strong className="w-20 shrink-0">Type:</strong> {listing.type}</div>
                  <div className="flex items-center"><strong className="w-20 shrink-0">Length:</strong> {listing.lengthFt} ft</div>
                  <div className="flex items-center"><strong className="w-20 shrink-0">Year:</strong> {listing.year}</div>
                  {listing.cabins && <div className="flex items-center"><strong className="w-20 shrink-0">Cabins:</strong> {listing.cabins}</div>}
                  <div className="flex items-center col-span-full sm:col-span-1"><strong className="w-20 shrink-0">Posted:</strong> {new Date(listing.postedDate).toLocaleDateString()} by {listing.postedBy.name}</div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-4 border-t sticky bottom-0 bg-background z-10">
          <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-base" asChild>
            <Link href={`/messages/${listing.id}?userId=${listing.postedBy.id}`} onClick={onClose}>
              <MessageSquare className="h-5 w-5 mr-2" />
              Contact Lister ({listing.postedBy.name})
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

