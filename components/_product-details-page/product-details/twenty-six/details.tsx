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
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
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
  const [open, setOpen] = useState<any>(false);

  // select variant state
  const [color, setColor] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);
  const [qty, setQty] = useState<any>(1);
  const [load, setLoad] = useState<any>(false);
  const [camp, setCamp] = useState<any>(null);
  const [imageSrc, setImageSrc] = useState<any>(null);

  useEffect(() => {
    // Create a temporary div element to parse the HTML content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = product?.description;

    // Find the img tag inside the p tag
    const imgElement = tempDiv.querySelector("p img");

    // Check if img tag is found and has a base64 src attribute
    // if (imgElement && imgElement.src.startsWith("data:image")) {
    //   setImageSrc(imgElement.src);
    // }
  }, [product?.description]);

  const sizeV = variant?.find((item: any) => item.size !== null);

  useEffect(() => {
    setFilterV(variant?.filter((item: any) => item?.color === color));
  }, [color, variant]);

  useEffect(() => {
    setLoad(true);
    // declare the async data fetching function
    const fetchData = async () => {
      // console.log(data, "data");
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
      setLoad(false);
      setColor(null);
      setSize(null);
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
    .cart-btn-details {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 2px solid ${design?.header_color};
    }
    .cart-btn-details:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid ${design?.header_color};
    }
  `;

  const buttonTwentySix =
    "cart-btn-details font-bold py-[11px] px-10 rounded-full w-max ";

  return (
    <div className="pb-20 bg-white h-full ">
      <style>{styleCss}</style>

      <div className="grid grid-cols-1 md:grid-cols-9 gap-5">
        <div className="md:col-span-4">
          <HSlider product={product} setOpen={setOpen} />
        </div>
        <div className="md:col-span-5 space-y-4 lg:sticky top-28 h-max">
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
            {product?.discount_type === "percent" &&
              product?.discount_price > 0 && (
                <p className="text-md text-gray-400">
                  {" "}
                  {product?.discount_price}% Off
                </p>
              )}
          </div>
          <Rate rating={product?.rating} />
          <div className="h-[1px] bg-gray-300 w-full"></div>
          {imageSrc && (
            <img src={imageSrc} alt="ExtractedImage" className="h-auto" />
          )}
          <p className="text-lg text-[#5a5a5a] font-seven leading-6 apiHtml">
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
              cls={buttonTwentySix}
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
                  buttonTwentySix={buttonTwentySix}
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
        </div>
        {open && (
          <ImageModal open={open} setOpen={setOpen}>
            <HSlider product={product} open={open} />
          </ImageModal>
        )}
      </div>
    </div>
  );
};

export default Details;

const AddCart = ({ setQty, qty, onClick, variant }: any) => {
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

  `;

  return (
    <>
      <style>{styleCss}</style>
      <div className="flex gap-2 justify-between lg:justify-start lg:gap-5 lg:relative fixed bottom-16 lg:bottom-0 left-0 right-0 px-5 lg:px-0 bg-white lg:bg-transparent py-1 lg:py-0 z-[6]">
        <div className=" w-max flex items-center ">
          <button
            className="px-4 py-3 border border-gray-100 rounded-tl-full rounded-bl-full text-xl bg-gray-50 text-black"
            type="button"
            onClick={decNum}
          >
            <HiMinus />
          </button>

          <input
            type="text"
            className="form-control lg:w-14 w-10 text-center border border-gray-100 outline-none py-[8px] text-lg font-semibold"
            value={qty}
            onChange={handleChange}
          />

          <button
            className="px-4 py-3 border border-gray-100 rounded-tr-full rounded-br-full text-xl bg-gray-50 text-black"
            type="button"
            onClick={incNum}
          >
            <HiPlus />
          </button>
        </div>
        <button
          onClick={onClick}
          type="submit"
          className=" cart-btn-details font-bold px-4 py-2 lg:py-[11px] lg:px-10 w-max rounded-full "
        >
          + ADD TO CART
        </button>
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

const Sizes = ({ size, setSize, variant }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-base mb-2">Sizes:</h3>
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

const Size = ({ item, select, setSelect }: any) => {
  return (
    <div
      onClick={() => setSelect(item)}
      className={`border lg:cursor-pointer w-max px-1 h-10 flex justify-center items-center font-sans font-medium rounded ${
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
