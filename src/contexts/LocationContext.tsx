
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

interface LocationContextType {
  selectedLocation: string | null;
  setSelectedLocation: (location: string | null) => void;
  availableLocations: string[];
  setAvailableLocations: (locations: string[]) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocationState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedLocation') || null;
    }
    return null;
  });
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedLocation) {
        localStorage.setItem('selectedLocation', selectedLocation);
      } else {
        localStorage.removeItem('selectedLocation');
      }
    }
  }, [selectedLocation]);

  const setSelectedLocation = (location: string | null) => {
    setSelectedLocationState(location);
  };

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation, availableLocations, setAvailableLocations }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
