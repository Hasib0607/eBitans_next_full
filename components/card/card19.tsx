import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import QuikView from "../quick-view";
import Details from "../product-quick-view-details/details";
const Card19 = ({ item, design, store_id }: any) => {
  const [open, setOpen] = useState(false);
  const [camp, setCamp] = useState<any>(null);

  const dispatch = useDispatch();

  const productGetPrice = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
  const campPrice = getPrice(
    productGetPrice,
    parseInt(camp?.discount_amount),
    camp?.discount_type
  );

  useEffect(() => {
    async function handleCampaign() {
      try {
        const response: any = await getCampaignProduct(item, store_id);
        if (!response?.error) {
          setCamp(response);
        } // the API response object
      } catch (error) {
        console.error(error);
      }
    }

    handleCampaign();
  }, [item, store_id]);

  const filterOfferProduct = (item: any) => {
    let cartItem = {};
    let productDetails = {
      id: item?.id,
      store_id,
    };
    toast("Added to Cart", {
      type: "success",
      autoClose: 1000,
    });

    httpReq
      .post(
        process.env.NEXT_PUBLIC_API_URL + "get/offer/product",
        productDetails
      )
      .then((res: any) => {
        if (!res?.error) {
          let itemRegularPrice = getPrice(
            item?.regular_price,
            item?.discount_price,
            item?.discount_type
          );
          let campaignPrice = getPrice(
            itemRegularPrice,
            parseInt(res?.discount_amount),
            res?.discount_type
          );

          cartItem = {
            cartId: uuidv4(),
            price: campaignPrice,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        } else {
          cartItem = {
            cartId: uuidv4(),
            price: productGetPrice,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        }
        dispatch(addToCartList({ ...cartItem }));
      });
  };
  const addBtn = (item: any) => {
    if (item?.variant.length !== 0) {
      setOpen(!open);
    } else {
      filterOfferProduct(item);
    }
  };
  return (
    <div className="group rounded-[20px] border hover:shadow-lg overflow-hidden relative">
      {/* out of stock  */}
      {item?.quantity === "0" && (
        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
          <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
            Sold Out
          </p>
        </div>
      )}
      <div className="flex relative justify-center group-hover:overflow-hidden  ">
        <span className="absolute bg-gray-800 text-white z-50 p-2 text-sm rounded-tl-[20px] rounded-br-[20px] top-0 right-[380px] pl-6 bottom-50 w-[80px] left-0">
          New
        </span>

        <img
          src={productImg + item.image[0]}
          alt="Mountain"
          className="block rounded-[20px] p-2 h-auto min-w-[100%] mx-auto mt-auto group-hover:scale-105  transition-all duration-300 ease-linear"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-xl hidden group-hover:flex h-[60px] px-3 left-1/2 -translate-x-1/2 justify-start items-center bg-white lg:cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <AiOutlineEye className="text-3xl" />
        </div>
      </div>
      <Link href={"/product/" + item?.id + "/" + item?.slug}>
        <div className="mt-2">
          <div className="p-5 bg-white ">
            <h6
              className="text-lg font-bold"
              style={{
                height: "30px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "130px",
                textOverflow: "ellipsis",
              }}
            >
              {item?.name}
            </h6>
            <p
              className="text-sm "
              style={{
                height: "30px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                width: "130px",
                textOverflow: "ellipsis",
              }}
            >
              {item?.category}
            </p>
            <Rate rating={item?.rating} />
            <div className="flex justify-between">
              <div className="flex gap-4 xl:gap-4 md:gap-4 lg:gap-4">
                <div className="text-base font-semibold">
                  <BDT />{" "}
                  {camp?.status === "active" ? campPrice : productGetPrice}
                </div>
                <div className="line-through ">
                  {camp?.status !== "active" &&
                  (item.discount_type === "no_discount" ||
                    item.discount_price === "0.00") ? (
                    " "
                  ) : (
                    <p>
                      {" "}
                      <BDT price={Math.trunc(item.regular_price)} />
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* show unit range in card bottom */}
            <div>
              {item?.variant?.length > 0 &&
                (() => {
                  const volumes = item.variant.map((v: any) => v.volume);
                  const minVolume = Math.min(...volumes);
                  const maxVolume = Math.max(...volumes);

                  return minVolume === 0 && maxVolume === 0 ? null : (
                    <div className="">
                      <p>
                        <b>Unit:</b> {minVolume} - {maxVolume}{" "}
                        {item.variant[0]?.unit}
                      </p>
                    </div>
                  );
                })()}
            </div>
          </div>
        </div>
      </Link>
      <div className="py-6 flex justify-center">
        <div
          className="rounded-lg py-2 px-6 lg:cursor-pointer w-[320px] font-bold flex gap-4 justify-center item-center"
          onClick={() => addBtn(item)}
          style={{
            background: design?.header_color,
            color: design?.text_color,
          }}
        >
          {" "}
          <AiOutlineShoppingCart className="mt-1 ml-2 xl:ml-0  text-base" /> Add
          To Cart{" "}
        </div>
      </div>

      <QuikView open={open} setOpen={setOpen}>
        <Details
          item={item}
          updateData={{
            product_id: item?.id,
            slug: item.slug,
            store_id,
          }}
        />
      </QuikView>
    </div>
  );
};

export default Card19;
