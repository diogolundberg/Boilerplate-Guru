import React from "react";
import { Link } from "react-router-dom";
import { BoilerplateSummary } from "../../types";
import { Tag } from "../Interaction/Tag";

interface BoilerplateResultCardProperties {
  boilerplate: BoilerplateSummary;
}

export const BoilerplateResultCard: React.FC<
  BoilerplateResultCardProperties
> = ({ boilerplate }) => {
  return (
    <Link
      to={`/boilerplate/${boilerplate.identifier}`}
      className="block group p-6 bg-[#E6D3B6] pixel-border hover:-translate-y-1 hover:translate-x-1 transition-transform"
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex gap-1">
            <Tag label={boilerplate.language} variant="language" />
            <Tag label={boilerplate.framework} variant="framework" />
          </div>
          <h3 className="text-lg pixel-font text-[#2A1A12] leading-tight group-hover:text-[#C44D30]">
            {boilerplate.name}
          </h3>
        </div>

        <p className="text-[#4A3528] line-clamp-3 mb-6 text-sm font-bold leading-relaxed">
          {boilerplate.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
          <Tag label={boilerplate.architecture} variant="architecture" />
          <div className="flex gap-1">
            {boilerplate.tags.slice(0, 1).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
