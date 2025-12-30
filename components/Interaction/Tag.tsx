import React from "react";

interface TagProperties {
  label: string;
  variant?: "language" | "framework" | "architecture" | "default";
}

export const Tag: React.FC<TagProperties> = ({
  label,
  variant = "default",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "language":
        return "bg-[#D47833] text-white border-black";
      case "framework":
        return "bg-[#4A3528] text-[#E6D3B6] border-black";
      case "architecture":
        return "bg-[#C44D30] text-white border-black";
      default:
        return "bg-[#E6D3B6] text-[#2A1A12] border-black";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-[10px] font-bold border-2 pixel-font tracking-tighter ${getVariantStyles()}`}
    >
      {label}
    </span>
  );
};
