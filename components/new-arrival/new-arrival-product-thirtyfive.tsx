"use client";
import useHeaderSettings from "@/utils/query/use-header-settings";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import Card61 from "../card/card61";
import SectionHeadingThirtyFive from "../section-heading/section-heading-thirty-five";

const NewArrivalProductThirtyFive = ({ product, design, store_id }: any) => {
  const { data, error } = useHeaderSettings();
  const cDesign = data?.custom_design || {};
  const newArrivalProduct = cDesign?.new_arrival?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = newArrivalProduct;
  if (error) {
    return <p>error from new arrival product</p>;
  }
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <SectionHeadingThirtyFive
        title={title || "✦ NEW ARRIVALS ✦"}
        title_color={title_color}
      />
      <div className="grid sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-[30px]">
        {product
          ?.slice(0, 10)
          .map((productData: any) => (
            <Card61
              design={design}
              store_id={store_id}
              item={productData}
              key={productData.id}
            />
          ))}
      </div>
      <Link href="/shop">
        <div className="flex justify-center items-center gap-2 mt-6 font-bold">
          <p className="border-b border-black">View all</p>
          <AiOutlineArrowRight />
        </div>
      </Link>
    </div>
  );
};

export default NewArrivalProductThirtyFive;
