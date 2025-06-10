'use client';

import { useState, useEffect } from 'react';
import type { Conversation } from '@/types';
import { mockConversations } from '@/lib/mockData';
import ConversationItem from '@/components/messaging/ConversationItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquareText, Sailboat } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching conversations
    setConversations(mockConversations);
    setIsLoading(false);
  }, []);

  const filteredConversations = conversations.filter(convo => 
    convo.listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convo.otherUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convo.lastMessage.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="text-center py-12">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="font-headline text-4xl font-bold text-primary mb-2">Your Messages</h1>
          <p className="text-lg text-muted-foreground">
            Stay connected with sellers and buyers.
          </p>
        </div>
         <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search messages..."
            className="pl-10 w-full md:w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {conversations.length === 0 ? (
         <div className="text-center py-20 bg-card shadow-lg rounded-lg">
          <MessageSquareText className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">No Messages Yet</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start a conversation by liking a listing and reaching out to the poster.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/">
              <Sailboat className="mr-2 h-5 w-5" />
              Discover Listings
            </Link>
          </Button>
        </div>
      ) : filteredConversations.length === 0 && searchTerm ? (
        <div className="text-center py-20 bg-card shadow-lg rounded-lg">
          <Search className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">No Results Found</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            No conversations match your search term "{searchTerm}". Try a different search.
          </p>
        </div>
      ) : (
        <div className="bg-card shadow-lg rounded-lg overflow-hidden">
          <div className="divide-y divide-border">
            {filteredConversations.map((conversation) => (
              <ConversationItem key={conversation.id} conversation={conversation} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
