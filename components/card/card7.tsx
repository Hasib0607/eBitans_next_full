"use client";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
// import "./cardCss/Card.css";
import Details from "@/components/_product-details-page/product-details/three/details";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Taka from "@/utils/taka";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoSearchCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import QuikView from "../quick-view";

const Card7 = ({ item }: any) => {
  const [open, setOpen] = useState(false);
  const [camp, setCamp] = useState<any>(null);

  const { design, makeid, store_id } = useTheme();
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
        } else {
          console.error("API Response Error:", response.error);
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    }

    handleCampaign();
  }, [item, store_id]);

  const card7CustomStyle = `       
     .testDiv7{
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius:50%;
        top: 10%;
        left: 50%;
     
    }
    .testDiv7:hover{
        background-color:${design?.header_color};
        display: block;
    }
    .testShoppingBagDiv7{
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius:50%;
        top: 10%;
        right: 50%;
    }
    .testShoppingBagDiv7:hover{
        background-color:${design?.header_color};
        display: block;
    }
    .card7SearchIcon{
        height: 20px;
        color:${design?.text_color};
        margin-top: 10px;
        margin-left: 10px;
}`;

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
      .post("get/offer/product", productDetails)
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
      })
      .catch((error) => {
        console.error("Error fetching offer product:", error);
      });
  };

  let add_cart_item = (item: any) => {
    if (item?.variant.length !== 0) {
      setOpen(!open);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="bg-white relative rounded-lg"
        style={{ width: "100%" }}
      >
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[1]">
              <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                Sold Out
              </p>
            </div>
          </Link>
        )}

        <style>{card7CustomStyle}</style>
        <div className="w-full card7Hover block relative rounded overflow-hidden">
          <img
            className="min-w-full h-auto"
            src={productImg + item?.image[0]}
            alt=""
          />
          <div className="w-full absolute -bottom-5 mx-auto px-1 quick7 font-normal text-md pb-2 text-black text-md bg-gray-600 items-center">
            <div className="flex justify-between">
              <div
                className="testShoppingBagDiv7 lg:cursor-pointer"
                onClick={() => add_cart_item(item)}
              >
                <ShoppingBagIcon className="card7SearchIcon" />
              </div>
              <div
                className="testDiv7 lg:cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <IoSearchCircleOutline className="card7SearchIcon" />
              </div>
            </div>
          </div>
        </div>

        <Link href={"/product/" + item?.id + "/" + item?.slug} className="p-5">
          <h5
            className="mb-3 menu-hover font-six font-base text-lg sm:text-base text-gray-500 dark:text-gray-300"
            style={{
              height: "20px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "130px",
              textOverflow: "ellipsis",
            }}
          >
            {item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}
          </h5>
          <div className="font-six font-bold text-gray-700 text-sm flex items-center gap-2">
            <Taka
              tk={camp?.status === "active" ? campPrice : productGetPrice}
            />
            {camp?.status !== "active" &&
            (item.discount_type === "no_discount" ||
              item.discount_price === "0.00") ? (
              " "
            ) : (
              <p className="line-through text-xs">
                {" "}
                <BDT price={item.regular_price} />
              </p>
            )}
          </div>
        </Link>
      </motion.div>
      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </>
  );
};

export default Card7;
