"use client";
import Skeleton from "@/components/loader/skeleton";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import BDT from "@/utils/bdt";
import { buyNow } from "@/utils/buy-now";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import useHeaderSettings from "@/utils/query/use-header-settings";
import Rate from "@/utils/rate";
import { sendGTMEvent } from "@next/third-parties/google";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import getReferralCode from "@/utils/getReferralCode";
import { Colors, ColorsOnly, Sizes, Units } from "./imageVariations";
import { ColorSlider } from "./color-slider";
import { FaShippingFast } from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import { BiSolidCustomize } from "react-icons/bi";
import { FaHome } from "react-icons/fa";

const Details = ({
  fetchStatus,
  product,
  variant,
  vrcolor,
  vrcolorimage,
  data,
  children,
}: any) => {
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
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  // image selector
  const [activeImg, setActiveImg] = useState("");
  const [stockShow, setStockShow] = useState<boolean>(false);
  const [productQuantity, setProductQuantity] = useState<any>("0");

  const sizeV = variant?.find((item: any) => item.size !== null);

  const vPrice = variant?.map((item: any) => item?.additional_price);
  const smallest = Math.min(vPrice);
  const largest = Math.max(vPrice);

  const router = useRouter();

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

  const buyNowBtn = () => {
    if (store_id === 6227) {
      window.location.href = `https://wa.me/${headerSetting?.whatsapp_phone}`;
    } else if (qty > productQuantity) {
      toast("Quantity cannot exceed stock.", {
        type: "warning",
        autoClose: 1000,
      });
      return false;
    } else {
      buyNow(variant, size, color, unit, filterV, add_to_cart, router);
    }
  };

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
      setLoad(false);
      setColor(null);
      setSize(null);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [data, store_id]);

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

  let campPrice = getPrice(
    price,
    parseInt(camp?.discount_amount),
    camp?.discount_type
  );

  if (fetchStatus === "fetching") {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <Skeleton />
      </div>
    );
  }
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
    .btn-hover:hover {
        color:   ${design?.text_color};
        background:${design?.header_color};
    }
    .select-color {
        border: 1px solid ${design?.header_color};
    }
    .select-size {
        color:   ${design?.text_color};
        background:${design?.header_color};
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
    .cart-btn-twenty-one {
        color:   ${design?.text_color};
        background:${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .cart-btn-forty-one {
        color:   ${design?.header_color};
        background:${design?.text_color};
        border: 1px solid ${design?.header_color};
    }
    .cart-btn-twenty-one:hover {
        color:   ${design?.header_color};
        background:transparent;
        border: 1px solid ${design?.header_color};
    }
  `;

  return (
    <div className=" bg-white h-full ">
      <style>{styleCss}</style>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          <ColorSlider
            product={product}
            variant={variant}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
          />
        </div>
        <div className="space-y-4 sticky top-28 h-max">
          <h2 className="text-2xl font-bold mb-3 capitalize">
            {product?.name}
          </h2>
          {/* price range  */}
          {variant?.length !== 0 && !color && !size && !unit && (
            <div className="flex items-center gap-1">
              <p
                className={`${
                  store_id === 4174 ? "text-[#7eb68c]" : "text-color"
                } text-lg font-bold`}
              >
                <BDT />
                {campPrice ? campPrice : price} +
                {largest > smallest && smallest}
              </p>
              {largest > smallest && (
                <p
                  className={`${
                    store_id === 4174 ? "text-[#7eb68c]" : "text-color"
                  } text-lg font-bold`}
                >
                  {" "}
                  - <BDT /> {(campPrice ? campPrice : price || 0) + largest}
                </p>
              )}
              {largest === smallest && (
                <p className="text-gray-500 font-thin line-through text-xl font-seven ml-2">
                  <BDT />
                  {regularPrice}
                </p>
              )}
            </div>
          )}
          {(variant?.length === 0 || color || size || unit) &&
            store_id !== 6227 && (
              <div className="flex justify-start items-center gap-x-4">
                <div
                  className={`${
                    store_id === 4174 ? "text-[#7eb68c]" : "text-color"
                  } text-lg font-bold flex justify-start items-center gap-4`}
                >
                  <BDT />
                  {camp?.status === "active" ? campPrice : price}
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

          <div className="flex gap-x-1 pt-2">
            <div>
              <Rate rating={product?.rating} />
            </div>
            <div className="text-gray-500 sm:text-sm text-xs">
              ({product?.number_rating})
            </div>
          </div>
          <div className="h-[1px] bg-gray-300 w-full"></div>
          <p className="text-sm text-[#5a5a5a] leading-6 apiHtml">
            {parse(`${product?.description?.slice(0, 300)}`)}{" "}
            {product?.description?.length > 300 && "..."}
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
              <Colors
                color={color}
                setColor={setColor}
                vrcolor={vrcolor}
                setSize={setSize}
                activeImg={activeImg}
                setActiveImg={setActiveImg}
                vrcolorimage={vrcolorimage}
              />
            </>
          )}
          {filterV && filterV.length > 0 && filterV[0]?.size && vrcolor && (
            <Sizes
              size={size}
              setSize={setSize}
              variant={filterV}
              activeImg={activeImg}
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
                activeImg={activeImg}
                setActiveImg={setActiveImg}
                vrcolorimage={vrcolorimage}
                productImage={product?.image}
              />
            </>
          )}
          {/* size only  */}
          {!vrcolor?.length && sizeV !== undefined && (
            <Sizes
              size={size}
              setSize={setSize}
              variant={filterV}
              activeImg={activeImg}
              setActiveImg={setActiveImg}
            />
          )}

          <div className="flex items-center">
            <div className="w-[120px] text-xl">Availability:</div>
            <div className="text-[#212121] ">
              {productQuantity >= "0" ? (
                <p>
                  {stockShow && (
                    <span className="font-medium">{productQuantity}</span>
                  )}{" "}
                  <span className="text-green-500">In Stock!</span>
                </p>
              ) : (
                <span className="text-red-600">Out of Stock!</span>
              )}
            </div>
          </div>

          {price === 0 && (
            <div>
              <a
                href={"tel:+88" + headerSetting?.phone}
                className="cart-btn-twenty-one font-bold py-[11px] px-10 w-max rounded-full"
              >
                Call for Price
              </a>
            </div>
          )}

          {productQuantity >= "0" && (
            <div>
              {price !== 0 && (
                <AddCart
                  product={product}
                  variant={variant}
                  qty={qty}
                  buyNowBtn={buyNowBtn}
                  setQty={setQty}
                  onClick={() => add_to_cart()}
                />
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

          {children}

          <div className="grid sm:grid-cols-2 gap-5">
            <div
              className="bg-[#FEF2F2] h-28 w-full rounded-md flex flex-col justify-center pl-5 cursor-pointer"
              onClick={() => router.push("/terms_and_condition")}
            >
              <FaShippingFast className="text-2xl" />
              <p className="font-bold mt-1">Free shipping</p>
              <p className="text-sm text-gray-600">Nationwide Free Delivery</p>
            </div>
            <div className="bg-[#F0F9FF] h-28 w-full rounded-md flex flex-col justify-center pl-5 cursor-pointer">
              <TbTruckReturn className="text-2xl" />
              <p className="font-bold mt-1">Do it your installation</p>
              <p className="text-sm text-gray-600">
                (DIY) do-it-yourself installation within 10 minutes
              </p>
            </div>
            <div
              className="bg-[#F0FDF4] h-28 w-full rounded-md flex flex-col justify-center pl-5 cursor-pointer"
              onClick={() => router.push("/contact")}
            >
              <BiSolidCustomize className="text-2xl" />
              <p className="font-bold mt-1">Easy Customization</p>
              <p className="text-sm text-gray-600">
                Call Us to know more. +8801678004256
              </p>
            </div>
            <div
              className="bg-[#FFFBEB] h-28 w-full rounded-md flex flex-col justify-center pl-5 cursor-pointer"
              onClick={() => router.push("/contact")}
            >
              <FaHome className="text-2xl" />
              <p className="font-bold mt-1">Remodelling your Home?</p>
              <p className="text-sm text-gray-600">
                We provide full turnkey solutions.
              </p>
            </div>
          </div>
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
  variant,
  product,
  buyNowBtn,
}: any) => {
  const { data, error } = useHeaderSettings();

  const { design, store_id } = useTheme();

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
            window.history.replaceState(null, "", link);
          }
        } catch (error) {
          // console.error("Error fetching referral code:", error);
        }
      }
    };
  }, []);

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
    .cart-btn {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 2px solid ${design?.header_color};
    }
    .cart-btn:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid ${design?.header_color};
    }
  `;

  const { button } = data?.custom_design?.single_product_page?.[0] || {};

  if (error) {
    return <p>error from header settings</p>;
  }
  return (
    <>
      <style>{styleCss}</style>
      <div className="flex flex-row flex-wrap gap-5 items-center">
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
            className="form-control w-14 text-center border border-gray-100 outline-none py-[8px] text-lg font-semibold"
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
        <div>
          {product?.quantity === "0" ? (
            <button className=" cart-btn-twenty-one font-bold py-[11px] px-10 w-max rounded-full ">
              Out of Stock
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  onClick();
                }}
                type="submit"
                className=" cart-btn-twenty-one font-bold py-[11px] px-10 w-max rounded-full "
              >
                {button || "+ ADD TO CART"}
              </button>
            </>
          )}
        </div>
        <div>
          <button
            onClick={buyNowBtn}
            type="submit"
            className={`cart-btn-twenty-one font-bold py-[11px] px-10 w-max rounded-full`}
          >
            ORDER NOW
          </button>
        </div>
      </div>

      <div className="mt-5 flex  space-x-4 items-center">
        <h4>Social Share :</h4>
        <span className="flex py-2 space-x-2">
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <WhatsappShareButton url={window.location.href}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </span>
      </div>
    </>
  );
};
