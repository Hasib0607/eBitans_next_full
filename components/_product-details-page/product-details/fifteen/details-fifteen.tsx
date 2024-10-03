"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaFacebookF } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { RiInstagramLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getPrice } from "@/utils/get-price";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
const DetailsFifteen = ({ data }: any) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [product, setProduct] = useState<any>({});
  const [open, setOpen] = useState(false);
  // const [singleVariant, setSingleVariant] = useState({})

  const { store_id, design, makeid, headerSetting, darktheme, darkThemeColor } =
    useTheme();

  // const cartList = useSelector((state) => state.cart.cartList)
  const dispatch = useDispatch();

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      data["store_id"] = store_id;
      // get the data from the api
      const { product } = await httpReq.post("product-details", data);

      // set state with the result
      setProduct(product);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [data, store_id]);

  const price = getPrice(
    product?.regular_price,
    product?.discount_price,
    product?.discount_type
  );
  const filterOfferProduct = (item: any) => {
    let cartItem = {};
    let productDetails = {
      id: item?.id,
      store_id,
    };
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
    if (item?.variant.length !== 0) {
      setOpen(!open);
    } else {
      filterOfferProduct(item);
    }
  };

  // useEffect(() => {
  //     if (cartList?.length) {

  //         const result = cartList?.find(c => c?.id === product?.id && c?.color === singleVariant?.color && c?.size === singleVariant?.size && c?.unit === singleVariant?.unit && c?.volume === singleVariant?.volume)
  //         setResult(result)
  //         if (!result?.qty) {
  //             const result = cartList?.find(c => c?.id === product?.id && c?.color === null && c?.size === null && c?.unit === null && c?.volume === null)
  //             setResult(result)
  //         }
  //     }
  // }, [call, cartList, product?.id, singleVariant?.size, singleVariant?.color, singleVariant?.volume, singleVariant?.unit])

  console.log(product.image, "image");
  return (
    <section
      className="text-gray-600 body-font overflow-hidden w-full  py-10 px-10"
      style={{
        background:
          darktheme === true ? darkThemeColor?.backgroundColor : "white",
      }}
    >
      <div className="grid grid-cols-1 xl;grid-cols-2 lg:grid-cols-2 md:grid-cols-1 ">
        <div>
          <Swiper
            style={{
              // "--swiper-navigation-color": "#fff",
              // "--swiper-pagination-color": "#fff",

              width: "620px",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 w-52"
          >
            <SwiperSlide>
              <img
                alt="ecommerce"
                className=""
                src={productImg + product?.image}
              />
            </SwiperSlide>
          </Swiper>
          <br />
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper "
            style={{
              width: "620px",
            }}
          >
            <SwiperSlide>
              <img
                alt="ecommerce"
                className=""
                src={productImg + product?.image}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                alt="ecommerce"
                className=""
                src={productImg + product?.image}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                alt="ecommerce"
                className=""
                src={productImg + product?.image}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                alt="ecommerce"
                className=""
                src={productImg + product?.image}
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className=" w-full lg:pl-10 ">
          <div className="border-b-2 pb-3">
            <p
              className="text-sm title-font text-gray-500 tracking-widest"
              style={{
                color:
                  darktheme === true
                    ? darkThemeColor?.textColor
                    : design?.text_color,
              }}
            >
              {product?.category}
            </p>
            <br />
            <p
              className="text-sm title-font text-gray-500 tracking-widest"
              style={{
                color:
                  darktheme === true
                    ? darkThemeColor?.textColor
                    : design?.text_color,
              }}
            >
              {product?.description}
            </p>
          </div>

          <div className="flex mb  mt-2 xl:mt-5 lg:mt-5 md:mt-5 justify-between gap-4 w-[50%] j s xl:w-[25%] lg:w-[50%] md:w-[42%] items-center ">
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
          <div className="border-b-2 pb-3"></div>

          <div
            className="flex justify-around rounded-lg border w-[300px] py-2 lg:cursor-pointer  mt-32"
            onClick={() => add_cart_item(product)}
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
                  {product?.regular_price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsFifteen;
