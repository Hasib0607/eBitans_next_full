import { catImg } from "@/site-settings/siteUrl";
import Link from "next/link";

const FeaturedNineteen = ({ category }: any) => {
  return (
    <div style={{ background: "rgb(250, 248, 241)" }}>
      <div className="sm:container px-5">
        <div className="sm:flex grid grid-cols-2 sm:flex-row justify-between sm:justify-center items-center flex-wrap gap-y-6 gap-x-2 py-14 ">
          {category?.slice(0, 6).map((data: any) => (
            <Link key={data?.id} href={`/category/${data.id}`}>
              <div className="px-2 flex flex-col gap-y-3 justify-center items-center group">
                <div className="sm:w-[140px] w-20 h-20 sm:h-[140px] group-hover:shadow-2xl duration-300 overflow-hidden flex flex-col justify-center items-center rounded-full">
                  <img
                    src={catImg + data?.banner}
                    className="h-auto min-w-full group-hover:rotate-2 duration-300"
                    alt="cat"
                  />
                </div>
                <h1 className="py-2 text-center text-lg">
                  {data?.name.charAt(0).toUpperCase() + data?.name.slice(1)}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedNineteen;
