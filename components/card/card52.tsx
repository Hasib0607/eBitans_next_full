import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Link from "next/link";
import { useEffect, useState } from "react";
import Details from "../_product-details-page/product-details/three/details";
import QuikView from "../quick-view";

const Card52 = ({ item, design, store_id }: any) => {
  const bgColor = design?.header_color;
  const textColor = design?.text_color;
  const [view, setView] = useState(false);
  const [camp, setCamp] = useState<any>(null);

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
    .text-color-price {
        color:  ${design?.header_color};
        border: 2px solid ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design.header_color};
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
  `;

  return (
    <div className="">
      <div className="group relative">
        <style>{styleCss}</style>
        {item?.image && (
          <div className="grid grid-cols-3 gap-5 w-full h-[420px] relative rounded-2xl">
            {item?.image[0] && (
              <div className={`col-span-3 w-full`}>
                <img
                  src={productImg + item?.image[0]}
                  alt=""
                  className={`h-full w-full rounded-xl ${
                    item?.image.length === 1
                      ? "sm:h-[420px] h-[300px] object-cover object-center"
                      : "h-[300px] object-cover object-center"
                  }`}
                />
              </div>
            )}
            {item?.image[1] && (
              <div className="w-full h-[100px]">
                <img
                  src={productImg + item?.image[1]}
                  alt=""
                  className="h-full w-full rounded-xl object-cover object-center"
                />
              </div>
            )}
            {item?.image[2] && (
              <div className="w-full h-[100px]">
                <img
                  src={productImg + item?.image[2]}
                  alt=""
                  className="h-full w-full rounded-xl object-cover object-center"
                />
              </div>
            )}
            {item?.image[3] && (
              <div className="w-full h-[100px]">
                <img
                  src={productImg + item?.image[2]}
                  alt=""
                  className="h-full w-full rounded-xl object-cover object-center "
                />
              </div>
            )}
          </div>
        )}
        <div className="flex justify-between gap-2 px-4 py-3">
          <div className="text-gray-800 text-lg font-bold ">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              {" "}
              <h1 className="text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                {item?.name}
              </h1>{" "}
            </Link>
          </div>

          <div className="text-gray-600 font-semibold ">
            <div className="flex items-center gap-2">
              <p className="text-color-price text-sm px-2 py-1 rounded-lg">
                <BDT
                  price={
                    camp?.status === "active" ? campPrice : productGetPrice
                  }
                />
              </p>
              {camp?.status !== "active" &&
              (item.discount_type === "no_discount" ||
                item.discount_price === "0.00") ? (
                " "
              ) : (
                <p className="line-through">
                  <BDT price={item.regular_price} />
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="px-4">
          <Rate rating={item?.rating} />
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card52;
