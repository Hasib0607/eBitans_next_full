"use client";
import React, { useEffect, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { RiInstagramLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import httpReq from "@/utils/http/axios/http.service";
import useTheme from "@/hooks/use-theme";
import { getPrice } from "@/utils/get-price";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg, profileImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
// import { addToCartList, decrementQty } from '../../../../redux/slices/productslice';
const Fifteen = ({ data }: any) => {
  const [relatedProduct, setRelatedProduct] = useState<any>([]);
  const [reviews, setReview] = useState<any>([]);
  const {
    product,
    headerSetting,
    design,
    darkThemeColor,
    darktheme,
    makeid,
    store_id,
  } = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    httpReq.post("get/review", data).then((res) => {
      if (!res?.error) {
        setReview(res);
      } else {
        setReview([]);
      }
    });
    httpReq.post("related-product", { id: data?.product_id }).then((res) => {
      if (!res?.error) {
        setRelatedProduct(res);
      }
    });
  }, [data, setRelatedProduct]);
  const rest = product?.find((item: any) => item.id === data?.product_id);
  const price = getPrice(
    rest?.regular_price,
    rest?.discount_price,
    rest?.discount_type
  );
  const filterOfferProduct = (item: any) => {
    // console.log(item)
    let cartItem = {};
    let productDetails = {
      id: item?.id,
      store_id,
    };
    httpReq.post("get/offer/product", productDetails).then((res) => {
      // console.log('res',res)
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
  let add_cart_item = (item: any) => {
    filterOfferProduct(item);
  };
  return (
    <div
      className=""
      style={{
        backgroundColor:
          darktheme === true ? darkThemeColor?.backgroundColor : "white",
      }}
    >
      <div className="mt-10 mb-10 container py-20 px-2">
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-4">
          <div>
            <img
              className="w-full h-[520px]"
              src={productImg + rest?.image[0]}
              alt=""
            />
          </div>
          <div>
            <img
              className="w-full  h-[520px]"
              src={productImg + rest?.image[0]}
              alt=""
            />
          </div>
          <div>
            <img
              className="w-full  h-[520px]"
              src={productImg + rest?.image[0]}
              alt=""
            />
          </div>
          <div>
            <img
              className="w-full  h-[520px]"
              src={productImg + rest?.image[0]}
              alt=""
            />
          </div>
        </div>
        <br />
        <div className="border-b-2 py-2">
          <p
            style={{
              color:
                darktheme === true
                  ? darkThemeColor?.textColor
                  : design?.text_color,
            }}
          >
            {rest?.name}
          </p>
          <br />
          <p
            style={{
              color:
                darktheme === true
                  ? darkThemeColor?.textColor
                  : design?.text_color,
            }}
          >
            {rest?.description}
          </p>
        </div>

        <div className="flex   gap-4 items-center">
          <div
            className="mt-2"
            style={{
              color:
                darktheme === true
                  ? darkThemeColor?.textColor
                  : design?.text_color,
            }}
          >
            Share Item :
          </div>

          <div className="ml-2 flex mb  mt-2 xl:mt-5 lg:mt-5 md:mt-5 justify-between gap-4 w-[50%] j s xl:w-[12%] lg:w-[18%] md:w-[20%] items-center ">
            <div className="border-2 rounded-full p-2">
              <a href={`${headerSetting?.facebook_link}`}>
                {" "}
                <FaFacebookF
                  className="text-2xl footerColor  "
                  style={{
                    color:
                      darktheme === true
                        ? darkThemeColor?.textColor
                        : design?.text_color,
                  }}
                />
              </a>
            </div>
            <div className="border-2 rounded-full p-2">
              <a href={`${headerSetting?.youtube_link}`}>
                {" "}
                <AiFillYoutube
                  className="text-2xl footerColor"
                  style={{
                    color:
                      darktheme === true
                        ? darkThemeColor?.textColor
                        : design?.text_color,
                  }}
                />
              </a>
            </div>
            <div className="border-2 rounded-full p-2">
              <a href={`${headerSetting?.instagram_link}`}>
                {" "}
                <RiInstagramLine
                  className="text-2xl footerColor"
                  style={{
                    color:
                      darktheme === true
                        ? darkThemeColor?.textColor
                        : design?.text_color,
                  }}
                />
              </a>
            </div>
          </div>
        </div>

        <div
          className="flex items-center gap-4"
          style={{
            color:
              darktheme === true
                ? darkThemeColor?.textColor
                : design?.text_color,
          }}
        >
          <div>Rating :</div>

          <div className="mt-2">
            <Rate rating={4.5} />
          </div>
        </div>

        <div className="mt-2">
          {reviews.length === 0 ? (
            <div className="flex flex-1 justify-center items-center">
              <h3
                className="text-xl font-sans font-bold"
                style={{
                  color:
                    darktheme === true
                      ? darkThemeColor?.textColor
                      : design?.text_color,
                }}
              >
                No Found Review
              </h3>
            </div>
          ) : (
            reviews?.map((item: any) => (
              <UserReview key={item?.id} review={item} />
            ))
          )}
        </div>
      </div>
      <div
        className=" flex justify-end fixed bottom-0 w-full  h-28 bg-slate-50"
        style={{
          backgroundColor:
            darktheme === true ? darkThemeColor?.backgroundColor : "white",
        }}
      >
        <div
          className="flex justify-around rounded-lg border w-[300px] py-2 my-10 mr-2 lg:cursor-pointer h h-10"
          onClick={() => add_cart_item(rest)}
        >
          <div
            style={{
              color:
                darktheme === true
                  ? darkThemeColor?.textColor
                  : design?.text_color,
            }}
          >
            Add to Cart
          </div>

          <div className="flex gap-4">
            <div>
              <span
                className="  text-lg text-gray-500"
                style={{
                  color:
                    darktheme === true
                      ? darkThemeColor?.textColor
                      : design?.text_color,
                }}
              >
                {price}
              </span>
            </div>

            <div>
              <span
                className=" line-through text-lg text-gray-500"
                style={{
                  color:
                    darktheme === true
                      ? darkThemeColor?.textColor
                      : design?.text_color,
                }}
              >
                {rest?.regular_price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fifteen;

const UserReview = ({ review }: any) => {
  const { darktheme, darkThemeColor, design } = useTheme();
  return (
    <div className=" bg-slate-50 p-5">
      <div className="avatar">
        <div className="w-20 h-20 rounded-full">
          <img
            src={profileImg + review?.image}
            className="rounded-full h-full w-full"
            alt=""
          />
        </div>
      </div>
      <Rate className="text-base" rating={review?.rating} />
      <p
        className="text-xs font-semibold mt-2"
        style={{
          color:
            darktheme === true ? darkThemeColor?.textColor : design?.text_color,
        }}
      >
        {review?.name}
      </p>
      <p
        className="text-sm font-light mt-2"
        style={{
          color:
            darktheme === true ? darkThemeColor?.textColor : design?.text_color,
        }}
      >
        Since {new Date(review?.ucd).getFullYear()}
      </p>
      <p
        className="text-base font-semiBold mt-2"
        style={{
          color:
            darktheme === true ? darkThemeColor?.textColor : design?.text_color,
        }}
      >
        {review?.comment}
      </p>
    </div>
  );
};
