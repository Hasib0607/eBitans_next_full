"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HiMinus, HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import { bookNow } from "@/utils/book-now";
import OvalLoader from "@/components/loader/oval-loader";
import { getPrice } from "@/utils/get-price";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import Rate from "@/utils/rate";
import CallForPrice from "@/utils/call-for-price";
import QuikView from "@/components/quick-view";
import BookingForm from "@/components/booking-form";

const Details = ({ data, children }: any) => {
  const { makeid, design, store_id, headerSetting, bookingData } = useTheme();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<any>({});
  const [variant, setVariant] = useState<any>([]);
  const [filterV, setFilterV] = useState<any>([]);
  const [vrcolor, setVrcolor] = useState<any>([]);
  const [load, setLoad] = useState<any>(false);
  const [openBooking, setOpenBooking] = useState<any>(false);

  // select variant state
  const [color, setColor] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);
  const [qty, setQty] = useState<any>(1);
  const [camp, setCamp] = useState<any>(null);

  const sizeV = variant?.find((item: any) => item.size !== null);

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
      setColor(null);
      setSize(null);
      setUnit(null);
      setLoad(false);
    };

    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [data, store_id]);

  const bookNowBtn = () => {
    bookNow(variant, size, color, unit, filterV, setOpenBooking, openBooking);
  };

  if (load) {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <OvalLoader />
      </div>
    );
  }

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
    .swiper-pagination-forty {
        width: auto !important;
        margin: 0;
        display: flex;
        gap: 1px;
    }
    
    .swiper-pagination-forty .swiper-pagination-bullet {
        border-radius: 50%;
        width: 7px;
        height: 7px;
        opacity: 1;
        background:  red;
        border: 1px solid black;
    
    }
    
    .swiper-pagination-forty .swiper-pagination-bullet-active {
        width: 7px;
        height: 7px;
        border-radius: 25px;
        transition-duration: 500ms;
        background: ${design?.header_color};

    }
  `;

  const buttonFourteen =
    "bg-black btn-hover text-white text-xs font-bold sm:py-[16px] py-3 text-center w-60 lg:cursor-pointer my-2";

  return (
    <div className="bg-white h-full mt-5">
      <style>{styleCss}</style>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-5">
        <Swiper
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={product?.image?.length > 1 && true}
          pagination={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper md:col-span-4 grid grid-cols-2 gap-5 w-full"
        >
          {product?.image?.map((s: any) => (
            <SwiperSlide key={s.id}>
              <div className="">
                <img
                  className="h-auto min-w-full"
                  src={productImg + s}
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="md:col-span-4 sticky top-28 h-max">
          <h2 className="text-2xl text-[#212121] mb-3 capitalize">
            {product?.name}
          </h2>
          <div className="text-[#212121] flex justify-start items-center gap-4 mb-3">
            <BDT />
            {camp?.status === "active" ? campPrice : price}{" "}
            {camp?.status !== "active" &&
            (product?.discount_type === "no_discount" ||
              product?.discount_price === "0.00") ? (
              " "
            ) : (
              <span className="text-gray-500 font-thin line-through text-sm">
                <BDT />
                {regularPrice}
              </span>
            )}
          </div>
          <div className="mb-3">
            <Rate rating={product?.rating} />
          </div>

          {/* unit  */}
          {!vrcolor && variant?.length > 0 && variant[0]?.unit && (
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
          {filterV && filterV[0]?.size && vrcolor && (
            <Sizes size={size} setSize={setSize} variant={filterV} />
          )}
          {/* color only  */}
          {vrcolor && sizeV === undefined && (
            <>
              {" "}
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
              cls={buttonFourteen}
              price={price}
            />
          </div>

          <div className="flex items-center gap-x-3 my-3">
            <div className="font-semibold text-[#212121] text-base">
              Availability:
            </div>
            <div className="text-[#5a5a5a] text-sm">
              {productQuantity !== "0" ? (
                <p>
                  <span className="font-medium">{productQuantity}</span>{" "}
                  <span className="text-green-500">In Stock!</span>
                </p>
              ) : (
                <span className="text-red-600">Out of Stock!</span>
              )}
            </div>
          </div>

          <div>
            <h1 className="font-semibold text-[#212121] text-base">
              Product Details:
            </h1>
            <p className="text-sm text-[#5a5a5a] font-seven leading-6 apiHtml">
              {parse(`${product?.description?.slice(0, 250)}`)}{" "}
              {product?.description?.length > 250 && "..."}
            </p>
          </div>

          {productQuantity !== "0" && (
            <div>
              {price !== 0 && (
                <AddCart
                  qty={qty}
                  setQty={setQty}
                  bookingData={bookingData}
                  onClick={() => add_to_cart()}
                  buttonFourteen={buttonFourteen}
                />
              )}
            </div>
          )}

          {/* booking  */}
          {bookingData?.status === 200 && productQuantity !== "0" && (
            <div className={buttonFourteen} onClick={bookNowBtn}>
              <button>BOOK NOW</button>
            </div>
          )}
          {bookingData?.status === 200 && productQuantity === "0" && (
            <div className={buttonFourteen}>
              <button>ALREADY BOOKED</button>
            </div>
          )}

          {bookingData?.status === 200 && (
            <div>
              <QuikView open={openBooking} setOpen={setOpenBooking}>
                <BookingForm
                  product={product}
                  price={price}
                  open={openBooking}
                  setOpen={setOpenBooking}
                  color={color}
                  size={size}
                  unit={unit}
                  variant={variant}
                  qty={qty}
                />
              </QuikView>
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default Details;

const AddCart = ({
  setQty,
  qty,
  onClick,
  buttonFourteen,
  bookingData,
}: any) => {
  let incNum = () => {
    setQty(qty + 1);
  };
  let decNum = () => {
    if (qty <= 1) {
      setQty(1);
    } else {
      setQty((prevCount: any) => prevCount - 1);
    }
  };
  let handleChange = (e: any) => {
    setQty(e.target.value);
  };

  return (
    <>
      {bookingData?.from_type !== "single" && (
        <div className="flex sm:flex-row items-center gap-3 my-3">
          <div className="border-2 border-black w-max grid grid-cols-2 justify-items-center items-center ">
            <div className="row-span-2 py-1 border-r-[1px] border-black">
              <input
                type="text"
                className="form-control  w-10 text-center border-0  outline-none ring-0 focus:outline-none focus:ring-0 focus:border-0 py-[1px] sm:py-[7px] text-lg font-semibold"
                value={qty}
                onChange={handleChange}
                disabled
              />
            </div>
            <div
              onClick={incNum}
              className="w-full h-full btn-hover focus:outline-none lg:cursor-pointer border-b-[1px] border-black flex justify-center"
            >
              <button className="focus:outline-none " type="button">
                <HiPlus />
              </button>
            </div>
            <div
              onClick={decNum}
              className="w-full h-full btn-hover focus:outline-none lg:cursor-pointer flex justify-center"
            >
              <button className="focus:outline-none" type="button">
                <HiMinus />
              </button>
            </div>
          </div>

          <div onClick={onClick} className="w-max ">
            <button className={buttonFourteen}>ADD TO BAG</button>
          </div>
        </div>
      )}
    </>
  );
};

const Units = ({ unit, setUnit, variant }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Units</h3>
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
    <div className="flex items-center gap-2">
      <h3 className="font-medium font-sans mb-2 border-b border-black text-base">
        Colors:
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
    <div className="mb-2">
      <h3 className="font-medium font-sans border-b border-black text-base mb-2 w-max">
        Sizes:
      </h3>
      <select
        onChange={(e) => setSize(e.target.value)}
        className="border-2 border-gray-300 min-w-[240px] max-w-full h-12 font-poster focus:outline-none focus:ring-0 focus:border-2 focus:border-gray-300"
      >
        <option value="">Select Size</option>
        {variant?.map((item: any) => (
          <option key={item.id} value={item}>
            {item?.size}
          </option>
        ))}
      </select>
      {/* <div className="flex flex-wrap gap-2">
                {variant?.map((item, id) => <Size key={id} item={item} select={size} setSelect={setSize} />)}
            </div> */}
    </div>
  );
};

const Colors = ({ color, setColor, vrcolor, setSize }: any) => {
  return (
    <div className="flex items-center gap-2">
      <h3 className="font-medium font-sans mb-2 border-b border-black text-base">
        Colors:
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
      className={`border px-1 w-max h-10 flex justify-center items-center font-sans text-sm rounded ${
        item === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      {item?.volume + " " + item?.unit}
    </div>
  );
};

// const Size = ({ item, select, setSelect }) => {
//     return (
//         <div onClick={() => setSelect(item)} className={`border px-1 w-max h-10 flex justify-center items-center font-sans font-medium rounded ${item === select ? "border-gray-900" : "border-gray-300"}`}>{item?.size}</div>
//     )
// }

const Color = ({ text, select, setSelect, setSize }: any) => {
  return (
    <div
      onClick={() => {
        setSelect(text);
        setSize(null);
      }}
      className={`border w-7 h-7 flex justify-center items-center font-sans font-medium rounded-full bg-white ${
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
      className={`border w-7 h-7 flex justify-center items-center font-sans font-medium rounded-full bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div
        style={{ backgroundColor: text?.color }}
        className="w-5 h-5 rounded-full"
      ></div>
    </div>
  );
};
