"use client";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import Rate from "@/utils/rate";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Details from "../_product-details-page/product-details/three/details";
import QuikView from "../quick-view";

const Card35 = ({ item, design, store_id }: any) => {
  const [open, setOpen] = useState(false);
  const [camp, setCamp] = useState<any>(null);

  const dispatch = useDispatch();

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

  const filterOfferProduct = (item: any) => {
    let cartItem = {};
    let productDetails = {
      id: item?.id,
      store_id,
    };

    toast("Added to Cart", {
      type: "success",
      autoClose: 1000,
    });

    httpReq
      .post(
        "https://admin.ebitans.com/api/v1/" + "get/offer/product",
        productDetails
      )
      .then((res: any) => {
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

          cartItem = {
            cartId: uuidv4(),
            price: campaignPrice,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        } else {
          cartItem = {
            cartId: uuidv4(),
            price: productGetPrice,
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
      setOpen(!open);
    } else {
      filterOfferProduct(item);
    }
  };

  const styleCss = `
    .search-bg{
        background: ${design?.header_color} ;
        color : white;
    } 
  `;

  return (
    <div className="group flex flex-col justify-between ">
      <style>{styleCss}</style>
      <div className=" w-full h-full border-4 border-[#F4F4F4] overflow-hidden">
        <div className="flex justify-center relative overflow-hidden">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <img
              src={productImg + item?.image[0]}
              className="block h-auto min-w-[100%] mx-auto mt-auto group-hover:scale-125  transition-all duration-700 ease-linear group-hover:rotate-6"
              alt=""
            />
          </Link>

          {item.discount_type === "no_discount" ||
          item.discount_price === "0.00" ? (
            ""
          ) : (
            <div
              className="absolute text-xs px-2  py-2 top-2 right-2 rounded-md"
              style={{
                background: `${design?.header_color}`,
                color: `${design?.text_color}`,
              }}
            >
              <p>
                Save {item.discount_type === "fixed" ? "BDT" : ""}{" "}
                {Math.trunc(item.discount_price)}{" "}
                {item.discount_type === "percent" ? "%" : ""}
              </p>
            </div>
          )}
          <div className="h-[80px]  absolute opacity-0 group-hover:opacity-100 bottom-0 left-[50%] translate-x-[-50%] translate-y-10 group-hover:translate-y-0 transition-all duration-500 ease-linear flex divide-x-2 lg:cursor-pointer gap-4  ">
            <div
              className="rounded-full border-4 border-white h-12 w-12 flex justify-center items-center search-bg hover:bg-blue-300 duration-300"
              onClick={() => setOpen(!open)}
            >
              <AiOutlineSearch className="text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white pb-5">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div>
              <div className="flex justify-center bg-[#F4F4F4] py-3">
                <h2 className="text-xl text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                  {item?.name}
                </h2>
              </div>

              <div className="text-gray-600 text-lg font-semibold flex flex-wrap items-center gap-1 px-5 pt-2 justify-center">
                <p
                  className="text-color"
                  style={{ color: design?.header_color }}
                >
                  BDT {camp?.status === "active" ? campPrice : productGetPrice}
                </p>
                <h1
                  className="line-through text-sm "
                  style={{ color: design?.header_color }}
                >
                  {camp?.status !== "active" &&
                  (item.discount_type === "no_discount" ||
                    item.discount_price === "0.00") ? (
                    " "
                  ) : (
                    <p> BDT {Math.trunc(item.regular_price)}</p>
                  )}
                </h1>
              </div>

              <div className="flex justify-center items-center gap-x-1 pt-2">
                <div>
                  <Rate rating={item?.rating} />
                </div>
                <div className="text-gray-500 sm:text-sm text-xs">
                  ({item?.number_rating})
                </div>
              </div>
            </div>
          </Link>

          <div className="flex justify-center pt-2 ">
            <button
              className="border py-2 px-4 rounded-lg search-bg hover:bg-blue-300 duration-300"
              onClick={add_cart_item}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card35;
