"use client";
import { iconImg } from "@/site-settings/siteUrl";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const FeaturedTwentyOne = ({ category, design }: any) => {
  const [text, setText] = useState("");

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const styleCss = `
    .feature_cat_prev:hover {
        color:${textColor};
        background:${bgColor};
    }
    .feature_cat_next:hover {
        color:${textColor};
        background:${bgColor};
    }
    .bg-hover:hover {
        color:${textColor};
        background:${bgColor};
    }
    .category-hover {
        color:  ${textColor};
    }
    `;

  return (
    <div>
      <style>{styleCss}</style>
      <div className="sm:container px-5 sm:py-10 py-5">
        <div className=" xl:grid-cols-6 grid-cols-2 md:grid-cols-3 gap-5 bg-white grid ">
          {category?.slice(0, 6).map((item: any) => (
            <div key={item.id}>
              <FeatureCatSix item={item} text={text} setText={setText} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedTwentyOne;

const FeatureCatSix = ({ item, setText, text }: any) => {
  const [result, setResult] = useState(null);
  const fetchData = async () => {
    const data = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + `getcatproducts`,
      { id: item?.id }
    );
    setResult(data?.data?.data?.total);
  };

  useEffect(() => {
    fetchData();
  }, [item?.id]);
  return (
    <div>
      <Link
        href={`/category/${item.id}`}
        onMouseEnter={() => setText(item.name)}
        onMouseLeave={() => setText("")}
        className="bg-hover group text-gray-600 flex flex-col gap-2 items-center justify-center bg-gray-100 border border-gray-100 px-3 py-5 rounded-lg"
      >
        <img src={iconImg + item.icon} className="h-14 w-14" alt="" />
        <span
          className={`text-base  font-bold ${
            text === item.name ? " " : "text-black"
          }`}
        >
          {item.name}
        </span>
        <span className="font-medium text-base">
          ({result === undefined ? 0 : result} items)
        </span>
      </Link>
    </div>
  );
};
