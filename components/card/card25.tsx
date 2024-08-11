import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/three/details";
import QuikView from "../quick-view";

const Card25 = ({ item }: any) => {
  const { design, makeid, store_id } = useTheme();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const dispatch = useDispatch();
  const [view, setView] = useState(false);
  const [camp, setCamp] = useState<any>(null);

  let productGetPrice = getPrice(
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
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color};
       
    }
  
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
    <div>
      <div className="group border-hover border-[1px] rounded-lg overflow-hidden w-full relative">
        {/* out of stock  */}
        {item?.quantity === "0" && (
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[2]">
              <p className="bg-blue-600 text-white px-2 py-1 w-max absolute right-0 rounded-bl-lg">
                Sold Out
              </p>
            </div>
          </Link>
        )}
        <style>{styleCss}</style>
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="">
            <img
              src={productImg + item.image[0]}
              alt=""
              className="h-auto lg:group-hover:opacity-10 min-w-full"
            />
          </div>
        </Link>

        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="w-full text-gray-500 text-sm sm:text-lg font-medium flex justify-center py-6 lg:group-hover:-translate-y-40 capitalize px-2">
            <h1 className="whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
              {item?.name}
            </h1>
          </div>
        </Link>

        <div className="text-gray-600 text-lg font-semibold flex items-center gap-2 w-full justify-center pb-6 lg:group-hover:-translate-y-10 duration-700 lg:absolute bottom-0 left-[50%] lg:translate-x-[-50%]">
          <h1 className="line-through sm:text-sm text-xs mt-2">
            {camp?.status !== "active" &&
            (item.discount_type === "no_discount" ||
              item.discount_price === "0.00") ? (
              " "
            ) : (
              <p> BDT {Math.trunc(item.regular_price)}</p>
            )}
          </h1>
          <p className="text-color sm:text-base text-sm">
            BDT {camp?.status === "active" ? campPrice : productGetPrice}
          </p>
        </div>

        <div className="relative overflow-hidden h-10 mb-2 mx-[10px] hidden lg:block">
          <div className=" lg:cursor-pointer text-sm group-hover:translate-x-[100%] duration-1000 gap-1 bg-blue-400 text-black px-10 py-2 absolute -left-[100%] bottom-0 h-10 w-full z-[1] "></div>
          <div className=" lg:cursor-pointer text-sm group-hover:translate-x-[100%] duration-200 gap-1 bg-red-400 text-black absolute  bottom-0 -left-[100%] h-10 w-full "></div>
          <div className="searchHover lg:cursor-pointer text-sm group-hover:translate-x-[-100%] duration-200 gap-1 text-center w-full py-2 absolute  -right-[100%] bottom-0 h-10 z-50">
            <p className="font-medium" onClick={add_cart_item}>
              ADD IN CART
            </p>
          </div>
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card25;
