import type { Conversation } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Ship } from 'lucide-react';

interface ConversationItemProps {
  conversation: Conversation;
}

export default function ConversationItem({ conversation }: ConversationItemProps) {
  const { listing, otherUser, lastMessage, unreadCount } = conversation;

  return (
    <Link href={`/messages/${listing.id}?userId=${otherUser.id}`} className="block hover:bg-muted/50 transition-colors rounded-lg">
      <div className="flex items-start gap-4 p-4 border-b">
        <Avatar className="h-12 w-12">
          <AvatarImage src={otherUser.avatarUrl} alt={otherUser.name} data-ai-hint="person avatar" />
          <AvatarFallback>{otherUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-md font-semibold text-foreground truncate mr-2 font-headline">{otherUser.name}</h3>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="h-6 w-6 flex items-center justify-center text-xs p-0">{unreadCount}</Badge>
            )}
          </div>
          <p className="text-sm text-primary flex items-center gap-1 truncate font-medium">
            <Ship className="h-4 w-4 shrink-0"/>
            {listing.name}
          </p>
          <p className="text-sm text-muted-foreground truncate mt-0.5">
            {lastMessage.fromUserId === otherUser.id ? `${otherUser.name.split(' ')[0]}: ` : 'You: '}
            {lastMessage.content}
          </p>
        </div>
        <div className="text-xs text-muted-foreground text-right shrink-0">
          {new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          <div className="mt-1">
            <Image
              src={listing.imageUrls[0] || 'https://placehold.co/100x75.png'}
              alt={listing.name}
              width={60}
              height={45}
              className="rounded object-cover"
              data-ai-hint="boat yacht thumbnail"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
