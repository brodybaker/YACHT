
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import type { Listing, Message, User } from '@/types';
import { mockListings, mockUsers, mockMessages as initialMockMessages } from '@/lib/mockData';
import MessageBubble from '@/components/messaging/MessageBubble';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft, Ship, UserCircle, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

const DEMO_CURRENT_USER_ID = 'user2'; // Bob Deckhand - for signed-in state

export default function ChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const listingId = params.id as string;
  const otherUserIdFromQuery = searchParams.get('userId');

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulate auth
  const [listing, setListing] = useState<Listing | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, check actual auth status.
    // For demo, setIsAuthenticated(true) can be used to bypass the prompt.

    if (isAuthenticated) {
      const foundCurrentUser = mockUsers.find(u => u.id === DEMO_CURRENT_USER_ID);
      setCurrentUser(foundCurrentUser || null);
    } else {
      setCurrentUser(null);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false); // Don't try to load chat data if not auth'd
      return;
    }

    // Ensure currentUser is set before proceeding
    if (!currentUser || !otherUserIdFromQuery) {
        setIsLoading(false);
        // Potentially show an error or redirect if currentUser or otherUserIdFromQuery is missing
        return;
    }

    const foundListing = mockListings.find(l => l.id === listingId);
    const foundOtherUser = mockUsers.find(u => u.id === otherUserIdFromQuery);

    if (foundListing && foundOtherUser) {
      setListing(foundListing);
      setOtherUser(foundOtherUser);

      const chatMessages = initialMockMessages.filter(
        (msg) =>
          msg.listingId === listingId &&
          ((msg.fromUserId === currentUser.id && msg.toUserId === otherUserIdFromQuery) ||
            (msg.fromUserId === otherUserIdFromQuery && msg.toUserId === currentUser.id))
      ).sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setMessages(chatMessages);
    }
    setIsLoading(false);
  }, [listingId, otherUserIdFromQuery, isAuthenticated, currentUser]);

  useEffect(() => {
    if (isAuthenticated) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAuthenticated]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || !otherUser || !listing || !isAuthenticated) return;

    const messageToSend: Message = {
      id: `msg${Date.now()}`,
      listingId: listing.id,
      fromUserId: currentUser.id,
      toUserId: otherUser.id,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prevMessages => [...prevMessages, messageToSend]);
    setNewMessage('');
  };

  const handleSignIn = () => {
    setIsAuthenticated(true); // Simulate successful sign-in
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] bg-card shadow-xl rounded-lg overflow-hidden p-8 text-center">
        <Card className="w-full max-w-md p-8 shadow-xl">
            <UserCircle className="h-20 w-20 text-primary mx-auto mb-6" />
            <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">Join the Conversation</h2>
            <p className="text-muted-foreground mb-8">
            Sign in or sign up to send and receive messages.
            </p>
            <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-4" onClick={handleSignIn}>
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
            </Button>
            <p className="text-sm text-muted-foreground mb-2">New to NauticalMatch?</p>
            <Button size="lg" variant="outline" className="w-full" asChild>
                <Link href="/signup">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Sign Up
                </Link>
            </Button>
        </Card>
      </div>
    );
  }

  if (isLoading || (isAuthenticated && (!listing || !otherUser || !currentUser))) {
    return (
      <div className="text-center py-12 flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Loading chat...</p>
      </div>
    );
  }

  // Fallback if data is missing after loading and authenticated
  if (!listing || !otherUser || !currentUser) {
    return (
      <div className="text-center py-12 flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
        <Ship className="h-16 w-16 text-destructive mx-auto mb-4" />
        <p className="text-lg text-destructive-foreground">Could not load chat details.</p>
        <Button asChild variant="outline" className="mt-4">
            <Link href="/messages">Back to Messages</Link>
        </Button>
      </div>
    )
  }


  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-card shadow-xl rounded-lg overflow-hidden">
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
