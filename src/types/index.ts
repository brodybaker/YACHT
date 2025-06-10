
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  location?: string; // Optional: User's preferred location
}

export interface Listing {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  videoUrl?: string;
  location: string; // e.g., "Miami, FL", "Monaco" - For filtering
  lengthFt: number; // LOA (Length Overall)
  type: string; // e.g., "Motor Yacht", "Sailboat", "Catamaran"
  manufacturer?: string; // e.g., "Beneteau", "Sunseeker"
  year: number; // YearManufactured
  cabins?: number;
  fuelType?: string; // e.g., "Diesel", "Gasoline"
  postedBy: User;
  postedDate: string; // ISO date string
}

export interface Message {
  id: string;
  listingId: string;
  fromUserId: string;
  toUserId:string;
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
