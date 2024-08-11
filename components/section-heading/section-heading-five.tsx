import React from "react";

interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeadingFive = ({ title, subtitle }: Props) => {
  return (
    <div className="space-y-2 mb-3">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-lg font-sans text-gray-500">{subtitle}</p>
    </div>
  );
};

export default SectionHeadingFive;
