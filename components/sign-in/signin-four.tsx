"use client";
import useTheme from "@/hooks/use-theme";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/auth.slice";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import Loading from "../register/loading";
import { btnhover } from "@/site-settings/style";

export const cls =
  "w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary ";

const LoginFour = () => {
  const router = useRouter();
  const { headerSetting, store_id, store } = useTheme();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setLoading(true);
    dispatch(login({ store_id, ...data }) as any)
      .unwrap()
      .then(({ verify, error }: any) => {
        if (error) {
          // toast(error, { type: "error" });
        }
        if (verify) {
          // toast(verify, { type: "success" });
          router.push("/profile");
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
  return (
    <div>
      <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
        <div className="container">
          <div className="flex flex-wrap ">
            <div className="w-full px-4">
              <div className=" max-w-[525px] mx-auto text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px]">
                <div className="mb-10 md:mb-6 text-center">
                  <Link href="/" className="inline-block max-w-[160px] mx-auto">
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
                    <h2 className="text-xl font-bold mt-2 uppercase">Login</h2>
                  </Link>
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
                        className={`  w-full rounded-md border border-blue-300 py-3 px-5 bg-blue-600 text-base text-white lg:cursor-pointer hover:bg-opacity-90 transition ${btnhover}`}
                      />
                    )}
                  </div>
                </form>

                <Link
                  href="/password-forgot"
                  className="text-base inline-block mb-2 text-blue-600 hover:underline hover:text-primary "
                >
                  Forgot Password?
                </Link>
                <p className="text-base text-[#adadad]">
                  Not a member yet?
                  <Link
                    href="/sign-up"
                    className="text-primary hover:underline text-blue-600"
                  >
                    Sign Up
                  </Link>
                </p>
                <div className="flex justify-center w-full">
                  {/* <LoginWith /> */}
                </div>
                <div>
                  <span className="absolute top-1 right-1">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="1.39737"
                        cy="38.6026"
                        r="1.39737"
                        transform="rotate(-90 1.39737 38.6026)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="1.39737"
                        cy="1.99122"
                        r="1.39737"
                        transform="rotate(-90 1.39737 1.99122)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="13.6943"
                        cy="38.6026"
                        r="1.39737"
                        transform="rotate(-90 13.6943 38.6026)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="13.6943"
                        cy="1.99122"
                        r="1.39737"
                        transform="rotate(-90 13.6943 1.99122)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="25.9911"
                        cy="38.6026"
                        r="1.39737"
                        transform="rotate(-90 25.9911 38.6026)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="25.9911"
                        cy="1.99122"
                        r="1.39737"
                        transform="rotate(-90 25.9911 1.99122)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="38.288"
                        cy="38.6026"
                        r="1.39737"
                        transform="rotate(-90 38.288 38.6026)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="38.288"
                        cy="1.99122"
                        r="1.39737"
                        transform="rotate(-90 38.288 1.99122)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="1.39737"
                        cy="26.3057"
                        r="1.39737"
                        transform="rotate(-90 1.39737 26.3057)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="13.6943"
                        cy="26.3057"
                        r="1.39737"
                        transform="rotate(-90 13.6943 26.3057)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="25.9911"
                        cy="26.3057"
                        r="1.39737"
                        transform="rotate(-90 25.9911 26.3057)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="38.288"
                        cy="26.3057"
                        r="1.39737"
                        transform="rotate(-90 38.288 26.3057)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="1.39737"
                        cy="14.0086"
                        r="1.39737"
                        transform="rotate(-90 1.39737 14.0086)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="13.6943"
                        cy="14.0086"
                        r="1.39737"
                        transform="rotate(-90 13.6943 14.0086)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="25.9911"
                        cy="14.0086"
                        r="1.39737"
                        transform="rotate(-90 25.9911 14.0086)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="38.288"
                        cy="14.0086"
                        r="1.39737"
                        transform="rotate(-90 38.288 14.0086)"
                        fill="#3056D3"
                      />
                    </svg>
                  </span>
                  <span className="absolute left-1 bottom-1">
                    <svg
                      width="29"
                      height="40"
                      viewBox="0 0 29 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="2.288"
                        cy="25.9912"
                        r="1.39737"
                        transform="rotate(-90 2.288 25.9912)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="14.5849"
                        cy="25.9911"
                        r="1.39737"
                        transform="rotate(-90 14.5849 25.9911)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="26.7216"
                        cy="25.9911"
                        r="1.39737"
                        transform="rotate(-90 26.7216 25.9911)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="2.288"
                        cy="13.6944"
                        r="1.39737"
                        transform="rotate(-90 2.288 13.6944)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="14.5849"
                        cy="13.6943"
                        r="1.39737"
                        transform="rotate(-90 14.5849 13.6943)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="26.7216"
                        cy="13.6943"
                        r="1.39737"
                        transform="rotate(-90 26.7216 13.6943)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="2.288"
                        cy="38.0087"
                        r="1.39737"
                        transform="rotate(-90 2.288 38.0087)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="2.288"
                        cy="1.39739"
                        r="1.39737"
                        transform="rotate(-90 2.288 1.39739)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="14.5849"
                        cy="38.0089"
                        r="1.39737"
                        transform="rotate(-90 14.5849 38.0089)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="26.7216"
                        cy="38.0089"
                        r="1.39737"
                        transform="rotate(-90 26.7216 38.0089)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="14.5849"
                        cy="1.39761"
                        r="1.39737"
                        transform="rotate(-90 14.5849 1.39761)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="26.7216"
                        cy="1.39761"
                        r="1.39737"
                        transform="rotate(-90 26.7216 1.39761)"
                        fill="#3056D3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginFour;
