"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import Loading from "./loading";
import { btnhover } from "@/site-settings/style";

export const cls =
  "py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12";

const RegisterEleven = () => {
  const { headerSetting, store_id, store } = useTheme();

  const [loading, setLoading] = useState(false);
  const [userOne, setUserOne] = useState<any>(null);
  const [show, setShow] = useState(false);

  window.localStorage.setItem("MY_USER_ONE", userOne);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    window.localStorage.setItem("authType", data?.email || data?.phone);
    setLoading(true);
    if (store?.auth_type === "phone" || store?.auth_type === "EasyOrder") {
      httpReq
        .post("/userinfo", { ...data, store_id })
        .then((res) => {
          setUserOne(res.token);
          if (res.message) {
            window.location.replace("/verify-otp");
          }
        })
        .catch((error) => {
          // toast(error.response.data.message, { type: "error" });
          setLoading(false);
        });
    } else {
      httpReq
        .post("/user-registration-email", { ...data, store_id })
        .then((res) => {
          // console.log(res,"res")
          setUserOne(res.token);
          if (res.message) {
            window.location.replace("/verify-otp");
          }
        })
        .catch((error) => {
          // console.log(error,"error");
          // toast(error.response.data.message, { type: "error" });
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="max-w-[525px] mx-auto text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px]">
                <div className="mb-10 md:mb-16 text-center">
                  <Link
                    href="/"
                    className="inline-block max-w-[160px]  mx-auto"
                  >
                    {headerSetting?.logo === null ? (
                      <Link href="/">
                        <p className="text-xl uppercase">
                          {headerSetting?.website_name}
                        </p>
                      </Link>
                    ) : (
                      <Link href="/">
                        <img
                          className="h-auto min-w-full overflow-hidden"
                          src={imgUrl + headerSetting.logo}
                          alt="logo"
                        />
                      </Link>
                    )}
                  </Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* <div className="flex justify-start flex-col items-start mb-6">
                                        <label for="email" className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer">Phone</label>
                                        <input
                                            autoComplete='tel'
                                            type="Number"
                                            {...register("phone", { required: true })}
                                            className={"py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"}
                                        />
                                    </div> */}
                  {(store?.auth_type === "phone" ||
                    store?.auth_type === "EasyOrder") && (
                    <div className="mb-6 text-left">
                      <label
                        htmlFor="email"
                        className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
                      >
                        Phone
                      </label>
                      <input
                        autoComplete="tel"
                        type="Number"
                        {...register("phone", { required: true })}
                        className={cls}
                      />
                    </div>
                  )}
                  {store?.auth_type === "email" && (
                    <div className="mb-6 text-left">
                      <label
                        htmlFor="email"
                        className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
                      >
                        Email
                      </label>
                      <input
                        autoComplete="email"
                        type="Email"
                        {...register("email", { required: true })}
                        className={cls}
                      />
                    </div>
                  )}
                  {store?.auth_type === "email" && (
                    <div className="mb-6 text-left">
                      <label
                        htmlFor="email"
                        className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          autoComplete="new-password"
                          type={`${show ? "text" : "password"}`}
                          {...register("password", { required: true })}
                          className={cls}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-[2] lg:cursor-pointer">
                          {show ? (
                            <BsEye onClick={() => setShow(!show)} />
                          ) : (
                            <BsEyeSlash onClick={() => setShow(!show)} />
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb-10">
                    {loading ? (
                      <Loading />
                    ) : (
                      <input
                        type="submit"
                        value="Register"
                        className={`w-full rounded-md font-semibold tracking-wider py-3 px-5 bg-black text-base text-white lg:cursor-pointer hover:bg-opacity-90 transition ${btnhover}`}
                      />
                    )}
                  </div>
                </form>

                <p className="text-base font-medium text-[#5A5A5A]">
                  Already have an account?
                  <Link
                    href="/login"
                    className="text-primary underline font-sans font-bold text-black pl-1"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterEleven;
