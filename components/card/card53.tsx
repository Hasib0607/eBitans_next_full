"use client";
import { useEffect, useState } from "react";

// import Details from '../../layouts/productDetails/fourteen/Details';

import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Link from "next/link";
import { BsEye } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/eight/details";
import QuikView from "../quick-view";

const Card53 = ({ item }: any) => {
  const { design, store_id, makeid } = useTheme();
  const [camp, setCamp] = useState<any>(null);

  const dispatch = useDispatch();

  const [id, setId] = useState(0);

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  // const [id, setId] = useState(0)
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
    .text-color-price {
        color:  ${design?.header_color};
        border: 2px solid ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design?.header_color};
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn:hover {
        color:  ${bgColor};
        background: white;
        border: 1px solid ${bgColor};
    }
   
    .view-eye:hover .quick-view {
        display: block;
        background: white;
      }
    .image-div:hover .image-hover {
        display: none;
       
      }
    .image-div:hover .image-hover-two {
        display: block;
       
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
        if (res?.discount_amount === null) {
          cartItem = {
            cartId: makeid(100),
            price: itemRegularPrice,
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
            price: campaignPrice,
            color: null,
            size: null,
            additional_price: null,
            volume: null,
            unit: null,
            ...item,
          };
        }
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
    <div className="group pt-5 relative">
      {/* out of stock  */}
      {item?.quantity === "0" && (
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[3]">
            <p className="bg-red-600 text-white px-2 py-1 w-max absolute left-0">
              Sold Out
            </p>
          </div>
        </Link>
      )}
      <div className="relative overflow-hidden duration-500 lg:group-hover:pb-3 pb-3 lg:pb-0 py-0 group-hover:rounded-xl group-hover:0_0_10px_rgba(0,0,0,0.6)]">
        <style>{styleCss}</style>

        <div className="border-r mt-5 relative overflow-hidden">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="relative overflow-hidden ">
              <img
                src={productImg + item.image[0]}
                alt=""
                className="h-auto min-w-full"
              />
              <div className="absolute bg-gray-100 z-[1] group-hover:h-full h-0 w-full left-0 bottom-0 bg-opacity-10 duration-500 "></div>
            </div>
          </Link>
          <div
            onClick={() => setView(!view)}
            className="bg-white text-black px-2 py-1 rounded-sm lg:cursor-pointer absolute top-4 -right-20 duration-500 group-hover:right-4 z-[1]"
          >
            <BsEye />
          </div>

          <div className="flex flex-col gap-2 px-4 py-3">
            <div className="text-gray-800 text-sm font-medium">
              <Link href={"/product/" + item?.id + "/" + item?.slug}>
                {" "}
                <h1 className="text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                  {item?.name}
                </h1>{" "}
              </Link>
            </div>
            <div>
              <Rate rating={item?.rating} />
            </div>
            <div className="text-gray-600 font-semibold flex justify-between items-center gap-2 w-full ">
              <div className="flex items-center gap-2">
                <p className="text-sm py-1 rounded-lg">
                  <BDT
                    price={
                      camp?.status === "active" ? campPrice : productGetPrice
                    }
                  />
                </p>
                <h1 className="line-through text-xs ">
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
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={add_cart_item}
          className="lg:opacity-0 mx-2 lg:group-hover:opacity-100 bg-black text-white flex px-2 py-2 justify-center gap-1 items-center lg:cursor-pointer"
        >
          <FaCartPlus />
          <p className="">Add to Cart</p>
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card53;
