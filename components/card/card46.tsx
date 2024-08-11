"use client";
import Details from "@/components/_product-details-page/product-details/eight/details";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Taka from "@/utils/taka";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import QuikView from "../quick-view";

const Card46 = ({ item }: any) => {
  const { store_id, makeid } = useTheme();
  const [view, setView] = useState(false);
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
      setView(!view);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <>
      <div className="group flex flex-col justify-between overflow-hidden relative">
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[3]">
              <p className="bg-red-600 text-white px-2 py-1 w-max absolute left-0">
                Sold Out
              </p>
            </div>
          </Link>
        )}
        {item?.image && (
          <div className="relative overflow-hidden">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <div className="flex-1">
                <img
                  src={productImg + item?.image[0]}
                  className="h-auto min-w-full"
                  alt=""
                />
              </div>
            </Link>
            <div className="bg-black text-white absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 transition-all duration-500 ease-linear flex divide-x-2 divide-white lg:cursor-pointer">
              <div
                className="h-full grow flex items-center justify-center  transition-all duration-200 ease-linear"
                onClick={() => setView(!view)}
              >
                <p className="px-3 hover:bg-green-500 hover:rounded-lg hover:shadow-xl py-1 md:test-sm text-xs sm:text-sm">
                  quick look
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="p-[10px] bg-white h-[70px] flex justify-between items-center">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <h2 className="text-md capitalize lg:text-sm hover:text-green-500 font-bold whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
              {item?.name}
            </h2>
          </Link>
          <div className="flex justify-between items-center">
            <div
              onClick={add_cart_item}
              className="lg:cursor-pointer hover:touch-pinch-zoom hover:text-green-600 group-hover:opacity-100 opacity-0 -translate-x-20 group-hover:translate-x-0 duration-700 flex items-start justify-between text-sm"
            >
              <p>Add to cart </p> <AiOutlineArrowRight className="ml-2 mt-1" />
            </div>

            <div className="flex group-hover:opacity-0 opacity-100 translate-x-0 group-hover:translate-x-20 duration-700 group-hover:hidden">
              {camp?.status !== "active" &&
              (item.discount_type === "no_discount" ||
                item.discount_price === "0.00") ? (
                " "
              ) : (
                <p className="line-through text-sm font-semibold mr-3 ">
                  {" "}
                  <Taka price={item.regular_price} /> {item.regular_price}
                </p>
              )}
              <p className=" text-sm font-semibold ">
                <Taka
                  tk={camp?.status === "active" ? campPrice : productGetPrice}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </>
  );
};

export default Card46;
