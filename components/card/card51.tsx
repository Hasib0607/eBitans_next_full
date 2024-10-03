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
import { FaCartPlus } from "react-icons/fa";
import { TbLiveView } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Details from "../_product-details-page/product-details/three/details";
import QuikView from "../quick-view";

const Card51 = ({ item }: any) => {
  const { design, makeid, store_id } = useTheme();
  const [camp, setCamp] = useState<any>(null);
  const [id, setId] = useState(0);
  const [view, setView] = useState(false);

  const dispatch = useDispatch();

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  // const [id, setId] = useState(0)

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

  const add_cart_item = () => {
    if (item?.variant.length !== 0) {
      setView(!view);
    } else {
      filterOfferProduct(item);
    }
  };

  return (
    <div className="">
      <div className="group relative">
        <style>{styleCss}</style>

        <div className="relative overflow-hidden w-full image-div rounded-2xl">
          <img
            src={productImg + item.image[id]}
            alt=""
            className="h-auto min-w-full hover:scale-110 transform transition duration-[2000ms] ease-linear"
          />

          <div className="flex flex-wrap justify-around text-sm w-full lg:absolute lg:group-hover:bottom-2 lg:-bottom-20 lg:opacity-0 lg:group-hover:opacity-100 duration-500 z-[1] mt-2 lg:mt-0">
            <div
              onClick={add_cart_item}
              className="bg-black text-white px-2 py-1 rounded-full flex gap-1 items-center lg:cursor-pointer"
            >
              <FaCartPlus />
              <p className="">
                {store_id === 1187 ? "অর্ডার করুন" : "Add to Cart"}
              </p>
            </div>
            <div
              onClick={() => setView(!view)}
              className="bg-white text-black px-2 py-1 rounded-full flex gap-1 items-center lg:cursor-pointer"
            >
              <TbLiveView />
              <p>Quick View</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-4 py-3">
          <div className="flex flex-wrap gap-x-3">
            {item?.image?.map((data: any, index: any) => (
              <div key={index}>
                {item.image.length > 1 ? (
                  <button
                    onClick={() => setId(index)}
                    className={`${
                      id === index
                        ? "bg-color h-4 w-4 "
                        : "bg-gray-200 h-3 w-3 "
                    } ring-1 ring-offset-1 ring-gray-800 rounded-full `}
                  ></button>
                ) : (
                  " "
                )}
              </div>
            ))}
          </div>
          <div className="text-gray-800 text-lg font-bold">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              {" "}
              <h1 className="text-hover capitalize whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                {item?.name}
              </h1>{" "}
            </Link>
          </div>

          <div className="text-gray-600 font-semibold flex justify-between items-center gap-2 w-full ">
            <div className="flex items-center gap-2">
              <p className="text-color-price text-sm px-2 py-1 rounded-lg">
                <BDT
                  price={
                    camp?.status === "active" ? campPrice : productGetPrice
                  }
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
            <div>
              <Rate rating={item?.rating} />
            </div>
          </div>
        </div>
      </div>
      <QuikView open={view} setOpen={setView}>
        <Details data={{ product_id: item?.id }} />
      </QuikView>
    </div>
  );
};

export default Card51;
