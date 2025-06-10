import type { Message, User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  sender: User; // The user who sent this message
  isCurrentUser: boolean; // True if this message was sent by the logged-in user
}

export default function MessageBubble({ message, sender, isCurrentUser }: MessageBubbleProps) {
  const messageDate = new Date(message.timestamp);
  const timeString = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });

  return (
    <div className={cn('flex items-end gap-2 my-3', isCurrentUser ? 'justify-end' : 'justify-start')}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 self-end">
          <AvatarImage src={sender.avatarUrl} alt={sender.name} data-ai-hint="person avatar" />
          <AvatarFallback>{sender.name.substring(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[70%] p-3 rounded-xl shadow',
          isCurrentUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-card text-card-foreground rounded-bl-none border'
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className={cn('text-xs mt-1', isCurrentUser ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70 text-left')}>
          {timeString} - {dateString}
        </p>
      </div>
       {isCurrentUser && (
        <Avatar className="h-8 w-8 self-end">
          <AvatarImage src={sender.avatarUrl} alt={sender.name} data-ai-hint="person avatar" />
          <AvatarFallback>{sender.name.substring(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
