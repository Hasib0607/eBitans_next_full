import React from "react";
import SectionHeadingTwentyFive from "@/components/section-heading/section-heading-twenty-five";
import Link from "next/link";
import { iconImg } from "@/site-settings/siteUrl";

const FeaturedTwentyFive = ({ category, design }: any) => {
  return (
    <div className="sm:px-10 px-5">
      <SectionHeadingTwentyFive
        design={design}
        title={"Featured Categories"}
        subtitle={""}
      />

      <div className="grid md:grid-cols-5 grid-cols-2 gap-4 my-2 ">
        {category?.slice(0, 10).map((item: any) => (
          <Link
            href={"/category/" + item?.id}
            key={item?.id}
            className="shadow-lg hover:shadow-4xl hover:bg-gray-300 flex flex-col h-[180px] ease-in-out duration-300 justify-center items-center rounded-md space-y-3"
          >
            <div className="">
              <img src={iconImg + item?.icon} className="w-16 h-16" alt="" />
            </div>
            <span className="text-md font-semibold px-2 text-center">
              {item?.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTwentyFive;
