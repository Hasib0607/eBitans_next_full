"use client";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import parse from "html-react-parser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/eighteen/details";
import QuikView from "../quick-view";

const Card66 = ({ item }: any) => {
  const { design, makeid, store_id } = useTheme();
  const dispatch = useDispatch();

  const [camp, setCamp] = useState<any>(null);
  const [view, setView] = useState(false);

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

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
  const campPrice = getPrice(price, camp?.discount_amount, camp?.discount_type);

  const save =
    camp?.status === "active"
      ? parseInt(item.regular_price) - (campPrice || 0)
      : parseInt(item.regular_price) - (productGetPrice || 0);

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
      // navigate("/checkout");
    }
  };

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

  return (
    <div className="bg-white relative rounded-md overflow-hidden">
      {save !== 0 && (
        <div className="absolute top-3 left-0 bg-[#6E2594] text-white z-[2] px-2 py-1 rounded-r-full text-xs">
          Save: {save} BDT
        </div>
      )}
      <div className="">
        <style>{styleCss}</style>
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[2]">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <p className="bg-red-600 text-white px-2 py-1 w-max absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Out of Stock
              </p>
            </Link>
          </div>
        )}
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="relative overflow-hidden">
            <img
              src={productImg + item.image[0]}
              alt=""
              className="h-auto min-w-full object-center object-cover border-b-2"
            />
          </div>
        </Link>

        <div className="text-gray-700 text-base sm:px-5 px-2 py-3">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <h1 className="hover:text-red-500 hover:underline text-sm sm:text-[15px] capitalize font-bold">
              {item?.name}
            </h1>
          </Link>
        </div>

        <div className="apiHtml pb-24 px-2 sm:px-5 text-[13px] text-gray-500">
          {parse(`${item?.description?.slice(0, 100)}`)}{" "}
          {item?.description?.length > 100 && <span className="">...</span>}
        </div>

        <div className="font-semibold absolute bottom-5 sm:px-5 px-2 w-full group-hover:opacity-0 duration-500">
          <div className="flex items-center justify-center gap-2 ">
            {item?.regular_price !== "0" && (
              <p className="text-sm text-red-500">
                <BDT
                  price={
                    camp?.status === "active" ? campPrice : productGetPrice
                  }
                />
              </p>
            )}
            <h1 className="line-through text-gray-500  text-xs ">
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
          <div
            onClick={add_cart_item}
            className="flex items-center justify-center gap-x-2 bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white duration-500 py-1 mt-2"
          >
            <HiShoppingCart className="text-xl" />
            <button>Buy Now</button>
          </div>
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card66;
