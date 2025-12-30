import React from "react";

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8">
      <div className="w-12 h-12 pixel-border bg-[#D47833] animate-bounce relative">
        <div className="absolute inset-2 bg-white/30"></div>
      </div>
      <p className="pixel-font text-[10px] text-[#E6D3B6] animate-pulse">
        GATHERING ANCIENT KNOWLEDGE...
      </p>
    </div>
  );
};
