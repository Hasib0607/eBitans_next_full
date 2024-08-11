"use client";
import Details from "@/components/_product-details-page/product-details/three/details";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Taka from "@/utils/taka";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import QuikView from "../quick-view";

const Card22 = ({ item }: any) => {
  const [camp, setCamp] = useState<any>(null);

  const { design, makeid, store_id } = useTheme();
  const dispatch = useDispatch();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

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
  `;

  const filterOfferProduct = (item: any) => {
    let cartItem = {};
    let productDetails = {
      id: item?.id,
      store_id,
    };
    toast("Added to Cart", {
      type: "success",
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
    <div className="relative">
      {/* out of stock  */}
      {item?.quantity === "0" && (
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
            <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
              Sold Out
            </p>
          </div>
        </Link>
      )}
      <div className="group">
        <style>{styleCss}</style>
        <div className="relative">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <img
              src={productImg + item.image[0]}
              alt=""
              className="h-auto min-w-full"
            />
          </Link>
          <p className="absolute bg-gray-800 text-xs text-white top-4 left-4 px-2 py-1">
            {camp ? "OFFER" : "NEW"}
          </p>
          <div
            onClick={() => setView(!view)}
            className="searchHover scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 duration-1000 lg:cursor-pointer h-12 w-12 rounded-full absolute top-4 right-5 bg-white"
          >
            <AiOutlineSearch className="text-2xl mt-3 ml-[14px]" />
          </div>
          <div
            onClick={add_cart_item}
            className="flex searchHover lg:cursor-pointer text-lg flex-row items-center scale-100 opacity-0 group-hover:opacity-100 duration-1000 gap-1 bg-white text-black px-2 w-max py-1 absolute left-[50%] -translate-x-1/2 bottom-6 "
          >
            <BsPlusLg className="text-xs " />
            <p>Add To Cart</p>
          </div>
        </div>

        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="pt-3 pb-1 text-gray-500 text-lg font-medium">
            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
              {item?.name}
            </h1>
          </div>
        </Link>
        <div className="text-lg text-gray-700 font-semibold">
          <Taka />
          {camp?.status === "active"
            ? campPrice
            : store_id === 2109
            ? productGetPrice
            : price}
          {camp?.status !== "active" &&
          (item.discount_type === "no_discount" ||
            item.discount_price === "0.00") ? (
            " "
          ) : (
            <p className="text-sm line-through">
              {" "}
              <Taka />
              {item.regular_price}
            </p>
          )}
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card22;
