import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdContactPhone } from "react-icons/md";
import { bannerImg } from "@/site-settings/siteUrl";

const PromoTen = ({ banner }: any) => {
  return (
    <div className="bg-white sm:container px-5 sm:py-10 py-5">
      {/* banner for details  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg2:grid-cols-4 gap-5 pt-16 pb-24 lg2:flex justify-between">
        <div className="flex items-center gap-3">
          <div>
            <FaShippingFast className="text-3xl" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-gray-700">Free Shipping</h1>
            <p className="text-sm text-gray-500">On all orders over $75.00</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <GiReturnArrow className="text-3xl" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-gray-700">Free Returns</h1>
            <p className="text-sm text-gray-500">
              Returns are free within 9 days{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <RiSecurePaymentFill className="text-3xl" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-gray-700">
              100% Payment Secure
            </h1>
            <p className="text-sm text-gray-500">
              Your payment are safe with us.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <MdContactPhone className="text-3xl" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-gray-700">Support 24/7</h1>
            <p className="text-sm text-gray-500">Contact us 24 hours a day</p>
          </div>
        </div>
      </div>

      {/* banner image start  */}
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="basis-1/2">
          {banner.slice(0, 1).map((ban: any) => (
            <div key={ban.id} className="relative overflow-hidden ">
              <a href={ban?.link} target="_blank" rel="noopener noreferrer">
                <img
                  alt="gallery"
                  className="w-full xl:h-[520px] lg:h-[450px] h-auto hover:scale-105 lg:cursor-pointer ease-in-out duration-700"
                  src={bannerImg + ban.image}
                />
              </a>
            </div>
          ))}
        </div>
        <div className="basis-1/2">
          {banner.slice(1, 3).map((ban: any) => (
            <div
              key={ban.id}
              className="relative overflow-hidden flex flex-col mb-[30px]"
            >
              <a href={ban?.link} target="_blank" rel="noopener noreferrer">
                <img
                  alt="gallery"
                  className="w-full xl:h-[245px] lg:h-[210px] h-auto hover:scale-105 lg:cursor-pointer ease-in-out duration-700"
                  src={bannerImg + ban.image}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoTen;
