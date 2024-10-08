"use client";

import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import parse from "html-react-parser";
import { useParams } from "next/navigation";
import { getProductDetails } from "../../utils/getProductDetails";
import getStoreId from "../../utils/getStoreId";

const ProductDetailsTest = () => {
  const { productID: product_id, slug } = useParams();
  const { data: productData } = useQuery({
    queryKey: ["getUrl", { url: window.location.host }],
    queryFn: () => getStoreId(),
  });

  const store_id = productData?.store_id;
  const productDetailsArg = store_id ? { product_id, store_id, slug } : null;

  const { data: productDetailsData } = useQuery({
    queryKey: ["product_details", { slug: productDetailsArg?.slug }],
    queryFn: () => getProductDetails(productDetailsArg),
  });

  const product = productDetailsData?.product || {};
  const variant = productDetailsData?.variant || [];
  const vrColor = productDetailsData?.vrcolor || [];

  return (
    <div className="container px-5">
      <div className="pt-5 pb-20 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-9 gap-x-10 gap-y-5">
          <div className="md:col-span-5">
            {true && (
              <div className="grid grid-cols-1 gap-2 ">
                {product?.image &&
                  product?.image?.slice(0, 1).map((data: any, idx: any) => (
                    <div
                      className={`w-full h-full flex justify-center`}
                      key={idx}
                    >
                      <img
                        className="w-auto max-h-[500px] border-2 border-gray-200"
                        src={productImg + data}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
            )}
            {!true && (
              <div className="grid grid-cols-2 gap-2 ">
                {product?.image &&
                  product?.image?.slice(0, 4).map((data: any, idx: any) => (
                    <div
                      key={idx}
                      className={`${
                        product?.image.length === 1 && "col-span-2"
                      } w-full h-full flex justify-center`}
                    >
                      <img
                        className="w-auto max-h-[500px] border-2 border-gray-200"
                        src={productImg + data}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="md:col-span-4 space-y-8 font-seven">
            <h2 className="text-2xl text-[#212121] font-bold mb-3">
              {product?.name}
            </h2>

            <p className="text-sm text-[#5a5a5a] font-seven leading-8 apiHtml">
              {parse(`${product?.description?.slice(0, 250)}`)}{" "}
              {product?.description?.length > 250 && "..."}
            </p>

            <div className="flex justify-start items-center gap-x-4">
              <div className="text-[#212121] text-2xl font-seven font-bold flex justify-start items-center gap-4">
                <BDT /> 210
                {/* {camp?.status === "active" ? campPrice : price}{" "}
              {camp?.status !== "active" &&
              (product?.discount_type === "no_discount" ||
                product?.discount_price === "0.00") ? (
                " "
              ) : (
                <span className="text-gray-500 font-thin line-through text-xl font-seven">
                  <BDT />
                  {regularPrice}
                </span>
              )} */}
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

            {/* unit  */}
            {/* && variant[0]?.unit */}
            {/* {!vrcolor && variant?.length !== 0 && (
            <Units unit={unit} setUnit={setUnit} variant={variant} />
          )} */}
            {/* color and size  */}
            {/* {vrcolor && sizeV !== undefined && (
            <Colors
              color={color}
              setColor={setColor}
              vrcolor={vrcolor}
              setSize={setSize}
            />
          )} */}
            {/* filterV[0]?.size && */}
            {/* {filterV && filterV[0]?.size && vrcolor && (
            <Sizes size={size} setSize={setSize} variant={filterV} />
          )} */}
            {/* color only  */}
            {/* {vrcolor && sizeV === undefined && (
            <ColorsOnly
              color={color}
              setColor={setColor}
              variant={variant}
              setColorid={setColorid}
            />
          )} */}
            {/* size only  */}
            {/* {!vrcolor?.length && sizeV !== undefined && (
            <Sizes size={size} setSize={setSize} variant={filterV} />
          )} */}

            <div className="mt-5">
              {/* <CallForPrice
              product={product}
              headerSetting={headerSetting}
              cls={buttonSeven}
              price={price}
            /> */}
            </div>

            {/* {productQuantity !== "0" && (
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
          )} */}
            {/* booking  */}
            {/* {bookingData?.status === 200 && productQuantity !== "0" && (
            <div className={buttonSeven} onClick={bookNowBtn}>
              <button>BOOK NOW</button>
            </div>
          )} */}
            {/* {bookingData?.status === 200 && productQuantity === "0" && (
            <div className={buttonSeven}>
              <button>ALREADY BOOKED</button>
            </div>
          )} */}
            {/* 
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
          )} */}

            {/* {children} */}
            {/* {open && (
            <Link href={"/product/" + product?.id + "/" + product?.slug}>
              <div
                onClick={() => setOpen(false)}
                className="font-bold text-white bg-gray-600 rounded-md w-48 sm:w-[416px] md:w-48 xl:w-[416px] py-3 font-seven text-center"
              >
                View Details
              </div>
            </Link>
          )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTest;

const AddCart = ({ setQty, qty, onClick, buttonSeven, bookingData }: any) => {
  const { store_id } = useTheme();

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
              {store_id === 1187 ? "অর্ডার করুন" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
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

const ColorsOnly = ({ color, setColor, variant, setColorid }: any) => {
  return (
    <div className="">
      <h3 className="font-medium font-sans text-xl mb-2">Colors</h3>
      <div className="flex flex-wrap gap-2">
        {variant?.map((item: any, id: any) => (
          <ColorSet
            key={id}
            id={id}
            text={item}
            select={color}
            setSelect={setColor}
            setColorid={setColorid}
          />
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
      className={`border w-max px-2 h-10 flex justify-center items-center font-sans text-sm rounded ${
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
      className={`border w-max px-2 h-10 flex justify-center items-center font-sans font-medium rounded ${
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

const ColorSet = ({ text, select, setSelect, id, setColorid }: any) => {
  return (
    <div
      onClick={() => {
        setSelect(text);
        setColorid(id);
      }}
      className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded bg-white ${
        text === select ? "border-gray-900" : "border-gray-300"
      }`}
    >
      <div style={{ backgroundColor: text?.color }} className="w-7 h-7"></div>
    </div>
  );
};
