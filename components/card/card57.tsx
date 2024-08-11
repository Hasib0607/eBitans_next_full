import React, { useEffect } from "react";
import { useState } from "react";
import "./card.css";
import useTheme from "@/hooks/use-theme";
import { useDispatch } from "react-redux";
import { getPrice } from "@/utils/get-price";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import { toast } from "react-toastify";
import httpReq from "@/utils/http/axios/http.service";
import { addToCartList } from "@/redux/features/product.slice";
import Link from "next/link";
import { productImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import Taka from "@/utils/taka";
import QuikView from "../quick-view";
import Details from "../_product-details-page/product-details/three/details";

const Card57 = ({ item }:any) => {
  const { store_id, makeid } = useTheme();
  const [camp, setCamp] = useState<any>(null);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice = 
    getPrice(
      productGetPrice,
      parseInt(camp?.discount_amount),
      camp?.discount_type
    )


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

  const filterOfferProduct = (item:any) => {
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
        let itemRegularPrice = 
          getPrice(
            item?.regular_price,
            item?.discount_price,
            item?.discount_type
          )
        
        let campaignPrice = 
          getPrice(
            itemRegularPrice,
            parseInt(res?.discount_amount),
            res?.discount_type
          )
        

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
    <div className="group rounded-md bg-white shadow-lg w-full h-[190px] overflow-hidden relative">
      {/* out of stock  */}
      {item?.quantity === "0" && (
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
            <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
              Out of Stock
            </p>
          </div>
        </Link>
      )}

      <div className="overflow-hidden flex">
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="w-auto h-full">
            <img
              className="h-[190px] w-auto scale-110"
              src={productImg  + item.image[0]}
              alt="Mountain"
            />
          </div>
        </Link>

        <div className="px-5 flex flex-col justify-start mt-6">
          <Link href={"/category/" + item?.category_id}>
            <div className="font-sans text-sm font-normal antialiased card5itemCategory">
              {item.category}
            </div>
          </Link>
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className=" text-base antialiased capitalize font-semibold truncate">
              {item?.name}
            </div>
          </Link>

          <div className="flex gap-x-1">
            <div>
              <Rate rating={item?.rating} />
            </div>
            <div className="text-gray-500 sm:text-sm text-xs">
              ({item?.number_rating})
            </div>
          </div>

          <div className="px-1 text-sm font-medium lg:group-hover:hidden flex items-center gap-2">
            <Taka
              tk={camp?.status === "active" ? campPrice : productGetPrice}
            />
            {camp?.status !== "active" &&
            (item.discount_type === "no_discount" ||
              item.discount_price === "0.00") ? (
              " "
            ) : (
              <p className="line-through ">
                {" "}
                <Taka tk={Math.trunc(item.regular_price)} />
              </p>
            )}
          </div>
          <div
            onClick={add_cart_item}
            className="text-xs lg:cursor-pointer lg:hover:-translate-y-1 duration-1000 lg:hidden lg:group-hover:block font-semibold underline"
          >
            {store_id === 2669 ? "Buy Now" : "ADD TO CART"}
          </div>
        </div>
      </div>

      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card57;
