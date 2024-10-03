import Link from "next/link";
import React from "react";

const MenuList = ({ cls, menu, page }: any) => {
  const result = page.filter(
    (item: any) => !menu.find((menuItem: any) => menuItem.url === item.link)
  );
  return (
    <>
      {menu?.map((m: any) =>
        m?.name !== "Category" ? (
          <p key={m?.id}>
            <Link href={m?.url} className={cls}>
              {m?.name}
            </Link>
          </p>
        ) : null
      )}
      {result?.map((m: any) => (
        <p key={m?.id}>
          <Link href={"/" + m?.link} className={cls}>
            {m?.name}
          </Link>
        </p>
      ))}
    </>
  );
};

export default MenuList;
