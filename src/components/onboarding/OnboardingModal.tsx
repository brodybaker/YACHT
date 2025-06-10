
'use client';

import { useState, useEffect, type ElementType } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, Search, Heart, MessageSquare, UserPlus, X as CloseIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface OnboardingStep {
  icon: ElementType;
  title: string;
  description: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    icon: Search,
    title: 'Discover Your Dream Boat',
    description: "On the 'Discover' page, use the buttons to like (❤️) or pass (❌) on boat listings. To view more details, like a listing and find it on your 'Liked' page, then navigate to its full detail page.",
  },
  {
    icon: Heart,
    title: 'Manage Liked Listings',
    description: "Your liked boats are saved on the 'Liked' page. Here, you can click a boat's name or image to open a quick view modal, or click 'View Details' to go to its full page.",
  },
  {
    icon: MessageSquare,
    title: 'Connect via Messages',
    description: "The 'Messages' page lists all your conversations about boats. Click any conversation to chat with sellers or interested buyers.",
  },
  {
    icon: UserPlus,
    title: 'Create Your Account',
    description: "If you haven't already, create your account on the 'Sign Up' page to save your liked listings, messages, and preferences across devices. It's quick and easy!",
  },
  {
    icon: CheckCircle,
    title: "You're All Set!",
    description: 'Explore NauticalMatch and find your perfect vessel. Happy sailing!',
  },
];

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure component is mounted before trying to access localStorage
  }, []);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    if (isMounted) {
      localStorage.setItem('nauticalMatch_onboardingCompleted', 'true');
    }
    onClose();
  };

  const handleSkip = () => {
    if (isMounted) {
      localStorage.setItem('nauticalMatch_onboardingCompleted', 'true');
    }
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  const StepIcon = onboardingSteps[currentStep].icon;

  return (
    <Dialog open={isOpen} onOpenChange={(openStatus) => { if (!openStatus) handleSkip(); }}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="p-6 pb-4 items-center text-center">
          <div className="bg-primary/10 p-3 rounded-full mb-3">
            <StepIcon className="h-10 w-10 text-primary" />
          </div>
          <DialogTitle className="font-headline text-2xl">{onboardingSteps[currentStep].title}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-1 min-h-[60px]">
            {onboardingSteps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 pb-2">
            <Progress value={(currentStep + 1) / onboardingSteps.length * 100} className="w-full h-2" />
            <p className="text-xs text-muted-foreground text-center mt-1">
                Step {currentStep + 1} of {onboardingSteps.length}
            </p>
        </div>

        <DialogFooter className="p-6 pt-4 flex flex-row justify-between items-center border-t">
          <div className="w-[120px]"> {/* Wrapper for left side item (Skip button or placeholder) */}
            {currentStep === onboardingSteps.length - 1 ? (
              null // This div acts as a 120px wide horizontal spacer when Skip button is not shown
            ) : (
              <Button 
                variant="ghost" 
                onClick={handleSkip} 
                className="text-muted-foreground hover:text-foreground w-full justify-start px-2" // Button takes full width of its 120px parent
              >
                Skip Tutorial
              </Button>
            )}
          </div>
          
          <div className="flex gap-2"> {/* Wrapper for right side items (action buttons) */}
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrev}>
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
            )}
            {currentStep < onboardingSteps.length - 1 ? (
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Next <ArrowRight className="h-4 w-4 ml-1 sm:ml-2" />
              </Button>
            ) : (
              <Button onClick={handleFinish} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Started! <CheckCircle className="h-4 w-4 ml-1 sm:ml-2" />
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
