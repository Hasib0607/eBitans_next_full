"use client";
import Skeleton from "@/components/loader/skeleton";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import BDT from "@/utils/bdt";
import { buyNow } from "@/utils/buy-now";
import CallForPrice from "@/utils/call-for-price";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import useHeaderSettings from "@/utils/query/use-header-settings";
import Rate from "@/utils/rate";
import { sendGTMEvent } from "@next/third-parties/google";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import { HSlider } from "../ten/slider";
// import { HSlider } from "./slider";

const Details = ({
  data,
  product,
  variant,
  vrcolor,
  fetchStatus,
  children,
}: any) => {
  const { makeid, design, store_id, headerSetting } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [filterV, setFilterV] = useState<any>([]);
  const [load, setLoad] = useState<any>(false);

  // select variant state
  const [color, setColor] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);
  const [qty, setQty] = useState<any>(1);
  const [camp, setCamp] = useState<any>(null);
  // image
  const [activeImg, setActiveImg] = useState("");

  const sizeV = variant?.find((item: any) => item?.size !== null);

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

  if (fetchStatus === "fetching") {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <Skeleton />
      </div>
    );
  }

  const regularPrice =
    product?.regular_price +
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

  const buyNowBtn = () => {
    buyNow(variant, size, color, unit, filterV, add_to_cart, router);
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

  const buttonTwelve =
    "bg-black btn-hover text-white text-xs font-bold sm:py-[16px] py-3 w-60 text-center";

  if (fetchStatus === "fetching") {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="bg-white h-full ">
      <style>{styleCss}</style>

      <div className="grid grid-cols-1 md:grid-cols-9 gap-5">
        <div className="md:col-span-4 justify-self-center">
          {/* <HSlider product={product} /> */}
          <HSlider
            product={product}
            variant={variant}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
          />
        </div>
        <div className="md:col-span-5 space-y-4 sticky top-28 h-max">
          <h2 className="text-2xl text-[#212121] font-bold mb-3 capitalize">
            {product?.name}
          </h2>
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
                {product?.discount_price}% Off
              </p>
            )}
          </div>
          <Rate rating={product?.rating} />
          <div className="h-[1px] bg-gray-300 w-full"></div>
          <p className="text-sm text-[#5a5a5a] font-seven leading-6 apiHtml">
            {parse(`${product?.description?.slice(0, 250)}`)}{" "}
            {product?.description?.length > 250 && "..."}
          </p>

          {/* unit  */}
          {!vrcolor && variant && variant?.length > 0 && variant[0]?.unit && (
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
              <Colors
                color={color}
                setColor={setColor}
                vrcolor={vrcolor}
                setSize={setSize}
              />
            </>
          )}
          {/* size with color */}
          {filterV && filterV?.length > 0 && filterV[0]?.size && vrcolor && (
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

          <div className="">
            <CallForPrice
              product={product}
              headerSetting={headerSetting}
              cls={buttonTwelve}
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
                  buyNowBtn={buyNowBtn}
                  buttonTwelve={buttonTwelve}
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

const AddCart = ({ setQty, qty, onClick, buttonTwelve, buyNowBtn }: any) => {
  const { data, error } = useHeaderSettings();
  const { store_id } = useTheme();
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

  const { button } = data?.data?.custom_design?.single_product_page?.[0] || {};

  if (error) {
    return <p>error from header settings</p>;
  }
  return (
    <>
      <div className="flex sm:flex-row items-center gap-3 ">
        <div className="border-2 border-black w-max grid grid-cols-2 justify-items-center items-center ">
          <div className="row-span-2 py-1 border-r-[1px] border-black">
            <input
              type="text"
              className="form-control w-10 text-center border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus:border-0 py-[1px] sm:py-[7px] text-lg font-semibold"
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

        {store_id !== 2680 ? (
          <div onClick={onClick} className="w-max ">
            <button className={buttonTwelve}>ADD TO CART</button>
          </div>
        ) : (
          <div onClick={() => buyNowBtn()} className="w-max ">
            <button className={buttonTwelve}>{button || "Order Now"}</button>
          </div>
        )}
      </div>
      <div className="mt-5 flex gap-4 space-x-4 xl:gap-4 lg:gap-5 md:gap-5 sm:gap-5   ">
        <div className="flex items-center gap-x-3 mt-3">
          <p className="font-medium">Share :</p>
          <span className="flex space-x-2">
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </span>
        </div>
      </div>
    </>
  );
};

const Units = ({ unit, setUnit, variant, setActiveImg }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Units</h3>
      <div className="flex flex-wrap gap-2">
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
    <div className="flex items-center gap-2">
      <h3 className="font-medium font-sans mb-2 border-b border-black text-base">
        Colors:
      </h3>
      <div className="flex flex-wrap gap-2">
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
    <div className="flex items-center gap-2">
      <h3 className="font-medium font-sans border-b border-black text-base mb-2">
        Sizes:
      </h3>
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

const Unit = ({ item, select, setSelect, setActiveImg }: any) => {
  return (
    <div
      onClick={() => {
        setSelect(item);
        setActiveImg(item?.image);
      }}
      className={`border w-max px-1 h-10 flex justify-center items-center font-sans text-sm rounded ${
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
      className={`border w-max px-4 py-3 h-10 flex justify-center items-center font-sans font-medium rounded ${
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
