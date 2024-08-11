import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { useState } from "react";
import useTheme from "@/hooks/use-theme";
import { useRouter } from "next/navigation";
import httpReq from "@/utils/http/axios/http.service";
import { verify } from "@/redux/features/auth.slice";
import Link from "next/link";

const VerifyOtpEleven = () => {
  const router = useRouter();
  const { store } = useTheme();

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(120);
  const [resend, setResend] = useState(false);
  const [userOne, setUserOne] = useState(
    window.localStorage.getItem("MY_USER_ONE")
  );

  const authType = window.localStorage.getItem("authType");

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
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    setLoading(true);
    // console.log('token',userOne,data);
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
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container">
        <h3 className="font-medium text-[#423b3b] text-center mb-3 max-w-[560px] mx-auto">
          {store?.auth_type === "phone" || store?.auth_type === "EasyOrder"
            ? `The OTP code has been sent to ${authType}.`
            : `The OTP code has been sent to ${authType}. Please check in spam/ junk folder as well.`}
        </h3>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="max-w-[560px] mx-auto text-center bg-white relative overflow-hidden  py-6 px-6 sm:px-8 md:px-[60px] drop-shadow-xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center text-left">
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-right"
                  >
                    Your OTP :
                  </label>
                  <input
                    type="number"
                    {...register("otp", { required: true })}
                    autoComplete="name"
                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
                  />
                </div>

                <div className="text-right w-full lg:cursor-pointer">
                  {resend === false && (
                    <p
                      onClick={() => {
                        setResend(true);
                        handleClick();
                      }}
                      className="text-gray-600 mt-1 mb-5"
                    >
                      Resend OTP
                    </p>
                  )}
                  {resend === true && counter > 0 && (
                    <p className="text-gray-600 mt-1 mb-5">
                      Resend OTP in {counter} Seconds
                    </p>
                  )}
                </div>

                <div className="my-3 flex justify-center">
                  {loading ? (
                    <p
                      className={`font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-orange-500 transition-all duration-500 ease-linear`}
                    >
                      Loading
                    </p>
                  ) : (
                    <input
                      type="submit"
                      value="Submit"
                      className="lg:cursor-pointer font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-orange-500 transition-all duration-500 ease-linear"
                    />
                  )}
                </div>
              </form>
              <div className="h-[1px] w-full bg-gray-300 mb-2"></div>

              <p className="text-base text-[#423b3b]">
                <Link href="/login" className="hover:underline">
                  Go to login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtpEleven;
