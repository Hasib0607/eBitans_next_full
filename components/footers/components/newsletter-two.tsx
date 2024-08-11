"use client";
import httpReq from "@/utils/http/axios/http.service";
import React, { useRef } from "react";

const NewsletterTwo = ({ store_id }: any) => {
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
      <div className="">
        <div className="">
          <div className="py-5">
            <p className="text-gray-500">
              Sign up for our e-mail to get latest news.
            </p>
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit} className="flex relative">
              <input
                ref={emailRef}
                type="email"
                className="w-full rounded-full border-gray-200 opacity-100 outline-none focus:outline-none focus:border-none focus:ring-1 focus:ring-black text-black"
                placeholder="Write your email here"
                required
              />
              <button
                type="submit"
                className="px-3 h-[41px] hover:opacity-80 bg-black text-white text-sm rounded-r-full absolute right-0 top-0"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterTwo;
