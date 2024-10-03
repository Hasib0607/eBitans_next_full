"use client";
import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Link from "next/link";
import { useEffect, useState } from "react";

const Card68 = ({ item }: any) => {
  const { design, store_id } = useTheme();
  const [camp, setCamp] = useState<any>(null);

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
    <div className="bg-white relative group">
      <div className="">
        <style>{styleCss}</style>
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="relative shine overflow-hidden hover:rotate-1 hover:shadow-2xl duration-[2000ms] ease-in rounded-md">
            <img
              src={productImg + item.image[0]}
              alt=""
              className="h-auto min-w-full object-center object-cover group-hover:scale-110 duration-1000"
            />
            <div className="absolute bottom-3 right-3 bg-[#127266] text-white z-[2] px-4 py-1 rounded-lg text-sm">
              {item?.quantity === "0" ? "Out of stock" : "Sale"}
            </div>
          </div>
        </Link>

        <div className="text-gray-700 text-base py-3">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            {" "}
            <h1 className="text-sm sm:text-[15px] capitalize truncate">
              {item?.name}
            </h1>
          </Link>
          {/* <NavLink to={'/category/' + item?.category} ><h1 className='text-sm sm:text-[15px] capitalize truncate'>{item?.category}</h1>  </NavLink> */}
        </div>

        <div className="font-semibold flex items-center gap-2 w-full">
          {camp?.status !== "active" &&
          (item.discount_type === "no_discount" ||
            item.discount_price === "0.00") ? (
            " "
          ) : (
            <div className="line-through text-gray-500 text-xs ">
              <p>
                {" "}
                <BDT price={Math.trunc(item.regular_price)} />
              </p>
            </div>
          )}
          {item?.regular_price !== "0" && (
            <p className="text-sm text-red-500">
              <BDT
                price={camp?.status === "active" ? campPrice : productGetPrice}
              />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card68;
