import Link from "next/link";
import React from "react";

const PageList = ({ cls, menu, page }: any) => {
  return (
    <>
      {page?.map((m: any) => (
        <p key={m?.id}>
          <Link href={"/" + m?.link} className={cls}>
            {m?.name}
          </Link>
        </p>
      ))}
    </>
  );
};

export default PageList;