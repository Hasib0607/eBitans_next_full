"use client";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/three/details";
import QuikView from "../quick-view";

const Card49 = ({ item }: any) => {
  const { design, makeid, store_id } = useTheme();

  const [view, setView] = useState(false);
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
        const response = await getCampaignProduct(item, store_id);
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
    .text-color {
        color: ${design?.header_color};
      }
    .text-hover:hover {
        color: ${design?.header_color};
      }
    .bg-color {
        color:  ${design?.text_color};
        background: ${design.header_color};
    }
  `;

  const price = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );

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

    httpReq.post("get/offer/product", productDetails).then((res) => {
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
          price: price,
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
    <div className="group relative border border-gray-100">
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
      <style>{styleCss}</style>
      <Link href={"/product/" + item?.id + "/" + item?.slug}>
        <div className="relative overflow-hidden">
          <img
            src={productImg + item.image[0]}
            alt=""
            className="h-auto min-w-full"
          />
        </div>
      </Link>

      <div className="flex flex-col items-center gap-5 px-4 py-5">
        <div className="text-gray-700 font-bold text-center">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            {" "}
            <h1 className="text-hover capitalize group-hover:underline whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
              {item?.name}
            </h1>
          </Link>
        </div>

        <div className="text-gray-600 font-semibold flex justify-center items-center gap-2 w-full ">
          <p className="text-color text-sm">
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
                {" "}
                <BDT price={Math.trunc(item.regular_price)} />
              </p>
            )}
          </h1>
        </div>
        <div
          onClick={add_cart_item}
          className="lg:cursor-pointer  border p-2 duration-300 absolute top-2 right-2 bg-white"
        >
          <MdAddShoppingCart className="text-2xl" />
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card49;
