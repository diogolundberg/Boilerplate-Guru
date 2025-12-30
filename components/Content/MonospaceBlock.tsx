
import React, { useState } from 'react';

interface MonospaceBlockProperties {
  content: string;
  title?: string;
}

export const MonospaceBlock: React.FC<MonospaceBlockProperties> = ({ content, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="my-6">
      {title && (
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
          {title}
        </h4>
      )}
      <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto shadow-inner relative group">
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Copy content to clipboard"
        >
          {copied ? 'COPIED!' : 'COPY'}
        </button>
        <pre className="mono text-sm text-slate-300 leading-relaxed whitespace-pre">
          {content}
        </pre>
      </div>
    </div>
  );
};
