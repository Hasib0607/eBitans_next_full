"use client";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ChangePasswordFour = () => {
  const { store_id, design } = useTheme();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    // console.log(data);
    if (data.password === data.confirm_password) {
      httpReq
        .post("password-change", {
          store_id,
          ...data,
        })
        .then(({ success }) => {
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
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-3">
          <div className="px-4 sm:px-0">
            <h3
              className={`text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 ${
                design?.template_id === "34" ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Change Your Password
            </h3>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div
                className={`${
                  design?.template_id === "34" ? "bg-thirty-one" : "bg-white"
                } px-4 py-5 sm:p-6`}
              >
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
              </div>
              <div
                className={`px-4 py-3 ${
                  design?.template_id === "34" ? "bg-thirty-one" : "bg-gray-50"
                } text-right sm:px-6`}
              >
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordFour;

const SinglePassword = ({ label, register, registerName }: any) => {
  const [hide, setHide] = useState(false);
  return (
    <>
      <label
        htmlFor="first-name"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...register(registerName)}
          type={!hide ? "password" : "text"}
          autoComplete="given-name"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md text-black p-2 bg-white hover:bg-gray-50 transition duration-300 ease-in-out"
        />

        {hide ? (
          <EyeIcon
            onClick={() => setHide(!hide)}
            className="ab absolute right-2 top-2"
            height={18}
            width={18}
          />
        ) : (
          <EyeSlashIcon
            onClick={() => setHide(!hide)}
            className="ab absolute right-2 top-2"
            height={18}
            width={18}
          />
        )}
      </div>
    </>
  );
};
