import React, { useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import ReactSkeleton from "react-loading-skeleton";
interface SkeletonProps {
  height?: string;
}
const Skeleton: React.FC<SkeletonProps> = ({ height }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  let page: any;
  const url: string = window.location.href;
  const checkPage = () => {
    if (url.includes("/product/")) {
      page = "product";
    } else if (url.includes("/category")) {
      page = "category";
    } else if (url.includes("/shop")) {
      page = "shop";
    } else page = "other";
  };
  checkPage();
  if (page == "product") {
    return (
      <div className=" container md:h-[70vh] gap-5 md:gap-20 flex items-start md:justify-center md:items-center flex-col md:flex-row mt-10 md:mt-20">
        <div className="w-full h-[450px] md:w-[600px] md:min-h-[600px] px-3 md:px-0">
          <ReactSkeleton height={"100%"} />
        </div>
        <div>
          <div className="mb-5 w-[100px] h-[50px] md:w-[400px] md:min-h-[150px] px-3 md:px-0">
            <ReactSkeleton height={"100%"} />
          </div>
          <div className="mb-5 w-[250px] h-[100px] md:w-[200px] md:min-h-[50px] px-3 md:px-0">
            <ReactSkeleton height={"100%"} />
          </div>
          <div className="mb-5 md:w-[200px] md:min-h-[50px] px-3 md:px-0 hidden md:block">
            <ReactSkeleton height={"100%"} />
          </div>
        </div>
      </div>
    );
  }
  if (page === "shop" || page === "category") {
    return (
      <div className="bg-[#F9F8FF] w-full">
        <div className="w-full">
          <section className="animate-pulse translate-y-[38%] md:translate-y-[25%] lg:translate-y-[18%] xl:-translate-y-[10%]">
            <div className="grid grid-cols-1 gap-8 mt-8 xl:grid-cols-4 xl:mt-2 xl:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="w-full h-96">
                  <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
                  <p className="w-60 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                  <p className="w-32 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
};
export default Skeleton;
