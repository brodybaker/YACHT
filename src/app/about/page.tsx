
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function AboutYachtMobPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center mb-4">
            <Info className="h-10 w-10 text-primary mr-3" />
            <CardTitle className="font-headline text-4xl text-primary">About YachtMob</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/90 leading-relaxed">
          <p>
            Welcome to YachtMob, your premier destination for discovering, buying, and selling boats and yachts.
            Our mission is to connect enthusiasts, sellers, and buyers in a seamless and trustworthy online marketplace.
          </p>
          <h2 className="text-2xl font-semibold text-foreground pt-4">Our Vision</h2>
          <p>
            We aim to be the most comprehensive and user-friendly platform for all things nautical. Whether you're
            searching for a small fishing boat, a luxurious motor yacht, or a sturdy sailboat for your next adventure,
            YachtMob is here to help you navigate the waters.
          </p>
          <h2 className="text-2xl font-semibold text-foreground pt-4">What We Offer</h2>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>A wide selection of new and used boats and yachts.</li>
            <li>Easy-to-use search and filtering tools.</li>
            <li>Secure messaging to connect with sellers and buyers.</li>
            <li>A platform for private sellers and professional brokers.</li>
          </ul>
          <p>
            Thank you for choosing YachtMob. We're excited to help you find your perfect match on the water!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
