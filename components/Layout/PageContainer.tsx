
import React from 'react';

interface PageContainerProperties {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProperties> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  );
};
