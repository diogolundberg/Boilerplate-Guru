
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const HeaderBar: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-[#E6D3B6] py-2">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="guru-head pixel-border scale-125" />
            <span className="pixel-font text-xs sm:text-sm tracking-tighter text-[#2A1A12]">
              Boilerplate Guru
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {!isOnline && (
            <div className="pixel-border bg-[#C44D30] px-3 py-1 text-[10px] pixel-font text-white">
              OFFLINE
            </div>
          )}
          {isOnline && (
            <div className="text-[10px] pixel-font text-[#4A3528] hidden sm:block opacity-70">
              CLOUD SYNC OK
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
