import React from "react";

interface EmptyStateProperties {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProperties> = ({
  title,
  message,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-md">{message}</p>
    </div>
  );
};
