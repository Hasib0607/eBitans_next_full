"use client";
import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import "./best-seller-six.css";
import { getPrice } from "@/utils/get-price";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import SectionHeadingSix from "@/components/section-heading/section-heading-six";
import { productImg } from "@/site-settings/siteUrl";
import Taka from "@/utils/taka";
import ArrowSquare from "@/utils/arrow-square";
import GridSliderFive from "@/components/slider/grid-slider/grid-slider-five";
import Card7 from "@/components/card/card7";
import { toast } from "react-toastify";
import httpReq from "@/utils/http/axios/http.service";
import { addToCartList } from "@/redux/features/product.slice";
import { useDispatch } from "react-redux";
import useTheme from "@/hooks/use-theme";
const BestSellerSix = ({ product, design, store_id }: any) => {
  const {makeid}=useTheme()
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const prev = "feature_product_prev";
  const next = "feature_product_next";

  const productGetPrice = getPrice(
    product.regular_price,
    product.discount_price,
    product.discount_type
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

    httpReq
      .post(
        "get/offer/product",
        productDetails
      )
      .then((res: any) => {
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

  let add_cart_item = (item: any) => {
    if (item?.variant.length !== 0) {
      setOpen(!open);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <div className="bg-white sm:container px-5 sm:py-10 py-5">
      <div className="">
        <SectionHeadingSix title={"Best Sellers "} subtitle={""} />
        <div
          className="grid grid-cols-1 mt-10 lg:grid-cols-3 md:grid-cols-2 py-3 group"
          style={{ border: "2px solid #f5f5f5", padding: "10px" }}
        >
          <div className="lg:col-span-1 md:col-span-2 mt-4 px-4">
            <img
              className="w-full xl:h-[520px] lg:h-[520px] block m-auto h-auto object-cover object-center"
              src={productImg + product[1]?.image[0]}
              alt=""
            />
            <div className="mt-3">
              <div
                className="font-sans text-lg sm:text-base font-normal antialiased mb-2 card5itemCategory"
                style={{
                  height: "25px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  width: "130px",
                  textOverflow: "ellipsis",
                }}
              >
                {product[1]?.name.charAt(0).toUpperCase() +
                  product[1]?.name.slice(1)}
              </div>
              <Taka
                tk={getPrice(
                  product[1]?.regular_price,
                  product[1]?.discount_price,
                  product[1]?.discount_type
                )}
              />
              <div onClick={() => add_cart_item(product)}>
                <button
                  className="border py-2 px-6 mt-2 font-semibold font-six"
                  style={{
                    background: design.header_color,
                    color: design.text_color,
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 md:col-span-2 relative bestSellerCustomHover">
            <div className="flex px-1 -top-10 absolute inset-1 items-center">
              <ArrowSquare prevEl={prev} nextEl={next}>
                {" "}
              </ArrowSquare>
            </div>
            {/* start here */}
            <GridSliderFive prevEl={prev} nextEl={next}>
              {product?.map((item: any) => (
                <SwiperSlide className="swiperjs-slide" key={item?.id}>
                  <Card7 item={item} design={design} store_id={store_id} />
                </SwiperSlide>
              ))}
            </GridSliderFive>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerSix;
