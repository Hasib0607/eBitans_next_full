"use client";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/http/axios/axios-instance";
const cls =
  "py-3 px-4 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm focus:outline-0 w-full";

const RegisterOne = () => {
  const router = useRouter();
  const { design, store_id, store } = useTheme();
  const dispatch = useDispatch();
  // // const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userOne, setUserOne] = useState("");
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState("customer");
  const [activeModule, setActiveModule] = useState(false);

  // console.log(userOne, "userOne");

  window.localStorage.setItem("MY_USER_ONE", userOne);

  useEffect(() => {
    try {
      axiosInstance
        .get("/get-module/120?name=" + store.url)
        .then((response) => {
          setActiveModule(response?.data?.status || false);
        });
    } catch (error) {
      console.error("Error fetching module:", error);
      toast.error("Failed to fetch module data. Please try again.");
    }
  }, [store]);

  // useEffect(() => {
  //   dispatch(clearMessage());
  // }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useSelector((state: any) => state.auth);

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    window.localStorage.setItem("authType", data?.email || data?.phone);
    setLoading(true);

    // Add userType to the data being submitted
    const registrationData = { ...data, store_id, type: userType };

    if (store?.auth_type === "phone" || store?.auth_type === "EasyOrder") {
      httpReq
        .post("/userinfo", registrationData)
        .then((res) => {
          setUserOne(res.token);
          if (res.message) {
            window.location.replace("/verify-otp");
          }
        })
        .catch((error) => {
          toast(error.response.data.message, { type: "error" });
          setLoading(false);
        });
    } else {
      httpReq
        .post("/user-registration-email", registrationData)
        .then((res) => {
          // console.log(res,"res")
          setUserOne(res.token);
          if (res.message) {
            router.push("/verify-otp");
          }
        })
        .catch((error) => {
          // console.log(error,"error");
          toast(error.response.data.message, { type: "error" });
          setLoading(false);
        });
    }
  };

  return (
    <div className=" max-w-xl w-full mx-auto">
      <form
        className="border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="text-3xl font-semibold my-3 text-black">
          Create an Account
        </h4>
        <p className="pb-6 text-black text-sm">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy
        </p>
        {(store?.auth_type === "phone" || store?.auth_type === "EasyOrder") && (
          <div className="mb-6">
            <input
              autoComplete="tel"
              type="Number"
              placeholder="Phone"
              {...register("phone", { required: true })}
              className={cls}
            />
          </div>
        )}
        {store?.auth_type === "email" && (
          <div className="mb-6">
            <input
              autoComplete="email"
              type="Email"
              placeholder="Email"
              {...register("email", { required: true })}
              className={cls}
            />
          </div>
        )}
        {store?.auth_type === "email" && (
          <div className="mb-6 relative">
            <input
              autoComplete="new-password"
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
        )}

        <p className="text-red-400">
          {" "}
          {errors.phone?.type === "required" && "phone Number is required"}
        </p>

        {/* User Type Selection Dropdown */}
        {activeModule && (
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-500">
              Select User Type
            </label>
            <select
              {...register("type", {
                required: "User type is required",
              })}
              value={userType}
              onChange={(e) => setUserType(e.target.value)} // Update the userType state based on selection
              className={cls}
            >
              <option value="customer">Customer</option>
              <option value="customerAffiliate">Affiliator</option>
            </select>
          </div>
        )}

        {/* Submit button */}
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
              value="Register"
              className="text-left py-3 px-8 rounded-md text-white"
              style={{ backgroundColor: design?.header_color }}
            />
          )}
        </div>

        <p className="text-base font-medium text-[#5A5A5A]">
          Already have an account?
          <Link
            href="/login"
            className="text-primary underline font-sans font-bold text-black pl-1"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterOne;
