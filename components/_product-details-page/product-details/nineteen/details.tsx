"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { SwiperSlide } from "swiper/react";
import {
  Navigation,
  A11y,
  EffectFade,
  Autoplay,
  Controller,
} from "swiper/modules";
import { Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import parse from "html-react-parser";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import OvalLoader from "@/components/loader/oval-loader";
import { getPrice } from "@/utils/get-price";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import ImageZoom from "../image-zoom";
import BDT from "@/utils/bdt";
import Rate from "@/utils/rate";
import CallForPrice from "@/utils/call-for-price";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const Details = ({ data, children }: any) => {
  const { makeid, design, store_id, headerSetting } = useTheme();

  const dispatch = useDispatch();

  const [product, setProduct] = useState<any>({});
  const [variant, setVariant] = useState<any>([]);
  const [filterV, setFilterV] = useState<any>([]);
  const [vrcolor, setVrcolor] = useState<any>([]);
  const [load, setLoad] = useState<any>(false);

  // select variant state
  const [color, setColor] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);
  const [qty, setQty] = useState<any>(1);
  const [camp, setCamp] = useState<any>(null);

  const sizeV = variant?.find((item: any) => item.size !== null);

  // console.log(filterV, "VA");

  useEffect(() => {
    setFilterV(variant?.filter((item: any) => item?.color === color));
  }, [color, variant]);
  useEffect(() => {
    setLoad(true);
    // declare the async data fetching function
    const fetchData = async () => {
      data["store_id"] = store_id;
      // get the data from the api
      const { product, variant, vrcolor } = await httpReq.post(
        "product-details",
        data
      );

      const response = await getCampaignProduct(product, store_id);
      if (!response?.error) {
        setCamp(response);
      } else {
        setCamp(null);
      }

      // set state with the result
      setProduct(product);
      setVariant(variant);
      setVrcolor(vrcolor);
      setLoad(false);
      setColor(null);
      setUnit(null);
      setSize(null);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [data, store_id]);

  //   if (load) {
  //     return (
  //       <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
  //         <OvalLoader />
  //       </div>
  //     );
  //   }

  const regularPrice =
    parseInt(product?.regular_price) +
    (size?.additional_price ? parseInt(size?.additional_price) : 0) +
    (unit?.additional_price ? parseInt(unit?.additional_price) : 0) +
    (color?.additional_price ? parseInt(color?.additional_price) : 0);

  const price = getPrice(
    regularPrice,
    product?.discount_price,
    product?.discount_type
  );

  const campPrice = getPrice(
    price,
    parseInt(camp?.discount_amount),
    camp?.discount_type
  );

  const productQuantity =
    size?.quantity ||
    color?.quantity ||
    unit?.quantity ||
    product?.quantity ||
    "Out of Stock";

  const add_to_cart = () => {
    let productDetails = {
      id: product?.id,
      store_id,
    };

    httpReq.post("get/offer/product", productDetails).then((res) => {
      if (!res?.error) {
        if (variant?.length) {
          // unit with offer
          if (unit) {
            dispatch(
              addToCartList({
                cartId: makeid(100),
                price: campPrice,
                qty: parseInt(qty),
                variant_quantity: unit?.quantity,
                variantId: unit.id,
                ...unit,
                ...product,
              })
            );

            toast("Successfully you added to cart", {
              type: "success",
              autoClose: 1000,
            });
          }

          // size and color also with offer
          else if (size && filterV) {
            dispatch(
              addToCartList({
                cartId: makeid(100),
                price: campPrice,
                qty: parseInt(qty),
                variant_quantity: size?.quantity,
                variantId: size.id,
                ...size,
                ...product,
              })
            );

            toast("Successfully you added to cart", {
              type: "success",
              autoClose: 1000,
            });
          }

          // color with offer
          else if (color && filterV.length === 0) {
            dispatch(
              addToCartList({
                cartId: makeid(100),
                price: campPrice,
                qty: parseInt(qty),
                variant_quantity: color?.quantity,
                variantId: color.id,
                ...color,
                ...product,
              })
            );
            toast("Successfully you added to cart", {
              type: "success",
              autoClose: 1000,
            });
          }

          // alert variant add
          else if (filterV.length === 0) {
            toast("Please Select Variant", {
              type: "warning",
              autoClose: 1000,
            });
          } else if (filterV.length > 0) {
            toast("Please Select Variant", {
              type: "warning",
              autoClose: 1000,
            });
          }
        } else {
          dispatch(
            addToCartList({
              cartId: makeid(100),
              price: campPrice,
              qty: parseInt(qty),
              color: null,
              size: null,
              additional_price: null,
              volume: null,
              unit: null,
              ...product,
            })
          );
          toast("Successfully you added to cart", {
            type: "success",
            autoClose: 1000,
          });
        }
      } else {
        if (variant?.length) {
          // unit with regular price
          if (unit) {
            dispatch(
              addToCartList({
                cartId: makeid(100),
                price: price,
                qty: parseInt(qty),
                variant_quantity: unit?.quantity,
                variantId: unit.id,
                ...unit,
                ...product,
              })
            );
            toast("Successfully you added to cart", {
              type: "success",
              autoClose: 1000,
            });
          }
          // size with regular price
          else if (size && filterV) {
            dispatch(
              addToCartList({
                cartId: makeid(100),
                price: price,
                qty: parseInt(qty),
                variant_quantity: size?.quantity,
                variantId: size.id,
                ...size,
                ...product,
              })
            );
            toast("Successfully you added to cart", {
              type: "success",
              autoClose: 1000,
            });
          }
          // color with regular price
          else if (color && !size && filterV.length === 0) {
            dispatch(
              addToCartList({
                cartId: makeid(100),
                price: price,
                qty: parseInt(qty),
                variant_quantity: color?.quantity,
                variantId: color.id,
                ...color,
                ...product,
              })
            );
            toast("Successfully you added to cart", {
              type: "success",
              autoClose: 1000,
            });
          }

          // alert for variant
          else if (filterV.length === 0) {
            toast("Please Select Variant", {
              type: "warning",
              autoClose: 1000,
            });
          } else if (filterV.length > 0) {
            toast("Please Select Variant", {
              type: "warning",
              autoClose: 1000,
            });
          }
        } else {
          dispatch(
            addToCartList({
              cartId: makeid(100),
              price: price,
              qty: parseInt(qty),
              color: null,
              size: null,
              additional_price: null,
              volume: null,
              unit: null,
              ...product,
            })
          );
          toast("Successfully you added to cart", {
            type: "success",
            autoClose: 1000,
          });
        }
      }
    });
  };

  const styleCss = `
    .btn-hover:hover {
        color:   ${design?.text_color};
        background:${design?.header_color};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .cart-color {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color}; 
    }

  `;

  const buttonNineteen =
    "bg-gray-50 border border-black btn-hover text-[#a39e7b] py-[16px] px-16 w-full w-max";

  const prev = "single_Prev";
  const next = "single_Next";

  return (
    <div className="h-full">
      <style>{styleCss}</style>

      <div className="grid grid-cols-1 md:grid-cols-9 gap-8">
        <div className="md:col-span-4 relative h-max w-full">
          {product?.image?.length > 1 ? (
            <div>
              <div
                className={`${prev} bg-[#F1EBD1] w-12 h-12 hover:bg-black hover:text-white text-black transition-all duration-500 rounded-full ease-linear absolute left-5 top-1/2 -translate-y-1/2 z-10 flex justify-center items-center`}
              >
                <IoMdArrowDropleft className="text-4xl font-bold" />
              </div>
              <div
                className={`${next} bg-[#F1EBD1] w-12 h-12 hover:bg-black hover:text-white text-black transition-all duration-500 rounded-full ease-linear absolute right-5 top-1/2 -translate-y-1/2 z-10 flex justify-center items-center`}
              >
                <IoMdArrowDropright className="text-4xl font-bold" />
              </div>

              <Swiper
                modules={[Autoplay, A11y, EffectFade, Navigation, Controller]}
                navigation={{
                  prevEl: `.${prev}`,
                  nextEl: `.${next}`,
                }}
                className="mySwiper relative"
              >
                {product?.image?.map((item: any) => (
                  <SwiperSlide key={item?.id}>
                    <img
                      className="h-auto min-w-full"
                      src={productImg + item}
                      alt=""
                    />
                    {/* <ImageZoom img={productImg + item} /> */}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div>
              {product?.image?.map((item: any) => (
                <div key={item?.id}>
                  {/* <img className='h-auto min-w-full' src={productImg + item} alt="" /> */}
                  <ImageZoom img={productImg + item} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-5 space-y-4 ">
          <h2 className="text-3xl text-[#3B3312] mb-3">{product?.name}</h2>
          <div className="text-[#3B3312] text-2xl font-bold flex justify-start items-center gap-4">
            <BDT />
            {camp?.status === "active" ? campPrice : price}
            {camp?.status !== "active" &&
            (product?.discount_type === "no_discount" ||
              product?.discount_price === "0.00") ? (
              " "
            ) : (
              <span className="text-gray-500 font-thin line-through text-xl font-seven">
                <BDT />
                {regularPrice}
              </span>
            )}
          </div>

          <p className="text-[#3B3312] leading-6 apiHtml">
            {parse(`${product?.description?.slice(0, 250)}`)}{" "}
            {product?.description?.length > 250 && "..."}
          </p>

          <div className="flex gap-x-1">
            <div>
              <Rate rating={product?.rating} />
            </div>
            <div className="text-gray-500 sm:text-sm text-xs">
              ({product?.number_rating})
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-[120px] text-xl text-[#3B3312]">
              Availability:
            </div>
            <div className="text-[#212121] text-lg ">
              {product?.quantity !== "0" ? (
                <p>
                  <span className="font-medium">{product?.quantity}</span>{" "}
                  <span className="text-green-500">In Stock!</span>
                </p>
              ) : (
                <span className="text-red-600">Out of Stock!</span>
              )}
            </div>
          </div>

          {/* <div className="h-[1px] bg-gray-300 w-full"></div> */}

          {/* unit  */}
          {!vrcolor && variant && variant?.length > 0 && variant[0]?.unit && (
            <Units unit={unit} setUnit={setUnit} variant={variant} />
          )}
          {/* color and size  */}
          {vrcolor && sizeV !== undefined && (
            <>
              {" "}
              <Colors
                color={color}
                setColor={setColor}
                vrcolor={vrcolor}
                setSize={setSize}
              />
            </>
          )}
          {filterV && filterV.length > 0 && filterV[0]?.size && vrcolor && (
            <Sizes size={size} setSize={setSize} variant={filterV} />
          )}
          {/* color only  */}
          {vrcolor && sizeV === undefined && (
            <>
              <ColorsOnly color={color} setColor={setColor} variant={variant} />
            </>
          )}
          {/* size only  */}
          {!vrcolor?.length && sizeV !== undefined && (
            <Sizes size={size} setSize={setSize} variant={filterV} />
          )}

          <div className="">
            <CallForPrice
              product={product}
              headerSetting={headerSetting}
              cls={buttonNineteen}
              price={price}
            />
          </div>

          {productQuantity !== "0" && (
            <div>
              {price !== 0 && (
                <AddCart
                  qty={qty}
                  setQty={setQty}
                  onClick={() => add_to_cart()}
                  buttonNineteen={buttonNineteen}
                />
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default Details;

const AddCart = ({ setQty, qty, onClick }: any) => {
  let incrementNum = () => {
    setQty((prevCount: any) => prevCount + 1);
  };
  let decrementNum = () => {
    if (qty <= 1) {
      setQty(1);
    } else {
      setQty((prevCount: any) => prevCount - 1);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex border border-gray-300 w-max">
        <div
          className="h-12 w-12  flex justify-center items-center rounded-l-md  font-semibold lg:cursor-pointer transition-all duration-300 ease-linear"
          onClick={decrementNum}
        >
          <MinusIcon width={15} />
        </div>
        <div className="h-12 w-24  flex justify-center items-center font-bold">
          {qty}
        </div>
        <div
          className="h-12 w-12  flex justify-center items-center rounded-r-md  font-semibold lg:cursor-pointer transition-all duration-300 ease-linear"
          onClick={incrementNum}
        >
          <PlusIcon width={15} />
        </div>
      </div>
      <div onClick={onClick} className="w-full ">
        <button className="bg-gray-50 border border-black btn-hover text-[#a39e7b] py-[16px] px-16 w-full">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

const Units = ({ unit, setUnit, variant }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2 text-[#3B3312]">
        Units
      </h3>
      <div className="flex flex-wrap gap-2">
        {variant?.map((item: any, id: any) => (
          <Unit key={id} item={item} select={unit} setSelect={setUnit} />
        ))}
      </div>
    </div>
  );
};

const ColorsOnly = ({ color, setColor, variant }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2 text-[#3B3312]">
        Colors
      </h3>
      <div className="flex flex-wrap gap-2">
        {variant?.map((item: any, id: any) => (
          <ColorSet key={id} text={item} select={color} setSelect={setColor} />
        ))}
      </div>
    </div>
  );
};

const Sizes = ({ size, setSize, variant }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2 text-[#3B3312]">
        Size
      </h3>
      <div className="flex flex-wrap gap-2">
        {variant?.map((item: any, id: any) => (
          <Size key={id} item={item} select={size} setSelect={setSize} />
        ))}
      </div>
    </div>
  );
};

const Colors = ({ color, setColor, vrcolor, setSize }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2 text-[#3B3312]">
        Color
      </h3>
      <div className="flex flex-wrap gap-2">
        {vrcolor?.map((item: any, id: any) => (
          <Color
            key={id}
            text={item}
            select={color}
            setSelect={setColor}
            setSize={setSize}
          />
        ))}
      </div>
    </div>
  );
};

const Unit = ({ item, select, setSelect }: any) => {
  return (
    <div
      onClick={() => setSelect(item)}
      className={`border px-2 h-10 flex justify-center items-center font-sans text-sm rounded ${
        item === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      {item?.volume + " " + item?.unit}
    </div>
  );
};

const Size = ({ item, select, setSelect }: any) => {
  return (
    <div
      onClick={() => setSelect(item)}
      className={`border px-2 h-10 flex justify-center items-center font-sans font-medium rounded ${
        item === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      {item?.size}
    </div>
  );
};

const Color = ({ text, select, setSelect, setSize }: any) => {
  return (
    <div
      onClick={() => {
        setSelect(text);
        setSize(null);
      }}
      className={`border w-7 h-7 flex justify-center items-center font-sans font-medium rounded-full ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div
        style={{ backgroundColor: text }}
        className="w-5 h-5 rounded-full"
      ></div>
    </div>
  );
};

const ColorSet = ({ text, select, setSelect }: any) => {
  return (
    <div
      onClick={() => setSelect(text)}
      className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text?.color }} className="w-7 h-7"></div>
    </div>
  );
};
