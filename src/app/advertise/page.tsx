
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Mail } from "lucide-react";

export default function AdvertisePage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <Megaphone className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="font-headline text-3xl text-primary">Advertise With Us</CardTitle>
          <CardDescription>Reach a dedicated audience of boating enthusiasts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/90 leading-relaxed text-center">
          <p>
            Showcase your brand, products, or services to the vibrant NauticalMatch community. We offer a variety of
            advertising opportunities to connect you with potential customers actively engaged in the marine lifestyle.
          </p>
          <p>
            Whether you are a boat manufacturer, gear supplier, marine service provider, or offer related lifestyle products,
            NauticalMatch provides a targeted platform to enhance your visibility.
          </p>
          <h2 className="text-xl font-semibold text-foreground pt-2">Why Advertise on NauticalMatch?</h2>
          <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-1">
            <li>Targeted Audience: Connect directly with boat buyers, sellers, and enthusiasts.</li>
            <li>Brand Exposure: Increase your brand's visibility within the maritime community.</li>
            <li>Flexible Options: We offer various advertising packages to suit your needs and budget.</li>
          </ul>
          <p className="font-semibold text-lg pt-2">
            Interested in learning more?
          </p>
          <p>
            Please contact our advertising team to discuss your needs and explore our media kit.
            We're excited to help you make waves!
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <a href="mailto:advertising@nauticalmatch.example.com?subject=Advertising Inquiry">
              <Mail className="mr-2 h-5 w-5" />
              Contact Advertising Team
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
