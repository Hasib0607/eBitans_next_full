"use client";
import Details from "@/components/_product-details-page/product-details/three/details";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import QuikView from "../quick-view";

const Card45 = ({ item }: any) => {
  const { design, makeid, store_id, headerSetting } = useTheme();
  const [camp, setCamp] = useState<any>(null);
  const [view, setView] = useState(false);

  const dispatch = useDispatch();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  // const [id, setId] = useState(0)

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
        const response = await getCampaignProduct(item, store_id);
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
        background: transparent;
        border: 1px solid ${bgColor};
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
      setView(!view);
    } else {
      filterOfferProduct(item);
    }
  };

  // check discount

  let discountPrefix = item.discount_type === "fixed" ? "TK" : "";

  if (store_id === 6227) {
    discountPrefix = "";
  }

  return (
    <div className="group">
      <div className=" relative overflow-hidden border rounded-md duration-500">
        <style>{styleCss}</style>
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[2]">
            <p className="bg-red-600 text-white px-2 py-1 w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Out of Stock
            </p>
          </div>
        )}
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="relative overflow-hidden">
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

            <div
              onClick={() => setView(!view)}
              className="w-10 h-10 rounded-full lg:cursor-pointer bg-white searchHover flex justify-center items-center absolute group-hover:opacity-100 opacity-0 scale-50 group-hover:scale-100 duration-500 left-[45%] top-[45%]"
            >
              <BiSearch className="text-xl text-center" />
            </div>
            {item?.discount_type === "no_discount" ||
            item.discount_price === "0.00" ? (
              ""
            ) : (
              <>
                <div className="absolute text-center text-xs h-12 w-12 rounded-full flex flex-wrap justify-center items-center bg-color text-white top-2 right-2 ">
                  <p className="">
                    Dis.{Math.trunc(item.discount_price)}
                    {discountPrefix}
                    {item.discount_type === "percent" ? "%" : ""}
                  </p>
                </div>
              </>
            )}
          </div>
        </Link>

        <div className="flex flex-col gap-2 px-4 py-3 lg:group-hover:pb-[40px] duration-1000 w-full">
          <div className="flex gap-x-1 pt-2">
            <div>
              <Rate rating={item?.rating} />
            </div>
            <div className="text-gray-500 sm:text-sm text-xs">
              ({item?.number_rating})
            </div>
          </div>
          <div className="text-gray-700 font-bold w-full">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              {" "}
              <h1 className="text-hover capitalize truncate text-sm sm:text-base">
                {item?.name}
              </h1>{" "}
            </Link>
          </div>

          <div className="text-gray-600 font-semibold flex items-center gap-2 w-full group-hover:opacity-0 duration-500">
            {item?.regular_price !== "0" && (
              <p
                className={`${
                  store_id === 4174 ? "text-[#7eb68c]" : "text-color"
                } text-sm`}
              >
                <BDT
                  price={
                    camp?.status === "active" ? campPrice : productGetPrice
                  }
                />
              </p>
            )}
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
        </div>
        {item?.regular_price !== "0" ? (
          <div
            onClick={add_cart_item}
            className="w-full lg:py-2 pb-2 lg:absolute lg:group-hover:bottom-1 lg:bottom-10 lg:opacity-0 lg:group-hover:opacity-100 duration-500 z-[1] px-4"
          >
            <p className=" font-medium w-full text-center cart-btn duration-500 border border-transparent rounded-lg lg:cursor-pointer text-xs py-2">
              {store_id === 1187 ? "অর্ডার করুন" : "Add to Cart"}
            </p>
          </div>
        ) : (
          <div className="px-4">
            <a
              href={"tel:+88" + headerSetting?.phone}
              className="w-full lg:py-2 pb-2 lg:absolute lg:group-hover:bottom-1 lg:bottom-10 lg:opacity-0 lg:group-hover:opacity-100 duration-500 z-[1]"
            >
              <p className=" font-medium w-full text-center cart-btn duration-500 border border-transparent rounded-lg lg:cursor-pointer text-xs py-2">
                ASK FOR PRICE
              </p>
            </a>
          </div>
        )}
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card45;
