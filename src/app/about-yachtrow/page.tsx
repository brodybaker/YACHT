
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";

export default function AboutYachtRowPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center mb-4">
            <Building className="h-10 w-10 text-primary mr-3" />
            <CardTitle className="font-headline text-4xl text-primary">About YachtRow</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/90 leading-relaxed">
          <p>
            YachtRow is the innovative company behind YachtMob, dedicated to revolutionizing the maritime marketplace.
            Founded by a team of passionate boating enthusiasts and technology experts, YachtRow aims to leverage cutting-edge
            solutions to enhance the experience of buying, selling, and owning marine vessels.
          </p>
          <h2 className="text-2xl font-semibold text-foreground pt-4">Our Philosophy</h2>
          <p>
            At YachtRow, we believe in transparency, efficiency, and community. We strive to build platforms that are not
            only functional but also foster connections within the boating world. Our focus is on creating tools that
            empower users, whether they are seasoned mariners or new to the lifestyle.
          </p>
          <h2 className="text-2xl font-semibold text-foreground pt-4">Technology and Innovation</h2>
          <p>
            We are committed to employing the latest technological advancements, including AI-driven insights, secure
            transaction frameworks, and intuitive user interfaces, to provide an unparalleled service. YachtMob
            is our flagship product, embodying our commitment to excellence in the marine industry.
          </p>
          <p>
            YachtRow continues to explore new horizons, seeking to expand our offerings and improve the way people
            interact with the world of boating.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
