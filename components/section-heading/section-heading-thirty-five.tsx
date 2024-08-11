import React from "react";

const SectionHeadingThirtyFive = ({ title }: { title: string }) => {
  return (
    <div className='mb-10 text-center'>
      <h3 className='text-2xl md:text-[32px] xl:text-[40px] font-bold'>
        {title}
      </h3>
    </div>
  );
};

export default SectionHeadingThirtyFive;
