"use client";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Taka from "@/utils/taka";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/three/details";
import QuikView from "../quick-view";

const Card16 = ({ item }: any) => {
  const [open, setOpen] = useState(false);
  const [camp, setCamp] = useState<any>(null);

  const { design, makeid, store_id } = useTheme();
  const dispatch = useDispatch();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const styleCss = `
  .search-hover:hover {
      color:  ${textColor};
      background: ${bgColor};
  }
  .cart:hover {
      color:  ${bgColor};
  }


}
`;
  const price = getPrice(
    item.regular_price,
    item.discount_price,
    item.discount_type
  );
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
      setOpen(!open);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="max-w-sm rounded overflow-hidden shadow-xl group relative border border-transparent "
      >
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1]">
              <p className="bg-red-600 text-white px-2 py-1 w-max absolute right-0">
                Out of Stock
              </p>
            </div>
          </Link>
        )}

        <style>{styleCss}</style>
        <div
          className="search-hover absolute top-[35%] lg:cursor-pointer left-[50%] translate-x-[-50%] h-12 w-12 bg-white rounded-full duration-5000 hidden lg:group-hover:block"
          onClick={() => setOpen(!open)}
        >
          <AiOutlineSearch className="text-xl mt-4 ml-[14px]" />
        </div>
        <div>
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <img
              className="min-w-full h-auto"
              src={productImg + item?.image[0]}
              alt="productImage"
            />
          </Link>
          <div className="py-6 px-3 space-y-2">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <h3 className=" cart font-sans text-sm text-gray-800 font-bold antialiased whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                {item?.name}
              </h3>
            </Link>
            <div className="antialiased mb-2 lg:group-hover:hidden flex items-center gap-2">
              <Taka
                tk={camp?.status === "active" ? campPrice : productGetPrice}
              />
              <h1 className="line-through sm:text-sm text-xs">
                {camp?.status !== "active" &&
                (item.discount_type === "no_discount" ||
                  item.discount_price === "0.00") ? (
                  " "
                ) : (
                  <p>
                    {" "}
                    <Taka /> {Math.trunc(item.regular_price)}
                  </p>
                )}
              </h1>
            </div>
            <div className="duration-5000 cart mb-2 lg:hidden lg:group-hover:flex flex flex-row flex-wrap justify-between sm:gap-0 gap-2">
              <div
                className="flex gap-1 items-center border-b-2 border-black lg:cursor-pointer w-max"
                onClick={add_cart_item}
              >
                <BsPlusLg className="text-xs " />
                <p className="text-xs font-medium">ADD TO CART</p>
              </div>
              <Rate rating={item?.rating} />
            </div>
          </div>
        </div>
      </motion.div>
      <QuikView open={open} setOpen={setOpen}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card16;
