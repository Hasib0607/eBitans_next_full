"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { EyeDropperIcon, EyeIcon } from "@heroicons/react/24/outline";

const ChangePassword = () => {
  const { store_id } = useTheme();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    if (data.password === data.confirm_password) {
      httpReq
        .post("password-change", {
          store_id,
          ...data,
        })
        .then(({ success }: any) => {
          if (success) {
            toast(success, {
              type: "success",
            });
          }
        });
    } else {
      toast("Please enter correct Password!", {
        type: "error",
      });
    }
  };
  return (
    <div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-3">
            <div className="px-4 sm:px-0">
              <h3 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
                Change Your Password
              </h3>
            </div>
          </div>

          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            className="mt-5 md:mt-0 md:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-5 gap-6">
                    <div className="col-span-3 ">
                      <SinglePassword
                        label={"New Password"}
                        register={register}
                        registerName={"password"}
                      />
                    </div>

                    <div className="col-span-3 ">
                      <SinglePassword
                        label={"Re-Type New Password"}
                        register={register}
                        registerName={"confirm_password"}
                      />
                    </div>
                  </div>

                  <div className=" py-3  text-left">
                    <button
                      type="submit"
                      className="bg-black text-[13px] md:text-sm leading-4 inline-flex items-center lg:cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center  border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-heading text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-13 mt-3"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

const SinglePassword = ({ label, register, registerName }: any) => {
  const [hide, setHide] = useState(false);
  return (
    <>
      <label
        htmlFor="first-name"
        className="block font-sans text-[#3a3a3a] font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...register(registerName)}
          type={!hide ? "password" : "text"}
          autoComplete="given-name"
          className="mt-1 py-3 focus:ring-0 focus:shadow-md focus:border-gray-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {hide ? (
          <EyeIcon
            onClick={() => setHide(!hide)}
            color={"gray"}
            className="absolute right-2 top-2"
            height={20}
            width={20}
          />
        ) : (
          <EyeDropperIcon
            onClick={() => setHide(!hide)}
            color={"gray"}
            className="absolute right-2 top-2"
            height={20}
            width={20}
          />
        )}
      </div>
    </>
  );
};
