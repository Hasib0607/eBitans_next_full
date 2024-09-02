import { iconImg } from "@/site-settings/siteUrl";
import useHeaderSettings from "@/utils/query/use-header-settings";
import Link from "next/link";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturedThirtyEight = ({ category, design }: any) => {
  const styleCss = `
    .feature-category-prev:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
    .feature-category-next:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
 
    `;

  const { data, error } = useHeaderSettings();
  if (error) return <p>error from header-settings</p>;
  const cDesign = data?.data?.custom_design || {};
  const featureCategory = cDesign?.feature_category[0] || {};

  const { title = "Default Title", title_color = "#000" } = featureCategory;

  return (
    <div className="bg-[#F2F4F8]">
      <div className="sm:container px-5 sm:py-10 py-5 relative">
        <style>{styleCss}</style>
        <div className="text-center pb-10">
          <p style={{ color: title_color }} className="font-bold text-[20px]">
            {title || "Featured Category"}
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-x-2 gap-y-5 justify-center rounded-md">
          {category?.map((item: any, id: number) => (
            <Card key={id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedThirtyEight;

const Card = ({ item }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Link href={"/category/" + item.id}>
        <div className="text-center relative bg-white md:py-5 py-4 rounded-xl group">
          <div
            className="flex justify-center items-center h-full"
            onClick={() => setOpen(!open)}
          >
            <img
              src={iconImg + item?.icon}
              alt="catImage"
              className="h-8 md:h-12 m-2"
            />
          </div>

          <div className="text-center w-full px-2 py-2">
            <p className="text-gray-800 group-hover:text-red-500 text-xs md:text-base">
              {" "}
              {item.name}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};
