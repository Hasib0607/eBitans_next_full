"use client";
import OvalLoader from "@/components/loader/oval-loader";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import BDT from "@/utils/bdt";
import CallForPrice from "@/utils/call-for-price";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import "./five.css";
import { HSlider } from "./slider";

const Details = ({
  data,
  product,
  variant,
  vrcolor,
  fetchStatus,
  children,
}: any) => {
  const { makeid, design, headerSetting, store_id } = useTheme();
  const dispatch = useDispatch();

  const [filterV, setFilterV] = useState<any>([]);
  const [load, setLoad] = useState<any>(false);

  // select variant state
  const [color, setColor] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);
  const [qty, setQty] = useState<any>(1);
  const [camp, setCamp] = useState<any>(null);

  const sizeV = variant.find((item: any) => item.size !== null);

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
  const customStyle = `

    .addBtmColor:hover { 
    background-color:${design?.header_color};
    color:${design?.text_color};
}`;

  const buttonThirteen =
    "h-full px-2 grow flex items-center justify-center hover:bg-gray-100 bg-gray-200 w-60 py-2 transition-all duration-200 ease-linear";

  if (fetchStatus === "fetching") {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <OvalLoader />
      </div>
    );
  }

  return (
    <div className="">
      <div className=" grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 gap-10 bg-white ">
        <style>{customStyle}</style>

        <div className="">
          <HSlider product={product} />
        </div>

        <div>
          <h5 className="text-lg text-[#3a3930] tracking-wide">
            {product?.name}
          </h5>
          <div className="text-[#212121] text-2xl font-seven font-bold flex justify-start items-center gap-4">
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
          <p className="my-2 text-sm text-[#666666] apiHtml">
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
            {filterV[0]?.size && vrcolor && (
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
          </div>

          <div className="flex flex-col gap-y-1 my-2">
            <p>Category: {product?.category} </p>
            <p>Availability</p>
            <p className="border-2 py-0.5 px-2 border-gray-800 w-max text-red-500">
              {productQuantity > 0 ? ` In Stock!` : "Out Of Stock"}
            </p>
          </div>

          <div className="mt-3">
            <CallForPrice
              product={product}
              headerSetting={headerSetting}
              cls={buttonThirteen}
              price={price}
            />
          </div>

          {price !== 0 && (
            <div>
              <p className="text-sm text-[#353535]">Quantity</p>
              <div className="flex space-x-4 mb-4">
                {/* Quantity  */}
                <div className="flex">
                  <div className="border border-gray-100 w-14 h-10 flex justify-center items-center font-semibold">
                    <input
                      type="number"
                      className="h-full w-full focus:ring-0 focus:border-gray-300 ring-0 border-gray-200 text-black"
                      value={qty}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col h-full ml-1">
                    <div
                      onClick={incNum}
                      className="border border-gray-200 h-1/2"
                    >
                      <ChevronUpIcon width={16} className={"text-gray-600"} />
                    </div>
                    <div
                      onClick={decNum}
                      className="border border-gray-200 h-1/2"
                    >
                      <ChevronDownIcon width={16} className={"text-gray-600"} />
                    </div>
                  </div>
                </div>
                {/* Add to Cart  */}
                <button
                  onClick={() => add_to_cart()}
                  type={"submit"}
                  className="flex group bg-gray-200 "
                >
                  <div className="h-full w-12 flex items-center justify-center bg-gray-300 group-hover:bg-red-500 group-hover:text-white transition-all duration-200 ease-linear">
                    <ShoppingBagIcon className="h-6 w-6" />
                  </div>
                  <div className="h-full px-2 grow flex items-center justify-center hover:bg-gray-100  transition-all duration-200 ease-linear">
                    <p className="uppercase px-1 text-xs sm:text-sm ">
                      Add To Cart
                    </p>
                  </div>
                </button>
                {/* Warning out of stock  */}
                {/* {variant?.qty ? <div className="flex items-start">
                                <div className="">
                                    <ExclamationIcon className='text-red-500 h-5 w-6' />
                                </div>
                                <p>Out of Stock</p>
                            </div> : null} */}
              </div>
            </div>
          )}

          <div className="mt-5 flex items-center  space-x-2 ">
            <p className="mt-1">Share:</p>
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
      </div>
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
