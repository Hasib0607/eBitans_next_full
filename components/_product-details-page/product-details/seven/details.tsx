"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import { bookNow } from "@/utils/book-now";
import { getPrice } from "@/utils/get-price";
import { addToCartList } from "@/redux/features/product.slice";
import { Autoplay, Pagination } from "swiper/modules";
import { productImg } from "@/site-settings/siteUrl";
import { HSlider } from "../twenty-three/slider";
import BDT from "@/utils/bdt";
import CallForPrice from "@/utils/call-for-price";
import QuikView from "@/components/quick-view";
import BookingForm from "@/components/booking-form";
import Link from "next/link";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonWrapper from "@/components/skeleton-wrapper";

const Details = ({
  data,
  children,
  open,
  setOpen,
  variant,
  vrcolor,
  product,
  fetchStatus
}: any) => {
  const { makeid, store_id, headerSetting, bookingData } = useTheme();
  const dispatch = useDispatch();
  const [filterV, setFilterV] = useState<any>([]);
  const [load, setLoad] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  // select variant state
  const [color, setColor] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);
  const [qty, setQty] = useState<any>(1);
  const [camp, setCamp] = useState<any>(null);
  const [colorid, setColorid] = useState(null);

  const sizeV = variant?.find((item: any) => item.size !== null);

  useEffect(() => {
    setFilterV(variant?.filter((item: any) => item?.color === color));
  }, [color, variant]);
  useEffect(() => {
    setLoad(true);
    // declare the async data fetching function
    const fetchData = async () => {
      data["store_id"] = store_id;

      const response = await getCampaignProduct(product, store_id);

      if (!response?.error) {
        setCamp(response);
      } else {
        setCamp(null);
      }

      setColor(null);
      setSize(null);
      setUnit(null);
      setLoad(false);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [data, store_id]);

  const bookNowBtn = () => {
    bookNow(variant, size, color, unit, filterV, setOpenBooking, openBooking);
  };

  const regularPrice =
    parseInt(product?.regular_price) +
    (size?.additional_price ? parseInt(size?.additional_price) : 0) +
    (unit?.additional_price ? parseInt(unit?.additional_price) : 0) +
    (color?.additional_price ? parseInt(color?.additional_price) : 0);

  const price = Number(
    getPrice(regularPrice, product?.discount_price, product?.discount_type)
  );

  const campPrice = Number(
    getPrice(price, parseInt(camp?.discount_amount), camp?.discount_type)
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
      store_id
    };

    console.log(productDetails, "pd");
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
                ...product
              })
            );

            toast("Successfully you added to cart", {
              type: "success",
              autoClose: 1000
            });
          } else if (size && filterV) {
            dispatch(
              addToCartList({
                cartId: makeid(100),
                price: campPrice,
                qty: parseInt(qty),
                variant_quantity: size?.quantity,
                variantId: size.id,
                ...size,
                ...product
              })
            );

            toast("Successfully you added to cart", {
              type: "success",
              autoClose: 1000
            });
          } else if (color && filterV.length === 0) {
            dispatch(
              addToCartList({
                cartId: makeid(100),
                price: campPrice,
                qty: parseInt(qty),
                variant_quantity: color?.quantity,
                variantId: color.id,
                ...color,
                ...product
              })
            );
            toast("Successfully you added to cart", {
              type: "success",
              autoClose: 1000
            });
          } else if (filterV.length === 0) {
            toast("Please Select Variant", {
              type: "warning",
              autoClose: 1000
            });
          } else if (filterV.length > 0) {
            toast("Please Select Variant", {
              type: "warning",
              autoClose: 1000
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
              ...product
            })
          );
          toast("Successfully you added to cart", {
            type: "success",
            autoClose: 1000
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
                ...product
              })
            );
            toast("Successfully you added to cart", {
              type: "success",
              autoClose: 1000
            });
          } else if (size && filterV) {
            dispatch(
              addToCartList({
                cartId: makeid(100),
                price: price,
                qty: parseInt(qty),
                variant_quantity: size?.quantity,
                variantId: size.id,
                ...size,
                ...product
              })
            );
            toast("Successfully you added to cart", {
              type: "success",
              autoClose: 1000
            });
          } else if (color && !size && filterV.length === 0) {
            dispatch(
              addToCartList({
                cartId: makeid(100),
                price: price,
                qty: parseInt(qty),
                variant_quantity: color?.quantity,
                variantId: color.id,
                ...color,
                ...product
              })
            );
            toast("Successfully you added to cart", {
              type: "success",
              autoClose: 1000
            });
          } else if (filterV.length === 0) {
            toast("Please Select Variant", {
              type: "warning",
              autoClose: 1000
            });
          } else if (filterV.length > 0) {
            toast("Please Select Variant", {
              type: "warning",
              autoClose: 1000
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
              ...product
            })
          );
          toast("Successfully you added to cart", {
            type: "success",
            autoClose: 1000
          });
        }
      }
    });
  };

  const buttonSeven =
    "font-bold text-white bg-gray-600 rounded-md w-60 text-center py-3 font-seven lg:cursor-pointer";

  return (
    <div className="pt-5 pb-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-9 gap-x-10 gap-y-5">
        {store_id === 2433 ? (
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
        ) : store_id === 6296 ? (
          <div className="md:col-span-4 min-w-full">
            <HSlider
              product={product}
              colorid={colorid}
              setColorid={setColorid}
              vrcolor={vrcolor}
            />
          </div>
        ) : (
          <div className="md:col-span-5">
            {open && (
              <div className="grid grid-cols-1 gap-2 ">
                {product?.image &&
                  product?.image?.slice(0, 1).map((data: any, idx: any) => (
                    <div
                      className={`w-full h-full flex justify-center`}
                      key={idx}
                    >
                      <SkeletonWrapper
                        fetchStatus={fetchStatus}
                        height={"600px"}
                        width={"400px"}
                      >
                        <img
                          className="w-auto max-h-[500px] border-2 border-gray-200"
                          src={productImg + data}
                          alt=""
                        />
                      </SkeletonWrapper>
                    </div>
                  ))}
              </div>
            )}
            {!open && (
              <div className="grid grid-cols-2 gap-2 ">
                {product?.image &&
                  product?.image?.slice(0, 4).map((data: any, idx: any) => (
                    <div
                      key={idx}
                      className={`${
                        product?.image.length === 1 && "col-span-2"
                      } w-full h-full flex justify-center`}
                    >
                      <SkeletonWrapper
                        fetchStatus={fetchStatus}
                        height={"600px"}
                        width={"400px"}
                      >
                        <img
                          className="w-auto max-h-[500px] border-2 border-gray-200"
                          src={productImg + data}
                          alt=""
                        />
                      </SkeletonWrapper>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        <div className="md:col-span-4 space-y-8 font-seven">
          <SkeletonWrapper
            fetchStatus={fetchStatus}
            width={"200px"}
            height={"30px"}
            className="mb-5"
          >
            <h2 className="text-2xl text-[#212121] font-bold mb-3">
              {product?.name}
            </h2>
          </SkeletonWrapper>
          <SkeletonWrapper fetchStatus={fetchStatus} count={3} className="mb-6">
            <p className="text-sm text-[#5a5a5a] font-seven leading-8 apiHtml">
              {parse(`${product?.description?.slice(0, 250)}`)}{" "}
              {product?.description?.length > 250 && "..."}
            </p>
          </SkeletonWrapper>
          <SkeletonWrapper
            fetchStatus={fetchStatus}
            width={"200px"}
            height={"30px"}
          >
            <div className="flex justify-start items-center gap-x-4">
              <div className="text-[#212121] text-2xl font-seven font-bold flex justify-start items-center gap-4">
                <BDT />
                {camp?.status === "active" ? campPrice : price}{" "}
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
              {/* <p className='line-through text-md text-gray-400'> ${product?.regular_price}</p> */}
              {product?.discount_type === "percent" && (
                <p className="text-md text-gray-400">
                  {" "}
                  {product?.discount_price}% Off
                </p>
              )}
            </div>
          </SkeletonWrapper>

          {product?.quantity !== "0" && (
            <div className="h-[1px] bg-gray-300 w-full"></div>
          )}

          {/* unit  */}
          {/* && variant[0]?.unit */}
          {!vrcolor && variant?.length !== 0 && (
            <SkeletonWrapper
              fetchStatus={fetchStatus}
              width={"200px"}
              height={"30px"}
            >
              <Units unit={unit} setUnit={setUnit} variant={variant} />
            </SkeletonWrapper>
          )}
          {/* color and size  */}
          {vrcolor && sizeV !== undefined && (
            <SkeletonWrapper
              fetchStatus={fetchStatus}
              width={"200px"}
              height={"200px"}
            >
              <Colors
                color={color}
                setColor={setColor}
                vrcolor={vrcolor}
                setSize={setSize}
              />
            </SkeletonWrapper>
          )}
          {/* filterV[0]?.size && */}
          {filterV && filterV[0]?.size && vrcolor && (
            <SkeletonWrapper
              fetchStatus={fetchStatus}
              width={"200px"}
              height={"30px"}
            >
              <Sizes size={size} setSize={setSize} variant={filterV} />
            </SkeletonWrapper>
          )}
          {/* color only  */}
          {vrcolor && sizeV === undefined && (
            <SkeletonWrapper
              fetchStatus={fetchStatus}
              width="200px"
              height="30px"
            >
              <ColorsOnly
                color={color}
                setColor={setColor}
                variant={variant}
                setColorid={setColorid}
              />
            </SkeletonWrapper>
          )}
          {/* size only  */}
          {!vrcolor?.length && sizeV !== undefined && (
            <SkeletonWrapper
              fetchStatus={fetchStatus}
              width="200px"
              height="30px"
            >
              <Sizes size={size} setSize={setSize} variant={filterV} />
            </SkeletonWrapper>
          )}

          <div className="mt-5">
            <CallForPrice
              product={product}
              headerSetting={headerSetting}
              cls={buttonSeven}
              price={price}
            />
          </div>

          {productQuantity !== "0" && (
            <div>
              {price !== 0 && (
                <AddCart
                  qty={qty}
                  setQty={setQty}
                  bookingData={bookingData}
                  onClick={() => add_to_cart()}
                  buttonSeven={buttonSeven}
                />
              )}
            </div>
          )}
          {/* booking  */}
          {bookingData?.status === 200 && productQuantity !== "0" && (
            <div className={buttonSeven} onClick={bookNowBtn}>
              <button>BOOK NOW</button>
            </div>
          )}
          {bookingData?.status === 200 && productQuantity === "0" && (
            <div className={buttonSeven}>
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
          {open && (
            <Link href={"/product/" + product?.id + "/" + product?.slug}>
              <div
                onClick={() => setOpen(false)}
                className="font-bold text-white bg-gray-600 rounded-md w-48 sm:w-[416px] md:w-48 xl:w-[416px] py-3 font-seven text-center"
              >
                View Details
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;

const AddCart = ({ setQty, qty, onClick, buttonSeven, bookingData }: any) => {
  const { store_id } = useTheme();

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
    <>
      {bookingData?.from_type !== "single" && (
        <div className="flex flex-wrap justify-start items-center gap-8 py-10">
          <div className="flex border border-gray-300 divide-x-2 rounded-md">
            <div
              className="h-12 w-12  flex justify-center items-center hover:bg-black rounded-l-md hover:text-white font-semibold lg:cursor-pointer transition-all duration-300 ease-linear"
              onClick={decrementNum}
            >
              <MinusIcon width={15} />
            </div>
            <div className="h-12 w-24  flex justify-center items-center font-bold">
              {qty}
            </div>
            <div
              className="h-12 w-12  flex justify-center items-center hover:bg-black rounded-r-md hover:text-white font-semibold lg:cursor-pointer transition-all duration-300 ease-linear"
              onClick={incrementNum}
            >
              <PlusIcon width={15} />
            </div>
          </div>
          <div className="">
            <button className={buttonSeven} onClick={onClick}>
              {store_id === 1187 ? "অর্ডার করুন" : "Add to Cart"}
            </button>
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

const ColorsOnly = ({ color, setColor, variant, setColorid }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Colors</h3>
      <div className="flex flex-wrap gap-2">
        {variant?.map((item: any, id: any) => (
          <ColorSet
            key={id}
            id={id}
            text={item}
            select={color}
            setSelect={setColor}
            setColorid={setColorid}
          />
        ))}
      </div>
    </div>
  );
};

const Sizes = ({ size, setSize, variant }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Size</h3>
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
      <h3 className="font-medium font-sans text-xl mb-2">Color</h3>
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
      className={`border w-max px-2 h-10 flex justify-center items-center font-sans text-sm rounded ${
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
      className={`border w-max px-2 h-10 flex justify-center items-center font-sans font-medium rounded ${
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
      className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text }} className="w-7 h-7"></div>
    </div>
  );
};

const ColorSet = ({ text, select, setSelect, id, setColorid }: any) => {
  return (
    <div
      onClick={() => {
        setSelect(text);
        setColorid(id);
      }}
      className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text?.color }} className="w-7 h-7"></div>
    </div>
  );
};
