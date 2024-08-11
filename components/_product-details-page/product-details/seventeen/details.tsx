"use client";
import React, { useEffect, useState } from "react";
// import { productImg } from '../../../../siteSettings/siteUrl';
import { useDispatch } from "react-redux";
// import Zoom from './../one/Zoom';
import { toast } from "react-toastify";
import { HSlider } from "./slider";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import { getPrice } from "@/utils/get-price";
import { addToCartList } from "@/redux/features/product.slice";
import BDT from "@/utils/bdt";
import Rate from "@/utils/rate";
import CallForPrice from "@/utils/call-for-price";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const Details = ({ data, children }: any) => {
  const { makeid, store_id, headerSetting } = useTheme();
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

  // console.log(unit, "unit");

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
  const customDetailsSeventeen = `
    .text-style{
        font-family: 'Marck Script', cursive;
    }
    `;

  const buttonSeventeen =
    "font-bold search-bg hover:bg-blue-300 duration-300 rounded-md w-60 text-center py-3";

  return (
    <div className="">
      <style>{customDetailsSeventeen}</style>
      <div className=" bg-white">
        <div className="grid grid-cols-1 md:grid-cols-9 gap-x-6">
          <div className="md:col-span-5">
            <HSlider product={product} />
          </div>
          <div className="md:col-span-4 space-y-6 mt-10 md:mt-0">
            <h2 className="md:text-4xl text-2xl text-gray-700 mb-3">
              {product?.name}
            </h2>
            {/* <p className='text-sm text-[#5a5a5a] font-seven leading-8'>{product?.description?.slice(0, 250)}</p> */}

            <div className="flex items-center">
              <div className="w-[120px] text-xl">Price:</div>
              <div className="text-[#212121] text-lg flex justify-start items-center gap-4">
                <div>
                  <BDT />
                  {camp?.status === "active" ? campPrice : price}
                </div>
                <h1 className="">
                  {camp?.status !== "active" &&
                  (product.discount_type === "no_discount" ||
                    product.discount_price === "0.00") ? (
                    " "
                  ) : (
                    <span className="text-gray-500 font-thin line-through text-sm font-seven">
                      <BDT />
                      {regularPrice}
                    </span>
                  )}
                </h1>
              </div>
            </div>

            <div className="flex gap-x-1 my-1">
              <div>
                <Rate rating={product?.rating} />
              </div>
              <div className="text-gray-500 sm:text-sm text-xs">
                ({product?.number_rating})
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
                {" "}
                <ColorsOnly
                  color={color}
                  setColor={setColor}
                  variant={variant}
                />
              </>
            )}
            {/* size only  */}
            {!vrcolor?.length && sizeV !== undefined && (
              <Sizes size={size} setSize={setSize} variant={filterV} />
            )}

            <div className="flex items-center">
              <div className="w-[120px] text-xl">Availability:</div>
              <div className="text-[#212121] text-lg ">
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

            <div className="">
              <CallForPrice
                product={product}
                headerSetting={headerSetting}
                cls={buttonSeventeen}
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
                    buttonSeventeen={buttonSeventeen}
                  />
                )}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

const AddCart = ({ setQty, qty, onClick, buttonSeventeen }: any) => {
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

  return (
    <div className=" justify-start items-center gap-8 py-10">
      <div className="flex items-center ">
        <div className="w-[120px] text-xl">Quantity :</div>
        <div className="flex border border-gray-300 divide-x-2 rounded-md lg:cursor-pointer">
          <div
            className="h-8 w-8  flex justify-center items-center hover:bg-black rounded-l-md hover:text-white font-semibol transition-all duration-300 ease-linear"
            onClick={decNum}
          >
            <MinusIcon width={15} />
          </div>
          <div className="h-8 w-8  flex justify-center items-center">{qty}</div>
          <div
            className="h-8 w-8  flex justify-center items-center hover:bg-black rounded-r-md hover:text-white font-semibol transition-all duration-300 ease-linear"
            onClick={incNum}
          >
            <PlusIcon width={15} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button className={buttonSeventeen} onClick={onClick}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

const Units = ({ unit, setUnit, variant }: any) => {
  return (
    <div className="flex items-center">
      <h3 className="w-[120px] text-xl">Units:</h3>
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
    <div className="flex items-center">
      <h3 className="w-[120px] text-xl">Colors:</h3>
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
    <div className="flex items-center">
      <h3 className="w-[120px] text-xl">Size:</h3>
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
    <div className="flex items-center">
      <h3 className="w-[120px] text-xl">Color:</h3>
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
      className={`border px-2 lg:cursor-pointer h-10 flex justify-center items-center font-sans text-sm rounded ${
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
      className={`border px-2 h-7 lg:cursor-pointer text-sm flex justify-center items-center font-sans font-medium rounded ${
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
      className={`border lg:cursor-pointer w-5 h-5 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text }} className="w-3 h-3"></div>
    </div>
  );
};

const ColorSet = ({ text, select, setSelect }: any) => {
  return (
    <div
      onClick={() => setSelect(text)}
      className={`border lg:cursor-pointer w-5 h-5 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text?.color }} className="w-3 h-3"></div>
    </div>
  );
};
