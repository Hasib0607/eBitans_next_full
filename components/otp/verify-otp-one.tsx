"use client";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { verify } from "@/redux/features/auth.slice";
// import useTheme from '../../../@/hooks/useTheme';
// import { token } from '../../../../services/AxiosInstance';

const VerifyOtpOne = () => {
  const router = useRouter();
  const { store } = useTheme();
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState<number>(120);
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
      .catch((error) => {
        // console.log(error,"error");
        // toast(error.response.data.message, { type: "error" });
        setLoading(false);
      });
  };

  // resend timer
  // useEffect(() => {
  //   const timer: false | NodeJS.Timeout =
  //     resend === true &&
  //     counter > 0 &&
  //     setInterval(() => setCounter(counter - 1), 1000);
  //   return () => clearInterval(timer);
  // }, [counter, resend]);

  // verify otp// resend timer
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setLoading(true);
    // console.log('token',token,data);
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
    <>
      <div className="max-w-md mx-auto">
        <form
          className="border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4 w-full "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-medium text-[#423b3b] text-center mb-3 max-w-[560px] mx-auto">
            {store?.auth_type === "phone" || store?.auth_type === "EasyOrder"
              ? `The OTP code has been sent to ${authType}.`
              : `The OTP code has been sent to ${authType}. Please check in spam/ junk folder as well.`}
          </h3>
          <input
            type="Number"
            {...register("otp", { required: true })}
            placeholder="Your OTP"
            className="py-3 px-4 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm focus:outline-0"
          />

          <p className="text-red-400">
            {" "}
            {errors?.otp?.type === "required" && "OTP is required"}
          </p>

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

          {loading ? (
            <p
              className={`text-center py-2 px-8 rounded-md  font-sans font-bold tracking-wider bg-red-700 text-white hover:bg-red-900 hover:text-gray-200`}
            >
              Loading
            </p>
          ) : (
            // disable ?
            //     <input type="submit" value="Resend Otp" disabled className='text-left py-3 px-8 rounded-md text-white' style={{ backgroundColor: button1.color }} /> :
            <input
              type="submit"
              value="Verify"
              className={`text-center lg:cursor-pointer py-2 px-8 rounded-md  font-sans font-bold tracking-wider bg-red-700 text-white hover:bg-red-900 hover:text-gray-200`}
            />
          )}

          {/* <div className="flex justify-center">
        <Countdown
            date={Date.now() + 60000}
            renderer={renderer}
        />
    </div> */}
        </form>
      </div>
    </>
  );
};

export default VerifyOtpOne;
