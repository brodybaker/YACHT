
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Briefcase } from "lucide-react";

export default function BrokerApplicationPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/add-listing">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Add Listing
        </Link>
      </Button>
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <Briefcase className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="font-headline text-3xl text-primary">Broker Account Application</CardTitle>
          <CardDescription>Apply to list high-value or large vessels.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/90 leading-relaxed text-center">
          <p>
            Thank you for your interest in listing a premium vessel on YachtMob. Due to the nature of listings
            for boats over 26ft or priced above $50,000, we require a brief application process to ensure the quality
            and accuracy of these listings.
          </p>
          <p>
            This process helps us maintain a trusted marketplace for high-value transactions.
          </p>
          <p className="font-semibold text-lg">
            Currently, this application process is handled manually.
          </p>
          <p>
            Please contact our support team at <a href="mailto:support@yachtmob.example.com" className="text-primary underline hover:text-primary/80">support@yachtmob.example.com</a> with
            the subject "Broker Account Application" and include details about your vessel and dealership (if applicable).
            We will get back to you shortly.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
            <a href="mailto:support@yachtmob.example.com?subject=Broker Account Application">
              Email Support
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
