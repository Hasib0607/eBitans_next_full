"use client";
import { useEffect, useState } from "react";
// Import Swiper styles
import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";
import BDT from "@/utils/bdt";
import { getPrice } from "@/utils/get-price";
import { getCampaignProduct } from "@/utils/http/get-campaign-product";
import Link from "next/link";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Card69 = ({ item }: any) => {
  const { design, store_id } = useTheme();
  const [camp, setCamp] = useState<any>(null);

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

  const nextEl = "card-slider-next";
  const prevEl = "card-slider-prev";

  const styleCss = `
    .searchHover:hover {
        color:  ${textColor};
        background: ${bgColor};
    }
    .text-color {
        color:  ${design?.header_color};
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
        background: transparent;
        border: 1px solid ${bgColor};
    }
  `;

  return (
    <div className="bg-white relative group">
      <div className="">
        <style>{styleCss}</style>
        <Link href={"/product/" + item?.id + "/" + item?.slug}>
          <div className="relative overflow-hidden">
            <img
              src={productImg + item.image[0]}
              alt=""
              className="h-auto min-w-full object-center object-cover"
            />
          </div>
        </Link>
        <Swiper
          loop={item?.image?.length > 1 ? true : false}
          navigation={{
            prevEl: `.${prevEl}`,
            nextEl: `.${nextEl}`,
          }}
          modules={[Navigation]}
          className="mySwiper relative"
        >
          {item?.image?.map((s: any, id: any) => (
            <SwiperSlide key={id}>
              <div className="">
                <Link href={"/product/" + item?.id + "/" + item?.slug}>
                  {" "}
                  <img
                    className="h-auto min-w-full"
                    src={productImg + s}
                    alt=""
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <div className="w-full group-hover:opacity-100 opacity-0">
            <div
              className={`${prevEl} lg:cursor-pointer flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-0 z-[2]`}
            >
              <MdKeyboardArrowLeft className="text-3xl" />
            </div>
            <div
              className={`${nextEl} lg:cursor-pointer flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-0 z-[2]`}
            >
              <MdOutlineKeyboardArrowRight className="text-3xl" />
            </div>
          </div>
        </Swiper>

        <div className="text-gray-700 text-base py-1">
          <Link href={"/product/" + item?.id + "/" + item?.slug}>
            {" "}
            <h1 className="text-sm sm:text-[15px] capitalize truncate">
              {item?.name}
            </h1>
          </Link>
          {/* <NavLink to={'/category/' + item?.category} ><h1 className='text-sm sm:text-[15px] capitalize truncate'>{item?.category}</h1>  </NavLink> */}
        </div>

        <div className="flex items-center gap-2 w-full">
          {camp?.status !== "active" &&
          (item.discount_type === "no_discount" ||
            item.discount_price === "0.00") ? (
            " "
          ) : (
            <div className="line-through text-gray-500 text-xs ">
              <p>
                <BDT price={Math.trunc(item.regular_price)} />
              </p>
            </div>
          )}
          {item?.regular_price !== "0" && (
            <p className="text-sm">
              <BDT
                price={camp?.status === "active" ? campPrice : productGetPrice}
              />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card69;
