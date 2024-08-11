"use client";
import Details from "@/components/_product-details-page/product-details/eight/details";
import QuikView from "@/components/quick-view";
import SectionHeadingThirtyThree from "@/components/section-heading/section-heading-thirtythree";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import Rate from "@/utils/rate";
import Taka from "@/utils/taka";
import Link from "next/link";
import { useState } from "react";

const ProductThirtyThree = ({
  product,
  design,
  best_sell_product,
  feature_product,
}: any) => {
  if (product.length === 0) {
    return;
  }

  const styleCss = `

    .title-border {
        margin: 0;
        padding-bottom: 1px;
        position: relative;
        width: 100%;
    }
    
    .title-border:before {
        position: absolute;
        background: linear-gradient(to right, ${design?.header_color} 60px, rgb(235, 235, 235) 10px) !important;
        height: 2px;
        content: '';
        bottom: 0;
        right: 0;
        left: 0;
    }
    `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <style>{styleCss}</style>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg2:grid-cols-3 gap-10 ">
        <div>
          <div className="title-border ">
            <SectionHeadingThirtyThree title={"Best Seller"} />
          </div>
          <div className="pt-5">
            <div className="grid grid-cols-1 gap-5">
              {best_sell_product.slice(0, 4).map((item: any, id: any) => (
                <Card item={item} key={id} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="title-border ">
            <SectionHeadingThirtyThree title={"Top Selling"} />
          </div>
          <div className="pt-5">
            <div className="grid grid-cols-1 gap-5">
              {feature_product?.slice(0, 4).map((item: any, id: any) => (
                <Card item={item} key={id} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="title-border ">
            <SectionHeadingThirtyThree title={"Recently Added"} />
          </div>
          <div className="pt-5">
            <div className="grid grid-cols-1 gap-5">
              {product.slice(0, 4).map((item: any, id: any) => (
                <Card item={item} key={id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductThirtyThree;

const Card = ({ item }: any) => {
  let productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );

  const [open, setOpen] = useState(false);
  return (
    <>
      <Link href={"/product/" + item?.id + "/" + item?.slug}>
        <div className="grid grid-cols-3 h-32 gap-4">
          <div className="" onClick={() => setOpen(!open)}>
            <img
              src={productImg + item.image[0]}
              alt="Mountain"
              className="h-28 w-28 "
            />
          </div>
          <div className=" flex flex-col gap-3 col-span-2">
            <div>
              <h6 className="text-base capitalize font-semibold font-twelve text-gray-500">
                {item.name.slice(0, 14)}
                {item.name.length > 14 && "..."}
              </h6>
              <Rate rating={item?.rating} />
            </div>

            <div className="text-gray-600 text-lg font-semibold flex gap-5">
              <p>
                <Taka /> {productGetPrice}
              </p>
              <h1 className="line-through ">
                {item.discount_type === "no_discount" ||
                item.discount_price === "0.00" ? (
                  " "
                ) : (
                  <p>
                    {" "}
                    <Taka /> {item.regular_price}
                  </p>
                )}
              </h1>
            </div>
          </div>
        </div>
      </Link>
      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </>
  );
};
