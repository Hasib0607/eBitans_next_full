"use client";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Card61 = ({ item }: any) => {
  const { design, store_id, makeid } = useTheme();
  const [camp, setCamp] = useState<any>(null);

  const dispatch = useDispatch();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const [view, setView] = useState(false);

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
        color:  white;
        background: #83C341;
    }
    .text-color-thirty {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design?.header_color};
        text-decoration: underline;
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-thirty-five {  
        background: ${bgColor};
    }

  `;

  const price = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const filterOfferProduct = (item: any) => {
    let cartItem = {};
    let productDetails = {
      id: item?.id,
      store_id,
    };
    toast("Added to Bag", {
      type: "success",
      autoClose: 1000,
    });

    httpReq.post("get/offer/product", productDetails).then((res: any) => {
      if (!res?.error) {
        let itemRegularPrice = getPrice(
          item?.regular_price,
          item?.discount_price,
          item?.discount_type
        );
        let campaignPrice = getPrice(
          itemRegularPrice,
          parseInt(res?.discount_amount),
          res?.discount_type
        );
        if (res?.discount_amount === null) {
          cartItem = {
            cartId: makeid(100),
            price: itemRegularPrice,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        } else {
          cartItem = {
            cartId: makeid(100),
            price: campaignPrice,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        }
      } else {
        cartItem = {
          cartId: makeid(100),
          price: price,
          color: null,
          size: null,
          additional_price: null,
          volume: null,
          unit: null,
          ...item,
        };
      }
      dispatch(addToCartList({ ...cartItem }));
    });
  };

  const add_cart_item = () => {
    if (item?.variant.length !== 0) {
      setView(!view);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <div className="group overlay-group relative">
      <div className="">
        <style>{styleCss}</style>
        <div className="relative">
          <div className="relative overflow-hidden w-full h-full px-6 border border-black shadow-[5px_5px_1px_1px_black]">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <img
                src={productImg + item.image[0]}
                alt=""
                className="h-auto min-w-full object-center object-cover hover:scale-105 transform transition duration-700 ease-in-out"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-2 pb-3 pt-6">
            <div className="font-medium flex justify-between items-center flex-wrap">
              <Link href={"/product/" + item?.id + "/" + item?.slug}>
                <h1 className="text-gray-700 text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[120px]">
                  {item?.name}
                </h1>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {camp?.status !== "active" &&
              (item.discount_type === "no_discount" ||
                item.discount_price === "0.00") ? (
                ""
              ) : (
                <p className="line-through text-xs text-color-thirty">
                  {" "}
                  <BDT price={Math.trunc(item.regular_price)} />
                </p>
              )}
              <p className="text-sm py-1 rounded-lg text-[#83C341] font-bold">
                <BDT
                  price={
                    camp?.status === "active" ? campPrice : productGetPrice
                  }
                />
              </p>
            </div>

            {item?.quantity === "0" ? (
              <div className="relative lg:cursor-pointer font-bold">
                <p className="lg:text-lg text-base relative z-[2] py-3 text-center duration-500 bg-white border border-black text-black">
                  Out of stock
                </p>
                <div className="absolute top-1.5 left-1.5 group-hover:top-0 group-hover:left-0 duration-500 z-[1] h-full w-full cart-thirty-five border border-black"></div>
              </div>
            ) : (
              <div>
                {item?.variant.length !== 0 ? (
                  <Link href={"/product/" + item?.id + "/" + item?.slug}>
                    <div className="relative lg:cursor-pointer font-bold">
                      <p className="lg:text-lg text-base relative z-[2] py-3 text-center duration-500 bg-white border border-black text-black">
                        {store_id === 2272 ? "Buy Now" : "View details"}
                      </p>
                      <div className="absolute top-1.5 left-1.5 group-hover:top-0 group-hover:left-0 duration-500 z-[1] h-full w-full cart-thirty-five border border-black"></div>
                    </div>
                  </Link>
                ) : (
                  <div
                    onClick={add_cart_item}
                    className="relative lg:cursor-pointer font-bold"
                  >
                    <p className="lg:text-lg text-base relative z-[2] py-3 text-center duration-500 bg-white border border-black text-black">
                      {store_id === 2272 ? "Buy Now" : "Add To Cart"}
                    </p>
                    <div className="absolute top-1.5 left-1.5 group-hover:top-0 group-hover:left-0 duration-500 z-[1] h-full w-full cart-thirty-five border border-black"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card61;
