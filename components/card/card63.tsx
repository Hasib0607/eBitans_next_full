"use client";
import { useEffect, useState } from "react";

import useTheme from "@/hooks/use-theme";
import {
  addToCartList,
  decrementQty,
  incrementQty,
} from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { AiFillThunderbolt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/five/details";
import QuikView from "../quick-view";

const Card63 = ({ item }: any) => {
  const { design, store_id, makeid } = useTheme();
  const [camp, setCamp] = useState<any>(null);
  const { cartList } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const [already, setalready] = useState<any>(null);

  useEffect(() => {
    const result = cartList.find((i: any) => i?.id === item?.id);

    setalready(result);
  }, [cartList, item.id]);

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const [id, setId] = useState(0);
  const [view, setView] = useState(false);

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

  const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color-thirty {
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
        background: white;
        border: 1px solid ${bgColor};
    }
   
    .view-eye:hover .quick-view {
        display: block;
        background: white;
      }
    .image-div:hover .image-hover {
        display: none;
       
      }
    .image-div:hover .image-hover-two {
        display: block;
       
      }
      .card-overlay-thirty-six{
        background-color: black;
        opacity: 0;
      }

      .overlay-group-thirty-six:hover .card-overlay-thirty-six{
        background-color: black;
        opacity: .5;
      }

  `;

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
            price: campPriceUnit,
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
            price: campPrice,
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
            price: productGetPrice,
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
            price: price,
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

  const add_cart_item = () => {
    if (item?.variant.length !== 0) {
      setView(!view);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <div className="group overlay-group-thirty-six">
      <div className="lg:border lg:group-hover:border-gray-200 lg:border-transparent relative lg:p-2 rounded-md">
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
        <div className="">
          <style>{styleCss}</style>
          <div className="relative overflow-hidden rounded-md">
            <div className="relative overflow-hidden w-full ">
              <Link href={"/product/" + item?.id + "/" + item?.slug}>
                <img
                  src={productImg + item.image[0]}
                  alt=""
                  className="h-auto min-w-full"
                />
              </Link>
            </div>

            <div className="flex flex-col gap-2 pt-3">
              <Link href={"/product/" + item?.id + "/" + item?.slug}>
                <div className="flex justify-center items-center flex-wrap">
                  <h1 className="text-hover capitalize truncate px-1">
                    {item?.name}
                  </h1>
                </div>
              </Link>

              <div className="flex items-center justify-center flex-wrap gap-2 group-hover:opacity-0">
                <p className="text-sm py-1 rounded-lg text-color-thirty">
                  <BDT
                    price={
                      camp?.status === "active" ? campPrice : productGetPrice
                    }
                  />
                </p>
                {camp?.status !== "active" &&
                (item.discount_type === "no_discount" ||
                  item.discount_price === "0.00") ? (
                  ""
                ) : (
                  <p className="line-through text-xs">
                    <BDT price={Math.trunc(item.regular_price)} />
                  </p>
                )}
              </div>
            </div>

            <div className="lg:absolute card-overlay-thirty-six lg:z-[1] w-full h-full left-0 bottom-0">
              <Link href={"/product/" + item?.id + "/" + item?.slug}>
                <p className="absolute rounded-b-md bottom-0 left-0 bg-white border border-gray-500 w-full text-center z-[3] py-1 font-bold text-black">
                  Details
                </p>{" "}
              </Link>
            </div>
            <div className="group-hover:opacity-100 opacity-0 text-white hidden lg:block">
              {already?.cartId ? (
                <>
                  <div className="flex items-center lg:cursor-pointer lg:absolute lg:z-[2] top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 justify-between w-full text-white text-sm md:text-base font-bold gap-1 px-6">
                    <div
                      onClick={() => dispatch(decrementQty(already?.cartId))}
                      className="w-10 h-10 border rounded-full relative"
                    >
                      <MinusIcon className="h-5 lg:absolute lg:z-[2] top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2" />
                    </div>
                    <div className="text-center relative">
                      <p className="lg:absolute lg:z-[2] top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
                        {already?.qty}
                      </p>
                    </div>
                    <div
                      onClick={() => dispatch(incrementQty(already?.cartId))}
                      className="w-10 h-10 relative text-center border rounded-full border-red-50 flex justify-center items-center"
                    >
                      <PlusIcon className="h-5 lg:absolute lg:z-[2] top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <p className="lg:absolute lg:z-[2] top-[60%] -translate-x-1/2 left-1/2">
                    in Cart
                  </p>
                  <p className="lg:absolute lg:z-[2] top-[20%] -translate-x-1/2 left-1/2">
                    <BDT
                      price={
                        camp?.status === "active"
                          ? campPrice || 0 * already?.qty
                          : productGetPrice || 0 * already?.qty
                      }
                    />
                  </p>
                </>
              ) : (
                <p
                  onClick={add_cart_item}
                  className="flex justify-center items-center lg:absolute lg:z-[2] top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 text-white h-max text-2xl px-10 text-center lg:cursor-pointer"
                >
                  Add to Shopping Cart
                </p>
              )}
            </div>
          </div>
          {already?.cartId ? (
            <div className="flex items-center lg:cursor-pointer justify-between w-full mt-2 bg-red-500 text-white text-sm md:text-base font-bold gap-1 h-10">
              <div
                onClick={() => dispatch(decrementQty(already?.cartId))}
                className="w-16 text-center border-r border-red-50 h-full flex justify-center items-center"
              >
                <MinusIcon className="h-5" />
              </div>
              <div className="w-full text-center">
                <p className="">{already?.qty} in bag</p>
              </div>
              <div
                onClick={() => dispatch(incrementQty(already?.cartId))}
                className="w-16 text-center border-l border-red-50 h-full flex justify-center items-center"
              >
                <PlusIcon className="h-5" />
              </div>
            </div>
          ) : (
            <div
              onClick={add_cart_item}
              className="w-full mt-2 bg-white text-color-thirty text-sm md:text-base border font-bold flex px-2 h-10 justify-center gap-1 items-center lg:cursor-pointer"
            >
              <AiFillThunderbolt />
              <p className="">Add to Cart</p>
            </div>
          )}
        </div>

        {/* for modal open  */}
        <QuikView open={view} setOpen={setView} design={design}>
          <Details data={{ product_id: item?.id }} />
        </QuikView>
      </div>
    </div>
  );
};

export default Card63;
