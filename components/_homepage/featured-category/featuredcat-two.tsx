"use client";
import SectionHeadingTen from "@/components/section-heading/section-heading-ten";
import { iconImg } from "@/site-settings/siteUrl";
import useHeaderSettings from "@/utils/query/use-header-settings";
import Link from "next/link";

const FeaturedTwo = ({ category, design }: any) => {
  const styleCss = `
    .feature-div {
        background: linear-gradient(to top, ${design?.header_color} 50%, white 50%);
        color: ${design?.text_color};
    }
    `;

  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.data?.custom_design;
  const { title, title_color } = cDesign?.feature_category[0] || {};

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <style>{styleCss}</style>
      <SectionHeadingTen
        title_color={title_color}
        title={title || "Featured Categories"}
      />
      <div className="">
        <div className="">
          <div className="md:flex flex-row justify-between relative">
            {category?.slice(0, 1).map((productData: any) => (
              <Link href={"/category/" + productData?.id} key={productData?.id}>
                {" "}
                <div className="md:basis-[40%] feature-div hover:scale-105 duration-500 h-full w-full relative ">
                  <img
                    src={iconImg + productData?.icon}
                    alt="catImg"
                    className="h-auto min-w-full"
                  />
                  <div className="py-10">
                    <p className="h-[2px] mx-10 bg-yellow-400 w-10"></p>
                    <p className="text-4xl px-10 capitalize font-medium">
                      {productData?.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            <div className="md:basis-[20%] xl:text-[80px] lg:text-[60px] md:text-[50px] text-[40px] font-bold text-gray-100 ">
              <p className="md:absolute md:rotate-90 left-[50%] md:-translate-x-[50%] top-1/2 -translate-y-[50%] text-center md:my-0 my-10">
                {" "}
                New Collection
              </p>
            </div>
            {category?.slice(1, 2).map((productData: any) => (
              <Link href={"/category/" + productData?.id} key={productData?.id}>
                <div className="md:basis-[40%] feature-div hover:scale-105 duration-500 h-full w-full relative ">
                  <img
                    src={iconImg + productData?.icon}
                    alt="catImg"
                    className="h-auto min-w-full"
                  />
                  <div className="py-10">
                    <p className="h-[2px] mx-10 bg-yellow-400 w-10"></p>
                    <p className="text-4xl px-10 capitalize font-medium">
                      {productData?.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTwo;
