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
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/three/details";
import QuikView from "../quick-view";

const Card29 = ({ item, design, store_id }: any) => {
  const { makeid } = useTheme();
  const [camp, setCamp] = useState<any>(null);
  const [id, setId] = useState(0);
  const [view, setView] = useState(false);

  const dispatch = useDispatch();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

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
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color:  ${design?.header_color};
    }
    .cart-color {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color};
       
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
    <div>
      <div className="group relative overflow-hidden">
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[2]">
            <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
              Sold Out
            </p>
          </div>
        )}
        <style>{styleCss}</style>
        <div className="relative overflow-hidden">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <img
              src={productImg + item.image[id]}
              alt=""
              className="h-auto min-w-full"
            />
          </Link>
          <div className="flex flex-col gap-y-1 absolute right-3 group-hover:bottom-12 -bottom-5  group-hover:opacity-100 opacity-0 duration-500">
            {item?.image?.map((data: any, index: number) => (
              <div key={index}>
                {item.image.length > 1 ? (
                  <p
                    onClick={() => setId(index)}
                    className={`${
                      id === index ? "bg-blue-600" : "bg-gray-200"
                    } h-3 w-3 rounded-full `}
                  ></p>
                ) : (
                  " "
                )}
              </div>
            ))}
          </div>
          <div
            onClick={() => setView(!view)}
            className="w-full lg:cursor-pointer bg-white searchHover py-3 flex justify-center absolute group-hover:bottom-0 -bottom-16 duration-500"
          >
            <BiSearch className="text-2xl text-center" />
          </div>
          {camp?.status !== "active" &&
          (item.discount_type === "no_discount" ||
            item.discount_price === "0.00") ? (
            ""
          ) : (
            <div className="absolute sm:text-xs text-[10px] px-1 sm:px-2 sm:py-1 py-0 bg-color text-white top-2 right-2 ">
              <p>
                {item.discount_type === "fixed" ? "BDT" : ""}{" "}
                {Math.trunc(item.discount_price)}{" "}
                {item.discount_type === "percent" ? "%" : ""}
              </p>
            </div>
          )}
        </div>

        <div className="text-gray-700 sm:text-base text-sm font-bold p-2 pt-4 ">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            {" "}
            <h1 className="text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
              {item?.name}
            </h1>{" "}
          </Link>
        </div>

        <div className="text-gray-600 font-semibold flex sm:flex-row flex-col sm:items-center sm:gap-2 w-full px-2 pb-5 ">
          <p className="text-color text-sm">
            <BDT
              price={camp?.status === "active" ? campPrice : productGetPrice}
            />
          </p>
          <h1 className="line-through text-xs ">
            {camp?.status !== "active" &&
            (item.discount_type === "no_discount" ||
              item.discount_price === "0.00") ? (
              " "
            ) : (
              <p>
                {" "}
                <BDT price={item.regular_price} />{" "}
              </p>
            )}
          </h1>
        </div>

        <div
          onClick={add_cart_item}
          className="px-2 lg:cursor-pointer text-xs gap-1 w-full absolute group-hover:bottom-4 -bottom-12 duration-500 bg-white z-[1]"
        >
          <p className=" font-medium border-b-2 px-2 py-1 w-max cart-color">
            ADD IN CART
          </p>
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card29;
