export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Listing {
  id: string;
  name: string;
  description: string;
  price: number;
  videoUrl?: string; // Lead video
  imageUrls: string[]; // Other images
  location: string;
  lengthFt: number;
  type: 'Sailboat' | 'Motor Yacht' | 'Catamaran' | 'Speedboat' | 'Fishing Boat';
  year: number;
  cabins?: number;
  postedBy: User;
  postedDate: string; // ISO date string
}

export interface Message {
  id: string;
  listingId: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  timestamp: string; // ISO date string
}

export interface Conversation {
  id: string; // Could be listingId + otherUserId
  listing: Listing;
  otherUser: User;
  lastMessage: Message;
  unreadCount: number;
}
