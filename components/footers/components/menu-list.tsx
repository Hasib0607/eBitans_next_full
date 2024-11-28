import Link from "next/link";
import React from "react";

const MenuList = ({ cls, menu }: any) => {
  
  return (
    <>
      {menu?.map((m: any) =>
        m?.name !== "Category" ? (
          <p key={m?.id}>
            <Link href={"/" + m?.url} className={cls}>
              {m?.name}
            </Link>
          </p>
        ) : null
      )}
    </>
  );
};

export default MenuList;
