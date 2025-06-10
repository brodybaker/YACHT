
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, Rss } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <Newspaper className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="font-headline text-3xl text-primary">YachtMob Blog</CardTitle>
          <CardDescription>Latest news, tips, and stories from the world of boating.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/90 leading-relaxed">
          <p className="text-center">
            Welcome to the YachtMob blog! Here, we'll share insights into the yachting lifestyle,
            maintenance tips, destination guides, and the latest updates from our platform.
          </p>
          
          <div className="text-center p-8 bg-muted/50 rounded-lg">
            <Rss className="h-12 w-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Stay Tuned!</h3>
            <p className="text-muted-foreground">
              Our blog is currently under construction. Check back soon for exciting content!
            </p>
          </div>

          <p className="text-center">
            In the meantime, why not explore some listings or update your profile?
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/">Discover Listings</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/profile">Update Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
