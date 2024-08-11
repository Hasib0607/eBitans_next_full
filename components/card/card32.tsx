"use client";
import Details from "@/components/_product-details-page/product-details/three/details";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { GiShoppingBag } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import QuikView from "../quick-view";

const Card32 = ({ item }: any) => {
  const { design, makeid, store_id } = useTheme();
  const [camp, setCamp] = useState<any>(null);

  const dispatch = useDispatch();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const [id, setId] = useState(0);
  const [view, setView] = useState(false);

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

  const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color:  ${design?.header_color};
    }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-color {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color};
       
    }
  `;

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

    httpReq.post("get/offer/product", productDetails).then((res: any) => {
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
          cartId: makeid(100),
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
          cartId: makeid(100),
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

  const add_cart_item = () => {
    if (item?.variant.length !== 0) {
      setView(!view);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <div className="relative">
      {/* out of stock  */}
      {item?.quantity === "0" && (
        <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[2]">
          <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
            Sold Out
          </p>
        </div>
      )}
      <div className="group grid md:grid-cols-3 grid-cols-1 md:gap-8 pb-10 pt-6">
        <style>{styleCss}</style>

        <div className="relative overflow-hidden col-span-1">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <img
              src={productImg + item?.image[id]}
              alt=""
              className="max-h-[600px] md:h-auto min-w-full"
            />
          </Link>

          {item.discount_type === "no_discount" ||
          item.discount_price === "0.00" ? (
            ""
          ) : (
            <div className="absolute text-xs px-2 py-1 bg-color text-white top-2 right-2 ">
              <p>
                - {item.discount_type === "fixed" ? "BDT" : ""}{" "}
                {Math.trunc(item?.discount_price)}{" "}
                {item?.discount_type === "percent" ? "%" : ""}
              </p>
            </div>
          )}
        </div>

        <div className="col-span-2 flex flex-col gap-4 pt-6 md:pt-0">
          <div className="text-gray-700 text-xl font-medium">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              {" "}
              <h1 className="capitalize text-hover whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                {item?.name}
              </h1>
            </Link>
          </div>

          <div className="text-gray-600  font-semibold flex items-center gap-2 w-full ">
            <p className="text-gray-500 text-sm">
              {" "}
              <BDT
                price={camp?.status === "active" ? campPrice : productGetPrice}
              />
            </p>
            <h1 className="line-through text-xs ">
              {camp?.status !== "active" &&
              (item.discount_type === "no_discount" ||
                item.discount_price === "0.00") ? (
                " "
              ) : (
                <p>
                  <BDT price={Math.trunc(item.regular_price)} />
                </p>
              )}
            </h1>
          </div>

          <div className="flex gap-3">
            {item?.image?.map((data: any, index: any) => (
              <div key={index}>
                {item.image.length > 1 ? (
                  <button
                    onClick={() => setId(index)}
                    className={`${
                      id === index ? "bg-blue-600" : "bg-gray-200"
                    } h-3 w-3 rounded-full `}
                  ></button>
                ) : (
                  " "
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-5 items-center">
            <div
              onClick={() => setView(!view)}
              className="w-max lg:cursor-pointer bg-white searchHover py-3 px-3 drop-shadow-2xl"
            >
              <BiSearch className="text-2xl text-center" />
            </div>
            <div
              onClick={add_cart_item}
              className="w-max lg:cursor-pointer bg-white searchHover py-3 px-3 drop-shadow-2xl"
            >
              <GiShoppingBag className="text-2xl text-center" />
            </div>
          </div>
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>

      <hr />
    </div>
  );
};

export default Card32;
