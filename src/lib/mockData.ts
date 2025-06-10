import type { User, Listing, Message, Conversation } from '@/types';

export const mockUsers: User[] = [
  { id: 'user1', name: 'Alice Skipper', avatarUrl: 'https://placehold.co/100x100.png?text=AS' },
  { id: 'user2', name: 'Bob Deckhand', avatarUrl: 'https://placehold.co/100x100.png?text=BD' },
  { id: 'user3', name: 'Captain Charlie', avatarUrl: 'https://placehold.co/100x100.png?text=CC' },
];

export const mockListings: Listing[] = [
  {
    id: 'listing1',
    name: 'Azure Dream Yacht',
    description: 'Experience ultimate luxury on the Azure Dream. Perfect for family getaways or corporate events. Spacious decks, modern amenities, and breathtaking views await.',
    price: 1200000,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', // Replace with actual placeholder video if possible
    imageUrls: [
      'https://placehold.co/800x600.png?text=Yacht+View+1',
      'https://placehold.co/800x600.png?text=Yacht+Interior',
      'https://placehold.co/800x600.png?text=Deck+Area',
    ],
    location: 'Monaco',
    lengthFt: 75,
    type: 'Motor Yacht',
    year: 2022,
    cabins: 4,
    postedBy: mockUsers[0],
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  },
  {
    id: 'listing2',
    name: 'Ocean Explorer Sailboat',
    description: 'A robust sailboat built for adventure. Fully equipped for long voyages, offering a true sailing experience with comfortable living quarters.',
    price: 350000,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    imageUrls: [
      'https://placehold.co/800x600.png?text=Sailboat+1',
      'https://placehold.co/800x600.png?text=Sailboat+Cabin',
      'https://placehold.co/800x600.png?text=Sailboat+Deck',
    ],
    location: 'Caribbean Islands',
    lengthFt: 50,
    type: 'Sailboat',
    year: 2018,
    cabins: 3,
    postedBy: mockUsers[1],
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), // 12 days ago
  },
  {
    id: 'listing3',
    name: 'SunChaser Speedboat',
    description: 'Feel the thrill of speed with the SunChaser! Ideal for day trips, water sports, and coastal exploration. Powerful engine and sleek design.',
    price: 150000,
    // No video for this one, to test fallback
    imageUrls: [
      'https://placehold.co/800x600.png?text=Speedboat+Side',
      'https://placehold.co/800x600.png?text=Speedboat+Cockpit',
      'https://placehold.co/800x600.png?text=Speedboat+Action',
    ],
    location: 'Miami, FL',
    lengthFt: 30,
    type: 'Speedboat',
    year: 2020,
    postedBy: mockUsers[0],
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'listing4',
    name: 'Coastal Fisher King',
    description: 'The perfect companion for your fishing expeditions. Ample storage, rod holders, and a stable platform for the serious angler.',
    price: 85000,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    imageUrls: [
      'https://placehold.co/800x600.png?text=Fishing+Boat',
      'https://placehold.co/800x600.png?text=Fishing+Gear',
      'https://placehold.co/800x600.png?text=Boat+On+Water',
    ],
    location: 'San Diego, CA',
    lengthFt: 25,
    type: 'Fishing Boat',
    year: 2019,
    postedBy: mockUsers[2],
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(), // 20 days ago
  },
  {
    id: 'listing5',
    name: 'Lagoon Voyager Catamaran',
    description: 'Spacious and stable, this catamaran offers unparalleled comfort and room for entertainment. Ideal for cruising with family and friends.',
    price: 750000,
    imageUrls: [ // Images first, no lead video
      'https://placehold.co/800x600.png?text=Catamaran+Front',
      'https://placehold.co/800x600.png?text=Catamaran+Saloon',
      'https://placehold.co/800x600.png?text=Catamaran+Trampoline',
    ],
    location: 'Phuket, Thailand',
    lengthFt: 45,
    type: 'Catamaran',
    year: 2021,
    cabins: 4,
    postedBy: mockUsers[1],
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(), // 8 days ago
  }
];


export const mockMessages: Message[] = [
  {
    id: 'msg1',
    listingId: 'listing1',
    fromUserId: 'user2',
    toUserId: 'user1',
    content: 'Hi Alice, I am very interested in the Azure Dream. Is it available for viewing next week?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'msg2',
    listingId: 'listing1',
    fromUserId: 'user1',
    toUserId: 'user2',
    content: 'Hello Bob! Yes, it is. How about Tuesday at 2 PM?',
    timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(), // 55 minutes ago
  },
   {
    id: 'msg3',
    listingId: 'listing2',
    fromUserId: 'user3',
    toUserId: 'user2',
    content: 'Ahoy Bob! That Ocean Explorer looks fantastic. Any flexibility on the price?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];


export const mockConversations: Conversation[] = [
  {
    id: 'convo1_listing1_user2',
    listing: mockListings[0],
    otherUser: mockUsers[1],
    lastMessage: mockMessages[1],
    unreadCount: 0,
  },
  {
    id: 'convo2_listing2_user3',
    listing: mockListings[1],
    otherUser: mockUsers[2],
    lastMessage: mockMessages[2],
    unreadCount: 1,
  }
];
