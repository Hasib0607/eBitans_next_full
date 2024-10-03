"use client";
import useTheme from "@/hooks/use-theme";
import {
  CogIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const Aside = () => {
  const { userData } = useTheme();

  return (
    <>
      <div className="mt-5 md:mt-14 md:col-span-1">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className=" py-5 bg-white space-y-3  flex flex-col text-[#212121]">
            <Link
              href="/profile"
              className={` mx-4 flex space-x-2 text-md font-medium  pl-5 py-3 justify-start items-center rounded transition-all duration-200 ease-linear tracking-wider`}
            >
              <UserIcon
                width={22}
                fontWeight={300}
                className={"font-thin"}
                color={"#212121"}
              />
              <span> Account Details</span>
            </Link>

            {/* ${
                location.pathname === "/profile/order" ? " bg-gray-200" : ""
              } */}
            <Link
              href="/profile/order"
              className={` mx-4 flex space-x-2 text-md font-medium  pl-5 py-3 justify-start items-center rounded transition-all duration-200 ease-linear tracking-wider`}
            >
              <ShoppingCartIcon
                width={22}
                fontWeight={300}
                className={"font-thin"}
                color={"#212121"}
              />
              <span> Your Order</span>
            </Link>

            {/* ${
                  location.pathname === "/profile/change-password"
                    ? " bg-gray-200"
                    : ""
                } */}

            {(userData?.auth_type === "phone" ||
              userData?.auth_type === "email" ||
              userData?.auth_type === "EasyOrder") && (
              <Link
                href="/profile/change-password"
                className={` mx-4 flex space-x-2 text-md font-medium font  pl-5 py-3 justify-start items-center rounded transition-all duration-200 ease-linear tracking-wider`}
              >
                <CogIcon
                  width={22}
                  fontWeight={100}
                  fontFamily={"Segoe UI"}
                  color={"#212121"}
                />
                <span> Change Password</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Aside;
