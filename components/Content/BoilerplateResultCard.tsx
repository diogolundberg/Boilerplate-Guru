
import React from 'react';
import { Link } from 'react-router-dom';
import { BoilerplateSummary } from '../../types';
import { Tag } from '../Interaction/Tag';

interface BoilerplateResultCardProperties {
  boilerplate: BoilerplateSummary;
}

export const BoilerplateResultCard: React.FC<BoilerplateResultCardProperties> = ({ boilerplate }) => {
  return (
    <Link 
      to={`/boilerplate/${boilerplate.identifier}`}
      className="block group p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {boilerplate.name}
          </h3>
          <div className="flex gap-2">
            <Tag label={boilerplate.language} variant="language" />
            <Tag label={boilerplate.framework} variant="framework" />
          </div>
        </div>
        
        <p className="text-slate-600 line-clamp-2 mb-4 text-sm leading-relaxed">
          {boilerplate.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <Tag label={boilerplate.architecture} variant="architecture" />
          <div className="flex gap-1">
            {boilerplate.tags.slice(0, 2).map(tag => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
