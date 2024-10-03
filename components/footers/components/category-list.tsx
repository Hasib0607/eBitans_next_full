import Link from "next/link";
import React from "react";

const CategoryList = ({ cls, category }: any) => {
  return (
    <>
      {category?.slice(0, 6).map((item: any) => (
        <Link key={item.id} href={"/category/" + item?.id}>
          <p className={cls}>{item.name}</p>
        </Link>
      ))}
    </>
  );
};

export default CategoryList;
