"use client";
import { imgUrl } from "@/site-settings/siteUrl";
import httpReq from "@/utils/http/axios/http.service";
import Link from "next/link";
import React, { useRef } from "react";

const Newsletter = ({ headerSetting, store_id }: any) => {
  const emailRef = useRef<any>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = emailRef.current.value;

    async function fetchData() {
      try {
        const data = await httpReq.post(`news-latter/store`, {
          store_id: store_id,
          email: email,
        });
        if (data?.error) {
          // toast("Your email has already been taken", {
          //   type: "error",
          //   autoClose: 1000,
          // });
        } else {
          // toast("Successfully Subscribe to Our Newsletter", {
          //   type: "success",
          //   autoClose: 1000,
          // });
          emailRef.current.value = "";
        }
      } catch (error) {
        // console.log(error, "error");
      }
    }
    if (email) {
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex lg:justify-around justify-center lg:gap-x-3 px-5 bg-gray-100 rounded-lg py-10 overflow-hidden items-center mb-10 ">
        <div className="flex flex-col gap-4 order-last">
          <div>
            <h1 className="text-center md:text-left md:text-[26px] text-xl font-semibold mb-4 mt-3 text-black">
              Get Expert Tips In Your Inbox
            </h1>
            <p className="text-gray-500 text-center md:text-left md:text-base text-xs">
              Subscribe to our newsletter and stay updated.
            </p>
          </div>
          <div className="text-center">
            <form onSubmit={handleSubmit} className="sm:flex gap-x-2">
              <input
                ref={emailRef}
                type="email"
                className="w-full rounded-lg border-gray-200 opacity-100 outline-none focus:outline-none focus:border-none focus:ring-1 focus:ring-black text-black px-2"
                placeholder="Write your email here"
                required
              />
              <button
                type="submit"
                className="px-5 md:py-2 py-1 mt-3 sm:mt-0 hover:opacity-80 bg-black text-white text-lg md:rounded-lg rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <Link href="/">
          <div>
            {headerSetting?.logo === null ? (
              <p className="text-xl uppercase lg:block hidden">
                {headerSetting?.website_name}
              </p>
            ) : (
              <img
                className="max-h-32 lg:block hidden"
                src={imgUrl + headerSetting?.logo}
                alt="logo"
              />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Newsletter;
