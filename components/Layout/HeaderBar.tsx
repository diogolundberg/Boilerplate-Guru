
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110">
              BG
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Boilerplate Guru
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {!isOnline && (
            <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 border border-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Offline Mode
            </div>
          )}
          {isOnline && (
            <div className="text-xs text-slate-400 font-medium hidden sm:block">
              Connected to Cloud Catalog
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
