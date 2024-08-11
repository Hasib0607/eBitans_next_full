"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { HiMinus, HiPlus } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { FaShippingFast } from "react-icons/fa";
import { TbTruckReturn, TbWorld } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import OvalLoader from "@/components/loader/oval-loader";
import { getPrice } from "@/utils/get-price";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import Rate from "@/utils/rate";
import CallForPrice from "@/utils/call-for-price";
import BDT from "@/utils/bdt";
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
      setColor(null);
      setUnit(null);
      setSize(null);
      setLoad(false);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [data, store_id]);

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
  
  `;

  const buttonTwentySeven =
    "bg-black btn-hover text-white font-thin sm:py-[16px] py-2 px-5 sm:px-16 rounded-full w-max ";

  return (
    <div className="bg-white">
      <style>{styleCss}</style>

      <div className="grid grid-cols-1 lg:grid-cols-9 lg:gap-6 gap-8">
        <div className="lg:col-span-5 justify-self-center w-full">
          {product?.image && (
            <div className="grid grid-cols-2 gap-5 w-full h-full">
              {product?.image[0] && (
                <div
                  className={`col-span-2 w-full ${
                    product?.image.length === 1 ? "h-auto" : "h-auto"
                  }`}
                >
                  <img
                    src={productImg + product?.image[0]}
                    alt=""
                    className="h-full w-full rounded-xl"
                  />
                </div>
              )}
              {product?.image[1] && (
                <div className="w-full h-auto">
                  <img
                    src={productImg + product?.image[1]}
                    alt=""
                    className="h-full w-full rounded-xl"
                  />
                </div>
              )}
              {product?.image[2] && (
                <div className="w-full h-auto">
                  <img
                    src={productImg + product?.image[2]}
                    alt=""
                    className="h-full w-full rounded-xl"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="lg:col-span-4 space-y-8 font-seven">
          <h2 className="text-2xl text-[#212121] font-bold mb-3">
            {product?.name}
          </h2>

          <div className="flex justify-start items-center gap-4">
            <div className="text-[#212121] text-color-price w-max px-2 py-1 rounded-lg text-2xl font-seven font-bold">
              <BDT />
              {camp?.status === "active" ? campPrice : price}
            </div>
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

          <div>
            <Rate rating={product?.rating} />
          </div>
          <div className="h-[1px] bg-gray-300 w-full"></div>

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
              cls={buttonTwentySeven}
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
                  buttonTwentySeven={buttonTwentySeven}
                />
              )}
            </div>
          )}

          <div className="flex items-center gap-x-3">
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

          <div>
            <According text={"Description"} reviews={product?.description} />
            {/* <h1 className='text-xl font-medium pb-2'>Description</h1>
                        <p className='text-sm text-[#5a5a5a] font-seven leading-7'>{product?.description}</p> */}
          </div>

          {children}
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-[#FEF2F2] h-28 w-full rounded-md flex flex-col justify-center pl-5">
              <FaShippingFast className="text-2xl" />
              <p className="font-bold mt-1">Free shipping</p>
              <p className="text-sm text-gray-600">
                On orders over BDT 5000.00
              </p>
            </div>
            <div className="bg-[#F0F9FF] h-28 w-full rounded-md flex flex-col justify-center pl-5">
              <TbTruckReturn className="text-2xl" />
              <p className="font-bold mt-1">Very easy to return</p>
              <p className="text-sm text-gray-600">Just phone number.</p>
            </div>
            <div className="bg-[#F0FDF4] h-28 w-full rounded-md flex flex-col justify-center pl-5">
              <TbWorld className="text-2xl" />
              <p className="font-bold mt-1">Nationwide Delivery</p>
              <p className="text-sm text-gray-600">Fast delivery nationwide.</p>
            </div>
            <div className="bg-[#FFFBEB] h-28 w-full rounded-md flex flex-col justify-center pl-5">
              <RiRefund2Line className="text-2xl" />
              <p className="font-bold mt-1">Refunds policy</p>
              <p className="text-sm text-gray-600">
                60 days return for any reason
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

const AddCart = ({ setQty, qty, onClick }: any) => {
  let incNum = () => {
    setQty((prevCount: any) => prevCount + 1);
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
    <div className="flex gap-3 ">
      <div className=" bg-gray-100 w-max flex px-4 rounded-full">
        <div
          onClick={decNum}
          className="w-full h-full lg:cursor-pointer flex justify-center items-center"
        >
          <button
            className="text-gray-400 focus:outline-none rounded-full bg-white w-6 h-6 flex justify-center items-center border border-gray-400"
            type="button"
          >
            <HiMinus />
          </button>
        </div>

        <div className="w-full h-full lg:cursor-pointer flex justify-center">
          <input
            type="text"
            className="form-control bg-gray-100 w-10 text-center border-0  outline-none ring-0 focus:outline-none focus:ring-0 focus:border-0 py-[7px] text-lg font-semibold"
            value={qty}
            onChange={handleChange}
            disabled
          />
        </div>

        <div
          onClick={incNum}
          className="w-full h-full lg:cursor-pointer flex justify-center items-center"
        >
          <button
            className="text-gray-400 rounded-full bg-white w-6 h-6 flex justify-center items-center border border-gray-400"
            type="button"
          >
            <HiPlus />
          </button>
        </div>
      </div>

      <div onClick={onClick} className="w-full ">
        <button className="bg-black btn-hover text-white font-thin sm:py-[16px] py-2 px-5 sm:px-16 rounded-full">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

const According = ({ text, reviews }: any) => {
  const [show, setShow] = useState(false);
  return (
    <AnimatePresence>
      <div
        onClick={() => setShow(!show)}
        className="flex justify-between items-center lg:cursor-pointer font-seven text-lg font-semibold bg-gray-100 px-3 py-1 rounded-md"
      >
        <div className="h3 font-seven">{text}</div>
        {show ? <MinusIcon width={25} /> : <PlusIcon width={25} />}
      </div>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="font-seven"
        >
          <div className="flex flex-1 justify-center items-center p-5">
            {" "}
            <div
              dangerouslySetInnerHTML={{ __html: reviews }}
              className="apiHtml"
            ></div>
          </div>{" "}
        </motion.div>
      )}
    </AnimatePresence>
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
    <div className="flex items-center gap-2">
      <h3 className="font-medium font-sans border-b border-black text-base mb-2">
        Sizes:
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
    <div className="flex flex-col gap-2">
      <h3 className="font-medium font-sans mb-2 border-b border-black text-base w-max">
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
      className={`border w-max px-1 h-10 flex justify-center items-center font-sans text-sm rounded ${
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
      className={`border w-max px-1 h-10 flex justify-center items-center font-sans font-medium rounded ${
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
      className={`border w-12 h-7 flex justify-center items-center font-sans font-medium rounded-full bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div
        style={{ backgroundColor: text }}
        className="w-10 h-5 rounded-full"
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
