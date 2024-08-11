"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import useTheme from "@/hooks/use-theme";
import { login } from "@/redux/features/auth.slice";
import Link from "next/link";
const cls =
  "py-3 px-4 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm focus:outline-0 w-full";

const LoginOne = () => {
  const router = useRouter();
  const { store_id, design, store } = useTheme();

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { user } = useSelector((state: any) => state.auth);
  console.log("this is user", user)

  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      .catch((error: any) => {
        // toast("Credential Doesn't Match", { type: "error" });

        setLoading(false);
      });
  };
  return (
    <div className=" max-w-xl w-full mx-auto">
      <form
        className="border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="text-3xl font-semibold my-3 text-black">Login</h4>

        {store?.auth_type === "phone" || store?.auth_type === "EasyOrder" ? (
          <div className="mb-6 w-full">
            <input
              autoComplete="tel"
              type="Number"
              placeholder="Phone"
              {...register("phone", { required: true })}
              className={cls}
            />
          </div>
        ) : (
          <div className="mb-6 w-full">
            <input
              autoComplete="tel"
              type="email"
              placeholder="Email"
              {...register("phone", { required: true })}
              className={cls}
            />
          </div>
        )}

        <p className="text-red-400">
          {" "}
          {errors.phone?.type === "required" && "phone Number is required"}
        </p>

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

        <p className="text-red-400">
          {" "}
          {errors.password?.type === "required" && "Password is required"}
        </p>

        <div className="flex justify-end items-center ">
          <Link href="/password-forgot" className="label-text -mt-5 mb-5">
            Forgot password?
          </Link>
        </div>

        <div className="">
          {loading ? (
            <p
              className="text-left py-3 px-8 w-28 rounded-md text-gray-400"
              style={{ backgroundColor: design?.header_color }}
            >
              Loading
            </p>
          ) : (
            <input
              type="submit"
              value="Login"
              className="text-left py-3 px-8 rounded-md text-white"
              style={{ backgroundColor: design?.header_color }}
            />
          )}
        </div>

        <p className="text-base font-medium text-[#5A5A5A]">
          Don&apos;t have any account?
          <Link
            href="/sign-up"
            className="text-primary underline font-sans font-bold text-black pl-1"
          >
            Register
          </Link>
        </p>
      </form>
      <div className="flex justify-center w-full">{/* <LoginWith /> */}</div>
    </div>
  );
};

export default LoginOne;
