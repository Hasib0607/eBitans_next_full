"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import useTheme from "@/hooks/use-theme";
import { login } from "@/redux/features/auth.slice";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import Loading from "../register/loading";
import { btnhover } from "@/site-settings/style";
// import Loading from './loading';
export const cls =
  "w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary ";

const LoginTwentyOne = () => {
  const { headerSetting, store_id, design, store } = useTheme();

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  //   useEffect(() => {
  //     dispatch(clearMessage());
  //   }, [dispatch]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    setLoading(true);
    dispatch(login({ store_id, ...data }) as any)
      .unwrap()
      .then(({ verify, error }: any) => {
        if (error) {
          //   toast(error, { type: "error" });
        }
        if (verify) {
          //   toast(verify, { type: "success" });
          window.location.href = "/profile";
          // window.location.reload();
        }
        // else {
        //     navigate('/verify-otp')
        // }
      })
      .catch((er: any) => {
        // toast("Credential Doesn't Match", { type: "error" });
        setLoading(false);
      });
  };
  const styleCss = `
    .cart-btn:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid ${design?.header_color};
    }
    .cart-btn {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 2px solid ${design?.header_color};
    }
    .text-color {
        color:  ${design?.header_color};
    }
   
      `;
  return (
    <div className="py-20 lg:py-[120px] sm:container px-5 xl:px-24">
      <div className="">
        {headerSetting?.logo === null ? (
          <Link href="/">
            <p className="text-xl uppercase">{headerSetting?.website_name}</p>
          </Link>
        ) : (
          <Link href="/">
            <img
              className="h-auto max-w-[160px] overflow-hidden mx-auto"
              src={imgUrl + headerSetting.logo}
              alt="logo"
            />
          </Link>
        )}
      </div>

      <div
        className={`grid  grid-cols-1 ${
          store?.auth_type === "EasyOrder"
            ? "md:grid-cols-1 max-w-[500px] mx-auto"
            : "md:grid-cols-2"
        }`}
      >
        <style>{styleCss}</style>
        <section className="" id="sign-in">
          <div className="">
            <div className="flex flex-wrap ">
              <div className="w-full px-4">
                <div className="w-full mx-auto text-center bg-white rounded-lg relative overflow-hidden py-5 sm:px-10">
                  <div className="mb-10 md:mb-6 text-center">
                    <div className="inline-block">
                      <h2 className="text-xl font-bold mt-2 uppercase">
                        Login
                      </h2>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {store?.auth_type === "phone" ||
                    store?.auth_type === "EasyOrder" ? (
                      <div className="mb-6">
                        <input
                          autoComplete="tel"
                          type="Number"
                          placeholder="Phone"
                          {...register("phone", { required: true })}
                          className={cls}
                        />
                      </div>
                    ) : (
                      <div className="mb-6">
                        <input
                          autoComplete="tel"
                          type="email"
                          placeholder="Email"
                          {...register("phone", { required: true })}
                          className={cls}
                        />
                      </div>
                    )}
                    <div className="mb-6 relative">
                      <input
                        type={`${show ? "text" : "password"}`}
                        placeholder="Password"
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
                    <div className="mb-10">
                      {loading ? (
                        <Loading />
                      ) : (
                        <input
                          type="submit"
                          value="Sign In"
                          className={`w-full font-bold tracking-wider rounded-md py-3 px-5 cart-btn text-base lg:cursor-pointer transition ${btnhover}`}
                        />
                      )}
                    </div>
                  </form>

                  <Link
                    href="/password-forgot"
                    className="text-base inline-block mb-2 text-[#adadad] hover:underline hover:text-primary"
                  >
                    Forgot Password?
                  </Link>
                  <p className="text-base text-[#adadad]">
                    Don&apos;t Have an Account?
                    <a
                      href="/sign-up"
                      className="text-primary hover:underline text-color"
                    >
                      Sign Up
                    </a>
                  </p>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
            {/* <LoginWith /> */}
          </div>
        </section>
        {store?.auth_type !== "EasyOrder" && (
          <section className="" id="sign-up">
            {/* <RegisterTwentyOne /> */}
          </section>
        )}
      </div>
    </div>
  );
};

export default LoginTwentyOne;
