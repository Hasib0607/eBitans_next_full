"use client";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import { BsEye } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/eight/details";
import QuikView from "../quick-view";

const Card47 = ({ item, stopAutoplay }: any) => {
  const { design, store_id } = useTheme();
  const dispatch = useDispatch();

  const [id, setId] = useState(0);
  const [camp, setCamp] = useState<any>(null);

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const [view, setView] = useState(false);

  const secondImg = item?.image[1] ? item?.image[1] : item?.image[0];

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

  let productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice = getPrice(
    productGetPrice,
    parseInt(camp?.discount_amount),
    camp?.discount_type
  );

  const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
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

  `;

  const price = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
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
            cartId: uuidv4(),
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
            cartId: uuidv4(),
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
          cartId: uuidv4(),
          price: price,
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
    <div className="">
      <div className="group relative">
        <style>{styleCss}</style>
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[2]">
              <p className="bg-red-600 text-white px-2 py-1 w-max">
                Out of Stock
              </p>
            </div>
          </Link>
        )}

        <div className="relative overflow-hidden w-full image-div">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <img
              src={productImg + item.image[id]}
              alt=""
              className="h-auto min-w-full image-hover block  lg:hover:scale-110 transform transition duration-[2000ms] ease-linear"
            />
          </Link>
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            {" "}
            <img
              src={productImg + secondImg}
              alt=""
              className="h-auto min-w-full image-hover-two hidden lg:hover:scale-110 transform transition duration-[2000ms] ease-linear"
            />
          </Link>
          <div onClick={() => setView(!view)} className="view-eye">
            <div className="w-10 h-10 rounded-full lg:cursor-pointer bg-white text-black searchHover flex justify-center items-center absolute  duration-500 group-hover:right-2 -right-16 top-4 z-[1]">
              <BsEye className="text-xl text-center" />
            </div>
            <p className="quick-view lg:cursor-pointer hidden text-sm bg-white pl-4 pr-10 py-2.5 rounded-full absolute right-4 top-4 ">
              Quick View
            </p>
          </div>
          <div
            onClick={add_cart_item}
            className="w-full lg:absolute lg:group-hover:bottom-0 lg:-bottom-20 lg:opacity-0 lg:group-hover:opacity-100 duration-500 z-[1]"
          >
            <p className="w-full text-center cart-btn duration-500 border border-transparent lg:cursor-pointer text-base font-bold py-2">
              ADD TO CART
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 px-4 py-3">
          <Link href={"/category/" + item?.category_id}>
            {" "}
            <div className="text-gray-500 text-xs uppercase font-bold text-center">
              <h1>{item?.category}</h1>
            </div>
          </Link>
          <div className="text-gray-700 text-sm font-extralight">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              {" "}
              <h1 className="text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                {item?.name}
              </h1>
            </Link>
          </div>

          <div className="text-gray-600 font-semibold flex flex-wrap justify-center items-center gap-2 w-full ">
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
                  <BDT price={Math.trunc(item.regular_price)} />
                </p>
              )}
            </h1>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-3">
            {item?.image?.map((data: any, index: number) => (
              <div key={index}>
                {item.image.length > 1 ? (
                  <div
                    onClick={() => {
                      setId(index);
                      stopAutoplay();
                    }}
                    className={`${
                      id === index ? "bg-color" : "bg-gray-200"
                    } h-2 w-2 sm:h-4 sm:w-4 ring-1 ring-offset-2 ring-gray-800 rounded-full lg:cursor-pointer`}
                  ></div>
                ) : (
                  " "
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card47;
