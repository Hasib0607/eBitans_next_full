"use client";
import useTheme from "@/hooks/use-theme";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import httpReq from "@/utils/http/axios/http.service";
import { verify } from "@/redux/features/auth.slice";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import Loading from "../register/loading";
import { btnhover } from "@/site-settings/style";

const VerifyOtpSeven = () => {
  const router = useRouter();
  const { headerSetting, design, store } = useTheme();

  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(120);
  const [resend, setResend] = useState(false);
  const [userOne, setUserOne] = useState(
    window.localStorage.getItem("MY_USER_ONE")
  );

  const authType = window.localStorage.getItem("authType");

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);

  // resend timer
  useEffect(() => {
    setTimeout(() => {
      if (resend === true) {
        setResend(false);
        setCounter(120);
      } else {
        setResend(false);
      }
    }, 120000);
  }, [resend]);

  // resend otp function
  const handleClick = () => {
    httpReq
      .post("/user/resendotp", { token: userOne })
      .then((res) => {
        // console.log(res, "res verify")
        // toast("OTP Resend Successfully", { type: "success" });
        setUserOne(res.token);
      })
      .catch((error: any) => {
        // console.log(error, "error");
        // toast(error.response.data.message, { type: "error" });
        setLoading(false);
      });
  };

  // resend timer
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (resend && counter > 0) {
      timer = setInterval(
        () => setCounter((prevCounter) => prevCounter - 1),
        1000
      );
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [counter, resend]);

  // verify otp
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setLoading(true);
    dispatch(verify({ ...data, token: userOne }) as any)
      .unwrap()
      .then(({ verify, error }: any) => {
        if (error) {
          // toast(error, { type: "error" });
          setLoading(false);
        }
        if (verify) {
          // toast(verify, { type: "success" });
          window.location.replace("/profile");
          localStorage.removeItem("authType");
          // window.location.reload()
        } else {
          // toast("Otp Not Match", { type: "error" });
          router.push("/verify-otp");
          setLoading(false);
        }
      })
      .catch((error: any) => {
        // console.log(error,"error");
        // toast("Credential Doesn't Match", { type: "error" });
        setLoading(false);
      });
  };

  return (
    <div>
      <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="max-w-[525px] mx-auto text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px]">
                <div className="mb-10 md:mb-6 text-center">
                  <Link
                    href="/"
                    className="inline-block max-w-[160px]  mx-auto"
                  >
                    <img
                      className="max-h-[50px] w-full h-full object-fill"
                      src={imgUrl + headerSetting?.logo}
                      alt="logo"
                    />
                  </Link>
                  <h3 className="font-medium text-[#423b3b] text-center mb-3 max-w-[560px] mx-auto">
                    {store?.auth_type === "phone" ||
                    store?.auth_type === "EasyOrder"
                      ? `The OTP code has been sent to ${authType}.`
                      : `The OTP code has been sent to ${authType}. Please check in spam/ junk folder as well.`}
                  </h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex justify-start flex-col items-start mb-6">
                    <label
                      htmlFor="email"
                      className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
                    >
                      OTP
                    </label>
                    <input
                      type="Number"
                      {...register("otp", { required: true })}
                      className={
                        "py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
                      }
                    />
                  </div>
                  {errors?.otp &&
                    errors?.test?.message &&
                    typeof errors.test.message === "string" && (
                      <p>{errors.test.message}</p>
                    )}

                  <div className="text-right w-full lg:cursor-pointer">
                    {resend === false && (
                      <p
                        onClick={() => {
                          setResend(true);
                          handleClick();
                        }}
                        className="text-gray-600 -mt-5 mb-5"
                      >
                        Resend OTP
                      </p>
                    )}
                    {resend === true && counter > 0 && (
                      <p className="text-gray-600 -mt-5 mb-5">
                        Resend OTP in {counter} Seconds
                      </p>
                    )}
                  </div>

                  <div className="mb-10 lg:cursor-pointer">
                    {loading ? (
                      <Loading />
                    ) : (
                      <input
                        type="submit"
                        value="Verify"
                        className={`text-center lg:cursor-pointer py-3 px-8 rounded-md block w-full font-sans font-bold tracking-wider ${btnhover}`}
                        style={{
                          backgroundColor: design?.header_color,
                          color: design?.text_color,
                        }}
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyOtpSeven;
