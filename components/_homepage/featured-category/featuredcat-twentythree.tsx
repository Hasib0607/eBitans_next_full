import { catImg } from "@/site-settings/siteUrl";
import Link from "next/link";

const FeaturedTwentyThree = ({ category, design }: any) => {
  const bgColor = design?.header_color;

  const styleCss = `

  .category-hover:hover {
    color:  ${bgColor};
    border-bottom: 3px solid ${bgColor};  
  }
 
    `;

  return (
    <div>
      <style>{styleCss}</style>
      <div className="sm:container px-5 sm:py-10 py-5">
        <div className=" lg:grid-cols-3 md:grid-cols-2 gap-5 bg-white grid ">
          {category?.slice(0, 3).map((item: any) => (
            <div key={item.id}>
              <FeatureCatSix item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedTwentyThree;

const FeatureCatSix = ({ item }: any) => {
  return (
    <div>
      <Link
        href={`/category/${item.id}`}
        className="relative h-auto w-full group overflow-hidden flex flex-col gap-2 items-center justify-center bg-gray-100 "
      >
        <img
          src={catImg + item.banner}
          className="h-full w-full hover:scale-105 duration-500"
          alt=""
        />
        <div className="absolute top-1/2 -translate-y-1/2 uppercase text-black">
          <span className={`text-xl font-bold text-white category-hover`}>
            {item.name}
          </span>
        </div>
      </Link>
    </div>
  );
};
