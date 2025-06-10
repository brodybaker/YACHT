'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import type { Listing, Message, User } from '@/types';
import { mockListings, mockUsers, mockMessages as initialMockMessages } from '@/lib/mockData';
import MessageBubble from '@/components/messaging/MessageBubble';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft, Ship } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';


// Assume current logged-in user for demo purposes
const currentUserId = 'user2'; // Bob Deckhand

export default function ChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const listingId = params.id as string;
  const otherUserId = searchParams.get('userId');

  const [listing, setListing] = useState<Listing | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundListing = mockListings.find(l => l.id === listingId);
    const foundOtherUser = mockUsers.find(u => u.id === otherUserId);
    const foundCurrentUser = mockUsers.find(u => u.id === currentUserId);
    
    if (foundListing && foundOtherUser && foundCurrentUser) {
      setListing(foundListing);
      setOtherUser(foundOtherUser);
      setCurrentUser(foundCurrentUser);

      // Filter messages for this specific chat
      const chatMessages = initialMockMessages.filter(
        (msg) =>
          msg.listingId === listingId &&
          ((msg.fromUserId === currentUserId && msg.toUserId === otherUserId) ||
            (msg.fromUserId === otherUserId && msg.toUserId === currentUserId))
      ).sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setMessages(chatMessages);
    }
    setIsLoading(false);
  }, [listingId, otherUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || !otherUser || !listing) return;

    const messageToSend: Message = {
      id: `msg${Date.now()}`,
      listingId: listing.id,
      fromUserId: currentUser.id,
      toUserId: otherUser.id,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prevMessages => [...prevMessages, messageToSend]);
    // In a real app, this would also be sent to a backend
    setNewMessage('');
  };

  if (isLoading || !listing || !otherUser || !currentUser) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-card shadow-xl rounded-lg overflow-hidden">
      {/* Chat Header */}
      <header className="flex items-center p-4 border-b bg-background sticky top-0 z-10">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/messages">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} data-ai-hint="person avatar" />
          <AvatarFallback>{otherUser.name.substring(0,1).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="font-headline text-lg font-semibold text-foreground truncate">{otherUser.name}</h2>
          <p className="text-xs text-primary flex items-center gap-1 truncate">
            <Ship className="h-3 w-3 shrink-0" />
            {listing.name}
          </p>
        </div>
        <Link href={`/listing/${listing.id}`} className="ml-auto shrink-0">
           <Image
              src={listing.imageUrls[0] || `https://placehold.co/100x75.png?text=Boat`}
              alt={listing.name}
              width={50}
              height={37.5}
              className="rounded object-cover border"
              data-ai-hint="boat yacht"
            />
        </Link>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            sender={msg.fromUserId === currentUser.id ? currentUser : otherUser}
            isCurrentUser={msg.fromUserId === currentUser.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-background">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            aria-label="Message input"
          />
          <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
