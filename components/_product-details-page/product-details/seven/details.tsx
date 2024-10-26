"use client";
import BookingForm from "@/components/booking-form";
import QuikView from "@/components/quick-view";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { bookNow } from "@/utils/book-now";
import CallForPrice from "@/utils/call-for-price";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { sendGTMEvent } from "@next/third-parties/google";
import { useQuery } from "@tanstack/react-query";
import parse from "html-react-parser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HSlider } from "../eight/slider";
import Skeleton from "react-loading-skeleton";
import getReferralCode from "@/utils/getReferralCode";
import { Colors, ColorsOnly, Sizes, Units } from "./imageVariations";

// Define the type for the cache
interface CampaignProductCache {
  [key: string]: any; // This means any key of type string can have a value of any type
}

const campaignProductCache: CampaignProductCache = {}; // Cache object to store fetched data

export const fetchCampaignProduct = async (id: any, store_id: any) => {
  const cacheKey = `${id}-${store_id}`; // Create a unique cache key based on parameters

  // Check if the data is already cached
  if (campaignProductCache[cacheKey]) {
    return campaignProductCache[cacheKey]; // Return cached data
  }

  try {
    const response = await httpReq.post("get/offer/product", { id, store_id });
    console.log("1111");
    // Cache the response data
    campaignProductCache[cacheKey] = response;

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Details = ({
  data,
  children,
  open,
  setOpen,
  variant,
  vrcolor,
  product,
  fetchStatus,
}: any) => {
  // this is product
  // console.log(product, "product form product details");
  const { makeid, store_id, headerSetting, bookingData } = useTheme();
  const dispatch = useDispatch();
  const [filterV, setFilterV] = useState<any>([]);
  const [load, setLoad] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  // select variant state
  const [color, setColor] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);
  const [qty, setQty] = useState<any>(1);
  // const [camp, setCamp] = useState<any>(null);
  const [colorid, setColorid] = useState(null);
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);

  // image selector
  const [activeImg, setActiveImg] = useState(product?.defaultImage);

  // Use TanStack Query to fetch campaign product data
  const { data: camp, isLoading } = useQuery({
    queryKey: ["campaignProduct", { id: product?.id }],
    queryFn: () => fetchCampaignProduct(product?.id, store_id),
  });

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
  }, [color, variant]);

  // useEffect(() => {
  //   setLoad(true);
  //   // declare the async data fetching function
  //   const fetchData = async () => {
  //     data["store_id"] = store_id;
  //     const response = await getCampaignProduct(product, store_id);
  //     if (!response?.error) {
  //       setCamp(response);
  //     } else {
  //       setCamp(null);
  //     }

  //     setColor(null);
  //     setSize(null);
  //     setUnit(null);
  //     setLoad(false);
  //   };

  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);
  // }, [data, store_id, fetchStatus]);

  const bookNowBtn = () => {
    bookNow(variant, size, color, unit, filterV, setOpenBooking, openBooking);
  };

  const regularPrice =
    parseInt(product?.regular_price) +
    (size?.additional_price ? parseInt(size?.additional_price) : 0) +
    (unit?.additional_price ? parseInt(unit?.additional_price) : 0) +
    (color?.additional_price ? parseInt(color?.additional_price) : 0);

  const price = Number(
    getPrice(regularPrice, product?.discount_price, product?.discount_type)
  );

  const campPrice = Number(
    getPrice(price, parseInt(camp?.discount_amount), camp?.discount_type)
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

  const buttonSeven =
    "font-bold text-white bg-gray-600 rounded-md w-60 text-center py-3 font-seven lg:cursor-pointer";

  if (isLoading) {
    return (
      <div className=" container h-[70vh] gap-2 md:gap-20 flex justify-center items-center">
        <div className="md:w-[600px] md:min-h-[600px]">
          <Skeleton height={"600px"} />
        </div>
        <div>
          <div className="mb-5 md:w-[400px] md:min-h-[150px]">
            <Skeleton height={"150px"} />
          </div>
          <div className="mb-5 md:w-[200px] md:min-h-[50px]">
            <Skeleton height={"50px"} />
          </div>
          <div className="mb-5 md:w-[200px] md:min-h-[50px]">
            <Skeleton height={"50px"} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-5 pb-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-9 gap-x-10 gap-y-5">
        <div className="md:col-span-5">
          <HSlider
            product={product}
            variant={variant}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
          />
        </div>
        <div className="md:col-span-4 space-y-8 font-seven">
          <h1 className="text-2xl text-[#212121] font-bold mb-3">
            {product?.name}
          </h1>

          <p className="text-sm text-[#5a5a5a] font-seven leading-8 apiHtml">
            {parse(`${product?.description?.slice(0, 250)}`)}{" "}
            {product?.description?.length > 250 && "..."}
          </p>

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

            {product?.discount_type === "percent" && (
              <p className="text-md text-gray-400">
                {" "}
                {product?.discount_price}% Off
              </p>
            )}
          </div>

          {product?.quantity !== "0" && (
            <div className="h-[1px] bg-gray-300 w-full"></div>
          )}

          {/* Unit */}
          {!vrcolor && variant && variant.length !== 0 && variant[0]?.unit && (
            <Units
              unit={unit}
              setUnit={setUnit}
              variant={variant}
              setActiveImg={setActiveImg}
            />
          )}
          {/* color and size  */}
          {vrcolor && sizeV !== undefined && (
            <Colors
              color={color}
              setColor={setColor}
              vrcolor={vrcolor}
              setSize={setSize}
            />
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
            <ColorsOnly
              color={color}
              setColor={setColor}
              variant={variant}
              setColorid={setColorid}
              setActiveImg={setActiveImg}
            />
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

          <div className="mt-5">
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
                  bookingData={bookingData}
                  onClick={() => add_to_cart()}
                  buttonSeven={buttonSeven}
                />
              )}
            </div>
          )}
          {/* booking  */}
          {bookingData?.status === 200 && productQuantity !== "0" && (
            <div className={buttonSeven} onClick={bookNowBtn}>
              <button>BOOK NOW</button>
            </div>
          )}
          {bookingData?.status === 200 && productQuantity === "0" && (
            <div className={buttonSeven}>
              <button>ALREADY BOOKED</button>
            </div>
          )}

          {bookingData?.status === 200 && (
            <div>
              <QuikView open={openBooking} setOpen={setOpenBooking}>
                <BookingForm
                  product={product}
                  price={price}
                  open={openBooking}
                  setOpen={setOpenBooking}
                  color={color}
                  size={size}
                  unit={unit}
                  variant={variant}
                  qty={qty}
                />
              </QuikView>
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
          {open && (
            <Link href={"/product/" + product?.id + "/" + product?.slug}>
              <div
                onClick={() => setOpen(false)}
                className="font-bold text-white bg-gray-600 rounded-md w-48 sm:w-[416px] md:w-48 xl:w-[416px] py-3 font-seven text-center"
              >
                View Details
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;

const AddCart = ({ setQty, qty, onClick, buttonSeven, bookingData }: any) => {
  const { data, error } = useHeaderSettings();

  const { store_id } = useTheme();

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

  if (error) return <p>error from header setting</p>;

  return (
    <>
      {bookingData?.from_type !== "single" && (
        <div className="flex flex-wrap justify-start items-center gap-8 py-10">
          <div className="flex border border-gray-300 divide-x-2 rounded-md">
            <div
              className="h-12 w-12  flex justify-center items-center hover:bg-black rounded-l-md hover:text-white font-semibold lg:cursor-pointer transition-all duration-300 ease-linear"
              onClick={decrementNum}
            >
              <MinusIcon width={15} />
            </div>
            <div className="h-12 w-24  flex justify-center items-center font-bold">
              {qty}
            </div>
            <div
              className="h-12 w-12  flex justify-center items-center hover:bg-black rounded-r-md hover:text-white font-semibold lg:cursor-pointer transition-all duration-300 ease-linear"
              onClick={incrementNum}
            >
              <PlusIcon width={15} />
            </div>
          </div>
          <div className="">
            <button className={buttonSeven} onClick={onClick}>
              {button || "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
