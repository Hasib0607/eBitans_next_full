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
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { sendGTMEvent } from "@next/third-parties/google";
import parse from "html-react-parser";
import { act, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import "./five.css";
import { HSlider } from "../ten/slider";
import { useQuery } from "@tanstack/react-query";
import getReferralCode from "@/utils/getReferralCode";
import { Colors, ColorsOnly, Sizes, Units } from "./imageVariations";
// import { HSlider } from "./slider";

const Details = ({
  data,
  product,
  variant,
  vrcolor,
  fetchStatus,
  children,
}: any) => {
  const { data: x, error } = useHeaderSettings();

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
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  // image selector
  // const [activeImg, setActiveImg] = useState("");
  const [activeImg, setActiveImg] = useState(product?.defaultImage);
  const [stockShow, setStockShow] = useState<boolean>(false);
  const [productQuantity, setProductQuantity] = useState<any>("0");

  const sizeV = variant?.find((item: any) => item.size !== null);

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

  useEffect(() => {
    const newProductQuantity =
      size?.quantity ||
      color?.quantity ||
      unit?.quantity ||
      product?.quantity ||
      "Out of Stock";

    setProductQuantity(newProductQuantity);

    if (unit == null && color == null && size == null) {
      setStockShow(false);
    } else {
      setStockShow(true);
    }
  }, [color, size, unit]);

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

  // useEffect(() => {
  //   setLoad(true);
  //   const fetchData = async () => {
  //     const response = await getCampaignProduct(product, store_id);
  //     console.log(response, "response");
  //     if (!response?.error) {
  //       setCamp(response);
  //     } else {
  //       setCamp(null);
  //     }

  //     setColor(null);
  //     setUnit(null);
  //     setSize(null);
  //     setLoad(false);
  //   };

  //   fetchData().catch(console.error);
  // }, [data, store_id]);

  const {
    data: campData,
    status,
    error: campErr,
  } = useQuery({
    queryKey: ["campProduct", { id: product?.id, store_id: store_id }],
    queryFn: async () => await getCampaignProduct(product, store_id),
  });

  useEffect(() => {
    if (campData?.error) {
      setCamp(null);
    } else {
      setCamp(campData);
    }
  }, [campData]);

  if (status === "pending") {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <Skeleton />
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

    if (qty > productQuantity) {
      toast("Quantity cannot exceed stock.", {
        type: "warning",
        autoClose: 1000,
      });
      return false;
    }

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

  // if (fetchStatus === "fetching") {
  //   return (
  //     <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
  //       <Skeleton />
  //     </div>
  //   );
  // }

  const { button } = x?.data?.custom_design?.single_product_page?.[0] || {};

  if (error) {
    return <p>error from header settings</p>;
  }

  return (
    <div className="">
      <div className=" grid grid-cols-1 xl:grid-cols-2 md:grid-cols-2 gap-10 bg-white ">
        <style>{customStyle}</style>

        <div className="">
          {/* <HSlider product={product} /> */}
          <HSlider
            product={product}
            variant={variant}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
          />
        </div>

        <div>
          <h5 className="text-lg text-[#3a3930] tracking-wide">
            {product?.name}
          </h5>
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
          <p className="my-2 text-sm text-[#666666] apiHtml">
            {parse(`${product?.description?.slice(0, 250)}`)}{" "}
            {product?.description?.length > 250 && "..."}
          </p>
          <div className="mt-5">
            {/* unit  */}
            {!vrcolor && variant?.length > 0 && variant[0]?.unit && (
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
                {" "}
                <Colors
                  color={color}
                  setColor={setColor}
                  vrcolor={vrcolor}
                  setSize={setSize}
                />
              </>
            )}
            {/* size with color */}
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
          </div>

          <div className="flex flex-col gap-y-1 my-2">
            <p>Category: {product?.category} </p>
            <p>Availability</p>
            <p className="border-2 py-0.5 px-2 border-gray-800 w-max">
              {productQuantity >= "0" ? (
                <>
                  {stockShow && (
                    <span className="font-medium">{productQuantity}</span>
                  )}{" "}
                  <span className="text-green-500">In Stock!</span>
                </>
              ) : (
                <span className="text-red-600">Out of Stock!</span>
              )}
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
                      {button || " Add To Cart"}
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
  );
};

export default Details;
