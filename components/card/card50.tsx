"use client";
import useTheme from "@/hooks/use-theme";
import {
  addToCartList,
  decrementQty,
  incrementQty,
} from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Taka from "@/utils/taka";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/eight/details";
import QuikView from "../quick-view";

const Card50 = ({ item }: any) => {
  const { store_id, design } = useTheme();
  const [open, setOpen] = useState(false);
  const [camp, setCamp] = useState<any>(null);

  const cardShadow = `
   .cardShadow{
    -moz-box-shadow: 0 0 5px #888;
    -webkit-box-shadow: 0 0 5px#888;
    box-shadow: 0 0 5px #888;
    }
    .card-fifty:hover{
        background: ${design?.header_color};
        color: ${design?.text_color};
    }
    .quick-fifty{
        background: ${design?.header_color};
        color: ${design?.text_color};
        opacity: 0.7;
    }
    .quick-fifty:hover{
        background: ${design?.text_color};
        color: ${design?.header_color};
        opacity: 1;
    }

   `;

  const unitAddPrice =
    parseInt(item.regular_price) +
    (item?.variant[0]?.unit && item?.variant[0]?.additional_price
      ? parseInt(item?.variant[0]?.additional_price)
      : 0);
  const productGetPrice = getPrice(
    unitAddPrice,
    item.discount_price,
    item.discount_type
  );
  const campPriceUnit = getPrice(
    productGetPrice,
    parseInt(camp?.discount_amount),
    camp?.discount_type
  );

  const price = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice = getPrice(
    price,
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

  return (
    <>
      <div className="bg-white relative rounded-lg overflow-hidden card-fifty hover:bg-opacity-100 border shadow-xl group transition-all duration-300 ease-linear h-full flex flex-col">
        <style>{cardShadow}</style>
        {item?.quantity === "0" && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-white bg-opacity-80 z-[2]"></div>
        )}
        <div className="w-full relative overflow-hidden">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <img
              className="min-w-full h-auto bg-white"
              src={productImg + item?.image[0]}
              alt=""
            />
          </Link>
          {camp?.status !== "active" &&
          (item.discount_type === "no_discount" ||
            item.discount_price === "0.00") ? (
            ""
          ) : (
            <div className="absolute z-[3] top-2 right-2 bg-[#ff576d] px-[5px] py-[2px] h-[22px] rounded-md text-white flex justify-center items-center text-xs font-semibold">
              {" "}
              Save
              {(camp?.discount_type || item.discount_type) === "fixed" &&
                " ৳"}{" "}
              {parseInt(
                campPrice
                  ? parseInt(camp?.discount_amount)
                  : item?.discount_price
              )}{" "}
              {(camp?.discount_type || item.discount_type) === "percent" && "%"}
            </div>
          )}
          {parseInt(item?.quantity) === 0 && (
            <div className="absolute top-2 z-[3] right-2 bg-[#ff576d] px-[7px] py-[2px] h-[22px] rounded-md text-white flex justify-center items-center text-xs font-semibold">
              Out Of Stock
            </div>
          )}
          <button
            onClick={() => setOpen(true)}
            className="absolute -bottom-3 translate-y-6 group-hover:translate-y-0 transition-all duration-300 ease-linear left-0 right-0 mx-auto rounded-t-md px-1 font-semibold text-md pb-3 hover:bg-opacity-90 text-md flex justify-center items-center gap-x-1 shadow-4xl quick-fifty"
          >
            Quick View
          </button>
        </div>
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          {/* <div className="h-[1px] w-full my-2 group-hover:bg-green-200 bg-gray-200 transition-all duration-300 ease-linear"></div> */}
          <div className="py-2 px-2">
            <h4 className="font-semibold text-[14px] xl:text-[15px] lg:text-[15px] md:text-[14px] whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
              {item?.name}
            </h4>
          </div>
        </Link>

        {item?.variant[0]?.unit && store_id === 2109 && (
          <div className="px-2">
            <p>
              <b>Unit:</b> {item?.variant[0]?.volume} {item?.variant[0]?.unit}
            </p>
          </div>
        )}

        <div className="text-[13px] px-2 flex items-center gap-2">
          <p className={`font-bold text-sm sm:text-base`}>
            ৳{" "}
            {camp?.status === "active"
              ? campPrice
              : store_id === 2109
              ? productGetPrice
              : price}{" "}
          </p>
          {camp?.status !== "active" &&
          (item.discount_type === "no_discount" ||
            item.discount_price === "0.00") ? (
            " "
          ) : (
            <p className="line-through">
              <Taka />
              {item.regular_price}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-end py-3 px-2">
          <div className="">
            <AddToCart
              item={item}
              setView={setOpen}
              view={open}
              campPrice={campPrice}
              productGetPrice={productGetPrice}
              campPriceUnit={campPriceUnit}
              price={price}
              store_id={store_id}
            />
          </div>
        </div>
      </div>
      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </>
  );
};

export default Card50;

const AddToCart = ({
  item,
  setView,
  view,
  productGetPrice,
  campPrice,
  campPriceUnit,
  price,
  store_id,
}: any) => {
  const { cartList } = useSelector((state: any) => state.cart);
  const { makeid } = useTheme();
  const dispatch = useDispatch();
  const [already, setalready] = useState<any>(null);

  useEffect(() => {
    const result = cartList.find((i: any) => i?.id === item?.id);

    setalready(result);
  }, [cartList, item.id]);

  // only without variant product added to cart

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
        if (item?.variant[0]?.unit && store_id === 2109) {
          cartItem = {
            cartId: makeid(100),
            price: parseInt(campPriceUnit),
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            variant_quantity: item?.variant[0]?.quantity,
            variantId: item?.variant[0]?.id,
            ...item?.variant[0],
            ...item,
          };
        } else {
          cartItem = {
            cartId: makeid(100),
            price: parseInt(campPrice),
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        }
      } else {
        if (item?.variant[0]?.unit && store_id === 2109) {
          cartItem = {
            cartId: makeid(100),
            price: parseInt(productGetPrice),
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            variant_quantity: item?.variant[0]?.quantity,
            variantId: item?.variant[0]?.id,
            ...item?.variant[0],
            ...item,
          };
        } else {
          cartItem = {
            cartId: makeid(100),
            price: parseInt(price),
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        }
      }
      dispatch(addToCartList({ ...cartItem }));
    });
  };

  const handleCart = () => {
    if (
      item?.variant.length !== 0 &&
      !item?.variant[0]?.unit &&
      store_id === 2109
    ) {
      setView(!view);
    } else if (item?.variant.length !== 0 && store_id !== 2109) {
      setView(!view);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div
        className={`${
          item?.quantity === "0"
            ? "rounded-full border relative z-[3] border-red-500 text-red-500 font-semibold test-base hover:border-red-500  hover:bg-red-500 hover:text-white hover:stroke-white transition-all ease-linear"
            : "rounded-full border card-fifty "
        }`}
      >
        {already?.cartId ? (
          <div className="flex items-center lg:cursor-pointer h-[22px] w-[94px] justify-between">
            <div
              onClick={() => dispatch(decrementQty(already?.cartId))}
              className="max-w-[18px] w-full border-r h-full flex justify-center items-center"
            >
              <MinusIcon className="h-2 w-2  stroke-1 " />
            </div>
            <div className="flex flex-1  h-full justify-center items-center">
              <p
                onClick={() => handleCart()}
                className="font-semibold  text-xs "
              >
                {already?.qty}
                {"  "} in cart
              </p>
            </div>
            <div
              onClick={() => dispatch(incrementQty(already?.cartId))}
              className="max-w-[18px] w-full h-full border-l flex justify-center items-center"
            >
              <PlusIcon className="h-2 w-2  stroke-1 " />
            </div>
          </div>
        ) : (
          <div
            onClick={() => handleCart()}
            className="flex items-center gap-2 lg:cursor-pointer px-2"
          >
            {item?.quantity === "0" ? (
              <button
                type="button"
                disabled
                className="cursor-not-allowed text-sm"
              >
                Out Of Stock
              </button>
            ) : (
              <>
                <ShoppingBagIcon className="h-4 w-4 font-bold" />
                <p className=" font-bold text-sm">Cart</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
