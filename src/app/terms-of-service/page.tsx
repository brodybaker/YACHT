
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
       <Button variant="outline" asChild className="mb-6">
        <Link href="/signup">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sign Up
        </Link>
      </Button>
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center mb-4">
            <FileText className="h-10 w-10 text-primary mr-3" />
            <CardTitle className="font-headline text-4xl text-primary">Terms of Service</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/90 leading-relaxed">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold text-foreground pt-4">1. Acceptance of Terms</h2>
          <p>By accessing or using the NauticalMatch platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, do not use the Service. These Terms apply to all visitors, users, and others who access or use the Service.</p>

          <h2 className="text-2xl font-semibold text-foreground pt-4">2. Description of Service</h2>
          <p>NauticalMatch provides an online platform for users to list, discover, and connect regarding boats and yachts. We are not a party to any transaction between buyers and sellers.</p>

          <h2 className="text-2xl font-semibold text-foreground pt-4">3. User Accounts</h2>
          <p>To access certain features of the Service, you may be required to create an account. You are responsible for safeguarding your account password and for any activities or actions under your password. You agree to notify us immediately of any unauthorized use of your account.</p>

          <h2 className="text-2xl font-semibold text-foreground pt-4">4. User Conduct</h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Post any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.</li>
            <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
            <li>Post any unsolicited or unauthorized advertising, promotional materials, "junk mail," "spam," "chain letters," "pyramid schemes," or any other form of solicitation.</li>
            <li>Violate any applicable local, state, national, or international law.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground pt-4">5. Content</h2>
          <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
          <p>By posting Content on or through the Service, you grant NauticalMatch a worldwide, non-exclusive, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such Content in any and all media or distribution methods.</p>
          
          <h2 className="text-2xl font-semibold text-foreground pt-4">6. Intellectual Property</h2>
          <p>The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of NauticalMatch and its licensors. The Service is protected by copyright, trademark, and other laws of both the [Your Country/Jurisdiction] and foreign countries.</p>

          <h2 className="text-2xl font-semibold text-foreground pt-4">7. Disclaimers</h2>
          <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</p>

          <h2 className="text-2xl font-semibold text-foreground pt-4">8. Limitation of Liability</h2>
          <p>In no event shall NauticalMatch, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
          
          <h2 className="text-2xl font-semibold text-foreground pt-4">9. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of [Your Country/Jurisdiction], without regard to its conflict of law provisions.</p>

          <h2 className="text-2xl font-semibold text-foreground pt-4">10. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>

          <h2 className="text-2xl font-semibold text-foreground pt-4">11. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at support@nauticalmatch.example.com.</p>
        </CardContent>
      </Card>
    </div>
  );
}
