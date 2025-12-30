import React from "react";

interface CodeBlockProperties {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProperties> = ({
  code,
  language,
}) => {
  return (
    <div className="my-6 rounded-xl overflow-hidden bg-slate-800 shadow-lg">
      {language && (
        <div className="bg-slate-700 px-4 py-2 flex justify-between items-center border-b border-slate-600">
          <span className="text-xs font-mono text-slate-300 uppercase">
            {language}
          </span>
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-500" />
          </div>
        </div>
      )}
      <div className="p-6 overflow-x-auto">
        <code className="mono text-sm text-slate-100 whitespace-pre">
          {code}
        </code>
      </div>
    </div>
  );
};
