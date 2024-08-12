"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HiMinus, HiPlus } from "react-icons/hi";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import httpReq from "@/utils/http/axios/http.service";
import OvalLoader from "@/components/loader/oval-loader";
import { getPrice } from "@/utils/get-price";
import { addToCartList } from "@/redux/features/product.slice";
import BDT from "@/utils/bdt";
import { HSlider } from "./slider";
import useTheme from "@/hooks/use-theme";
import Rate from "@/utils/rate";
import CallForPrice from "@/utils/call-for-price";

const Details = ({ fetchStatus, product,variant,vrcolor , data, children }: any) => {
  const { makeid, design, store_id, headerSetting } = useTheme();
  const dispatch = useDispatch();
  const [filterV, setFilterV] = useState<any>([]);
  

  // select variant state
  const [color, setColor] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);
  const [qty, setQty] = useState<any>(1);
  const [load, setLoad] = useState<any>(false);
  const [camp, setCamp] = useState<any>(null);
  const [sizeId, setSizeId] = useState<any>(null);
  const sizeV = variant?.find((item: any) => item.size !== null);

  const vPrice = variant?.map((item: any) => item?.additional_price);
  const smallest = Math.min(vPrice);
  const largest = Math.max(vPrice);

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

      // const sizeVariant = variant?.filter(item => item?.size !== null)
  
      setLoad(false);
      setColor(null);
      setSize(null);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [data, store_id]);

  if (fetchStatus === "fetching") {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <OvalLoader />
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
    .select-color {
        border: 1px solid ${design?.header_color};
    }
    .select-size {
        color : ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .select-unit {
        color : ${design?.header_color};
        border: 1px solid ${design?.header_color};
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
    .cart-btn-thirty {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 2px solid ${design?.header_color};
    }
    .cart-btn-thirty:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid ${design?.header_color};
    }
  `;

  const buttonThirty = "cart-btn-thirty font-bold py-[11px] px-10 w-max";

  return (
    <div className="h-full ">
      <style>{styleCss}</style>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-5">
        <div className="md:col-span-5">
          <HSlider product={product} sizeId={sizeId} setSizeId={setSizeId} />
        </div>
        <div className="md:col-span-5 space-y-4 sticky top-28 h-max">
          <h2
            className={`${
              design?.template_id === "34" ? "text-gray-300" : "text-[#212121]"
            } text-2xl font-bold mb-3 capitalize`}
          >
            {product?.name}
          </h2>
          {store_id !== 2875 ? (
            <div className="flex justify-start items-center gap-x-4">
              <div
                className={`${
                  design?.template_id === "34"
                    ? "text-gray-300"
                    : "text-[#212121]"
                } text-2xl font-seven font-bold flex justify-start items-center gap-4`}
              >
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
              {product?.discount_type === "percent" &&
                product?.discount_price > 0 && (
                  <p className="text-md text-gray-400">
                    {" "}
                    {product?.discount_price}% Off
                  </p>
                )}
            </div>
          ) : (
            <div>
              {variant.length !== 0 && !color && !size && !unit && (
                <div className="flex items-center gap-1">
                  <p className="text-color text-lg font-bold">
                    <BDT />
                    {(campPrice ? campPrice : price || 0) + smallest}
                  </p>
                  {largest > smallest && (
                    <p className="text-color text-lg font-bold">
                      {" "}
                      - <BDT /> {(campPrice ? campPrice : price || 0) + largest}
                    </p>
                  )}
                </div>
              )}
              {(variant.length === 0 || color || size || unit) && (
                <div className="flex justify-start items-center gap-x-4">
                  <div className="text-color text-lg font-bold flex justify-start items-center gap-4">
                    <BDT />
                    {camp?.status === "active" ? campPrice : price}{" "}
                    {camp?.status !== "active" &&
                    (product.discount_type === "no_discount" ||
                      product.discount_price === "0.00") ? (
                      " "
                    ) : (
                      <span className="text-gray-500 font-thin line-through text-xl font-seven">
                        <BDT />
                        {regularPrice}
                      </span>
                    )}
                  </div>
                  {/* <p className='line-through text-md text-gray-400'> ${product?.regular_price}</p> */}
                  {product?.discount_type === "percent" &&
                    product?.discount_price > 0 && (
                      <p className="text-md text-gray-400">
                        {" "}
                        {Math.trunc(product?.discount_price)}% Off
                      </p>
                    )}
                </div>
              )}
            </div>
          )}

          <Rate rating={product?.rating} />
          <div className="h-[1px] bg-gray-300 w-full"></div>
          <p className="text-sm text-[#5a5a5a] font-seven leading-6 apiHtml">
            {parse(`${product?.description?.slice(0, 250)}`)}{" "}
            {product?.description?.length > 250 && "..."}
          </p>

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
          {filterV?.size && vrcolor && (
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
            <Sizes
              size={size}
              setSize={setSize}
              variant={filterV}
              setSizeId={setSizeId}
              store_id={store_id}
            />
          )}

          <div className="">
            <CallForPrice
              product={product}
              headerSetting={headerSetting}
              cls={buttonThirty}
              price={price}
              store_id={store_id}
            />
          </div>

          {productQuantity !== "0" && (
            <div>
              {price !== 0 && (
                <AddCart
                  qty={qty}
                  setQty={setQty}
                  onClick={() => add_to_cart()}
                  buttonTwentyThree={buttonThirty}
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

          {children}

          <div className="text-lg flex flex-col gap-y-1">
            <p>Category: {product?.category} </p>
            <p>Availability</p>
            <p className="border-2 py-0.5 px-2 border-gray-800 w-max text-green-500">
              {productQuantity !== "0" ? ` In Stock!` : "Out Of Stock"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

const AddCart = ({ setQty, qty, onClick }: any) => {
  const { design } = useTheme();

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
  const styleCss = `
    .searchHover:hover {
        color:   ${design?.text_color};
        background: ${design?.header_color};
    }
    .thirty-border {
        border: 1px solid ${design?.header_color};
        background: ${design?.header_color};
        color:   ${design?.text_color};
    }
    .input-border {
        border: 1px solid ${design?.header_color};
    }

  `;

  return (
    <>
      <style>{styleCss}</style>
      <p>Quantity</p>
      <div className="flex flex-col lg2:flex-row gap-5 mb-5 mt-1">
        <div className=" w-max flex items-center ">
          <button
            className=" px-4 py-3 text-xl thirty-border text-black"
            type="button"
            onClick={decNum}
          >
            <HiMinus />
          </button>
          <input
            type="text"
            className={`form-control w-14 text-center input-border outline-none py-[8px] text-lg font-semibold ${
              design?.template_id === "34" ? "bg-thirty-one" : "bg-white"
            }`}
            value={qty}
            onChange={handleChange}
          />

          <button
            className="px-4 py-3 text-xl thirty-border text-black"
            type="button"
            onClick={incNum}
          >
            <HiPlus />
          </button>
        </div>
      </div>
      <button
        onClick={onClick}
        type="submit"
        className=" cart-btn-thirty font-bold py-[11px] px-10 w-max"
      >
        + ADD TO CART
      </button>
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
    <div className="flex flex-col gap-2">
      <h3 className="font-medium mb-2 text-base">Colors:</h3>
      <div className="flex flex-wrap gap-2">
        {variant?.map((item: any, id: any) => (
          <ColorSet key={id} text={item} select={color} setSelect={setColor} />
        ))}
      </div>
    </div>
  );
};

const Sizes = ({ size, setSize, variant, setSizeId, store_id }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-base mb-2">
        {store_id !== 2875 ? "Sizes:" : "বই এর নাম সিলেক্ট করুন"}
      </h3>
      <div className="flex gap-2 flex-wrap">
        {variant?.map((item: any, id: any) => (
          <Size
            key={id}
            id={id}
            item={item}
            select={size}
            setSelect={setSize}
            setSizeId={setSizeId}
          />
        ))}
      </div>
    </div>
  );
};

const Colors = ({ color, setColor, vrcolor, setSize }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium mb-2 text-base">Colors:</h3>
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
      className={`border lg:cursor-pointer w-max px-1 h-10 flex justify-center items-center font-sans text-sm rounded ${
        item === select ? "select-unit" : "border-gray-300"
      }`}
    >
      {item?.volume + " " + item?.unit}
    </div>
  );
};

const Size = ({ item, select, setSelect, id, setSizeId }: any) => {
  return (
    <div
      onClick={() => {
        setSelect(item);
        setSizeId(id);
      }}
      className={`border lg:cursor-pointer w-max px-2 py-1 shadow-lg h-max flex justify-center items-center font-sans font-medium rounded ${
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
        className="w-5 h-5 rounded-full"
      ></div>
    </div>
  );
};

const ColorSet = ({ text, select, setSelect }: any) => {
  return (
    <div
      onClick={() => setSelect(text)}
      className={`border lg:cursor-pointer w-7 h-7 flex justify-center items-center font-sans font-medium rounded-full bg-white ${
        text === select ? "select-color" : "border-gray-300"
      }`}
    >
      <div
        style={{ backgroundColor: text?.color }}
        className="w-5 h-5 rounded-full"
      ></div>
    </div>
  );
};
