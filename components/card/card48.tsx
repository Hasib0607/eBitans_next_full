"use client";
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
import Details from "../_product-details-page/product-details/three/details";
import QuikView from "../quick-view";

const Card48 = ({ item, store_id }: any) => {
  const [view, setView] = useState(false);
  const [camp, setCamp] = useState<any>(null);
  const { makeid } = useTheme();

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

  const dispatch = useDispatch();

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
      <div
        className="group flex flex-col justify-between overflow-hidden relative"
        key={item?.id}
      >
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
          <div className=" w-full h-full relative overflow-hidden">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <div className="flex-1 h-auto min-w-full">
                <img
                  src={productImg + item?.image[0]}
                  className="h-full w-full"
                  alt=""
                />
              </div>
            </Link>
          </div>
        )}
        <div className="w-full">
          <div className="w-full flex justify-center my-2">
            <h2 className="text-md capitalize lg:text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
              {item?.name}
            </h2>
          </div>
          <div className="flex justify-center items-center">
            <div
              onClick={add_cart_item}
              className="lg:cursor-pointer group-hover:opacity-100 opacity-0 -translate-x-10 group-hover:translate-x-0 duration-700 flex items-start justify-between text-sm"
            >
              <p>Add to cart </p> <AiOutlineArrowRight className="ml-2 mt-1" />
            </div>

            <div className="flex items-center gap-2 group-hover:opacity-0 opacity-100 -translate-x-12 group-hover:translate-x-40 duration-700 ">
              <p className="font-semibold">
                <Taka
                  tk={camp?.status === "active" ? campPrice : productGetPrice}
                />
              </p>
              {camp?.status !== "active" &&
              (item.discount_type === "no_discount" ||
                item.discount_price === "0.00") ? (
                " "
              ) : (
                <p className="line-through text-sm">
                  {" "}
                  <Taka tk={Math.trunc(item.regular_price)} />
                </p>
              )}
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

export default Card48;
