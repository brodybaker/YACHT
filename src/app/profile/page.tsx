
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label'; // Keep if used, but FormLabel is primary
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { UserCog, MapPin, Sailboat, Save, Loader2, Ruler } from 'lucide-react';

const BOAT_TYPES = [
  'Sailboat', 'Motor Yacht', 'Catamaran', 'Speedboat', 'Fishing Boat', 
  'Skiff', 'Pontoon', 'Center Console', 'Dinghy', 'RIB', 'Trawler', 'Cuddy Cabin'
] as const;

const profileFormSchema = z.object({
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }).max(50, { message: 'Location must be 50 characters or less.' }).optional().or(z.literal('')),
  boatPreferences: z.array(z.enum(BOAT_TYPES)).optional().default([]),
  minLengthFt: z.coerce.number().positive({ message: "Min length must be positive." }).optional().or(z.literal('')),
  maxLengthFt: z.coerce.number().positive({ message: "Max length must be positive." }).optional().or(z.literal('')),
}).refine(data => {
  if (data.minLengthFt && data.maxLengthFt) {
    return Number(data.maxLengthFt) >= Number(data.minLengthFt);
  }
  return true;
}, {
  message: "Max length cannot be less than min length.",
  path: ["maxLengthFt"], // Path to show error under
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
      minLengthFt: '',
      maxLengthFt: '',
    },
  });

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedLocation = localStorage.getItem('yachtmob_userLocation');
      const storedBoatPreferences = localStorage.getItem('yachtmob_boatPreferences');
      const storedMinLengthFt = localStorage.getItem('yachtmob_minLengthFt');
      const storedMaxLengthFt = localStorage.getItem('yachtmob_maxLengthFt');
      
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
      if (storedMinLengthFt) {
        form.setValue('minLengthFt', parseFloat(storedMinLengthFt));
      }
      if (storedMaxLengthFt) {
        form.setValue('maxLengthFt', parseFloat(storedMaxLengthFt));
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
      
      if (values.minLengthFt) {
        localStorage.setItem('yachtmob_minLengthFt', String(values.minLengthFt));
      } else {
        localStorage.removeItem('yachtmob_minLengthFt');
      }
      if (values.maxLengthFt) {
        localStorage.setItem('yachtmob_maxLengthFt', String(values.maxLengthFt));
      } else {
        localStorage.removeItem('yachtmob_maxLengthFt');
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    toast({
      title: 'Profile Updated!',
      description: 'Your preferences have been saved.',
    });
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
          <CardDescription>Manage your location, boat, and length preferences.</CardDescription>
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
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
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
                          <FormLabel className="font-normal text-sm">
                            {type}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage /> 
              </FormItem>
              
              <FormItem>
                 <FormLabel className="flex items-center text-lg mb-3">
                  <Ruler className="mr-2 h-5 w-5 text-primary" />
                  Preferred Length Range (ft)
                </FormLabel>
                <FormDescription className="mb-4">Specify your desired boat length. Both fields are optional.</FormDescription>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="minLengthFt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Length (ft)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 20" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxLengthFt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Length (ft)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 50" {...field} onChange={e => field.onChange(e.target.value === '' ? '' : parseFloat(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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

    