
import React from 'react';

interface MonospaceBlockProperties {
  content: string;
  title?: string;
}

export const MonospaceBlock: React.FC<MonospaceBlockProperties> = ({ content, title }) => {
  return (
    <div className="my-6">
      {title && (
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
          {title}
        </h4>
      )}
      <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto shadow-inner">
        <pre className="mono text-sm text-slate-300 leading-relaxed whitespace-pre">
          {content}
        </pre>
      </div>
    </div>
  );
};
