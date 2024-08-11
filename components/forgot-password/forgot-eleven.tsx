"use client";
import useTheme from "@/hooks/use-theme";
import { clearMessage } from "@/redux/features/message.slice";
import httpReq from "@/utils/http/axios/http.service";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../register/loading";
import { imgUrl } from "@/site-settings/siteUrl";
import { useRouter } from "next/navigation";
import { btnhover } from "@/site-settings/style";

const ForgotEleven = () => {
  const [user, setUser] = useState({});
  const [page, setPage] = useState("find");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <>
      <div className=" mx-auto bg-white h-[100vh]">
        <section className="flex justify-center">
          <div className="max-w-md">
            {page === "otp" ? (
              <Verifying setPage={setPage} setUser={setUser} user={user} />
            ) : page === "find" ? (
              <Finding setPage={setPage} setUser={setUser} />
            ) : (
              <Changeing setUser={setUser} setPage={setPage} user={user} />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ForgotEleven;

const Finding = ({ setPage, setUser }: any) => {
  const { design, store_id, headerSetting, store } = useTheme();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // console.log(errors);
  const onSubmit = (data: any) => {
    setLoading(true);
    if (data.phone) {
      httpReq
        .post("forget-pass", { phone: data.phone, store_id })
        .then((res) => {
          // console.log(res);

          if (res.user_id) {
            setPage("otp");
            setUser(res);
            setLoading(false);
          } else {
            toast(res?.error, { type: "error" });
            setLoading(false);
          }
        })
        .catch((er) => {
          setLoading(false);
          if (er.response.data.error) {
            toast(er.response.data.error, { type: "warning" });
            setPage("find");
            setUser({});
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }
  };
  return (
    <form
      className="bg-white border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-10 md:mb-6 text-center">
        <Link href="/" className="inline-block max-w-[160px]  mx-auto">
          <img
            className="max-h-[50px] w-full h-full object-fill"
            src={imgUrl + headerSetting?.logo}
            alt="logo"
          />
        </Link>
        <h2 className="text-sm md:text-base text-[#5A5A5A] mt-2 ">
          We'll send you a OTP to reset your password
        </h2>
      </div>

      {store?.auth_type === "phone" || store?.auth_type === "EasyOrder" ? (
        <div className="flex justify-start flex-col items-start mb-6">
          <label
            htmlFor="email"
            className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
          >
            Phone
          </label>
          <input
            autoComplete="tel"
            type="Number"
            {...register("phone", { required: true })}
            className={
              "py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
            }
          />
        </div>
      ) : (
        <div className="flex justify-start flex-col items-start mb-6">
          <label
            htmlFor="email"
            className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
          >
            Email
          </label>
          <input
            autoComplete="email"
            type="email"
            {...register("phone", { required: true })}
            className={
              "py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
            }
          />
        </div>
      )}

      {errors.phone?.type === "required" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          The field is required!
        </p>
      )}

      {loading ? (
        <Loading />
      ) : (
        <input
          type="submit"
          value="Find Your Account"
          className={`text-center py-3 px-8 rounded-md  font-sans font-bold tracking-wider ${btnhover}`}
          style={{
            backgroundColor: design?.header_color,
            color: design?.text_color,
          }}
        />
      )}

      <GoBack />
    </form>
  );
};
const Verifying = ({ setPage, setUser, user }: any) => {
  const { design, headerSetting } = useTheme();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    if (data.otp) {
      setLoading(true);
      data["user_id"] = user?.user_id;
      httpReq
        .post("forget-verify", data)
        .then(({ error, verify, success, user_id }) => {
          if (success) {
            toast(success, { type: "success" });
          }
          if (error) {
            toast(error, { type: "warning" });
          }
          if (verify) {
            setPage("cng");
            setUser({ user_id });
          }
          setLoading(false);
        })
        .catch((er) => {
          setLoading(false);
          // console.log(er)
        });
    }
  };
  return (
    <form
      className="bg-white border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-10 md:mb-6 text-center">
        <Link href="/" className="inline-block max-w-[160px]  mx-auto">
          <img
            className="max-h-[50px] w-full h-full object-fill"
            src={imgUrl + headerSetting?.logo}
            alt="logo"
          />
        </Link>
        <h2 className="text-sm md:text-base text-[#5A5A5A] mt-2 ">
          We'll send you a OTP to reset your password
        </h2>
      </div>

      <div className="flex justify-start flex-col items-start mb-6">
        <label
          htmlFor="email"
          className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
        >
          Type Your OTP
        </label>
        <input
          type="Number"
          {...register("otp", { required: true })}
          className={
            "py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
          }
        />
      </div>
      {errors.otp?.type === "required" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          The field is required!
        </p>
      )}

      {loading ? (
        <Loading />
      ) : (
        <input
          type="submit"
          value="Verify"
          className={`text-center py-3 px-8 rounded-md  font-sans font-bold tracking-wider ${btnhover}`}
          style={{
            backgroundColor: design?.header_color,
            color: design?.text_color,
          }}
        />
      )}

      <GoBack />
    </form>
  );
};
const Changeing = ({ setPage, setUser, user }: any) => {
  const { design, headerSetting } = useTheme();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setLoading(true);
    if (data.password === data.confirm_password) {
      httpReq
        .post("change-password", { user_id: user?.user_id, ...data })
        .then(({ success, error }) => {
          if (success) {
            toast(success, { type: "success" });

            router.push("/login");
            setLoading(false);

            setPage("find");
            setUser({});
          }
          if (error) {
            toast(error, { type: "warning" });
            setLoading(false);
          }
        })
        .catch((er) => {
          setLoading(false);
          // console.log(er)
        });
    } else {
      toast("your password dosen't match", {
        type: "warning",
        position: "top-center",
        delay: 1,
      });
      setLoading(false);
    }
  };
  return (
    <form
      className="bg-white border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-10 md:mb-6 text-center">
        <Link href="/" className="inline-block max-w-[160px]  mx-auto">
          <img
            className="max-h-[50px] w-full h-full object-fill"
            src={imgUrl + headerSetting?.logo}
            alt="logo"
          />
        </Link>
        <h2 className="text-sm md:text-base text-[#5A5A5A] mt-2 mb-8 ">
          Change Your Password
        </h2>
      </div>
      <div className="flex justify-start flex-col items-start mb-6">
        <label
          htmlFor="email"
          className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
        >
          Password
        </label>
        <input
          type="password"
          {...register("password", { required: true })}
          className={
            "py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
          }
        />
      </div>
      {errors.password?.type === "required" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          The field is required!
        </p>
      )}
      {errors.password?.type === "minLength" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          {" "}
          You Must Give 8 character
        </p>
      )}

      <div className="flex justify-start flex-col items-start mb-6">
        <label
          htmlFor="email"
          className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
        >
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirm_password", { required: true })}
          className={
            "py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
          }
        />
      </div>
      {errors.confirm_password?.type === "required" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          The field is required!
        </p>
      )}
      {errors.confirm_password?.type === "minLength" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          {" "}
          You Must Give 8 character
        </p>
      )}

      <div className="flex justify-center">
        {loading ? (
          <Loading />
        ) : (
          <input
            type="submit"
            value="Change Password"
            className={`w-full rounded-md font-semibold tracking-wider py-3 px-5 bg-black text-base text-white lg:cursor-pointer hover:bg-opacity-90 transition ${btnhover}`}
            style={{
              backgroundColor: design.header_color,
              color: design.text_color,
            }}
          />
        )}
      </div>
      <GoBack />
    </form>
  );
};

const GoBack = () => {
  return (
    <div className="flex flex-col space-y-3 py-3">
      <div className="h-[1px] w-full bg-gray-300 flex justify-center items-center">
        <p className="bg-white px-2 capitalize">or</p>
      </div>
      <p className="text-base font-medium text-[#5A5A5A] text-center ">
        Back to
        <Link
          href="/login"
          className="text-primary underline font-sans font-bold text-black pl-1"
        >
          Login
        </Link>
      </p>
    </div>
  );
};
