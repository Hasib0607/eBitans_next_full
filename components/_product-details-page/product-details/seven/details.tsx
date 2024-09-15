"use client";
import BookingForm from "@/components/booking-form";
import QuikView from "@/components/quick-view";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { bookNow } from "@/utils/book-now";
import CallForPrice from "@/utils/call-for-price";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { sendGTMEvent } from "@next/third-parties/google";
import { useQuery } from "@tanstack/react-query";
import parse from "html-react-parser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HSlider } from "../eight/slider";

export const fetchCampaignProduct = async (id: any, store_id: any) => {
  try {
    const response = await httpReq.post("get/offer/product", { id, store_id });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Details = ({
  data,
  children,
  open,
  setOpen,
  variant,
  vrcolor,
  product,
  fetchStatus,
}: any) => {
  // this is product
  console.log(product, "product form product details");
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
  // const [camp, setCamp] = useState<any>(null);
  const [colorid, setColorid] = useState(null);

  // image selector
  const [activeImg, setActiveImg] = useState("");

  // Use TanStack Query to fetch campaign product data
  const { data: camp, isLoading } = useQuery({
    queryKey: ["campaignProduct", { id: product?.id }],
    queryFn: () => fetchCampaignProduct(product?.id, store_id),
  });

  const sizeV = variant?.find((item: any) => item.size !== null);

  useEffect(() => {
    setFilterV(variant?.filter((item: any) => item?.color === color));
  }, [color, variant]);

  // useEffect(() => {
  //   setLoad(true);
  //   // declare the async data fetching function
  //   const fetchData = async () => {
  //     data["store_id"] = store_id;
  //     const response = await getCampaignProduct(product, store_id);
  //     if (!response?.error) {
  //       setCamp(response);
  //     } else {
  //       setCamp(null);
  //     }

  //     setColor(null);
  //     setSize(null);
  //     setUnit(null);
  //     setLoad(false);
  //   };

  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);
  // }, [data, store_id, fetchStatus]);

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

            sendGTMEvent({
              event: "add_to_cart",
              value: {
                cartId: makeid(100),
                price: campPrice,
                qty: parseInt(qty),
                variant_quantity: unit?.quantity,
                variantId: unit.id,
                ...unit,
                ...product,
              },
            });

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

            sendGTMEvent({
              event: "add_to_cart",
              value: {
                cartId: makeid(100),
                price: campPrice,
                qty: parseInt(qty),
                variant_quantity: size?.quantity,
                variantId: size.id,
                ...size,
                ...product,
              },
            });

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

            sendGTMEvent({
              event: "add_to_cart",
              value: {
                cartId: makeid(100),
                price: campPrice,
                qty: parseInt(qty),
                variant_quantity: color?.quantity,
                variantId: color.id,
                ...color,
                ...product,
              },
            });

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

          sendGTMEvent({
            event: "add_to_cart",
            value: {
              cartId: makeid(100),
              price: campPrice,
              qty: parseInt(qty),
              color: null,
              size: null,
              additional_price: null,
              volume: null,
              unit: null,
              ...product,
            },
          });
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

            sendGTMEvent({
              event: "add_to_cart",
              value: {
                cartId: makeid(100),
                price: price,
                qty: parseInt(qty),
                variant_quantity: unit?.quantity,
                variantId: unit.id,
                ...unit,
                ...product,
              },
            });
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
            sendGTMEvent({
              event: "add_to_cart",
              value: {
                cartId: makeid(100),
                price: price,
                qty: parseInt(qty),
                variant_quantity: size?.quantity,
                variantId: size.id,
                ...size,
                ...product,
              },
            });

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

            sendGTMEvent({
              event: "add_to_cart",
              value: {
                cartId: makeid(100),
                price: price,
                qty: parseInt(qty),
                variant_quantity: color?.quantity,
                variantId: color.id,
                ...color,
                ...product,
              },
            });
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

          sendGTMEvent({
            event: "add_to_cart",
            value: {
              cartId: makeid(100),
              price: price,
              qty: parseInt(qty),
              color: null,
              size: null,
              additional_price: null,
              volume: null,
              unit: null,
              ...product,
            },
          });

          toast("Successfully you added to cart", {
            type: "success",
            autoClose: 1000,
          });
        }
      }
    });
  };

  const buttonSeven =
    "font-bold text-white bg-gray-600 rounded-md w-60 text-center py-3 font-seven lg:cursor-pointer";

  if (isLoading) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );
  }

  return (
    <div className="pt-5 pb-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-9 gap-x-10 gap-y-5">
        <div className="md:col-span-5">
          <HSlider
            product={product}
            variant={variant}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
          />
        </div>
        <div className="md:col-span-4 space-y-8 font-seven">
          <h2 className="text-2xl text-[#212121] font-bold mb-3">
            {product?.name}
          </h2>

          <p className="text-sm text-[#5a5a5a] font-seven leading-8 apiHtml">
            {parse(`${product?.description?.slice(0, 250)}`)}{" "}
            {product?.description?.length > 250 && "..."}
          </p>

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

            {product?.discount_type === "percent" && (
              <p className="text-md text-gray-400">
                {" "}
                {product?.discount_price}% Off
              </p>
            )}
          </div>

          {product?.quantity !== "0" && (
            <div className="h-[1px] bg-gray-300 w-full"></div>
          )}

          {/* Unit */}
          {!vrcolor && variant && variant.length !== 0 && variant[0]?.unit && (
            <Units unit={unit} setUnit={setUnit} variant={variant} />
          )}
          {/* color and size  */}
          {vrcolor && sizeV !== undefined && (
            <Colors
              color={color}
              setColor={setColor}
              vrcolor={vrcolor}
              setSize={setSize}
            />
          )}

          {filterV && filterV.length > 0 && filterV[0]?.size && vrcolor && (
            <Sizes
              size={size}
              setSize={setSize}
              variant={filterV}
              setActiveImg={setActiveImg}
            />
          )}
          {/* color only  */}
          {vrcolor && sizeV === undefined && (
            <ColorsOnly
              color={color}
              setColor={setColor}
              variant={variant}
              setColorid={setColorid}
              setActiveImg={setActiveImg}
            />
          )}
          {/* size only  */}
          {!vrcolor?.length && sizeV !== undefined && (
            <Sizes
              size={size}
              setSize={setSize}
              variant={filterV}
              setActiveImg={setActiveImg}
            />
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
  const { data, error } = useHeaderSettings();

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

  const { button } = data?.data?.custom_design?.single_product_page?.[0] || {};

  if (error) return <p>error from header setting</p>;

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
              {button || "Add to Cart"}
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

const ColorsOnly = ({
  color,
  setColor,
  variant,
  setColorid,
  setActiveImg,
}: any) => {
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
            itemImage={item?.image}
            setActiveImg={setActiveImg}
          />
        ))}
      </div>
    </div>
  );
};

const Sizes = ({ size, setSize, variant, setActiveImg }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Size</h3>
      <div className="flex flex-wrap gap-2">
        {variant?.map((item: any, id: any) => (
          <Size
            key={id}
            item={item}
            select={size}
            setSelect={setSize}
            setActiveImg={setActiveImg}
          />
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

const Size = ({ item, select, setSelect, setActiveImg }: any) => {
  return (
    <div
      onClick={() => {
        setSelect(item);
        setActiveImg(item?.image);
      }}
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

const ColorSet = ({
  text,
  select,
  setSelect,
  id,
  setColorid,
  itemImage,
  setActiveImg,
}: any) => {
  return (
    <div
      onClick={() => {
        setSelect(text);
        setActiveImg(itemImage);
      }}
      className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text?.color }} className="w-7 h-7"></div>
    </div>
  );
};
