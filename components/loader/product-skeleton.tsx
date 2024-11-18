import React, { useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import ReactSkeleton from "react-loading-skeleton";
interface SkeletonProps {
  height?: string;
}
const ProductSkeleton: React.FC<SkeletonProps> = ({ height }) => {
  return (
    <div className="bg-[#F9F8FF] w-full mt-16 mx-auto">
      <div className="w-full px-20">
        <section className="animate-pulse">
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
};
export default ProductSkeleton;
