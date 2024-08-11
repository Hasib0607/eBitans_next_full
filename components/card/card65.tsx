"use client";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Link from "next/link";
import { useEffect, useState } from "react";
import Details from "../_product-details-page/product-details/three/details";
import QuikView from "../quick-view";

const Card65 = ({ item, design, store_id }: any) => {
  const [camp, setCamp] = useState<any>(null);
  const [view, setView] = useState(false);

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice = getPrice(
    productGetPrice,
    parseInt(camp?.discount_amount),
    camp?.discount_type
  );

  const save =
    camp?.status === "active"
      ? parseInt(item.regular_price) - (campPrice || 0)
      : parseInt(item.regular_price) - (productGetPrice || 0);

  useEffect(() => {
    async function handleCampaign() {
      try {
        const response: any = await getCampaignProduct(item, store_id);
        if (!response?.error) {
          setCamp(response);
        } // the API response object
      } catch (error) {
        console.error(error);
      }
    }

    handleCampaign();
  }, [item, store_id]);

  const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design?.header_color};
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn:hover {
        color:  ${bgColor};
        background: transparent;
        border: 1px solid ${bgColor};
    }
  `;

  return (
    <div className="bg-white relative rounded-md overflow-hidden">
      {save !== 0 && (
        <div className="absolute top-3 left-0 bg-[#6E2594] text-white z-[2] px-2 py-1 rounded-r-full text-xs">
          Save: {save} BDT
        </div>
      )}
      <div className="">
        <style>{styleCss}</style>
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[2]">
            <p className="bg-red-600 text-white px-2 py-1 w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Out of Stock
            </p>
          </div>
        )}
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="relative overflow-hidden">
            <img
              src={productImg + item.image[0]}
              alt=""
              className="h-auto min-w-full object-center object-cover border-b-2"
            />
          </div>
        </Link>

        <div className="text-gray-700 text-base sm:px-5 px-2 pt-3 pb-14">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            {" "}
            <h1 className="hover:text-red-500 hover:underline text-sm sm:text-[15px] capitalize">
              {item?.name}
            </h1>{" "}
          </Link>
        </div>

        <div className="font-semibold absolute bottom-5 sm:left-5 left-2 flex items-center gap-2 w-full group-hover:opacity-0 duration-500">
          {item?.regular_price !== "0" && (
            <p className="text-sm text-red-500">
              <BDT
                price={camp?.status === "active" ? campPrice : productGetPrice}
              />
            </p>
          )}
          <h1 className="line-through text-gray-500  text-xs ">
            {camp?.status !== "active" &&
            (item.discount_type === "no_discount" ||
              item.discount_price === "0.00") ? (
              " "
            ) : (
              <p>
                {" "}
                <BDT price={Math.trunc(item.regular_price)} />
              </p>
            )}
          </h1>
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card65;
