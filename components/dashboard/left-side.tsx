"use client";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import React from "react";
import "./dashboard.css";
import { usePathname, useRouter } from "next/navigation";

const LeftSide = () => {
  const { userData } = useTheme();
  const pathname = usePathname();

  return (
    <>
      <div className="mt-5 md:mt-0 md:col-span-1">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className=" py-5 space-y-3  flex flex-col">
            <Link
              href="/profile"
              className={`${
                pathname === "/profile" ? " active_color" : "border-white "
              }  border-l-4 text-md font-semibold  pl-5 py-1 tracking-wider`}
            >
              Profile
            </Link>

            <Link
              href="/profile/order"
              className={`${
                pathname === "/profile/order"
                  ? " active_color"
                  : "border-white "
              }  border-l-4 text-md font-semibold  pl-5 py-1 tracking-wider`}
            >
              Your Order
            </Link>

            {(userData?.auth_type === "phone" ||
              userData?.auth_type === "email" ||
              userData?.auth_type === "EasyOrder") && (
              <Link
                href="/profile/change-password"
                className={`${
                  pathname === "/profile/change-password"
                    ? " active_color"
                    : "border-white "
                }  border-l-4 text-md font-semibold  pl-5 py-1 tracking-wider`}
              >
                Change Password
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSide;
