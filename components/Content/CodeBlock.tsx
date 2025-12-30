
import React, { useState } from 'react';

interface CodeBlockProperties {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProperties> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden bg-slate-800 shadow-lg">
      <div className="bg-slate-700 px-4 py-2 flex justify-between items-center border-b border-slate-600">
        <span className="text-xs font-mono text-slate-300 uppercase">{language || 'CODE'}</span>
        <div className="flex items-center gap-4">
          <button
            onClick={handleCopy}
            className="text-[10px] font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Copy code to clipboard"
          >
            {copied ? 'COPIED!' : 'COPY'}
          </button>
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-500" />
          </div>
        </div>
      </div>
      <div className="p-6 overflow-x-auto">
        <code className="mono text-sm text-slate-100 whitespace-pre">
          {code}
        </code>
      </div>
    </div>
  );
};
