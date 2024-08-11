"use client";
import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import "./product-card-two.css";
// import CardModal from './CardModal';

import Details from "@/components/_product-details-page/product-details/three/details";
import QuikView from "@/components/quick-view";
import useTheme from "@/hooks/use-theme";
import { addToCartList, decrementQty } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Link from "next/link";
import { toast } from "react-toastify";

const ProductCardTwo = ({ item }: any) => {
  const [open, setOpen] = useState(false);
  const [camp, setCamp] = useState<any>(null);

  const { design, makeid, store_id } = useTheme();
  const { name, image, variant } = item;
  // const [visible, setVisible] = useState(true)
  // const [data, setData] = useState()
  const cartList = useSelector((state: any) => state.cart.cartList);
  const dispatch = useDispatch();

  const result = cartList?.find((c: any) => c.id === item.id);
  const price = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
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

  const add_cart_item = (item: any) => {
    if (item?.variant.length !== 0) {
      setOpen(!open);
    } else {
      filterOfferProduct(item);
    }
  };
  // this
  return (
    <>
      <div
        className="cardHover pb-6 rounded-xl hover:shadow-lg border border-gray-200 shadow-sm  bg-white relative"
        style={{ width: "240px" }}
      >
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
        <div className="block relative rounded overflow-hidden">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <img
              alt="ecommerce"
              className="w-full rounded-xl hover:rounded-sm hover:scale-105 transition-all duration-500 ease-linear object-cover p-5"
              src={productImg + image[0]}
            />
          </Link>
          <div className="w-full">
            <button
              style={{
                backgroundColor: design?.header_color,
                color: design?.text_color,
              }}
              onClick={() => setOpen(!open)}
              className="absolute -bottom-2 left-2 right-2 mx-auto rounded-t-md px-1 quick font-normal text-md pb-2 text-black text-md flex justify-center items-center gap-x-1 shadow-4xl"
            >
              <IoEyeSharp color={design?.text_color} />
              Quick View
            </button>
          </div>
        </div>
        <div className="space-y-1 mt-2">
          <h3 className="text-gray-900 text-lg mb-1 text-center px-2 -tracking-wider">
            {" "}
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              {name.length > 25 ? name.slice(0, 20) + "..." : name}
            </Link>
          </h3>

          <p className=" text-center text-lg font-semibold text-black">
            &#2547; {camp?.status === "active" ? campPrice : productGetPrice}
          </p>
          {camp?.status !== "active" &&
          (item.discount_type === "no_discount" ||
            item.discount_price === "0.00") ? (
            " "
          ) : (
            <p className=" text-center line-through text-sm text-black">
              {" "}
              <BDT price={item.regular_price} />
            </p>
          )}

          {result?.qty ? (
            <div
              className="mx-auto px-3 py-1 rounded-md shadow-sm flex justify-between text-black w-40 items-center"
              style={{ backgroundColor: design?.header_color }}
            >
              <AiOutlineMinus
                color={design?.text_color}
                onClick={() => dispatch(decrementQty(result?.cartId))}
                className="text-2xl lg:cursor-pointer"
              />
              <span className="text-xl" style={{ color: design?.text_color }}>
                {result?.qty}
              </span>
              <AiOutlinePlus
                color={design?.text_color}
                onClick={() => add_cart_item(item)}
                className="text-2xl lg:cursor-pointer "
              />
            </div>
          ) : !parseInt(variant) ? (
            <div
              onClick={() => add_cart_item(item)}
              className="mx-auto px-2 py-1 rounded-md shadow-sm flex justify-between text-black w-40 items-center lg:cursor-pointer "
              style={{
                backgroundColor: design?.header_color,
                color: design?.text_color,
              }}
            >
              <p className="text-center w-full text-lg tracking-wider">
                Add to cart
              </p>
            </div>
          ) : (
            <Link
              href={"/product/" + item?.id + "/" + item?.slug}
              className="mx-auto px-2 py-1 rounded-md shadow-sm flex justify-between text-black w-40 items-center lg:cursor-pointer "
              style={{
                backgroundColor: design?.header_color,
                color: design?.text_color,
              }}
            >
              <p className="text-center w-full text-lg tracking-wider">
                Add to cart
              </p>
            </Link>
          )}
        </div>
      </div>
      {/* <CardModal setModal={setModal} modal={modal} item={item} /> */}
      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </>
  );
};

export default ProductCardTwo;
