"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import Link from "next/link";

const RegisterFive = () => {
  const { store_id, store } = useTheme();

  const [loading, setLoading] = useState(false);
  const [userOne, setUserOne] = useState<any>(null);
  const [show, setShow] = useState(false);

  window.localStorage.setItem("MY_USER_ONE", userOne);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  //   useEffect(() => {
  //     dispatch(clearMessage());
  //   }, [dispatch]);

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
          //   toast(error.response.data.message, { type: "error" });
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
          //   toast(error.response.data.message, { type: "error" });
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <section className=" py-20 px-4">
        <div className="container">
          <h3 className="text-2xl text-center mb-4 font-bold text-[#423b3b]">
            {" "}
            Create an account
          </h3>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="max-w-[560px] mx-auto text-center bg-white relative overflow-hidden  py-6 px-6 sm:px-8 md:px-[60px] drop-shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {(store?.auth_type === "phone" ||
                    store?.auth_type === "EasyOrder") && (
                    <div className="mb-6">
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-left"
                      >
                        Phone:
                      </label>
                      <input
                        autoComplete="tel"
                        type="Number"
                        placeholder="Phone"
                        {...register("phone", { required: true })}
                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
                      />
                    </div>
                  )}
                  {store?.auth_type === "email" && (
                    <div className="mb-6">
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-left"
                      >
                        Email:
                      </label>
                      <input
                        autoComplete="email"
                        type="Email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
                      />
                    </div>
                  )}
                  {store?.auth_type === "email" && (
                    <div className="mb-6">
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-left"
                      >
                        Password:
                      </label>
                      <div className="relative">
                        <input
                          autoComplete="new-password"
                          type={`${show ? "text" : "password"}`}
                          placeholder="Password"
                          {...register("password", { required: true })}
                          className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
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

                  <div className="my-3 flex justify-center">
                    {loading ? (
                      <p className="font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-orange-500 transition-all duration-500 ease-linear lg:cursor-pointer w-max">
                        Loading
                      </p>
                    ) : (
                      <input
                        type="submit"
                        value="sign-up"
                        className="font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-orange-500 transition-all duration-500 ease-linear lg:cursor-pointer"
                      />
                    )}
                  </div>
                </form>
                <div className="h-[1px] w-full bg-gray-300 mb-2"></div>
                <p className="text-base text-[#423b3b]">
                  <Link href="/login" className="hover:underline">
                    Already have an account?{" "}
                    <span className="font-bold">Log in </span>
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

export default RegisterFive;
