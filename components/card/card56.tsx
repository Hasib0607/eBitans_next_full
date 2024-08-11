"use client";
import useTheme from "@/hooks/use-theme";
import { addToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Rate from "@/utils/rate";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/eight/details";
import QuikView from "../quick-view";

const Card56 = ({ item }: any) => {
  const { design, makeid, store_id } = useTheme();
  const [camp, setCamp] = useState<any>(null);

  const dispatch = useDispatch();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  // console.log(item?.quantity, "item?.quantity")
  // const [id, setId] = useState(0)
  const [view, setView] = useState(false);

  const secondImg = item?.image[1] ? item?.image[1] : item?.image[0];

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
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design.header_color};
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-btn {
        color:  ${textColor};
        background: ${bgColor};
        border: 1px solid ${bgColor};
    }
    .cart-btn:hover {
        color:  ${bgColor};
        background: transparent;
        border: 1px solid ${bgColor};
    }
    .cart-hover-fs:hover {
        color:  ${textColor};
        background: ${bgColor};
        border: 1px solid ${bgColor};
    }
  `;

  const price = getPrice(
    item?.regular_price,
    item?.discount_price,
    item?.discount_type
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
    <div className={`${store_id !== 5184 && "group"} `}>
      <div className="relative overflow-hidden border group-hover:border-white group-hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-md duration-500">
        {item?.quantity === "0" && (
          <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-20 z-[1] text-white">
            <p className="text-right mt-2 mr-2 text-red-500 font-bold">
              Out of Stock
            </p>
          </div>
        )}
        <style>{styleCss}</style>
        <div className="px-2 sm:px-4 py-5 w-full">
          <Link href={"/category/" + item?.category_id}>
            <p className="text-gray-600 text-sm text-hover">{item?.category}</p>
          </Link>
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            <h1 className="text-hover font-thin capitalize truncate">
              {item?.name}
            </h1>
          </Link>
          <Link href={"/brand/" + item?.brand_id}>
            <h1 className="text-hover font-thin capitalize truncate text-xs">
              {item?.brand_name}
            </h1>
          </Link>
        </div>

        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="relative overflow-hidden mx-2 sm:mx-4">
            <img
              src={productImg + item?.image[0]}
              alt=""
              className="h-auto min-w-full object-center object-cover group-hover:hidden block border-b"
            />
            <img
              src={productImg + secondImg}
              alt=""
              className="h-auto min-w-full object-center object-cover group-hover:block hidden border-b"
            />
          </div>
        </Link>

        <div className="flex justify-between items-center gap-1 px-2 sm:px-4 relative overflow-hidden">
          <div className="flex flex-col py-3 duration-500 group-hover:-translate-y-32 w-full">
            <div className="flex gap-x-1 items-center">
              <div>
                <Rate rating={item?.rating} />
              </div>
              <div className="text-gray-500 sm:text-sm text-xs">
                ({item?.number_rating})
              </div>
            </div>

            <div className="text-gray-600 flex flex-wrap items-center gap-1 sm:gap-2 w-full">
              <p className="text-color text-lg">
                <BDT
                  price={
                    camp?.status === "active" ? campPrice : productGetPrice
                  }
                />
              </p>
              <h1 className="line-through text-xs ">
                {camp?.status !== "active" &&
                (item?.discount_type === "no_discount" ||
                  item?.discount_price === "0.00") ? (
                  " "
                ) : (
                  <p>
                    {" "}
                    <BDT price={Math.trunc(item?.regular_price)} />
                  </p>
                )}
              </h1>
            </div>

            {store_id === 5184 && (
              <div
                onClick={add_cart_item}
                className="lg:cursor-pointer w-full text-center cart-btn py-1 rounded"
              >
                <button className="">Add to bag</button>
              </div>
            )}
          </div>

          <div
            onClick={() => setView(!view)}
            className="absolute hover:border hover:border-gray-600  hover:rounded-full hover:touch-pinch-zoom  left-6 group-hover:bottom-6 -bottom-10 duration-500 lg:cursor-pointer"
          >
            <BsEye className="text-xl text-center text-hover" />
          </div>

          {store_id !== 5184 && (
            <div
              onClick={add_cart_item}
              className="lg:cursor-pointer hover:border hover:border-gray-600 hover:p-1 hover:rounded-full hover:touch-pinch-zoom  border p-2 cart-hover-fs duration-300"
            >
              <MdAddShoppingCart className="text-2xl" />
            </div>
          )}
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card56;
