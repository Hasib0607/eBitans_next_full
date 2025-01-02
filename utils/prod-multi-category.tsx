import Link from "next/link";
import React from "react";

const ProdMultiCategory = ({
  category,
  className,
  design,
  count,
  commaColor,
  linkOff,
}: any) => {
  // Dynamically slice the category array based on count
  const slicedCategory =
    category && category?.slice(0, count ?? category?.length);

  return (
    <>
      {slicedCategory &&
        slicedCategory?.slice(0, count)?.map((cat: any, index: number) => (
          <span
            key={index}
            style={
              {
                "--header-color": design ? design?.header_color : "",
                "--text-color": design ? design?.text_color : "",
              } as React.CSSProperties
            }
          >
            <span className={className}>
              {linkOff ? (
                <span className="cursor-default">{cat.name}</span>
              ) : (
                <Link href={"/category/" + cat.id}>{cat.name}</Link>
              )}
              <span
                className={`cursor-default ${commaColor ? commaColor : className}`}
              >
                {index < slicedCategory.length - 1 && ", "}
              </span>
            </span>
          </span>
        ))}
    </>
  );
};
export default ProdMultiCategory;
