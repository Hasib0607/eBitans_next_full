"use client";
import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Link from "next/link";
import { useEffect, useState } from "react";
import Details from "../_product-details-page/product-details/eight/details";
import QuikView from "../quick-view";

const Card64 = ({ item }: any) => {
  const { design, store_id } = useTheme();
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
    <div className="bg-[#F4F1F0] hover:shadow-[0px_0px_20px_1px_rgba(205,209,228)]">
      <div className=" relative overflow-hidden border rounded-md duration-500">
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
              className="h-auto min-w-full object-center object-cover p-2"
            />
          </div>
        </Link>

        <div className="flex flex-col gap-2 px-4 py-3 duration-1000">
          <div className="text-gray-700 text-base text-center">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              {" "}
              <h1 className="text-hover capitalize truncate">
                {item?.name}
              </h1>{" "}
            </Link>
          </div>

          <div className="text-gray-700 font-semibold flex items-center justify-center gap-2 w-full group-hover:opacity-0 duration-500">
            {item?.regular_price !== "0" && (
              <p className="text-sm">
                <BDT
                  price={
                    camp?.status === "active" ? campPrice : productGetPrice
                  }
                />
              </p>
            )}
            <h1 className="line-through text-xs ">
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
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card64;
