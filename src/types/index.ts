
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  location?: string; // Added user location
}

export interface Listing {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  videoUrl?: string;
  location: string;
  lengthFt: number;
  type: string;
  manufacturer?: string;
  year: number;
  cabins?: number;
  fuelType?: string;
  postedBy: User;
  postedDate: string; // ISO date string

  // Fields from IYBA example integration
  VesselName?: string;
  AskingPrice?: string; // Note: IYBA has this as string, we use number for price
  SaleClassCode?: string; // e.g., "PW" (Power) "SA" (Sail)
  BoatCategoryCode?: string; // e.g., "MY" (Motor Yacht)
  MakeString?: string; // Manufacturer
  ModelYear?: number;
  LengthOverall?: number; // In feet
  Images?: { URI: string; Order: number }[];
  OfficeName?: string; // Broker office
  OfficeContactName?: string; // Broker name
  CreatedDate?: string; // Date listed
  CabinsCountNumeric?: number;
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
