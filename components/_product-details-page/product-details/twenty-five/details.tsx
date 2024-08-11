"use client";
import React, { useState, useEffect } from "react";

import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import parse from "html-react-parser";
import useTheme from "@/hooks/use-theme";
import { useDispatch } from "react-redux";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import { getPrice } from "@/utils/get-price";
import { addToCartList } from "@/redux/features/product.slice";
import { toast } from "react-toastify";
import { productImg } from "@/site-settings/siteUrl";
import ImageZoom from "../image-zoom";
import BDT from "@/utils/bdt";
import {
  ExclamationCircleIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const Details = ({ data }: any) => {
  const { makeid, store_id } = useTheme();
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
    const fil = variant?.find((item: any) => item?.color === color);
    setSize(sizeV ? fil : null);
  }, [color, variant, sizeV]);

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

      const sizeVariant = variant?.find((item: any) => item?.size !== null);

      // set state with the result
      setProduct(product);
      setVariant(variant);
      setVrcolor(vrcolor);
      setUnit(!sizeVariant && !vrcolor ? variant[0] : null);
      setSize(sizeVariant ? sizeVariant : null);
      setColor(
        !sizeVariant && vrcolor ? variant[0] : vrcolor ? vrcolor[0] : null
      );
      setLoad(false);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [data, store_id]);

  if (load) {
    return (
      <div className="w-full h-[450px] flex justify-center items-center">
        Loading...
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

    httpReq.post("get/offer/product", productDetails).then((res: any) => {
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
    <div className="grid md:grid-cols-8 grid-cols-1 md:gap-4 ">
      <div className="md:col-span-4 h-full sm:cursor-zoom-in overflow-hidden ">
        {product?.image?.slice(0, 1).map((item: any, id: any) => (
          <ImageZoom key={id} img={productImg + item} />
        ))}
      </div>

      {/* additional price */}

      <div className="md:col-span-4 md:px-2">
        <h2 className="text-[25px] font-semibold text-[#1d1d1d] mb-2">
          {product?.name}
        </h2>
        <p className="text-[18px] text-[#888]  font-normal mb-2">
          {product?.per_unit ? "Per Unit:" : null}{" "}
          <span className="font-bold text-[#777]">{product?.per_unit}</span>{" "}
        </p>

        <div className="flex justify-start items-center gap-x-4 mb-2">
          <div className="text-color text-2xl font-seven font-medium flex justify-start items-center gap-4">
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
        <p className="text-sm text-[#5a5a5a] leading-6 apiHtml">
          {parse(`${product?.description?.slice(0, 250)}`)}{" "}
          {product?.description?.length > 250 && "..."}
        </p>

        <div className="mt-5">
          {/* unit  */}
          {!vrcolor && variant?.length !== 0 && variant[0]?.unit && (
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
        </div>

        <div className="flex flex-wrap gap-5 mb-4 mt-11">
          {/* Quantity  */}

          <div className="rounded-full flex items-center w-max border border-black  hover:stroke-white  divide-x divide-black h-[36px] overflow-hidden">
            <div
              onClick={() => decNum()}
              className="h-full flex items-center hover:bg-[#000] px-2 hover:stroke-[#fff]  stroke-[#4c9a2a] text-[#4c9a2a] hover:text-white transition-all duration-300 ease-linear"
            >
              <MinusIcon className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 h-full px-4">
              <p>{qty}</p>
            </div>
            <div
              onClick={() => incNum()}
              className="hover:bg-[#000] px-2 hover:stroke-[#fff] stroke-[#4c9a2a] text-[#4c9a2a] hover:text-white h-full flex items-center transition-all duration-300 ease-linear"
            >
              <PlusIcon className="h-4 w-4" />
            </div>
          </div>

          <div className="rounded-full flex items-center w-max border border-[#4c9a2a]  hover:stroke-white h-[36px] overflow-hidden ">
            <div
              onClick={() => add_to_cart()}
              className="hover:bg-[#4c9a2a]  hover:stroke-[#fff] stroke-[#4c9a2a] text-[#4c9a2a] hover:text-white h-full flex items-center transition-all duration-300 ease-linear space-x-2 px-4 lg:cursor-pointer"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              <p className="font-bold text-[12px] md:text-[14px] ">
                Add To Cart
              </p>
            </div>
          </div>
        </div>
        {productQuantity === "0" ? (
          <div className="flex items-start my-2">
            <div className="">
              <ExclamationCircleIcon className="text-red-500 h-5 w-6" />
            </div>
            <p>Out of Stock</p>
          </div>
        ) : null}

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
      </div>

      {/* additional price end*/}
    </div>
  );
};

export default Details;

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
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Colors</h3>
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
      className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text }} className="w-7 h-7"></div>
    </div>
  );
};

const ColorSet = ({ text, select, setSelect }: any) => {
  return (
    <div
      onClick={() => setSelect(text)}
      className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text?.color }} className="w-7 h-7"></div>
    </div>
  );
};
