"use client";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Details from "../_product-details-page/product-details/eight/details";
import QuikView from "../quick-view";

const Card17 = ({ item }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { design, store_id } = useTheme();
  const [camp, setCamp] = useState<any>(null);

  const [view, setView] = useState(false);

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

  const add_cart_item = () => {
    if (item?.variant.length !== 0) {
      setView(!view);
    } else {
      filterOfferProduct(item);
      if (store_id === 2680) {
        router.push("/checkout");
      }
    }
  };

  return (
    <div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="rounded overflow-hidden shadow-sm group relative border border-transparent"
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
        <style>{styleCss}</style>

        <div className="relative">
          <img
            className="min-w-full h-auto"
            src={productImg + item?.image[0]}
            alt="Mountain"
          />
          <div
            className="search-hover absolute bottom-3 lg:cursor-pointer right-3 h-12 w-12 bg-white  rounded-full duration-5000 hidden group-hover:block"
            onClick={() => setView(!view)}
          >
            <AiOutlineSearch className="text-xl mt-4 ml-[14px]" />
          </div>
        </div>
        <div className="lg:py-6 py-2 px-3 space-y-2">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <h3 className="capitalize cart font-sans text-sm font-bold antialiased font-twelve text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
              {item?.name}
            </h3>
          </Link>
          <div className="font-twelve text-sm text-gray-600 antialiased mb-2 group-hover:opacity-0 flex items-center gap-2">
            <BDT
              price={camp?.status === "active" ? campPrice : productGetPrice}
            />
            {camp?.status !== "active" &&
            (item.discount_type === "no_discount" ||
              item.discount_price === "0.00") ? (
              " "
            ) : (
              <p className="line-through text-sm">
                {" "}
                <BDT price={item.regular_price} />
              </p>
            )}
          </div>
        </div>
        <div className="font-twelve duration-5000 cart lg:absolute bottom-3 lg:opacity-0 group-hover:opacity-100 duration-500 flex justify-between items-center w-full px-3 flex-wrap gap-y-2">
          <div
            onClick={add_cart_item}
            className="flex gap-1 items-center  border-b-2 border-black lg:cursor-pointer"
          >
            <BsPlusLg className="text-xs " />
            <p className="text-sm font-twelve font-medium">
              {store_id === 2680 ? "Order Now" : "Add To Cart"}
            </p>
          </div>
          <Rate rating={item?.rating} className="font-twelve" />
        </div>
      </motion.div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card17;
