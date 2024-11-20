"use client";
import Skeleton from "@/components/loader/skeleton";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import CallForPrice from "@/utils/call-for-price";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { sendGTMEvent } from "@next/third-parties/google";
import parse from "html-react-parser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { HSlider } from "../eight/slider";
import Rate from "@/utils/rate";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import ImageModal from "@/utils/image-modal";
import { ProductSlider } from "../twenty-eight/product-slider";
import getReferralCode from "@/utils/getReferralCode";
import { Colors, ColorsOnly, Sizes, Units } from "./imageVariations";

const Details = ({
  fetchStatus,
  product,
  variant,
  vrcolor,
  data,
  children,
}: any) => {
  const { makeid, store_id, headerSetting, design } = useTheme();

  const dispatch = useDispatch();

  const [filterV, setFilterV] = useState<any>([]);

  const [load, setLoad] = useState<any>(false);

  // select variant state
  const [color, setColor] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);
  const [qty, setQty] = useState<any>(1);
  const [camp, setCamp] = useState<any>(null);
  const [open, setOpen] = useState<any>(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);

  // image selector
  const [activeImg, setActiveImg] = useState("");

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

  if (fetchStatus === "fetching") {
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

  const styleCss = `
    .promo-bg {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 1px solid ${design?.text_color};
    }
    .button-single-product{
        box-shadow: 5px 5px 0px 2px ${design?.header_color};
    }
      `;

  const buttonSeven =
    "text-lg relative z-[2] py-3 text-center duration-500 bg-white border border-black text-black min-w-[220px] text-center button-single-product hover:shadow-none duration-500";

  return (
    <div className="bg-white h-full ">
      <style>{styleCss}</style>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-5">
        <div className="md:col-span-5">
          <HSlider
            product={product}
            setOpen={setOpen}
            variant={variant}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
          />
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
                  {Math.trunc(product?.discount_price)}% Off
                </p>
              )}
          </div>
          <Rate rating={product?.rating} />
          <div className="h-[1px] bg-gray-300 w-full"></div>
          <p className="text-sm text-[#5a5a5a] leading-6 apiHtml">
            {parse(`${product?.description?.slice(0, 250)}`)}{" "}
            {product?.description?.length > 250 && "..."}
          </p>

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
          {filterV && filterV[0]?.size && vrcolor && (
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

          <div className="">
            <CallForPrice
              product={product}
              headerSetting={headerSetting}
              cls={buttonSeven}
              price={price}
            />
          </div>

          {productQuantity !== "0" && (
            <div>
              {price !== 0 && (
                <AddCart
                  qty={qty}
                  setQty={setQty}
                  buyNowBtn={buttonSeven}
                  onClick={() => add_to_cart()}
                  variant={variant}
                  buttonTwentyNine={buttonSeven}
                />
              )}
            </div>
          )}

          <div className="flex items-center gap-x-3">
            <p className="font-medium">শেয়ার :</p>
            <span className="flex space-x-2">
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <WhatsappShareButton url={window.location.href}>
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
              <FacebookMessengerShareButton
                appId="2"
                url={window.location.href}
              >
                <FacebookMessengerIcon size={32} round={true} />
              </FacebookMessengerShareButton>
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

          {children}

          <div className="text-sm flex flex-col gap-y-1 text-[#5a5a5a]">
            <p>Category: {product?.category} </p>
            <p>
              Availability:{" "}
              {productQuantity !== "0"
                ? ` ${productQuantity} In Stock`
                : "Out Of Stock"}{" "}
            </p>
          </div>
        </div>
      </div>
      {open && (
        <ImageModal open={open} setOpen={setOpen}>
          <ProductSlider product={product} open={open} />
        </ImageModal>
      )}
    </div>
  );
};

export default Details;

const AddCart = ({ setQty, qty, onClick, variant }: any) => {

  const { makeid, store_id, headerSetting, design } = useTheme();
  const { data, error } = useHeaderSettings();

  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");

  // Function to extract the 'referral' parameter from the URL
  const getReferralCodeFromURL = () => {
    const params = new URLSearchParams(window.location.search); // Get all URL parameters
    return params.get("referral"); // Get the 'referral' parameter from the URL
  };

  useEffect(() => {
    const fetchReferralCode = async () => {
      const codeFromURL = getReferralCodeFromURL();
      if (codeFromURL) {
        setReferralCode(codeFromURL);
      } else {
        try {
          const code = await getReferralCode();
          if (code) {
            setReferralCode(code);
            localStorage.setItem("referralCode", code);
            const link = `?referral=${code}`;
            setReferralLink(link);
            console.log("Generated referral link:", link);
            window.history.replaceState(null, "", link);
          }
        } catch (error) {
          console.error("Error fetching referral code:", error);
        }
      }
    };
    // fetchReferralCode();
  }, []);

  let incrementNum = () => {
    setQty((prevCount: any) => prevCount + 1);
  };
  let decrementNum = () => {
    if (qty <= 1) {
      setQty(1);
    } else {
      setQty((prevCount: any) => prevCount - 1);
    }
  };

  const { button } = data?.data?.custom_design?.single_product_page?.[0] || {};

  if (error) {
    return <p>error from header settings</p>;
  }

  const styleCss = `
  .promo-bg {
      color:  ${design?.text_color};
      background: ${design?.header_color};
      border: 1px solid ${design?.text_color};
  }
  .button-single-product{
      box-shadow: 5px 5px 0px 2px ${design?.header_color};
  }
  .button-single-product1{
      box-shadow: 5px 5px 0px 2px ${design?.text_color};
  }
    `;

const buttonSeven =
  "text-lg font-semibold relative z-[2] py-3 text-center duration-500 bg-white border border-black text-black min-w-[220px] text-center button-single-product hover:shadow-none duration-500";
const buttonThirtyFive =
  "promo-bg text-lg font-semibold relative z-[2] py-3 text-center duration-500 bg-white border border-black text-black min-w-[220px] text-center button-single-product1 hover:shadow-none duration-500";


  return (
    <div className="py-5">
      <style>{styleCss}</style>
      <div className="flex border border-gray-300 w-max rounded-md">
        <div
          className="h-12 w-12 flex justify-center items-center rounded-l-md font-semibold lg:cursor-pointer transition-all duration-300 ease-linear"
          onClick={decrementNum}
        >
          <MinusIcon width={15} />
        </div>
        <div className="h-12 w-24  flex justify-center items-center font-bold focus:outline-none">
          {qty}
        </div>
        <div
          className="h-12 w-12  flex justify-center items-center rounded-r-md font-semibold lg:cursor-pointer transition-all duration-300 ease-linear"
          onClick={incrementNum}
        >
          <PlusIcon width={15} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-5 mt-5">
        <button className={buttonThirtyFive} onClick={onClick}>
          Add to bag
        </button>
        <Link href="/checkout">
          {" "}
          <button onClick={onClick} className={buttonSeven}>
            {button || "Buy now"}
          </button>
        </Link>
      </div>
    </div>
  );
};
