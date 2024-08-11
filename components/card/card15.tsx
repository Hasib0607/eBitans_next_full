"use client";
import { useEffect, useState } from "react";

import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import Rate from "@/utils/rate";
import Taka from "@/utils/taka";
import { motion } from "framer-motion";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import QuikView from "../quick-view";

import { addToCartList } from "@/redux/features/product.slice";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import { useDispatch } from "react-redux";
import Details from "../_product-details-page/product-details/eight/details";

const Card15 = ({ item }: any) => {
  const { design, store_id, makeid } = useTheme();
  const [open, setOpen] = useState(false);
  const [camp, setCamp] = useState<any>(null);
  const [hoverCard, setHoverCard] = useState(false);

  const dispatch = useDispatch();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const styleCss = `
  .searchHover:hover {
      color:  ${textColor};
      background: ${bgColor};
  }
  .text-hover:hover {
      color:  ${design?.header_color};
    }
`;
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
      setOpen(!open);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <div>
      <style>{styleCss}</style>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
        style={{
          border: hoverCard ? `1px solid ${bgColor}` : "",
        }}
        onMouseEnter={() => setHoverCard(true)}
        onMouseLeave={() => setHoverCard(false)}
        className="rounded overflow-hidden shadow-sm group border border-transparent relative"
      >
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
              <p className="bg-red-600 text-white px-2 py-1 w-max">
                Out of Stock
              </p>
            </div>
          </Link>
        )}

        <div className="absolute top-2 left-2 text-white bg-black rounded-sm px-2 text-xs py-1">
          <p>{camp ? "OFFER" : "NEW"}</p>
        </div>
        <div className="relative">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <img
              className="min-w-full h-auto"
              src={productImg + item?.image[0]}
              alt={item?.name}
            />
          </Link>
          <div
            className=" absolute searchHover top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white group-hover:flex justify-center items-center h-10 w-10 rounded-full transition-all ease-in-out delay-550 hover:-translate-y-10 lg:cursor-pointer group-hover:scale-110  duration-1000 hidden"
            onClick={() => setOpen(!open)}
          >
            <AiOutlineSearch className="text-xl" />
          </div>
        </div>

        <div className="py-6 px-3 space-y-2 flex justify-center flex-col items-center">
          <Link href={"/category/" + item?.category_id}>
            <p className="text-sm font-light antialiased mb-2">
              {item?.category}
            </p>
          </Link>
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <h3 className="text-sm text-gray-800 font-bold antialiased whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
              {item?.name}
            </h3>
          </Link>

          <div className="flex gap-x-1">
            <div>
              <Rate rating={item?.rating} />
            </div>
            <div className="text-gray-500 sm:text-sm text-xs">
              ({item?.number_rating})
            </div>
          </div>

          <div className="text-base antialiased group-hover:hidden flex items-center gap-2">
            <Taka
              tk={camp?.status === "active" ? campPrice : productGetPrice}
            />
            {camp?.status !== "active" &&
            (item.discount_type === "no_discount" ||
              item.discount_price === "0.00") ? (
              " "
            ) : (
              <p className="text-sm line-through">
                {" "}
                <Taka tk={Math.trunc(item.regular_price)} />
              </p>
            )}
          </div>
          <div
            className="transition-all text-hover ease-in-out delay-500 hover:-translate-y-1 group-hover:scale-110 duration-1000 lg:cursor-pointer hidden group-hover:block text-xs font-semibold underline"
            onClick={add_cart_item}
          >
            ADD TO CART
          </div>
        </div>
      </motion.div>
      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card15;
