import React from "react";
interface Props {
  title?: string;
  subtitle?: string;
}
const SectionHeadingEighteen = ({ title, subtitle }: Props) => {
  return (
    <div className="container text-center mb-10">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-lg text-gray-500">{subtitle}</p>
    </div>
  );
};

export default SectionHeadingEighteen;
