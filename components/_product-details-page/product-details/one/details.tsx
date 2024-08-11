"use client";
import React, { useEffect, useState } from "react";
import { VscCreditCard } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { Swiper, SwiperSlide } from "swiper/react";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import OvalLoader from "@/components/loader/oval-loader";
import { buyNow } from "@/utils/buy-now";
import { useRouter } from "next/navigation";
import { getPrice } from "@/utils/get-price";
import { addToCartList } from "@/redux/features/product.slice";
import { Autoplay, Pagination } from "swiper/modules";
import { productImg } from "@/site-settings/siteUrl";
import Link from "next/link";
import Rate from "@/utils/rate";
import BDT from "@/utils/bdt";
import CallForPrice from "@/utils/call-for-price";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const Details = ({ data }: any) => {
  const router = useRouter();
  const { makeid, design, store_id, headerSetting } = useTheme();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<any>({});
  const [variant, setVariant] = useState<any>([]);
  const [filterV, setFilterV] = useState<any>([]);
  const [vrcolor, setVrcolor] = useState<any>([]);
  const [load, setLoad] = useState(false);
  const [camp, setCamp] = useState<any>(null);

  // select variant state
  const [color, setColor] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);
  const [qty, setQty] = useState<any>(1);

  const sizeV = variant?.find((item: any) => item?.size !== null);

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
      setLoad(false);
      setColor(null);
      setSize(null);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [data, store_id]);

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

  const buttonOne =
    "font-bold text-white bg-gray-600 rounded-md w-60 py-3 text-center";

  return (
    <div className="grid md:grid-cols-8 grid-cols-1 gap-4 w-full overflow-hidden">
      <div className="md:col-span-4 lg2:col-span-3 col-span-1 h-full overflow-hidden">
        <Swiper
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={product?.image?.length > 1 && true}
          pagination={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper md:col-span-4 grid grid-cols-2 gap-5 w-full"
        >
          {product?.image?.map((s: any) => (
            <SwiperSlide key={s.id}>
              <div className="">
                <img
                  className="h-auto min-w-full"
                  src={productImg + s}
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="md:col-span-4 lg2:col-span-4 md:px-2">
        <h2 className="text-xl sm:text-3xl font-semibold text-black">
          {product?.name}
        </h2>
        <div className="flex flex-col gap-3 sm:mt-6 mt-1">
          <div className="flex items-center gap-2">
            <p className="capitalize">
              {" "}
              <span className="text-black">Category: </span>{" "}
            </p>
            <Link
              href={"/category/" + product?.category_id}
              style={{ color: design?.header_color }}
            >
              {product?.category}
            </Link>
          </div>
          <div className="flex justify-start items-center gap-2">
            <p className="text-xl">
              <Rate rating={product?.rating} />
            </p>
            <p>({product?.number_rating})</p>
          </div>
        </div>
        <div className="md:divider mt-2"></div>
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
            )}{" "}
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
        <div className="md:divider mt-2"></div>
        <div className="mb-5">
          <p className="text-black apiHtml">
            {parse(`${product?.description?.slice(0, 250)}`)}{" "}
            {product?.description?.length > 250 && "..."}
          </p>
        </div>
        <div className="text-black flex items-center gap-2 mb-5">
          <VscCreditCard size={20} />
          <p>Cash on Delivery available</p>
        </div>

        {/* unit */}
        {!vrcolor &&
          Array.isArray(variant) &&
          variant.length > 0 &&
          variant[0]?.unit && (
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

        {/* size */}
        {Array.isArray(filterV) &&
          filterV.length > 0 &&
          filterV[0]?.size &&
          vrcolor && <Sizes size={size} setSize={setSize} variant={filterV} />}

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

        <div className="mt-5">
          <CallForPrice
            product={product}
            headerSetting={headerSetting}
            cls={buttonOne}
            price={price}
          />
        </div>

        {productQuantity !== "0" && (
          <div>
            {price !== 0 && (
              <AddCart
                qty={qty}
                product={product}
                setQty={setQty}
                store_id={store_id}
                buyNowBtn={buyNowBtn}
                onClick={() => add_to_cart()}
                buttonOne={buttonOne}
              />
            )}
          </div>
        )}

        <div className="flex items-center gap-x-3">
          <div className="">Availability:</div>
          <div className="text-[#212121] ">
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

        <div className="flex items-center gap-x-3 mt-3">
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
      </div>
    </div>
  );
};

export default Details;

const AddCart = ({
  setQty,
  qty,
  onClick,
  buttonOne,
  product,
  buyNowBtn,
  store_id,
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

  return (
    <div className="flex flex-wrap lg2:flex-row flex-col justify-start lg2:items-center gap-x-8 gap-y-3 py-10">
      <div className="flex border border-gray-300 divide-x-2 rounded-md w-max">
        <div
          className="h-12 w-12  flex justify-center items-center hover:bg-black rounded-l-md hover:text-white font-semibold transition-all duration-300 ease-linear"
          onClick={decNum}
        >
          <MinusIcon width={15} />
        </div>
        <div className="h-12 w-24  flex justify-center items-center">{qty}</div>
        <div
          className="h-12 w-12  flex justify-center items-center hover:bg-black rounded-r-md hover:text-white font-semibold transition-all duration-300 ease-linear"
          onClick={incNum}
        >
          <PlusIcon width={15} />
        </div>
      </div>
      {store_id !== 3512 ? (
        <div className="flex flex-wrap items-center gap-3">
          <div className="">
            <button className={buttonOne} onClick={onClick}>
              Add to cart
            </button>
          </div>
          <div className="">
            <button className={buttonOne} onClick={() => buyNowBtn()}>
              Buy Now
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button className={buttonOne} onClick={() => buyNowBtn()}>
            "অর্ডার করতে চাই"
          </button>
        </div>
      )}
    </div>
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
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Colors</h3>
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
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Size</h3>
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

const Unit = ({ item, select, setSelect }: any) => {
  return (
    <div
      onClick={() => setSelect(item)}
      className={`border px-1 w-auto h-10 flex justify-center items-center font-sans text-sm rounded ${
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
      className={`border px-1 w-auto h-10 flex justify-center items-center font-sans font-medium rounded ${
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

const ColorSet = ({ text, select, setSelect }: any) => {
  return (
    <div
      onClick={() => setSelect(text)}
      className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text?.color }} className="w-7 h-7"></div>
    </div>
  );
};
