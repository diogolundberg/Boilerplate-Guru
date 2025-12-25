
import React from 'react';

interface TagProperties {
  label: string;
  variant?: 'language' | 'framework' | 'architecture' | 'default';
}

export const Tag: React.FC<TagProperties> = ({ label, variant = 'default' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'language':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'framework':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'architecture':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${getVariantStyles()}`}>
      {label}
    </span>
  );
};
