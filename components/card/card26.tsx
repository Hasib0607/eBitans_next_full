"use client";
import Details from "@/components/_product-details-page/product-details/three/details";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import QuikView from "../quick-view";

const Card26 = ({ item }: any) => {
  const { design, makeid, store_id } = useTheme();
  const [camp, setCamp] = useState<any>(null);

  const dispatch = useDispatch();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const [open, setOpen] = useState(false);

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
    .cardHover:hover {
        border: 1px solid ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .bg-color {
        background: ${design?.header_color};
        color:  ${design?.text_color};
    }
  
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

    httpReq.post("get/offer/product", productDetails).then((res) => {
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
      setOpen(!open);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <div>
      <div className="group cardHover border-[1px] rounded-lg relative overflow-hidden lg:hover:-translate-y-2 duration-700">
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[2]">
              <p className="bg-blue-600 text-white px-2 py-1 w-max absolute right-0 rounded-bl-lg">
                Sold Out
              </p>
            </div>
          </Link>
        )}
        <style>{styleCss}</style>
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="">
            <img
              src={productImg + item.image[0]}
              alt=""
              className="h-auto lg:group-hover:opacity-10 max-w-full duration-700"
            />
          </div>
        </Link>
        {item?.discount_type === "no_discount" ||
        item.discount_price === "0.00" ? (
          ""
        ) : (
          <div className="absolute text-xs px-2 py-1 bg-color text-white top-2 left-2 rounded-md">
            <p>
              {item.discount_type === "fixed" ? "BDT" : ""}{" "}
              {Math.trunc(item.discount_price)}{" "}
              {item.discount_type === "percent" ? "%" : ""}
            </p>
          </div>
        )}

        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="text-gray-500 text-sm sm:text-lg font-medium sm:py-6 py-2 px-5 capitalize">
            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
              {item?.name}
            </h1>
          </div>{" "}
        </Link>

        <div className="text-gray-600 text-lg font-semibold flex gap-1 pb-6 px-5">
          <h1 className="line-through text-xs sm:text-sm mt-1.5">
            {camp?.status !== "active" &&
            (item.discount_type === "no_discount" ||
              item.discount_price === "0.00") ? (
              " "
            ) : (
              <p> BDT {Math.trunc(item.regular_price)}</p>
            )}
          </h1>
          <p className="text-color sm:text-base text-sm">
            BDT {camp?.status === "active" ? campPrice : productGetPrice}
          </p>
        </div>

        <div
          onClick={add_cart_item}
          className="searchHover w-full lg:cursor-pointer text-base  text-center lg:w-max lg:px-16 bg-blue-400 py-2 lg:absolute lg:top-32  z-[1] lg:group-hover:translate-x-[-50%] lg:group-hover:left-[50%] lg:translate-x-[-100%] lg:left-[-100%] duration-700 rounded-sm"
        >
          <p className="text-white font-medium sm:text-base text-xs">
            ADD IN CART
          </p>
        </div>
      </div>
      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card26;
