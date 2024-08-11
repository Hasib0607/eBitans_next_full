import { sliderImg } from "@/site-settings/siteUrl";
import React from "react";

const HeroEighteen = ({ slider }: any) => {
  return (
    <div className="bg-white sm:container px-5 sm:py-10 py-5">
      <div className="">
        {slider.slice(0, 1).map((item: any) => (
          <div key={item?.id} className="relative group">
            <img
              className="h-auto w-full"
              src={sliderImg + item.image}
              alt=""
            />

            <div className="bg-white duration-500 opacity-90 lg2:h-[40%] lg2:w-[50%] md:h-[50%] md:w-[60%] sm:h-full sm:w-[80%] h-[70%] w-[80%] lg2:group-hover:h-[42%] lg2:group-hover:w-[52%] md:group-hover:h-[52%] md:group-hover:w-[62%] sm:group-hover:h-full sm:group-hover:w-[82%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute z-[1]"></div>
            <div
              style={{ color: item?.color }}
              className="absolute z-[2] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
            >
              <h4 className="md:text-xl text-sm text-center pb-3">
                {item?.subtitle}
              </h4>
              <h1 className="xl:text-4xl md:text-[28px] text-[22px] font-medium text-center">
                {item?.title}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroEighteen;
