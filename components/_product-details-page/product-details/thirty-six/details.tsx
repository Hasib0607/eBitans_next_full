"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import { useRouter } from "next/navigation";
import { buyNow } from "@/utils/buy-now";
import { getPrice } from "@/utils/get-price";
import {
  addToCartList,
  decrementQty,
  incrementQty,
} from "@/redux/features/product.slice";
import { HSlider } from "./slider";
import BDT from "@/utils/bdt";
import CallForPrice from "@/utils/call-for-price";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import OvalLoader from "@/components/loader/oval-loader";

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
      setQty(1);
      setLoad(false);
      setUnit(!sizeVariant && !vrcolor ? variant[0] : null);
      setSize(sizeVariant ? sizeVariant : null);
      setColor(
        !sizeVariant && vrcolor ? variant[0] : vrcolor ? vrcolor[0] : null
      );
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
  const buttonTwenty =
    "bg-black btn-hover text-white font-semibold h-14 w-full";

  return (
    <div className="bg-white">
      <style>{styleCss}</style>
      <div className="grid grid-cols-1 lg:grid-cols-9 lg:gap-6 gap-8">
        <div className="lg:col-span-5 justify-self-center">
          <div className="">
            <HSlider product={product} />
          </div>
        </div>
        <div className="lg:col-span-4 space-y-8 font-seven">
          <h2 className="text-2xl text-[#212121] mb-3">{product?.name}</h2>

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
              cls={buttonTwenty}
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
                  product={product}
                  variant={variant}
                  setQty={setQty}
                  buyNowBtn={buyNowBtn}
                  onClick={() => add_to_cart()}
                  buttonTwenty={buttonTwenty}
                />
              )}
            </div>
          )}

          <div>
            <h1 className="text-xl font-medium pb-2">Description</h1>
            <p className="text-sm text-[#5a5a5a] font-seven leading-7 apiHtml">
              {parse(`${product?.description}`)}
            </p>
          </div>

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
  buttonTwenty,
  product,
  variant,
  buyNowBtn,
}: any) => {
  const cartList = useSelector((state: any) => state.cart.cartList);
  const dispatch = useDispatch();

  const [already, setalready] = useState<any>(null);

  useEffect(() => {
    const result = cartList.find((i: any) => i?.id === product?.id);
    setalready(result);
  }, [cartList, product.id]);

  console.log(qty, "qty");

  let incNum = () => {
    if (already && variant.length === 0) {
      dispatch(incrementQty(already?.cartId));
      toast("Successfully you added to cart", {
        type: "success",
        autoClose: 1000,
      });
    } else if (variant.length === 0) {
      onClick();
    } else {
      setQty(qty + 1);
    }
  };
  let decNum = () => {
    if (already && variant.length === 0) {
      dispatch(decrementQty(already?.cartId));
      toast("Successfully you remove from cart", {
        type: "error",
        autoClose: 1000,
      });
    } else if (qty <= 1) {
      setQty(1);
    } else {
      setQty((prevCount: any) => prevCount - 1);
    }
  };
  let handleChange = (e: any) => {
    setQty(e.target.value);
  };

  // let incNum = () => {
  //     setQty(qty + 1);
  // };
  // let decNum = () => {
  //     if (qty <= 1) {
  //         setQty(1)
  //     }
  //     else {
  //         setQty(prevCount => prevCount - 1)
  //     }
  // };
  // let handleChange = (e) => {
  //     setQty(e.target.value);
  // };

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:grid grid-cols-3">
      <div className=" w-full flex col-span-2 border-2 border-gray-300">
        <div
          onClick={decNum}
          className="w-16 lg:cursor-pointer text-center border-r-2 border-gray-300 h-full flex justify-center items-center"
        >
          <MinusIcon className="h-5" />
        </div>

        <div className="w-full h-full lg:cursor-pointer flex justify-center">
          <input
            type="text"
            className="form-control w-full text-center border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus:border-0 py-[7px] text-lg font-semibold"
            value={
              already?.qty && variant.length === 0
                ? already?.qty
                : variant.length === 0
                ? 0
                : qty
            }
            onChange={handleChange}
            disabled
          />
        </div>

        <div
          onClick={incNum}
          className="w-16 lg:cursor-pointer text-center border-l-2 border-gray-300 h-full flex justify-center items-center"
        >
          <PlusIcon className="h-5" />
        </div>
      </div>

      {/* <div className="flex items-center col-span-2 lg:cursor-pointer justify-between w-full bg-red-500 text-white text-sm md:text-base font-bold gap-1 h-14">
                <div onClick={onClick={decNum}} className="w-16 text-center border-r border-red-50 h-full flex justify-center items-center">
                    <MinusIcon className='h-5' />
                </div>
                <div className="w-full text-center">
                    <p className=''>{(already?.qty && !variant) ? already?.qty : variant ? qty : 1} in bag</p>
                </div>
                <div onClick={incNum} className="w-16 text-center border-l border-red-50 h-full flex justify-center items-center">
                    <PlusIcon className='h-5' />
                </div>
            </div> */}

      {variant.length !== 0 && (
        <div onClick={onClick} className="w-full">
          <button className={buttonTwenty}>Add to bag</button>
        </div>
      )}
      <div
        onClick={buyNowBtn}
        className={`w-full ${variant.length !== 0 && "col-span-3"}`}
      >
        <button className={buttonTwenty}>Buy now</button>
      </div>
    </div>
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
