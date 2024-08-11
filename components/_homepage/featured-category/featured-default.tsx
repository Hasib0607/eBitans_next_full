import React from "react";
import { iconImg } from "@/site-settings/siteUrl";

const DefaultFeaturedCategory = ({ category }: any) => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="container">
        <h3 className="font-bold text-center tracking-widest text-3xl my-3">
          Featured Category
        </h3>
        <p className="font-semibold text-lg text-center my-3">
          Get Your Desired Product from Featured Category!
        </p>

        <div className="flex flex-wrap justify-center gap-4 py-4">
          {category?.map((cat: any) => (
            <div key={cat.id} className="rounded-lg bg-white w-32 h-32">
              <div className="flex justify-center items-center">
                <a
                  href="https://admin.ebitans.com/design/homepage/featurecategory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={iconImg + cat.icon} alt="" className="h-20 w-20" />
                </a>
              </div>
              <p className="py-2 text-base font-semibold text-center">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DefaultFeaturedCategory;
