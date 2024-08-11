"use client";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import React from "react";

const NavLinks = ({ setHeading }: any) => {
  const { category, design } = useTheme();

  const styleCss = `

   
    .navMenu-color:hover {
        color:  ${design?.header_color};
     }
  
 
    `;

  return (
    <div className="w-full flex flex-wrap gap-5 p-10">
      <style>{styleCss}</style>
      {category?.map((item: any) => (
        <div onClick={() => setHeading("")} key={item.id}>
          <Link href={"/category/" + item?.id}>
            <h1 className="text-lg w-max font-semibold text-gray-500 navMenu-color">
              {item.name}
            </h1>
          </Link>
          {item.cat != null && (
            <div>
              {item?.cat?.map((sub: any) => (
                <li key={sub.id} className="text-sm text-gray-600 my-2.5">
                  <Link href={"/category/" + sub?.id}>
                    <p className="w-max navMenu-color">{sub.name}</p>
                  </Link>
                </li>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
