"use client";

import Skeleton from "@/components/loader/skeleton";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import BDT from "@/utils/bdt";
import CallForPrice from "@/utils/call-for-price";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import useHeaderSettings from "@/utils/query/use-header-settings";
import Rate from "@/utils/rate";
import { sendGTMEvent } from "@next/third-parties/google";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./five.css";
import { HSlider } from "../ten/slider";
import getReferralCode from "@/utils/getReferralCode";
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

  const { data: x, error } = useHeaderSettings();
  const dispatch = useDispatch();

  const [filterV, setFilterV] = useState<any>([]);
  const [load, setLoad] = useState<any>(false);

  // select variant state
  const [color, setColor] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);
  const [qty, setQty] = useState<any>(1);
  const [camp, setCamp] = useState<any>(null);
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  // image selector
  // const [activeImg, setActiveImg] = useState("");
  const [activeImg, setActiveImg] = useState(product?.defaultImage); 

  const sizeV = variant?.find((item: any) => item?.size !== null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referral = params.get("referral");

    // Get the referral object from localStorage
    const checkStorage = localStorage.getItem("referralObj");
    let referralObj;

    try {
      // Check if 'referralObj' exists and is valid JSON
      if (checkStorage) {
        referralObj = JSON.parse(checkStorage);
      } else {
        referralObj = {}; // Initialize an empty object if nothing exists in localStorage
      }

      const productID = product?.id;

      // Only update the object if there's a valid referral and productID
      if (referral && productID) {
        referralObj[productID] = referral;
        // Store the updated object back into localStorage
        localStorage.setItem("referralObj", JSON.stringify(referralObj));
      }
    } catch (error) {
      console.error("Error parsing referralObj from localStorage:", error);
      // If parsing fails, re-initialize 'referralObj' as an empty object
      referralObj = {};
    }
  }, [product]);

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const code = await getReferralCode();
        if (code) {
          setReferralCode(code);
          // Generate the referral link based on the code
          const link = `${window.location.href}?referral=${code}`;
          setReferralLink(link);
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    fetchReferralCode();
  }, []);

  // Copy the referral link to the clipboard
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopied(true);
        // Display the toast notification
        toast.success("Link copied!", {
          position: "top-right",
          autoClose: 2000, // close after 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => setCopied(false), 2000); // Reset "copied" status after 2 seconds
      })
      .catch((err) => console.error("Failed to copy the link", err));
  };

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
  }, [data, store_id, fetchStatus]);

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

  const customStyle = `

    .custom-all {
        background-color:${design?.header_color};
        color:${design?.text_color};
    }
    .border-cart {
        border: 1px solid ${design?.header_color};
    }
    .addBtmColor:hover { 
        background-color:${design?.header_color};
        color:${design?.text_color};
}`;

  const buttonSixteen =
    "custom-all text-white font-bold py-[11px] px-10 w-max rounded-full";

  if (fetchStatus === "fetching") {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <Skeleton />
      </div>
    );
  }

  const { button } = x?.data?.custom_design?.single_product_page?.[0] || {};

  if (error) {
    return <p>error from header settings</p>;
  }
  return (
    <div className="">
      <div className=" grid grid-cols-1 lg:grid-cols-9 lg:gap-6 gap-8 bg-white ">
        <style>{customStyle}</style>

        <div className="lg:col-span-4 justify-self-center">
          <HSlider
            product={product}
            variant={variant}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
          />
        </div>

        <div className="lg:col-span-5">
          <h5 className="text-2xl font-medium border-b-[1px] pb-8">
            {product?.name}
          </h5>
          <div className="text-[#212121] pt-4 text-2xl font-seven font-bold flex justify-start items-center gap-4">
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
          <div className="flex gap-x-1">
            <div>
              <Rate rating={product?.rating} />
            </div>
            <div className="text-gray-500 sm:text-sm text-xs">
              ({product?.number_rating})
            </div>
          </div>
          <p className="pt-4 apiHtml">
            {parse(`${product?.description?.slice(0, 250)}`)}{" "}
            {product?.description?.length > 250 && "..."}
          </p>

          <div
            className={`${product?.category === "" ? "hidden" : "block"} pb-5`}
          >
            <p className="text-base font-medium uppercase pt-5 pb-2 ">
              Categories
            </p>
            <p className="text-sm custom-all px-4 py-1 w-max rounded-md">
              {product?.category}
            </p>
          </div>

          <div className="">
            {/* unit  */}
            {!vrcolor && variant && variant?.length > 0 && variant[0]?.unit && (
              <Units unit={unit} setUnit={setUnit} variant={variant} setActiveImg={setActiveImg} />
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
            {filterV && filterV.length > 0 && filterV[0]?.size && vrcolor && (
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

            <div className="">
              <CallForPrice
                product={product}
                headerSetting={headerSetting}
                cls={buttonSixteen}
                price={price}
              />
            </div>
            {productQuantity !== "0" && (
              <div>
                {price !== 0 && (
                  <div>
                    <p className="text-base pb-2 pt-4">QTY</p>

                    <div className="flex flex-col lg2:flex-row gap-5">
                      <div className=" w-max flex items-center">
                        <button
                          className="px-4 py-3 rounded-tl-full rounded-bl-full text-xl custom-all text-white"
                          type="button"
                          onClick={decNum}
                        >
                          <HiMinus />
                        </button>

                        <input
                          type="text"
                          className="form-control w-24 text-center border-cart py-[7px] text-lg font-semibold"
                          value={qty}
                          onChange={handleChange}
                        />

                        <button
                          className="px-4 py-3 rounded-tr-full rounded-br-full text-xl custom-all text-white"
                          type="button"
                          onClick={incNum}
                        >
                          <HiPlus />
                        </button>
                      </div>
                      <button
                        onClick={() => add_to_cart()}
                        type="submit"
                        className={buttonSixteen}
                      >
                        {button || "+ ADD TO CART"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Display the referral link */}
          <div>
            {/* Display referral link and copy button */}
            {referralLink && (
              <div className="flex items-center gap-4">
                {/* Underlined referral link */}
                <p>
                  Referral Link:{" "}
                  <a
                    href={referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    {referralLink}
                  </a>
                </p>

                {/* Copy button */}
                <button
                  className={`px-2 py-2 font-semibold rounded-lg transition-all duration-300 
                  ${copied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                  onClick={handleCopyLink}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 10h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

const Units = ({ unit, setUnit, variant, setActiveImg }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Units</h3>
      <div className="flex flex-wrap gap-2">
        {variant?.map((item: any, id: any) => (
          <Unit key={id} item={item} select={unit} setSelect={setUnit} setActiveImg={setActiveImg} />
        ))}
      </div>
    </div>
  );
};

const ColorsOnly = ({ color, setColor, variant, setActiveImg }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Colors</h3>
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
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Size</h3>
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
      className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text }} className="w-7 h-7"></div>
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
      className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text?.color }} className="w-7 h-7"></div>
    </div>
  );
};
