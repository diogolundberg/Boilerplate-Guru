
import React from 'react';

interface MainContentRegionProperties {
  children: React.ReactNode;
}

export const MainContentRegion: React.FC<MainContentRegionProperties> = ({ children }) => {
  return (
    <main className="flex-grow mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {children}
    </main>
  );
};
