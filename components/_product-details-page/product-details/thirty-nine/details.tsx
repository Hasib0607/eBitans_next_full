"use client";
import BookingForm from "@/components/booking-form";
import Skeleton from "@/components/loader/skeleton";
import QuikView from "@/components/quick-view";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { bookNow } from "@/utils/book-now";
import { buyNow } from "@/utils/buy-now";
import CallForPrice from "@/utils/call-for-price";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { sendGTMEvent } from "@next/third-parties/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdCart } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { HSlider } from "../eight/slider";

const Details = ({
  data,
  product,
  variant,
  vrcolor,
  fetchStatus,
  children,
}: any) => {
  const { makeid, store_id, headerSetting, design, bookingData } = useTheme();
  const dispatch = useDispatch();

  const [filterV, setFilterV] = useState<any>([]);
  const [load, setLoad] = useState<any>(false);
  const [openBooking, setOpenBooking] = useState<any>(false);

  // select variant state
  const [color, setColor] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);
  const [qty, setQty] = useState<any>(1);
  const [camp, setCamp] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);

  // image selector
  const [activeImg, setActiveImg] = useState("");

  const sizeV = variant?.find((item: any) => item.size !== null);

  // console.log(color, size, unit);

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

  const router = useRouter();

  const buyNowBtn = () => {
    buyNow(variant, size, color, unit, filterV, add_to_cart, router);
  };

  const bookNowBtn = () => {
    bookNow(variant, size, color, unit, filterV, setOpenBooking, openBooking);
  };

  if (fetchStatus === "fetching") {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <Skeleton />
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

  const pricex: any = camp?.status === "active" ? campPrice : price;

  const discount = regularPrice - pricex;

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

  const styleCss = `
    .btn-hover:hover {
        color:   ${design?.text_color};
        background:${design?.header_color};
    }
    .select-color {
        border: 1px solid ${design?.header_color};
        background:${design?.header_color};
    }
    .select-size {
        color: ${design?.text_color};
        background:${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .select-unit {
        color : ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .text-color {
        color: ${design?.header_color};
    }
    .cart-color {
        color: ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color};
    }
    .cart-btn-thirty-seven {
        color: ${design?.text_color};
        background:${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .cart-btn-thirty-seven:hover {
        color: ${design?.header_color};
        background:transparent;
        border: 1px solid ${design?.header_color};
    }
  `;

  // console.log(bookingData, "bookingData");

  const buttonSeven =
    "w-full lg:w-96 flex items-center gap-2 rounded-md text-center py-3 justify-center lg:cursor-pointer cart-btn-thirty-seven";

  return (
    <div className="pt-5 pb-20">
      <style>{styleCss}</style>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-x-10 gap-y-5">
        <div className="md:col-span-5 px-10">
          {/* <div className="grid grid-cols-2 gap-2 ">
            {product?.image &&
              product?.image?.slice(0, 10).map((data: any) => (
                <div
                  key={data.id}
                  className={`${
                    product?.image.length === 1 && "col-span-2"
                  } w-full h-full flex justify-center`}
                >
                  <img
                    className="min-w-full h-auto rounded-md"
                    src={productImg + data}
                    alt=""
                  />
                </div>
              ))}
          </div> */}
          <HSlider
            product={product}
            setOpen={setOpen}
            variant={variant}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
          />
        </div>
        <div className="md:col-span-4 space-y-3 sticky top-20 h-max">
          <h2 className="lg:text-5xl text-2xl text-[#212121] font-semibold">
            {product?.name}
          </h2>

          <div className="flex justify-start items-center gap-x-4">
            <div className="text-[#212121] text-2xl flex justify-start items-center gap-4">
              {camp?.status !== "active" &&
              (product?.discount_type === "no_discount" ||
                product?.discount_price === "0.00") ? (
                " "
              ) : (
                <span className="text-gray-500 font-thin line-through text-lg font-seven">
                  <BDT />
                  {regularPrice}
                </span>
              )}
              <BDT />
              {camp?.status === "active" ? campPrice : price}
              <p className="bg-[#127266] text-white z-[2] px-4 py-1 rounded-lg text-sm">
                Sale
              </p>
            </div>
            {/* <p className='line-through text-md text-gray-400'> ${product?.regular_price}</p> */}
            {/* {product?.discount_type === 'percent' && <p className='text-md text-gray-400'> {product?.discount_price}% Off</p>} */}
          </div>
          {discount > 0 && (
            <p className="bg-[#127266] text-white z-[2] px-4 py-1 text-lg w-max">
              You Save {discount}
            </p>
          )}

          {/* unit  */}
          {!vrcolor && variant?.length > 0 && variant[0]?.unit && (
            <Units
              unit={unit}
              setUnit={setUnit}
              variant={variant}
              setActiveImg={setActiveImg}
            />
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
            <Sizes
              size={size}
              setSize={setSize}
              variant={filterV}
              setActiveImg={setActiveImg}
            />
          )}
          {/* color only  */}
          {vrcolor && sizeV === undefined && (
            <>
              {" "}
              <ColorsOnly
                color={color}
                setColor={setColor}
                variant={variant}
                setActiveImg={setActiveImg}
              />
            </>
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

          <div className="flex items-center gap-x-3 py-3">
            <div className="font-semibold text-[#212121]">Availability:</div>
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

          {productQuantity !== "0" && (
            <div>
              {price !== 0 && (
                <AddCart
                  qty={qty}
                  setQty={setQty}
                  bookingData={bookingData}
                  onClick={() => add_to_cart()}
                  buyNowBtn={buyNowBtn}
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
  buttonSeven,
  buyNowBtn,
  bookingData,
}: any) => {
  const { data, error } = useHeaderSettings();
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

  if (error) {
    return <p>error from header settings</p>;
  }
  return (
    <>
      {bookingData?.from_type !== "single" && (
        <div className="flex flex-col justify-start gap-3 py-1 lg:w-96">
          <div className="flex border border-gray-300 rounded-md w-max">
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
          <div
            className={`w-full flex items-center gap-2 rounded-md text-center py-3 justify-center lg:cursor-pointer bg-transparent border border-black text-black `}
            onClick={onClick}
          >
            <IoMdCart />
            <button>Add to cart</button>
          </div>
          <div className={`${buttonSeven}`} onClick={buyNowBtn}>
            <IoMdCart />
            <button>{button || "Buy it now"}</button>
          </div>
        </div>
      )}
    </>
  );
};

const Units = ({ unit, setUnit, variant, setActiveImg }: any) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="font-medium font-sans text-xl mb-2">Units</h3>
      <div className="flex flex-wrap items-center gap-2">
        {variant?.map((item: any, id: any) => (
          <Unit
            key={id}
            item={item}
            select={unit}
            setSelect={setUnit}
            setActiveImg={setActiveImg}
          />
        ))}
      </div>
    </div>
  );
};

const ColorsOnly = ({ color, setColor, variant, setActiveImg }: any) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="font-medium text-base">Colors</h3>
      <div className="flex flex-wrap items-center gap-2">
        {variant?.map((item: any, id: any) => (
          <ColorSet
            key={id}
            text={item}
            select={color}
            setSelect={setColor}
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
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="font-medium text-sm">Sizes</h3>
      <div className="flex flex-wrap items-center gap-2">
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
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="font-medium text-base">Colors</h3>
      <div className="flex flex-wrap items-center gap-2">
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

const Unit = ({ item, select, setSelect, setActiveImg }: any) => {
  return (
    <div
      onClick={() => {
        setSelect(item);
        setActiveImg(item?.image);
      }}
      className={`border lg:cursor-pointer w-auto px-1 h-10 flex justify-center items-center font-sans text-sm rounded ${
        item === select ? "select-unit" : "border-gray-300"
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
      className={`border border-gray-500 lg:cursor-pointer w-auto px-5 h-10 rounded-full flex justify-center items-center font-sans font-medium  ${
        item === select ? "select-size" : "border-gray-300"
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
      className={`border lg:cursor-pointer w-7 h-7 flex justify-center items-center font-sans font-medium rounded-full bg-white ${
        text === select ? "select-color" : "border-gray-300"
      }`}
    >
      <div
        style={{ backgroundColor: text }}
        className="w-5 h-5 rounded-full relative overflow-hidden"
      >
        {text === select && (
          <div className="text-white bg-green-500 text-sm h-10 w-14 rotate-[45deg] translate-y-1 translate-x-1"></div>
        )}
        {text === select && (
          <TiTickOutline className="absolute right-0 bottom-0 text-sm text-white" />
        )}
      </div>
    </div>
  );
};

const ColorSet = ({
  text,
  select,
  setSelect,
  itemImage,
  setActiveImg,
}: any) => {
  return (
    <div
      onClick={() => {
        setSelect(text);
        setActiveImg(itemImage);
      }}
      className={`border lg:cursor-pointer w-7 h-7 flex justify-center items-center font-sans font-medium rounded-full bg-white ${
        text === select ? "select-color" : "border-gray-300"
      }`}
    >
      <div
        style={{ backgroundColor: text?.color }}
        className="w-5 h-5 rounded-full relative overflow-hidden"
      >
        {text === select && (
          <div className="text-white bg-green-500 text-sm h-10 w-14 rotate-[45deg] translate-y-1 translate-x-1"></div>
        )}
        {text === select && (
          <TiTickOutline className="absolute right-0 bottom-0 text-sm text-white" />
        )}
      </div>
    </div>
  );
};
