"use client";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Link from "next/link";
import { useEffect, useState } from "react";
import QuikView from "../quick-view";
import Details from "../product-quick-view-details/details";
import { HiOutlineDocumentText } from "react-icons/hi";
import { toast } from "react-toastify";
import httpReq from "@/utils/http/axios/http.service";
import useTheme from "@/hooks/use-theme";
import { useDispatch } from "react-redux";
import { addToCartList } from "@/redux/features/product.slice";

const Card71 = ({ item, design, store_id }: any) => {
  const { makeid } = useTheme();
  const [camp, setCamp] = useState<any>(null);
  const [view, setView] = useState(false);
  const dispatch = useDispatch();
  const bgColor = design?.header_color;
  const textColor = design?.text_color;

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
    .text-color {
        color:  ${design?.header_color};
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
    <div className="bg-white h-[400px] lg:h-[650px] relative group">
      <div className="">
        <style>{styleCss}</style>
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="relative shine overflow-hidden hover:rotate-1 hover:shadow-2xl duration-[2000ms] ease-in rounded-md">
            <img
              src={productImg + item.image[0]}
              alt=""
              className="h-auto min-w-full object-center object-cover group-hover:scale-110 duration-1000"
            />
            <div className="absolute bottom-3 right-3 bg-color text-white z-[2] px-4 py-1 rounded-lg text-sm">
              {item?.quantity === "0" ? "Out of stock" : "Sale"}
            </div>
          </div>
        </Link>

        <div className="text-gray-700 text-base py-3">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            {" "}
            <h1 className="text-sm sm:text-[15px] capitalize truncate">
              {item?.name}
            </h1>
          </Link>
          <Link href={"/category/" + item?.category}>
            <h1 className="text-sm sm:text-[15px] capitalize truncate">
              {item?.category}
            </h1>{" "}
          </Link>
        </div>

        <div className="font-semibold flex items-center gap-2 w-full">
          {camp?.status !== "active" &&
          (item.discount_type === "no_discount" ||
            item.discount_price === "0.00") ? (
            " "
          ) : (
            <div className="line-through text-gray-500 text-xs ">
              <p>
                {" "}
                <BDT price={Math.trunc(item.regular_price)} />
              </p>
            </div>
          )}
          {item?.regular_price !== "0" && (
            <p className="text-sm text-red-500">
              <BDT
                price={camp?.status === "active" ? campPrice : productGetPrice}
              />
            </p>
          )}
        </div>

        {item?.variant.length !== 0 ? (
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="flex text-color text-center py-3 border hover:border-2 border-gray-700 mt-3 rounded-md justify-center gap-1 items-center relative z-[1] lg:cursor-pointer">
              <HiOutlineDocumentText className="text-lg" />
              <p className="text-sm">View Details</p>
            </div>
          </Link>
        ) : (
          <div>
            <div
              onClick={add_cart_item}
              className="flex text-color text-center py-3 border hover:border-2 border-gray-700 mt-3 rounded-md justify-center gap-1 items-center relative z-[1] lg:cursor-pointer"
            >
              Add To Cart
            </div>
          </div>
        )}
      </div>
      <QuikView open={view} setOpen={setView}>
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

export default Card71;
