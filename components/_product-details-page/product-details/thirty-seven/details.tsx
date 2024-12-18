"use client";
import Skeleton from "@/components/loader/skeleton";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { buyNow } from "@/utils/buy-now";
import CallForPrice from "@/utils/call-for-price";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import ImageModal from "@/utils/image-modal";
import useHeaderSettings from "@/utils/query/use-header-settings";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { sendGTMEvent } from "@next/third-parties/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoMdCart } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { HSlider } from "../eight/slider";
import getReferralCode from "@/utils/getReferralCode";
import { Colors, ColorsOnly, Sizes, Units } from "./imageVariations";
import { customizeSingleProductPage } from "@/utils/customizeDesign";

const Details = ({
  data,
  product,
  variant,
  vrcolor,
  fetchStatus,
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
      setSize(null);
      setUnit(null);
      setLoad(false);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [data, store_id]);

  const router = useRouter();

  const buyNowBtn = () => {
    if (qty > productQuantity) {
      toast("Quantity cannot exceed stock.", {
        type: "warning",
        autoClose: 1000,
      });
      return false;
    }
    buyNow(variant, size, color, unit, filterV, add_to_cart, router);
  };

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
        background:${design?.header_color};
    }
    .select-size {
        color: ${design?.text_color};
        background:${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .select-unit {
        color : ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .text-color {
        color: ${design?.header_color};
    }
    .cart-color {
        color: ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color};
    }
    .cart-btn-thirty-seven {
        color: ${design?.text_color};
        background:${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .cart-btn-thirty-seven:hover {
        color: ${design?.header_color};
        background:transparent;
        border: 1px solid ${design?.header_color};
    }
  `;

  const buttonSeven =
    "w-full flex items-center gap-2 rounded-md w-full text-center py-3 justify-center lg:cursor-pointer cart-btn-thirty-seven";

  return (
    <div className="pt-5 pb-20">
      <style>{styleCss}</style>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-x-10 gap-y-5">
        {store_id !== 4849 && (
          <div className="md:col-span-5 px-10">
            {/* <div className="grid grid-cols-2 gap-2 ">
              {product?.image &&
                product?.image?.slice(0, 10).map((data: any) => (
                  <div
                    key={data.id}
                    className={`${
                      product?.image.length === 1 && "col-span-2"
                    } w-full h-full flex justify-center`}
                  >
                    <img
                      className="min-w-full h-auto shadow-2xl border-2 border-gray-200"
                      src={productImg + data}
                      alt=""
                    />
                  </div>
                ))}
            </div> */}
            <HSlider
              product={product}
              setOpen={setOpen}
              variant={variant}
              activeImg={activeImg}
              setActiveImg={setActiveImg}
            />
          </div>
        )}
        {store_id === 4849 && (
          <div className="lg2:col-span-5 justify-self-center">
            <HSlider product={product} setOpen={setOpen} />
          </div>
        )}
        <div className="md:col-span-4 space-y-3 sticky top-20 h-max">
          <h2 className="text-2xl text-[#212121] font-semibold">
            {product?.name}
          </h2>

          <div className="flex justify-start items-center gap-x-4">
            <div className="text-[#212121] text-2xl font-seven font-semibold flex justify-start items-center gap-4">
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
            {product?.discount_type === "percent" && (
              <p className="text-md text-gray-400">
                {" "}
                {product?.discount_price}% Off
              </p>
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

          <div className="mt-5">
            <CallForPrice
              product={product}
              headerSetting={headerSetting}
              cls={buttonSeven}
              price={price}
            />
          </div>

          <div className="flex items-center gap-x-3 py-3">
            <div className="font-semibold text-[#212121]">Availability:</div>
            <div className="text-[#5a5a5a] text-sm">
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

          {productQuantity >= "0" && (
            <div>
              {price !== 0 && (
                <AddCart
                  qty={qty}
                  setQty={setQty}
                  onClick={() => add_to_cart()}
                  buyNowBtn={buyNowBtn}
                  buttonSeven={buttonSeven}
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

const AddCart = ({ setQty, qty, onClick, buttonSeven, buyNowBtn }: any) => {
  const { headerSetting, store_id } = useTheme();
  const singleProductPageData = customizeSingleProductPage.find(
      (item) => item.id == store_id
    );

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

  const { button } = data?.custom_design?.single_product_page?.[0] || {};

  if (error) {
    return <p>error from header settings</p>;
  }

  const rbeliAddToCartBtn =
    "w-full flex items-center gap-2 rounded-md w-full text-center py-3 justify-center lg:cursor-pointer bg-[#fe5631] text-white border border-transparent hover:bg-transparent hover:text-[#e24b28] hover:border-[#e24b28]";
  const rbeliPhoneBtn =
    "w-full flex items-center gap-2 rounded-md w-full text-center py-3 justify-center lg:cursor-pointer bg-[#feab33] text-white border border-transparent hover:bg-transparent hover:text-[#feab33] hover:border-[#feab33]";

  return (
    <div className="flex flex-col justify-start items-center gap-3 py-1 w-96">
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
      <div className={singleProductPageData?.btn_design ? rbeliAddToCartBtn: `${buttonSeven}`} onClick={onClick}>
        <IoMdCart />
        <button>কার্টে যোগ করুন</button>
      </div>
      <div
        className={`${buttonSeven} opacity-70 hover:opacity-100`}
        onClick={buyNowBtn}
      >
        <IoMdCart />
        <button>{button || "অর্ডার করুন"}</button>
      </div>
      <a href={"tel:+88" + headerSetting?.phone} className={singleProductPageData?.btn_design ? rbeliPhoneBtn: `${buttonSeven}`}>
        <FiPhone />
        <p>{headerSetting?.phone}</p>
      </a>
      <a
        href={
          "https://api.whatsapp.com/send?phone=" + headerSetting?.whatsapp_phone
        }
        className={`${buttonSeven} opacity-70 hover:opacity-100`}
      >
        <FaWhatsapp />
        <p>{headerSetting?.whatsapp_phone}</p>
      </a>
    </div>
  );
};
