
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { UserCog, MapPin, Sailboat, Save, Loader2 } from 'lucide-react';

const BOAT_TYPES = ['Sailboat', 'Motor Yacht', 'Catamaran', 'Speedboat', 'Fishing Boat'] as const;

const profileFormSchema = z.object({
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }).max(50, { message: 'Location must be 50 characters or less.' }).optional().or(z.literal('')),
  boatPreferences: z.array(z.enum(BOAT_TYPES)).optional().default([]),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      location: '',
      boatPreferences: [],
    },
  });

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedLocation = localStorage.getItem('yachtmob_userLocation');
      const storedBoatPreferences = localStorage.getItem('yachtmob_boatPreferences');
      
      if (storedLocation) {
        form.setValue('location', storedLocation);
      }
      if (storedBoatPreferences) {
        try {
          const preferencesArray = JSON.parse(storedBoatPreferences);
          if (Array.isArray(preferencesArray)) {
            form.setValue('boatPreferences', preferencesArray as typeof BOAT_TYPES[number][]);
          }
        } catch (error) {
          console.error("Failed to parse boat preferences from localStorage", error);
        }
      }
    }
  }, [form]);

  async function onSubmit(values: ProfileFormValues) {
    setIsSubmitting(true);
    console.log('Profile Submitted:', values);

    if (typeof window !== 'undefined') {
      if (values.location) {
        localStorage.setItem('yachtmob_userLocation', values.location);
      } else {
        localStorage.removeItem('yachtmob_userLocation');
      }
      localStorage.setItem('yachtmob_boatPreferences', JSON.stringify(values.boatPreferences || []));
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    toast({
      title: 'Profile Updated!',
      description: 'Your preferences have been saved.',
    });
    // Optionally redirect or give further instructions
    // router.push('/'); 
  }

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center p-8">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
        <p className="text-xl font-semibold text-foreground">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-8">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
          <UserCog className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="font-headline text-3xl">Your Profile</CardTitle>
          <CardDescription>Manage your location and boat preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-lg">
                      <MapPin className="mr-2 h-5 w-5 text-primary" />
                      Your Location
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Miami, FL or Monaco" {...field} />
                    </FormControl>
                    <FormDescription>This helps us show listings near you first. Leave blank to see all.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className="flex items-center text-lg mb-3">
                  <Sailboat className="mr-2 h-5 w-5 text-primary" />
                  Preferred Boat Types
                </FormLabel>
                <FormDescription className="mb-4">Select the types of boats you're interested in.</FormDescription>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {BOAT_TYPES.map((type) => (
                    <FormField
                      key={type}
                      control={form.control}
                      name="boatPreferences"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(type)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), type])
                                  : field.onChange(
                                      (field.value || []).filter(
                                        (value) => value !== type
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {type}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage /> 
              </FormItem>
              
              <CardFooter className="px-0 pt-4 pb-0">
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Save Preferences
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
