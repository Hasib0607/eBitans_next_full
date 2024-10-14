"use client";
import { useEffect, useState } from "react";
// import { productImg } from '../../../../siteSettings/siteUrl';
import { useDispatch } from "react-redux";
// import Zoom from './../one/Zoom';
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
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { sendGTMEvent } from "@next/third-parties/google";
import { toast } from "react-toastify";
import { HSlider } from "../ten/slider";
import getReferralCode from "@/utils/getReferralCode";
// import { HSlider } from "./slider";

const Details = ({
  fetchStatus,
  product,
  variant,
  vrcolor,
  data,
  children,
}: any) => {
  const { makeid, store_id, headerSetting } = useTheme();
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

      setColor(null);
      setSize(null);
      setUnit(null);
      setLoad(false);
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
  const customDetailsSeventeen = `
    .text-style{
        font-family: 'Marck Script', cursive;
    }
    `;

  const buttonSeventeen =
    "font-bold search-bg hover:bg-blue-300 duration-300 rounded-md w-60 text-center py-3";

  return (
    <div className="">
      <style>{customDetailsSeventeen}</style>
      <div className=" bg-white">
        <div className="grid grid-cols-1 md:grid-cols-9 gap-x-6">
          <div className="md:col-span-5">
            <HSlider
              product={product}
              variant={variant}
              activeImg={activeImg}
              setActiveImg={setActiveImg}
            />
          </div>
          <div className="md:col-span-4 space-y-6 mt-10 md:mt-0">
            <h2 className="md:text-4xl text-2xl text-gray-700 mb-3">
              {product?.name}
            </h2>
            {/* <p className='text-sm text-[#5a5a5a] font-seven leading-8'>{product?.description?.slice(0, 250)}</p> */}

            <div className="flex items-center">
              <div className="w-[120px] text-xl">Price:</div>
              <div className="text-[#212121] text-lg flex justify-start items-center gap-4">
                <div>
                  <BDT />
                  {camp?.status === "active" ? campPrice : price}
                </div>
                <h1 className="">
                  {camp?.status !== "active" &&
                  (product?.discount_type === "no_discount" ||
                    product?.discount_price === "0.00") ? (
                    " "
                  ) : (
                    <span className="text-gray-500 font-thin line-through text-sm font-seven">
                      <BDT />
                      {regularPrice}
                    </span>
                  )}
                </h1>
              </div>
            </div>

            <div className="flex gap-x-1 my-1">
              <div>
                <Rate rating={product?.rating} />
              </div>
              <div className="text-gray-500 sm:text-sm text-xs">
                ({product?.number_rating})
              </div>
            </div>

            {/* <div className="h-[1px] bg-gray-300 w-full"></div> */}

            {/* unit  */}
            {!vrcolor && variant && variant?.length > 0 && variant[0]?.unit && (
              <Units unit={unit} setUnit={setUnit} variant={variant} setActiveImg={setActiveImg} />
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

            <div className="flex items-center">
              <div className="w-[120px] text-xl">Availability:</div>
              <div className="text-[#212121] text-lg ">
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
                cls={buttonSeventeen}
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
                    buttonSeventeen={buttonSeventeen}
                  />
                )}
              </div>
            )}

            {children}
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

const AddCart = ({ setQty, qty, onClick, buttonSeventeen }: any) => {
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

  const { button } = data?.data?.custom_design?.single_product_page?.[0] || {};

  if (error) {
    return <p>error from header settings</p>;
  }

  return (
    <div className=" justify-start items-center gap-8 py-10">
      <div className="flex items-center ">
        <div className="w-[120px] text-xl">Quantity :</div>
        <div className="flex border border-gray-300 divide-x-2 rounded-md lg:cursor-pointer">
          <div
            className="h-8 w-8  flex justify-center items-center hover:bg-black rounded-l-md hover:text-white font-semibol transition-all duration-300 ease-linear"
            onClick={decNum}
          >
            <MinusIcon width={15} />
          </div>
          <div className="h-8 w-8  flex justify-center items-center">{qty}</div>
          <div
            className="h-8 w-8  flex justify-center items-center hover:bg-black rounded-r-md hover:text-white font-semibol transition-all duration-300 ease-linear"
            onClick={incNum}
          >
            <PlusIcon width={15} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button className={buttonSeventeen} onClick={onClick}>
          {button || "Add to cart"}
        </button>
      </div>
    </div>
  );
};

const Units = ({ unit, setUnit, variant, setActiveImg }: any) => {
  return (
    <div className="flex items-center">
      <h3 className="w-[120px] text-xl">Units:</h3>
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
    <div className="flex items-center">
      <h3 className="w-[120px] text-xl">Colors:</h3>
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
    <div className="flex items-center">
      <h3 className="w-[120px] text-xl">Size:</h3>
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
    <div className="flex items-center">
      <h3 className="w-[120px] text-xl">Color:</h3>
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
      className={`border px-2 lg:cursor-pointer h-10 flex justify-center items-center font-sans text-sm rounded ${
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
      className={`border px-4 py-3 h-7 lg:cursor-pointer text-sm flex justify-center items-center font-sans font-medium rounded ${
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
      className={`border lg:cursor-pointer w-5 h-5 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text }} className="w-3 h-3"></div>
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
      className={`border lg:cursor-pointer w-5 h-5 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text?.color }} className="w-3 h-3"></div>
    </div>
  );
};
