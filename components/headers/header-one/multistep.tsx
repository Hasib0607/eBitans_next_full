"use client";
import React from "react";
import "./multistep.css";
import Link from "next/link";
import { iconImg } from "@/site-settings/siteUrl";
import useTheme from "@/hooks/use-theme";

const MultiStep = ({ category, children }: any) => {
  return (
    <>
      <div className="group inline-block z-[9]">
        <button className="outline-none focus:outline-none rounded-sm flex items-center">
          {children}
        </button>

        <ul className="bg-white border rounded-lg transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 grid gap-6 px-5 py-6 sm:gap-6 sm:p-8 w-max">
          {category?.map((item: any) => (
            <Cat key={item.id} cat={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default MultiStep;

export const Cat = ({ cat }: any) => {
  const { subcategory, setPageCat } = useTheme();
  const result = subcategory.filter(
    (i: any) => parseInt(i.parent) === parseInt(cat.id)
  );

  return (
    <>
      {result.length === 0 ? (
        <li>
          <Link
            href={"/category/" + cat?.id}
            key={cat?.id}
            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 csli"
          >
            {/* <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" /> */}
            <img
              src={`${iconImg + cat?.icon}`}
              alt=""
              className="flex-shrink-0 h-6 w-6 text-indigo-600"
              aria-hidden="true"
            />

            <div className="ml-4">
              <p
                onClick={() => setPageCat("?page=1")}
                className="text-base font-medium text-gray-900"
              >
                {cat?.name}
              </p>
            </div>
          </Link>
        </li>
      ) : (
        <li className="relative">
          <Link
            href={"/category/" + cat?.id}
            key={cat?.id}
            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 "
          >
            {/* <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" /> */}
            <img
              src={`${iconImg + cat?.icon}`}
              alt=""
              className="flex-shrink-0 h-6 w-6 text-indigo-600"
              aria-hidden="true"
            />
            <div className="ml-4 flex items-center gap-2">
              <p
                onClick={() => setPageCat("?page=1")}
                className="text-base font-medium text-gray-900"
              >
                {cat?.name}
              </p>
              <span className="mr-auto">
                <svg
                  className="fill-current h-4 w-4 transition duration-150 ease-in-out"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </span>
            </div>
          </Link>

          <ul className="bg-white border rounded-sm absolute -top-1 -right-1 transition duration-150 ease-in-out origin-top-left w-max grid gap-6 px-5 py-6 sm:gap-4 sm:p-6 csul">
            {result?.map((i: any) => (
              <li key={i.id}>
                <Link
                  href={"/category/" + i?.id}
                  key={i?.id}
                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                >
                  {i?.icon && (
                    <img
                      src={`${iconImg + i?.icon}`}
                      alt=""
                      className="flex-shrink-0 h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  )}
                  <div className="ml-4">
                    <p
                      onClick={() => setPageCat("?page=1")}
                      className="text-base font-medium text-gray-900"
                    >
                      {i?.name}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      )}
    </>
  );
};
