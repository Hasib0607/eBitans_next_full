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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import QuikView from "../quick-view";
import Details from "../product-quick-view-details/details";
import { customizeCards, customizeModalPopup } from "@/utils/customizeDesign";
import useHeaderSettings from "@/utils/query/use-header-settings";
import shape from "@/assets/img/shape.png";
import Taka from "@/utils/taka";

const Card58 = ({ item }: any) => {
  const { design, makeid, store_id } = useTheme();
  const [camp, setCamp] = useState<any>(null);
  const modalPopup = customizeModalPopup.find((item) => item.id == store_id);
  const CardData = customizeCards.find((item) => item.id == store_id);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, error } = useHeaderSettings();

  // const [id, setId] = useState(0)

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

  const {
    button,
    button_color,
    button_bg_color,
    button1,
    button1_color,
    button1_bg_color,
  } =
    data?.custom_design?.best_sell_product?.[0] ||
    data?.custom_design?.product?.[0] ||
    data?.custom_design?.feature_product?.[0] ||
    data?.custom_design?.new_arrival?.[0] ||
    {};

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
    .cart-border:hover {
        border: 2px solid ${bgColor};
    }
    .c58_button {
        color:  ${button_color};
        background: ${button_bg_color};
        border: 2px solid transparent;
    }
    .c58_button:hover {
        color:  ${button_color};
        background: transparent;
        border: 2px solid ${button_color};
    }
    .c58_button1 {
        color:  ${button1_color};
        background: ${button1_bg_color};
        border: 2px solid transparent;
    }
    .c58_button1:hover {
        color:  ${button1_color};
        background: transparent;
        border: 2px solid ${button1_color};
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

  // const add_cart_item = () => {
  //   // if (item?.variant.length !== 0) {
  //   //   setView(!view);
  //   // } else {
  //   filterOfferProduct(item);
  //   // }
  // };
  const buy_now = () => {
    if (modalPopup?.modal_show && item?.variant.length !== 0) {
      setView(!view);
      return;
    }

    if (item?.variant.length !== 0) {
      // setView(!view);
      router.push("/product/" + item?.id + "/" + item?.slug);
    } else {
      filterOfferProduct(item);
      router.push("/checkout");
    }
  };

  const add_cart_item = () => {
    if (modalPopup?.modal_show && item?.variant.length !== 0) {
      setView(!view);
      return;
    }

    if (item?.variant.length !== 0) {
      router.push("/product/" + item?.id + "/" + item?.slug);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <>
      <style>{styleCss}</style>
      <div className="group relative">
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
        <div className="relative overflow-hidden duration-500 border-2 cart-border">
          {item.discount_price === "0.00" ||
          item.discount_type === "no_discount" ? (
            ""
          ) : (
            <>
              <div className="h-10 absolute top-2 right-2 z-[2]">
                <img src={shape.src} alt="" className="h-full" />
                <p className="text-[10px] text-white absolute top-2 left-3 leading-[12px]">
                  {" "}
                  {item.discount_type === "fixed" ? (
                    <>
                      Dis <Taka />{" "}
                    </>
                  ) : (
                    ""
                  )}{" "}
                  {Math.trunc(item.discount_price)}{" "}
                  {item.discount_type === "percent" ? "% off" : ""}
                </p>
              </div>
            </>
          )}
          <style>{styleCss}</style>
          <div className="relative overflow-hidden">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <div className="relative overflow-hidden p-2">
                <img
                  src={productImg + item.image[0]}
                  alt=""
                  className="h-auto min-w-full"
                />
                <div className="absolute bg-gray-100 z-[1] group-hover:h-full h-0 w-full left-0 bottom-0 bg-opacity-10 duration-500 "></div>
              </div>
            </Link>
            <div className="text-gray-600 font-semibold flex justify-center items-center gap-2 w-full ">
              <div className="flex flex-col items-center gap-2">
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
                <p className="text-sm py-1 rounded-lg text-orange-400">
                  <BDT
                    price={
                      camp?.status === "active" ? campPrice : productGetPrice
                    }
                  />
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 px-4 py-1">
              <div className="text-gray-800 text-sm font-medium">
                <Link href={"/product/" + item?.id + "/" + item?.slug}>
                  {" "}
                  <h1 className="text-hover hover:underline capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] px-2">
                    {item?.name}
                  </h1>{" "}
                </Link>
              </div>
              {CardData?.rating_not_show ? (
                " "
              ) : (
                <>
                  <div>
                    <Rate rating={item?.rating} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {!button && !button1 ? (
          <div
            onClick={add_cart_item}
            className="bg-color flex px-2 py-2 justify-center gap-1 items-center lg:cursor-pointer mt-1"
          >
            কার্টে যোগ করুন
          </div>
        ) : (
          <>
            {button && (
              <div
                onClick={buy_now}
                className="c58_button flex px-2 py-2 justify-center gap-1 items-center lg:cursor-pointer"
              >
                {button}
              </div>
            )}
            {button1 && (
              <div
                onClick={add_cart_item}
                className="c58_button1 flex px-2 py-2 justify-center gap-1 items-center lg:cursor-pointer mt-1"
              >
                {button1}
              </div>
            )}
          </>
        )}

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
    </>
  );
};

export default Card58;
