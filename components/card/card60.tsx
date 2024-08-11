"use client";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import { useRouter } from "next/navigation";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Card60 = ({ item }: any) => {
  const router = useRouter();
  const { design, store_id, makeid } = useTheme();
  const [camp, setCamp] = useState<any>(null);
  const dispatch = useDispatch();
  const [id, setId] = useState(0);

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  // const [id, setId] = useState(0)
  const [view, setView] = useState(false);

  const secondImg = item?.image[1] ? item?.image[1] : item?.image[0];

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
        color:  white;
        background: #83C341;
    }
    .text-color-thirty {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design?.header_color};
        text-decoration: underline;
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-thirty-three {  
        background: ${bgColor};
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
      .card-overlay-thirty{
        background-color: ${bgColor};
        opacity: 0;
      }
      .overlay-group:hover .card-overlay-thirty{
        background-color: ${bgColor};
        opacity: .5;
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
  const buy_now = () => {
    if (item?.variant.length !== 0) {
      setView(!view);
    } else {
      filterOfferProduct(item);
      router.push("/checkout");
    }
  };

  return (
    <div className="group overlay-group relative px-2 border rounded-xl shadow-xl">
      {/* out of stock  */}
      {item?.quantity === "0" && (
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="absolute rounded-xl top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[3]">
            <p className="bg-red-600 text-white px-2 py-1 w-max absolute left-0">
              Sold Out
            </p>
          </div>
        </Link>
      )}
      <div className="">
        <style>{styleCss}</style>
        <div className="relative overflow-hidden">
          <div className="relative overflow-hidden w-full h-full sm:p-5 p-1 border-b">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              {/* <img src={productImg + item.image[0]} alt="" className='sm:h-full h-auto w-auto mx-auto' /> */}
              <img
                src={productImg + item.image[0]}
                alt=""
                className="h-auto min-w-full object-center object-cover group-hover:hidden block hover:scale-105 transform transition duration-700 ease-in-out"
              />
              <img
                src={productImg + secondImg}
                alt=""
                className="h-auto min-w-full object-center object-cover group-hover:block hidden hover:scale-105 transform transition duration-500"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-2 pb-3">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <div className="font-medium flex justify-between items-center flex-wrap">
                <h1 className="text-gray-700 text-hover capitalize truncate">
                  {item?.name}
                </h1>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              {camp?.status !== "active" &&
              (item.discount_type === "no_discount" ||
                item.discount_price === "0.00") ? (
                ""
              ) : (
                <p className="line-through text-xs text-color-thirty">
                  {" "}
                  <BDT price={Math.trunc(item.regular_price)} />
                </p>
              )}
              <p className="text-sm py-1 rounded-lg text-[#83C341] font-bold">
                <BDT
                  price={
                    camp?.status === "active" ? campPrice : productGetPrice
                  }
                />
              </p>
            </div>

            {item?.variant.length !== 0 ? (
              <Link href={"/product/" + item?.id + "/" + item?.slug}>
                <div className="flex py-2 searchHover duration-500 bg-color justify-center gap-1 items-center relative rounded-md z-[1] lg:cursor-pointer font-bold ">
                  <HiOutlineDocumentText className="text-lg" />
                  <p className="text-sm">View Details</p>
                </div>
              </Link>
            ) : (
              <div>
                <div
                  onClick={add_cart_item}
                  className="flex py-2 searchHover duration-500 bg-color justify-center gap-1 items-center relative rounded-md z-[1] lg:cursor-pointer font-bold "
                >
                  <AiOutlineShoppingCart className="text-lg" />
                  <p className="text-sm">Add to Cart</p>
                </div>
                <div
                  onClick={buy_now}
                  className="flex py-2 mt-2 searchHover duration-500 bg-color justify-center gap-1 items-center relative rounded-md z-[1] lg:cursor-pointer font-bold "
                >
                  <AiOutlineShoppingCart className="text-lg" />
                  <p className="text-sm">Buy Now</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card60;
