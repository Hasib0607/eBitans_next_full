"use client";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Taka from "@/utils/taka";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/eight/details";
import QuikView from "../quick-view";

const Card6 = ({ item }: any) => {
  const { design, makeid, store_id } = useTheme();
  const [view, setView] = useState(false);
  const [camp, setCamp] = useState<any>(null);

  const dispatch = useDispatch();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const styleCss = `
    .text-hover:hover {
      color:  ${bgColor};
  }
  .search-icon:hover {
    color:${textColor};
    background:${bgColor};
  }
  .card-border-6:hover {
    border: 1px solid ${bgColor};
  }

 
    `;

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

    httpReq.post("get/offer/product", productDetails).then((res: any) => {
      if (!res?.error) {
        let itemRegularPrice = getPrice(
          item?.regular_price,
          item?.discount_price,
          item?.discount_type
        );
        let campaignPrice = getPrice(
          itemRegularPrice,
          res?.discount_amount,
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
    console.log("hello cart");
    if (item?.variant.length !== 0) {
      setView(!view);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <div className="flex border border-gray-100 card-border-6 w-full relative group">
      <style>{styleCss}</style>
      <div className="p-4">
        <div className="relative">
          <img
            className="max-h-60 w-auto"
            src={productImg + item?.image[0]}
            alt=""
          />
          <p className="absolute top-2 left-2 bg-black py-1 px-2 rounded-md text-xs text-white sm:block hidden">
            NEW
          </p>
          <div
            onClick={() => setView(!view)}
            className="bg-white hidden border border-gray-300 rounded-full h-10 w-10 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] group-hover:flex  items-center justify-center search-icon font-thin lg:cursor-pointer"
          >
            <IoSearchCircleOutline className=" h-4" />
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 col-span-2 lg2:col-span-3">
        <p className="text-sm text-gray-400 uppercase menu-hover">
          {item.category}
        </p>
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <h1 className="text-md text-hover font-bold text-gray-700 menu-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
            {item?.name}
          </h1>
        </Link>
        <div className="flex flex-col">
          <div className="flex gap-x-1">
            <div>
              <Rate rating={item?.rating} />
            </div>
            <div className="text-gray-500 sm:text-sm text-xs">
              ({item?.number_rating})
            </div>
          </div>
          <div className="text-xl text-gray-500 flex items-center gap-2">
            <Taka
              tk={camp?.status === "active" ? campPrice : productGetPrice}
            />
            {camp?.status !== "active" &&
            (item.discount_type === "no_discount" ||
              item.discount_price === "0.00") ? (
              " "
            ) : (
              <p className="line-through text-sm">
                {" "}
                <Taka tk={Math.trunc(item.regular_price)} />
              </p>
            )}
          </div>
        </div>
        <div>
          <p
            onClick={add_cart_item}
            className="lg:cursor-pointer w-max text-hover text-sm font-bold text-gray-700 border-b-2 pb-1 border-black border-color menu-hover border-hover-bottom"
          >
            {store_id === 2669 ? "Buy Now" : "ADD TO CART"}
          </p>
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card6;
