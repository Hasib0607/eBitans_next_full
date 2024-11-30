"use client";
import { getPrice } from "@/utils/get-price";
// created by iazadur
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import { PlusIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import QuikView from "../quick-view";
import Details from "../product-quick-view-details/details";

const Card18 = ({ item, store_id }: any) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
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

  return (
    <div className="shadow-lg group flex flex-col justify-between relative">
      {/* out of stock  */}
      {item?.quantity === "0" && (
        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
          <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
            Sold Out
          </p>
        </div>
      )}
      {item?.image && (
        <div className=" w-full h-full relative overflow-hidden">
          <div
            className="h-10 w-[75px] absolute top-4 left-0 bg-black flex justify-center items-center -rotate-90"
            style={{
              clipPath:
                "polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 15% 50%, 0% 0%)",
            }}
          >
            <p className="font-semibold text-xl text-white pl-1">New</p>
          </div>
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="flex-1">
              <img
                src={productImg + item?.image[0]}
                className={"h-auto min-w-full"}
                alt=""
              />
            </div>
          </Link>
          <div className="bg-gray-200 h-[40px] w-full absolute bottom-0 left-0 right-0 translate-y-10 group-hover:translate-y-0 transition-all duration-500 ease-linear flex divide-x-2 divide-white lg:cursor-pointer">
            <div
              onClick={add_cart_item}
              className="h-full w-12 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200 ease-linear"
            >
              <ShoppingBagIcon className="h-6 w-6" />
            </div>
            <div
              onClick={add_cart_item}
              className="h-full grow flex items-center justify-center hover:bg-gray-100  transition-all duration-200 ease-linear"
            >
              <p className="uppercase px-1 text-xs sm:text-sm ">Add To Cart</p>
            </div>
            <div
              onClick={() => setOpen(!open)}
              className="h-full w-12 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200 ease-linear"
            >
              <PlusIcon className="h-6 w-6" />
            </div>
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <div className="h-full w-12 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-200 ease-linear ">
                {/* <ViewGridIcon className='h-6 w-6' /> */}
              </div>
            </Link>
          </div>
        </div>
      )}
      <Link href={"/product/" + item?.id + "/" + item?.slug}>
        {" "}
        <div className="p-[10px] bg-[#f1f1f1] h-[90px] w-full">
          <h2 className="text-md hover:text-green-600 capitalize lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
            {item?.name}
          </h2>
          <div className="flex justify-between items-center flex-wrap">
            <div className="flex items-center gap-2">
              <p className="text-[#0f8ea1] font-semibold">
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
                <p className="line-through text-sm">
                  {" "}
                  <BDT price={Math.trunc(item.regular_price)} />
                </p>
              )}
            </div>
            <div className="flex gap-x-1 pt-2">
              <div>
                <Rate rating={item?.rating} />
              </div>
              <div className="text-gray-500 sm:text-sm text-xs">
                ({item?.number_rating})
              </div>
            </div>
          </div>
        </div>
      </Link>
      <QuikView open={open} setOpen={setOpen}>
        <Details
          item={item}
          updateData={{
            product_id: item?.id,
            slug: item.slug,
            store_id,
          }}
        />
      </QuikView>
    </div>
  );
};

export default Card18;
