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
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/four/details";
import QuikView from "../quick-view";

const Card59 = ({ item }: any) => {
  const { design, makeid, store_id } = useTheme();
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
    .text-color-thirty {
        color:  ${design?.header_color};
    }
    .text-hover:hover {
        color: ${design?.header_color};
        text-decoration: underline;
      }
    .bg-color {
        color:  ${textColor};
        background: ${bgColor};
    }
    .cart-thirty-three {  
        background: ${bgColor};
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
      .card-overlay-thirty{
        background-color: ${bgColor};
        opacity: 0;
      }
      .overlay-group:hover .card-overlay-thirty{
        background-color: ${bgColor};
        opacity: .5;
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
    <div className="group overlay-group relative px-2 border rounded-xl">
      {/* out of stock  */}
      {item?.quantity === "0" && (
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="absolute rounded-xl top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[3]">
            <p className="bg-red-600 text-white px-2 py-1 w-max absolute left-0">
              Sold Out
            </p>
          </div>
        </Link>
      )}
      <div className="">
        <style>{styleCss}</style>
        <div className="sm:mt-5 relative overflow-hidden">
          <div className="relative overflow-hidden w-full sm:h-[200px] sm:p-5 p-1">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              <img
                src={productImg + item.image[0]}
                alt=""
                className="sm:h-full h-auto w-auto mx-auto"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-2 py-3 px-2">
            <div className="font-medium flex justify-between items-center flex-wrap">
              <Link href={"/product/" + item?.id + "/" + item?.slug}>
                <h1 className="text-gray-700 text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[120px]">
                  {item?.name}
                </h1>
              </Link>
            </div>

            <div className=" font-semibold flex flex-wrap justify-around items-center gap-2 w-full ">
              <div className="flex items-center flex-col gap-2">
                {camp?.status !== "active" &&
                (item.discount_type === "no_discount" ||
                  item.discount_price === "0.00") ? (
                  ""
                ) : (
                  <p className="line-through text-xs text-color-thirty">
                    {" "}
                    <BDT price={Math.trunc(item.regular_price)} />
                  </p>
                )}
                <p className="text-sm py-1 rounded-lg">
                  <BDT
                    price={
                      camp?.status === "active" ? campPrice : productGetPrice
                    }
                  />
                </p>
              </div>
              <div
                onClick={add_cart_item}
                className="relative lg:cursor-pointer"
              >
                <div
                  style={{ color: design?.header_color }}
                  className="flex px-2 py-2 justify-center gap-1 items-center relative z-[1]"
                >
                  <AiOutlineShoppingCart />
                  <p className="text-sm">Add</p>
                </div>
                <div
                  style={{ backgroundColor: design?.header_color }}
                  className="left-0 top-0 opacity-30 w-full h-full rounded-lg absolute "
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* for modal open  */}
      <QuikView open={view} setOpen={setView} design={design}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card59;
