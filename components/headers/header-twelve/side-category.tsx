"use client";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import React from "react";

const SideCategory = ({ open, setOpen }: any) => {
  const { menu } = useTheme();

  return (
    <nav>
      <ul className="flex flex-col gap-6 font-twelve text-[13px]">
        {menu?.map((item: any) => (
          <div key={item?.id} className="relative">
            <li className="group relative flex items-center justify-between ">
              <Link onClick={() => setOpen(!open)} href={item?.url}>
                <h1 className={`menu-hover flex items-center group`}>
                  {item?.name}
                </h1>
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </nav>
  );
};

export default SideCategory;
