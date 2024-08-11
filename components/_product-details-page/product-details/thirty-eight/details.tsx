"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import parse from "html-react-parser";
import { HiShoppingCart } from "react-icons/hi";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import { useRouter } from "next/navigation";
import { buyNow } from "@/utils/buy-now";
import OvalLoader from "@/components/loader/oval-loader";
import { getPrice } from "@/utils/get-price";
import { addToCartList } from "@/redux/features/product.slice";
import { HSlider } from "./slider";
import BDT from "@/utils/bdt";
import Rate from "@/utils/rate";
import CallForPrice from "@/utils/call-for-price";
import ImageModal from "@/utils/image-modal";

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
  const [open, setOpen] = useState<any>(false);

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
      // setCamp(null)
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
    .buy-now {
        color:   ${design?.text_color};
        background:${design?.header_color};
    }
    .buy-now:hover {
        color:   white;
        background:#83C341;
    }
    .cart-color {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color};
    }
  
  `;

  const productQuantity =
    size?.quantity ||
    color?.quantity ||
    unit?.quantity ||
    product?.quantity ||
    "Out of Stock";

  const callForPrice =
    "bg-black btn-hover text-white text-xs font-bold sm:py-[16px] py-3 sm:px-16 px-2";

  return (
    <div className="bg-white h-full sm:container px-5 py-5 lg:py-10">
      <style>{styleCss}</style>

      <div className="grid grid-cols-1 lg2:grid-cols-9 gap-5">
        <div className="lg2:col-span-4 justify-self-center">
          <HSlider product={product} setOpen={setOpen} />
        </div>

        <div className="lg2:col-span-5 space-y-5 sticky top-28 h-max">
          <div className="relative">
            <h2 className="text-[22px] text-blue-500 mb-3 capitalize">
              {product?.name}
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="py-2 px-4 rounded-full bg-[#F5F6FC] w-max">
              <p className="text-sm font-bold">
                <span className="font-normal">Price:</span> <BDT />
                {camp?.status === "active" ? campPrice : price}{" "}
              </p>
            </div>
            {(camp?.status === "active" ||
              product?.discount_type !== "no_discount") && (
              <div className="py-2 px-4 rounded-full bg-[#F5F6FC] w-max">
                <p className="text-sm font-bold">
                  <span className="font-normal">Regular Price:</span> <BDT />
                  {regularPrice}{" "}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-x-1">
            <div>
              <Rate rating={product?.rating} />
            </div>
            <div className="text-gray-500 sm:text-sm text-xs">
              ({product?.number_rating})
            </div>
          </div>
          <a href={`/product/${product?.id}/${product?.slug}#description`}>
            <p className="text-sm text-[#5a5a5a] leading-6 apiHtml">
              {" "}
              {parse(`${product?.description?.slice(0, 250)}`)}{" "}
              {product?.description?.length > 250 && (
                <span className="underline underline-offset-8 text-red-500">
                  View More Info
                </span>
              )}
            </p>
          </a>

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

          <div className="flex items-center gap-x-3">
            <div className="">Availability:</div>
            <div className="text-gray-800 ">
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

          <div className="w-max">
            <CallForPrice
              product={product}
              headerSetting={headerSetting}
              cls={callForPrice}
              price={price}
            />
          </div>

          {productQuantity !== "0" && (
            <div>
              {price !== 0 && (
                <AddCart
                  product={product}
                  variant={variant}
                  qty={qty}
                  store_id={store_id}
                  setQty={setQty}
                  buyNowBtn={buyNowBtn}
                  onClick={() => add_to_cart()}
                />
              )}
            </div>
          )}
          {children}
        </div>
      </div>
      {open && (
        <ImageModal open={open} setOpen={setOpen}>
          <HSlider product={product} open={open} />
        </ImageModal>
      )}
    </div>
  );
};

export default Details;

const AddCart = ({
  setQty,
  qty,
  onClick,
  product,
  store_id,
  buyNowBtn,
}: any) => {
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

  return (
    <>
      <div className="flex sm:flex-row flex-col sm:items-center gap-3 ">
        <div className="border border-gray-200 w-max grid grid-cols-2 justify-items-center items-center ">
          <div className="row-span-2 py-1 border-r-[1px] border-gray-200">
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
            className="w-full h-full btn-hover focus:outline-none lg:cursor-pointer border-b-[1px] border-gray-200 flex justify-center"
          >
            <button className="focus:outline-none " type="button">
              <MdKeyboardArrowUp />
            </button>
          </div>
          <div
            onClick={decNum}
            className="w-full h-full btn-hover focus:outline-none lg:cursor-pointer flex justify-center"
          >
            <button className="focus:outline-none" type="button">
              <MdKeyboardArrowDown />
            </button>
          </div>
        </div>

        <div className="">
          {product?.quantity === "0" ? (
            <button className="bg-orange-600 btn-hover text-white text-base sm:py-[12px] py-3 sm:px-16 px-2 ">
              Sold Out
            </button>
          ) : (
            <div className="flex items-center flex-wrap gap-3">
              <button
                onClick={() => buyNowBtn()}
                className="buy-now text-sm sm:text-base sm:py-[12px] py-3 w-36 lg:w-40 xl:w-48 "
              >
                <HiShoppingCart className="inline text-lg mr-2" />
                {store_id === 1187 ? "অর্ডার করুন" : "Buy Now"}
              </button>
              <button
                onClick={onClick}
                className="bg-orange-600 btn-hover text-white text-sm sm:text-base sm:py-[12px] py-3 w-36 lg:w-40 xl:w-48 "
              >
                <HiShoppingCart className="inline text-lg mr-2" />
                {store_id === 1187 ? "কার্টে রাখুন" : "Add To Cart"}
              </button>
            </div>
          )}
        </div>
      </div>
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
    <div className="flex flex-wrap items-center gap-2">
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
      className={`border w-auto px-1 h-10 flex justify-center items-center font-sans text-sm rounded ${
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
      className={`border w-auto px-2 h-10 flex justify-center items-center font-sans font-medium rounded ${
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
