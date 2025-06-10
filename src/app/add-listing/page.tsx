
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, LogIn, UserPlus, UserCircle, AlertTriangle, Loader2, Sailboat } from 'lucide-react';
import type { Listing, User } from '@/types';
import { mockUsers } from '@/lib/mockData'; // Assuming mockUsers are available for demo

const DEMO_CURRENT_USER_ID = 'user1'; // Alice Skipper, a lister

const listingFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  lengthFt: z.coerce.number().positive({ message: 'Length must be a positive number.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  type: z.enum(['Sailboat', 'Motor Yacht', 'Catamaran', 'Speedboat', 'Fishing Boat'], {
    required_error: 'You need to select a boat type.',
  }),
  year: z.coerce.number().min(1900, { message: 'Year must be 1900 or later.' }).max(new Date().getFullYear() + 1, { message: `Year cannot be after ${new Date().getFullYear() + 1}.` }),
  cabins: z.coerce.number().int().min(0).optional().default(0).transform(val => val || undefined),
  imageUrl1: z.string().url({ message: 'Please enter a valid URL for the main image.' }).min(1, {message: 'Main image URL is required.'}),
  imageUrl2: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  imageUrl3: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  videoUrl: z.string().url({ message: 'Please enter a valid URL for the video.' }).optional().or(z.literal('')),
});

type ListingFormValues = z.infer<typeof listingFormSchema>;

export default function AddListingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBrokerMessage, setShowBrokerMessage] = useState(false);

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      lengthFt: '',
      location: '',
      type: undefined,
      year: '',
      cabins: '',
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      videoUrl: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      const foundUser = mockUsers.find(u => u.id === DEMO_CURRENT_USER_ID);
      setCurrentUser(foundUser || null);
      if (!foundUser) {
        toast({ title: "Error", description: "Demo user not found. Please check mockData.ts", variant: "destructive"});
      }
    } else {
      setCurrentUser(null);
    }
  }, [isAuthenticated, toast]);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  async function onSubmit(values: ListingFormValues) {
    setIsSubmitting(true);
    setShowBrokerMessage(false);

    if (!currentUser) {
        toast({ title: "Authentication Error", description: "Cannot submit listing without a logged-in user.", variant: "destructive"});
        setIsSubmitting(false);
        return;
    }

    if (values.lengthFt > 26 || values.price > 50000) {
      setShowBrokerMessage(true);
      setIsSubmitting(false);
      toast({
        title: "Broker Account Required",
        description: "This listing meets criteria requiring a broker account.",
        variant: "destructive",
        duration: 7000,
      });
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const imageUrls = [values.imageUrl1, values.imageUrl2, values.imageUrl3].filter(url => url && url.trim() !== '') as string[];
    const newListing: Listing = {
      id: `listing${Date.now()}`, // Simple ID generation for demo
      name: values.name,
      description: values.description,
      price: values.price,
      lengthFt: values.lengthFt,
      type: values.type,
      year: values.year,
      cabins: values.cabins,
      imageUrls: imageUrls,
      videoUrl: values.videoUrl && values.videoUrl.trim() !== '' ? values.videoUrl : undefined,
      postedBy: currentUser,
      postedDate: new Date().toISOString(),
      location: values.location,
    };

    console.log('New Listing Submitted:', newListing);
    // In a real app, you would send this to your backend.
    // You might want to add this to mockListings for demo persistence across sessions,
    // but that requires more complex state management or localStorage.

    toast({
      title: 'Listing Submitted!',
      description: `${values.name} has been successfully submitted for review.`,
    });
    form.reset();
    setIsSubmitting(false);
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center p-8">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <UserCircle className="h-20 w-20 text-primary mx-auto mb-6" />
          <h2 className="font-headline text-3xl font-semibold text-foreground mb-4">Add Your Listing</h2>
          <p className="text-muted-foreground mb-8">
            Sign in to create and manage your boat or yacht listings on YachtMob.
          </p>
          <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-4" onClick={handleSignIn}>
            <LogIn className="mr-2 h-5 w-5" />
            Sign In
          </Button>
          <p className="text-sm text-muted-foreground mb-2">Don't have an account?</p>
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
  
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center p-8">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
        <p className="text-xl font-semibold text-foreground">Loading user data...</p>
      </div>
    );
  }


  return (
    <div className="max-w-2xl mx-auto">
      {showBrokerMessage && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Broker Account Required</AlertTitle>
          <AlertDescription>
            Listings for boats over 26ft in length or priced above $50,000 require a broker account.
            Please adjust your listing details if this was a mistake, or{' '}
            <Link href="/broker-application" className="underline hover:text-destructive-foreground font-semibold">
              apply for a broker account
            </Link>
            {' '}to proceed.
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Sailboat className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="font-headline text-3xl">Add New Listing</CardTitle>
              <CardDescription>Fill in the details below to list your boat or yacht.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Boat Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Salty Seagull" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your boat, its features, condition, etc." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 75000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lengthFt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length (ft)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Miami, FL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Boat Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select boat type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {['Sailboat', 'Motor Yacht', 'Catamaran', 'Speedboat', 'Fishing Boat'].map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Manufactured</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 2020" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <FormField
                control={form.control}
                name="cabins"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Cabins (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardTitle className="text-xl font-semibold pt-4 border-t">Media</CardTitle>
              <FormField
                control={form.control}
                name="imageUrl1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/main-image.jpg" {...field} />
                    </FormControl>
                    <FormDescription>The primary image for your listing.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Image URL 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image2.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Image URL 3 (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image3.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                    </FormControl>
                    <FormDescription>Link to a video of your boat (e.g., YouTube, Vimeo).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="px-0 pt-8 pb-0">
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-5 w-5" />
                      Submit Listing
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
