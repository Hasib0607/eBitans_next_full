import { iconImg } from "@/site-settings/siteUrl";
import Link from "next/link";

const FeaturedThirtyThree = ({ category, design }: any) => {
  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const styleCss = `
  .feature_cat_prev:hover {
    color:${textColor};
    background:${bgColor};
  }
  .feature_cat_next:hover {
    color:${textColor};
    background:${bgColor};
  }
  .bg-hover:hover {
    color:${bgColor};
  }

  .category-hover {
    color:  ${textColor};
  }
 
    `;

  return (
    <div>
      <style>{styleCss}</style>
      <div className="sm:container px-5 sm:py-10 py-5">
        <div className=" xl:grid-cols-8 lg:grid-cols-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 bg-white grid ">
          {category?.slice(0, 6).map((item: any, index: any) => (
            <div key={item.id}>
              <FeatureCatSix item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedThirtyThree;

const FeatureCatSix = ({ item, index }: any) => {
  return (
    <div>
      <Link
        href={`/category/${item.id}`}
        className={`bg-hover group text-gray-600 flex flex-col gap-5 items-center justify-center  border border-gray-100 p-5 rounded-lg ${
          index === 0
            ? "bg-[#FDDDE4]"
            : index === 1
              ? "bg-[#D1E8F2]"
              : index === 2
                ? "bg-[#CDD4F8]"
                : index === 3
                  ? "bg-[#F6DBF6]"
                  : index === 4
                    ? "bg-[#FFF2E5]"
                    : index === 5
                      ? "bg-[#FFFCEB]"
                      : "bg-gray-100"
        }`}
      >
        <img
          src={iconImg + item.icon}
          className="h-auto w-full group-hover:scale-110 duration-500"
          alt=""
        />
        <span className={`text-base font-bold`}>{item.name}</span>
      </Link>
    </div>
  );
};
