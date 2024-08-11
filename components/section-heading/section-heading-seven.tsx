import React from "react";

interface Props {
  title: string;
  subtitle?: string;
}

const SectionHeadingSeven = ({ title, subtitle }: Props) => {
  return (
    <div className=" bg-white  mb-3 font-seven ">
      <h3 className="sm:text-[30px] text-[22px] py-4 font-bold">{title}</h3>
      <p className="text-lg font-sans text-gray-500">{subtitle}</p>
    </div>
  );
};

export default SectionHeadingSeven;
