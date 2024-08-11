"use client";
import useTheme from "@/hooks/use-theme";
import { btnhover } from "@/site-settings/style";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SideMenu = React.memo(({ setOpen }: any) => {
  const { menu, design } = useTheme();

  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const bgColor = design?.header_color;

  const styleCss = `
    .menu-hover:hover {
      color:  ${bgColor};
  }
    `;

  return (
    <div className="lg:hidden mt-5 z-50">
      <style>{styleCss}</style>
      <div className="flex flex-col gap-3">
        {menu?.map((item: any) => (
          <div key={item.id}>
            <Link onClick={() => setOpen(false)} href={`/${item.url}`}>
              <p className="menu-hover uppercase sm:text-base text-sm text-gray-500 font-medium">
                {item.name}
              </p>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-24 pr-4">
        {user?.verify ? (
          <p
            onClick={() => {
              // dispatch(logout());
              setOpen(false);
            }}
            style={{
              backgroundColor: design?.header_color,
              color: design?.text_color,
            }}
            className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium ${btnhover}`}
          >
            <button>Logout</button>
          </p>
        ) : (
          <Link
            onClick={() => setOpen(false)}
            href="/sign-up"
            style={{
              backgroundColor: design?.header_color,
              color: design?.text_color,
            }}
            className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium ${btnhover}`}
          >
            <button>Sign up</button>
          </Link>
        )}
        {user?.verify ? null : (
          <p className="mt-6 text-center text-base font-medium text-gray-500">
            Existing customer?{" "}
            <Link
              onClick={() => setOpen(false)}
              href="/login"
              className="text-indigo-600 hover:text-indigo-500"
            >
              <button>Sign in</button>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
});

SideMenu.displayName = "SideMenu";

export default SideMenu;
