"use client";
import Skeleton from "@/components/loader/skeleton";
import useTheme from "@/hooks/use-theme";
import {
  addToCartList,
  decrementQty,
  incrementQty,
} from "@/redux/features/product.slice";
import BDT from "@/utils/bdt";
import { buyNow } from "@/utils/buy-now";
import CallForPrice from "@/utils/call-for-price";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { sendGTMEvent } from "@next/third-parties/google";
import parse from "html-react-parser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HSlider } from "../ten/slider";
import getReferralCode from "@/utils/getReferralCode";
import { Colors, ColorsOnly, Sizes, Units } from "./imageVariations";

const Details = ({ data, children, fetchStatus }: any) => {
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
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  // image selector
  const [activeImg, setActiveImg] = useState("");

  const [price, setPrice] = useState<any>(0);
  const [campPrice, setCampPrice] = useState<any>(0);
  const [rangePriceShow, setRangePriceShow] = useState(true);

  const sizeV = variant?.find((item: any) => item.size !== null);

  const regularPrice =
    parseInt(product?.regular_price) +
    (size?.additional_price ? parseInt(size?.additional_price) : 0) +
    (unit?.additional_price ? parseInt(unit?.additional_price) : 0) +
    (color?.additional_price ? parseInt(color?.additional_price) : 0);

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

    if (!rangePriceShow) {
      setSize(sizeV ? fil : null);
    }
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
      setRangePriceShow(true);
      // setUnit(!sizeVariant && !vrcolor ? variant[0] : null);
      // setSize(sizeVariant ? sizeVariant : null);
      // setColor(
      //   !sizeVariant && vrcolor ? variant[0] : vrcolor ? vrcolor[0] : null
      // );
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [data, store_id]);

  useEffect(() => {
    const newPrice = getPrice(
      regularPrice,
      product?.discount_price,
      product?.discount_type
    );
    setPrice(newPrice);

    const newCampPrice = getPrice(
      newPrice,
      parseInt(camp?.discount_amount),
      camp?.discount_type
    );
    setCampPrice(newCampPrice);
    setRangePriceShow(false);
  }, [regularPrice]);

  const justRegularPrice = parseInt(product?.regular_price || 0);

  // Extract all additional_price values, ensuring they are numbers
  const additionalPrices = variant.map((v: any) =>
    parseInt(v.additional_price || 0)
  );

  // Create an array of prices by adding each additional price to justRegularPrice
  const combinedPrices = additionalPrices.map(
    (price: any) => justRegularPrice + price
  );

  // Include the base regular price itself in the array (in case no additional price applies)
  // combinedPrices.push(justRegularPrice);

  // Sort the prices to get lowestPrice and highestPrice
  const sortedPrices = combinedPrices.sort((a: any, b: any) => a - b);

  // Lowest and highest prices
  const lowestPrice = sortedPrices[0];
  const highestPrice = sortedPrices[sortedPrices.length - 1];

  const router = useRouter();

  const buyNowBtn = () => {
    buyNow(variant, size, color, unit, filterV, add_to_cart, router);
  };

  if (fetchStatus === "fetching") {
    return (
      <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
        <Skeleton />
      </div>
    );
  }

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
    <div className="bg-white mt-20">
      <style>{styleCss}</style>
      <div className="grid grid-cols-1 lg:grid-cols-9 lg:gap-6 gap-8">
        <div className="lg:col-span-5 justify-self-center">
          <div className="">
            <HSlider
              product={product}
              variant={variant}
              activeImg={activeImg}
              setActiveImg={setActiveImg}
            />
          </div>
        </div>
        <div className="lg:col-span-4 space-y-8 font-seven">
          <h2 className="text-2xl text-[#212121] mb-3">{product?.name}</h2>
          <div className="text-[#212121] text-2xl font-seven font-bold flex justify-start items-center gap-4">
            <BDT />
            {rangePriceShow &&
            lowestPrice &&
            highestPrice &&
            lowestPrice != highestPrice ? (
              <>{`${lowestPrice} - ${highestPrice}`}</>
            ) : (
              <>
                {camp?.status === "active" ? campPrice : price}

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
              </>
            )}
          </div>

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
            window.history.replaceState(null, "", link);
          }
        } catch (error) {
          console.error("Error fetching referral code:", error);
        }
      }
    };
  }, []);

  useEffect(() => {
    const result = cartList.find((i: any) => i?.id === product?.id);
    setalready(result);
  }, [cartList, product?.id]);

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

  const { button } = data?.custom_design?.single_product_page?.[0] || {};

  if (error) {
    return <p>error from header settings</p>;
  }

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
              already?.qty && variant?.length === 0
                ? already?.qty
                : variant?.length === 0
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

      {variant?.length !== 0 && (
        <div onClick={onClick} className="w-full">
          <button className={buttonTwenty}>Add to bag</button>
        </div>
      )}

      <div
        onClick={buyNowBtn}
        className={`w-full ${variant?.length !== 0 && "col-span-3"}`}
      >
        <button className={buttonTwenty}>{button || "Buy Now"}</button>
      </div>
    </div>
  );
};
