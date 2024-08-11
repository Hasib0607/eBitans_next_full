"use client";
import useTheme from "@/hooks/use-theme";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/redux/features/auth.slice";
import Link from "next/link";
import Loading from "../register/loading";
import { toast } from "react-toastify";

export const cls =
  "w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary ";

const LoginFive = () => {
  const { store_id, store } = useTheme();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    setLoading(true);
    dispatch(login({ store_id, ...data }) as any)
      .unwrap()
      .then(({ verify, error }: any) => {
        console.log(verify, "verify");
        if (error) {
          toast(error, { type: "error" });
        }
        if (verify) {
          toast(verify, { type: "success" });
          // router.push("/profile");
          window.location.href = "/profile";
        }
        // else {
        //     navigate('/verify-otp')
        // }
      })
      .catch((er: any) => {
        toast("Credential Doesn't Match", { type: "error" });

        setLoading(false);
      });
  };
  return (
    <>
      <section className="py-20 px-4">
        <div className="container">
          <h3 className="text-2xl text-center mb-4 font-bold text-[#423b3b]">
            Log in to your account
          </h3>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="max-w-[560px] mx-auto text-center bg-white relative overflow-hidden  py-6 px-6 sm:px-8 md:px-[60px] drop-shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {store?.auth_type === "phone" ||
                  store?.auth_type === "EasyOrder" ? (
                    <div className="flex items-center text-left">
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-right"
                      >
                        Phone:
                      </label>
                      <input
                        type="number"
                        {...register("phone", { required: true })}
                        autoComplete="name"
                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center text-left">
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-right"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        {...register("phone", { required: true })}
                        autoComplete="name"
                        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
                      />
                    </div>
                  )}
                  <PasswordField register={register} />

                  <Link
                    href="/password-forgot"
                    className="text-base inline-block my-3 text-[#423b3b] hover:underline hover:text-primary"
                  >
                    Forgot your password?
                  </Link>
                  <div className="mb-3">
                    {/* <input
                                            type="submit"
                                            value="Sign In"

                                            className=" font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-orange-500 transition-all duration-500 ease-linear"

                                        /> */}
                    {loading ? (
                      <Loading />
                    ) : (
                      <input
                        type="submit"
                        value="Login"
                        className=" font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-orange-500 transition-all duration-500 ease-linear"
                      />
                    )}
                  </div>
                </form>
                <div className="h-[1px] w-full bg-gray-300 mb-2"></div>
                <p className="text-base text-[#423b3b]">
                  <Link href="/sign-up" className="hover:underline">
                    No account?{" "}
                    <span className="font-bold">Create one here</span>
                  </Link>
                </p>
                <div className="flex justify-center w-full">
                  {/* <LoginWith /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginFive;

const PasswordField = ({ register }: any) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center my-3 relative text-left">
      <label
        htmlFor="city"
        className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-right"
      >
        Password:
      </label>
      <input
        type={show ? "text" : "password"}
        {...register("password", { required: true })}
        autoComplete="name"
        className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
      />
      <p
        onClick={() => setShow(!show)}
        className="ab absolute right-0 top-1 font-semibold bottom-0 bg-gray-400 flex justify-center items-center px-2"
      >
        {show ? "hide" : "show"}
      </p>
    </div>
  );
};
