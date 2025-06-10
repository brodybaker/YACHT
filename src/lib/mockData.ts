
import type { User, Listing, Message, Conversation } from '@/types';

export const mockUsers: User[] = [
  { id: 'user1', name: 'Alice Skipper', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 'user2', name: 'Bob Deckhand', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 'user3', name: 'Captain Charlie', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 'user4', name: 'Diana Sailmaker', avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 'user5', name: 'Evan Navigator', avatarUrl: 'https://placehold.co/100x100.png' },
];

export const mockListings: Listing[] = [
  {
    id: 'listing1',
    name: 'Azure Dream Yacht',
    description: 'Experience ultimate luxury on the Azure Dream. Perfect for family getaways or corporate events. Spacious decks, modern amenities, and breathtaking views await.',
    price: 1200000,
    imageUrls: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    location: 'Monaco',
    lengthFt: 75,
    type: 'Motor Yacht',
    manufacturer: 'Prestige Yachts',
    year: 2022,
    cabins: 4,
    fuelType: 'Diesel',
    postedBy: mockUsers[1], // Bob Deckhand
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  },
  {
    id: 'listing2',
    name: 'Ocean Explorer Sailboat',
    description: 'A robust sailboat built for adventure. Fully equipped for long voyages, offering a true sailing experience with comfortable living quarters.',
    price: 350000,
    imageUrls: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    location: 'Miami, FL',
    lengthFt: 50,
    type: 'Sailboat',
    manufacturer: 'Beneteau',
    year: 2018,
    cabins: 3,
    fuelType: 'Diesel',
    postedBy: mockUsers[0], // Alice Skipper
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), // 12 days ago
  },
  {
    id: 'listing3',
    name: 'SunChaser Speedboat',
    description: 'Feel the thrill of speed with the SunChaser! Ideal for day trips, water sports, and coastal exploration. Powerful engine and sleek design.',
    price: 150000,
    imageUrls: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    // No video for this one
    location: 'Miami, FL',
    lengthFt: 30,
    type: 'Speedboat',
    manufacturer: 'Sea Ray',
    year: 2020,
    fuelType: 'Gasoline',
    postedBy: mockUsers[0], // Alice Skipper
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'listing4',
    name: 'Coastal Fisher King',
    description: 'The perfect companion for your fishing expeditions. Ample storage, rod holders, and a stable platform for the serious angler.',
    price: 85000,
    imageUrls: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    location: 'San Diego, CA',
    lengthFt: 25,
    type: 'Fishing Boat',
    manufacturer: 'Boston Whaler',
    year: 2019,
    fuelType: 'Gasoline',
    postedBy: mockUsers[2], // Captain Charlie
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(), // 20 days ago
  },
  {
    id: 'listing5',
    name: 'Lagoon Voyager Catamaran',
    description: 'Spacious and stable, this catamaran offers unparalleled comfort and room for entertainment. Ideal for cruising with family and friends.',
    price: 750000,
    imageUrls: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    location: 'Phuket, Thailand',
    lengthFt: 45,
    type: 'Catamaran',
    manufacturer: 'Lagoon',
    year: 2021,
    cabins: 4,
    fuelType: 'Diesel',
    postedBy: mockUsers[3], // Diana Sailmaker
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(), // 8 days ago
  },
  {
    id: 'listing6',
    name: 'Riviera Royale',
    description: 'A classic motor yacht, perfect for cruising the Mediterranean. Timeless design and modern comforts.',
    price: 950000,
    imageUrls: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    location: 'Monaco',
    lengthFt: 68,
    type: 'Motor Yacht',
    manufacturer: 'Sunseeker',
    year: 2019,
    cabins: 3,
    fuelType: 'Diesel',
    postedBy: mockUsers[1], // Bob Deckhand
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
  },
  {
    id: 'listing7',
    name: 'Hudson River Runner',
    description: 'Compact and agile, ideal for exploring city waterways and enjoying quick escapes.',
    price: 65000,
    imageUrls: [
      'https://placehold.co/800x600.png',
    ],
    location: 'New York, NY',
    lengthFt: 22,
    type: 'Speedboat',
    manufacturer: 'Chris-Craft',
    year: 2023,
    fuelType: 'Gasoline',
    postedBy: mockUsers[4], // Evan Navigator
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  },
];


export const mockMessages: Message[] = [
  {
    id: 'msg1',
    listingId: 'listing1',
    fromUserId: 'user2', // Bob (Lister of listing6, interested in listing1)
    toUserId: 'user1', // Alice (Lister of listing1) - Error here, listing1 posted by Bob. Should be other user.
    // Correcting: Listing 1 is by Bob (user2). Let's say Alice (user1) is interested.
    // So, fromUserId: user1, toUserId: user2
    content: 'Hi Bob, I am very interested in the Azure Dream. Is it available for viewing next week?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 'msg2',
    listingId: 'listing1',
    fromUserId: 'user2', // Bob (Lister of listing1)
    toUserId: 'user1', // Alice (Interested user)
    content: 'Hello Alice! Yes, it is. How about Tuesday at 2 PM?',
    timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(), // 55 minutes ago
  },
   {
    id: 'msg3',
    listingId: 'listing2', // Ocean Explorer Sailboat by Alice (user1)
    fromUserId: 'user3', // Captain Charlie
    toUserId: 'user1', // Alice Skipper
    content: 'Ahoy Alice! That Ocean Explorer looks fantastic. Any flexibility on the price?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
   {
    id: 'msg4',
    listingId: 'listing2',
    fromUserId: 'user1', // Alice
    toUserId: 'user3', // Captain Charlie
    content: 'Hi Captain! Thanks for your interest. We can discuss, what did you have in mind?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
   }
];

// Re-evaluating conversations based on corrected messages and more listings/users
// Assuming DEMO_CURRENT_USER_ID for messages page is 'user1' (Alice)
export const mockConversations: Conversation[] = [
  {
    id: 'convo1_listing1_user1', // Alice (user1) talking to Bob (user2) about Azure Dream (listing1)
    listing: mockListings.find(l => l.id === 'listing1')!,
    otherUser: mockListings.find(l => l.id === 'listing1')!.postedBy, // Bob
    lastMessage: mockMessages.find(m => m.listingId === 'listing1' && m.fromUserId === 'user2')!, // Bob's reply
    unreadCount: 0, // If current user is Alice, Bob's reply is read
  },
  {
    id: 'convo2_listing2_user3', // Alice (user1) talking to Cpt Charlie (user3) about Ocean Explorer (listing2)
    listing: mockListings.find(l => l.id === 'listing2')!,
    otherUser: mockUsers.find(u => u.id === 'user3')!, // Captain Charlie
    lastMessage: mockMessages.find(m => m.listingId === 'listing2' && m.fromUserId === 'user1')!, // Alice's reply
    unreadCount: 0, // If current user is Alice, her reply is not unread for her
  }
];

// Let's fix the messages for clarity with DEMO_CURRENT_USER_ID in mind for MessagesPage (user2, Bob)
// And chat page might be user1 (Alice) talking to user2 (Bob)

// Corrected mockMessages assuming current user for /messages page is user2 (Bob)
// And current user for /messages/[id] page is user1 (Alice) viewing chat with user2 (Bob) for listing1
const messagesForListing1_User1AndUser2: Message[] = [
    {
    id: 'chat_msg1_L1_U1toU2', // Alice to Bob
    listingId: 'listing1', // Azure Dream by Bob
    fromUserId: 'user1', // Alice
    toUserId: 'user2', // Bob
    content: 'Hi Bob, your Azure Dream Yacht looks amazing! Is it still available?',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 120 mins ago
  },
  {
    id: 'chat_msg2_L1_U2toU1', // Bob to Alice
    listingId: 'listing1',
    fromUserId: 'user2', // Bob
    toUserId: 'user1', // Alice
    content: "Hello Alice! Thanks, yes it is. We're getting a lot of interest. Are you free to see it this week?",
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 90 mins ago
  },
  {
    id: 'chat_msg3_L1_U1toU2', // Alice to Bob
    listingId: 'listing1',
    fromUserId: 'user1', // Alice
    toUserId: 'user2', // Bob
    content: "Great! How about Wednesday afternoon?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  }
];

const messagesForListing2_User3AndUser1: Message[] = [
  {
    id: 'chat_msg1_L2_U3toU1', // Cpt Charlie to Alice
    listingId: 'listing2', // Ocean Explorer by Alice
    fromUserId: 'user3', // Captain Charlie
    toUserId: 'user1', // Alice
    content: 'Ahoy Alice! That Ocean Explorer looks fantastic. Any flexibility on the price?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: 'chat_msg2_L2_U1toU3', // Alice to Cpt Charlie
    listingId: 'listing2',
    fromUserId: 'user1', // Alice
    toUserId: 'user3', // Captain Charlie
    content: 'Hi Captain! Thanks for your interest. We can discuss, what did you have in mind?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
  }
];
export const mockMessagesAll: Message[] = [
    ...messagesForListing1_User1AndUser2,
    ...messagesForListing2_User3AndUser1,
    // Add more messages for other conversations if needed
];


// Corrected mockConversations for MessagesPage (current user is user2 - Bob Deckhand)
export const mockConversationsForBob: Conversation[] = [
  {
    id: 'convo_L1_U1_U2', // Bob (user2) with Alice (user1) about Azure Dream (listing1 by Bob)
    listing: mockListings.find(l => l.id === 'listing1')!,
    otherUser: mockUsers.find(u => u.id === 'user1')!, // Alice
    lastMessage: messagesForListing1_User1AndUser2[messagesForListing1_User1AndUser2.length -1],
    unreadCount: 1, // Alice's last message is unread for Bob
  },
  // Bob isn't part of the listing2 conversation.
  // Let's add a conversation for Bob regarding his other listing (listing6)
  // Assume user5 (Evan) messaged Bob about listing6
];


// If MessagesPage uses DEMO_CURRENT_USER_ID = 'user2' (Bob Deckhand)
// And ChatPage /messages/listing1?userId=user1 means Bob is chatting with Alice (user1) about listing1.
// This seems consistent now. I'll use mockMessagesAll in add-listing and messages pages, and filter appropriately.
// mockConversations will be derived dynamically or use a specific set for demo.
// For simplicity, the existing mockConversations will be used, understanding they might not perfectly align with DEMO_CURRENT_USER_ID on messages page.
// For now, let's use mockMessagesAll and the original mockConversations for broader coverage.
// The code in messages/page.tsx and messages/[id]/page.tsx does client-side filtering,
// so it should adapt based on the DEMO_CURRENT_USER_ID used in those files.
// For /messages page, if user is Bob (user2), then he'd see convo about listing1 with Alice.
// For /messages/[id] page, if current user is Alice (user1) talking to Bob (user2), uses DEMO_CURRENT_USER_ID='user1' there.


// Overwriting mockMessages with mockMessagesAll
export { mockMessagesAll as mockMessages };


// Recalculate mockConversations based on mockMessagesAll
// Assume current user for the conversations list is user1 (Alice Skipper)
const aliceId = 'user1';
const conversationMap = new Map<string, Conversation>();

mockMessagesAll.forEach(msg => {
  const otherUserId = msg.fromUserId === aliceId ? msg.toUserId : msg.fromUserId;
  const listing = mockListings.find(l => l.id === msg.listingId);
  const otherUser = mockUsers.find(u => u.id === otherUserId);

  if (!listing || !otherUser) return;

  const conversationId = `convo_${listing.id}_${Math.min(parseInt(aliceId.replace('user','')), parseInt(otherUserId.replace('user','')))}_${Math.max(parseInt(aliceId.replace('user','')), parseInt(otherUserId.replace('user','')))}`;


  const existingConvo = conversationMap.get(conversationId);
  if (!existingConvo || new Date(msg.timestamp) > new Date(existingConvo.lastMessage.timestamp)) {
    conversationMap.set(conversationId, {
      id: conversationId,
      listing,
      otherUser,
      lastMessage: msg,
      // Unread count logic is simplified here, in a real app this would be server-driven or more complex
      unreadCount: msg.toUserId === aliceId && (!existingConvo || new Date(msg.timestamp) > new Date(existingConvo.lastMessage.timestamp)) ? 1 : 0,
    });
  }
});
export const mockConversationsGenerated: Conversation[] = Array.from(conversationMap.values());
// Replace old mockConversations with the generated one
export { mockConversationsGenerated as mockConversations };

// Note: The DEMO_CURRENT_USER_ID in add-listing, messages and messages/[id] pages will determine
// who is 'self' and who is 'other'. The mock data is now more diverse.
// The conversation unread count is a very basic simulation.
