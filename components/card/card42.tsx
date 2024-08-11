"use client";
import Details from "@/components/_product-details-page/product-details/three/details";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import QuikView from "../quick-view";

const Card42 = ({ item }: any) => {
  const [open, setOpen] = useState<any>(false);
  const [camp, setCamp] = useState<any>(null);

  const { design, store_id, makeid } = useTheme();

  const dispatch = useDispatch();

  const styleCss = `
  .text-hover:hover {
    color:  ${design?.header_color};
  }
  .search:hover {
    color:${design?.text_color};
    background:${design?.header_color};
  }
  .border-hover:hover {
    border: 1px solid  ${design?.header_color};
  }

  `;

  const productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice = getPrice(
    productGetPrice,
    camp?.discount_amount,
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
    <>
      <div className="rounded overflow-hidden shadow-sm group border border-hover relative">
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

        <style>{styleCss}</style>
        <div className="relative">
          <div className="relative">
            <img
              className="min-w-full h-auto"
              src={productImg + item?.image[0]}
              alt="Mountain"
            />
            <div
              className="absolute lg:cursor-pointer search h-12 w-12 bg-white rounded-full left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] opacity-0 group-hover:opacity-100 duration-500"
              onClick={() => setOpen(!open)}
            >
              <AiOutlineSearch className="mt-4 text-xl ml-4" />
            </div>
          </div>
          <div className="py-6 px-3 space-y-2 relative">
            <p className="sm:text-sm text-xs font-semibold uppercase antialiased mb-2 text-gray-600">
              {item?.category}
            </p>
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <h3 className="sm:text-lg text-sm text-hover text-gray-800 font-bold antialiased capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                {item?.name}
              </h3>
            </Link>
            <div className="flex gap-x-1 items-center">
              <div>
                <Rate rating={item?.rating} />
              </div>
              <div className="text-gray-500 sm:text-sm text-xs">
                ({item?.number_rating})
              </div>
            </div>
            <div className="text-base flex flex-wrap gap-2 items-center font-semibold lg:group-hover:opacity-0 duration-500">
              <p>
                BDT {camp?.status === "active" ? campPrice : productGetPrice}
              </p>
              <h1 className="line-through text-sm ">
                {camp?.status !== "active" &&
                (item.discount_type === "no_discount" ||
                  item.discount_price === "0.00") ? (
                  " "
                ) : (
                  <p> BDT {Math.trunc(item.regular_price)}</p>
                )}
              </h1>
            </div>
            <div
              className="menu-hover lg:absolute bottom-6 left-4 lg:hover:-translate-y-1 lg:group-hover:scale-110 lg:cursor-pointer duration-500 lg:opacity-0 lg:group-hover:opacity-100 font-sans  font-semibold text-sm underline"
              onClick={add_cart_item}
            >
              {store_id === 1187
                ? "অর্ডার করুন"
                : store_id === 2669
                ? "Buy Now"
                : "Add to Cart"}
            </div>
          </div>
        </div>
      </div>
      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </>
  );
};

export default Card42;
