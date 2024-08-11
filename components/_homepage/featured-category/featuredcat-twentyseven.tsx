"use client";
import React, { useEffect } from "react";

import bgImg from "@/components/_homepage/featured-category/twentyseven-bg-img/bg-cat.svg";
import bgImg1 from "@/components/_homepage/featured-category/twentyseven-bg-img/bg-cat1.svg";
import bgImg2 from "@/components/_homepage/featured-category/twentyseven-bg-img/bg-cat2.svg";
import bgImg3 from "@/components/_homepage/featured-category/twentyseven-bg-img/bg-cat3.svg";
import bgImg4 from "@/components/_homepage/featured-category/twentyseven-bg-img/bg-cat4.svg";
import bgImg5 from "@/components/_homepage/featured-category/twentyseven-bg-img/bg-cat5.svg";

import { useState } from "react";
import Link from "next/link";
import { iconImg } from "@/site-settings/siteUrl";
import axios from "axios";

const FeaturedTwentySeven = ({ category, design, product }: any) => {
  const [catId, setCatId] = useState(category[0].id);
  const [result, setResult] = useState<any>({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const result = product.filter((product: any) => {
      return catId === Number(product?.category_id);
    });
    setProducts(result);

    const resultOne = category.find((cat: any) => {
      return cat?.id === catId;
    });

    setResult(resultOne);
  }, [product, catId, category]);

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
    `;

  return (
    <div className="sm:container px-5 sm:py-10 py-5 ">
      <style>{styleCss}</style>
      <div className="bg-gray-100 px-5 sm:py-10 py-5 rounded-3xl">
        <div className="text-2xl md:text-5xl text-black font-semibold mb-14 text-center">
          <p>Start exploring.</p>
        </div>

        <div className="bg-white flex flex-wrap justify-around lg:rounded-full rounded-md py-2 shadow-2xl xl:mx-40 mx-0 px-5 mb-14">
          {category?.slice(0, 5).map((item: any, index: number) => (
            <div className="" key={index}>
              <FeatureCatSix item={item} setCatId={setCatId} catId={catId} />
            </div>
          ))}
        </div>

        <div>
          {result?.cat !== null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {result?.cat?.map((sub: any, id: any) => (
                <Link key={sub.id} href={`/category/${sub.id}`}>
                  <div className="bg-white h-72 mt-5 rounded-xl relative">
                    <p className="text-2xl font-medium pt-40 pl-5">
                      {sub?.name}
                    </p>
                    <p className="text-lg font-medium pt-5 pl-5">
                      See all collection
                    </p>
                    <div className="absolute top-5 right-5">
                      <ProductsCount subId={sub?.id} />
                    </div>
                    <div className="absolute top-5 left-5">
                      <div className="w-24 h-24 flex justify-center items-center bg-blue-200 overflow-hidden rounded-full">
                        <img
                          src={iconImg + sub?.icon}
                          alt=""
                          className="h-16 w-16"
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-5 right-5">
                      <img
                        src={
                          id === 0
                            ? bgImg
                            : id === 1
                            ? bgImg1
                            : id === 2
                            ? bgImg2
                            : id === 3
                            ? bgImg3
                            : id === 4
                            ? bgImg4
                            : id === 5
                            ? bgImg5
                            : null
                        }
                        alt=""
                        className="h-48"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Link href={`/category/${result.id}`}>
                {" "}
                <div className="bg-white h-72 mt-5 rounded-xl relative">
                  <p className="text-2xl font-medium pt-40 pl-5">
                    {result?.name}
                  </p>
                  <p className="text-lg font-medium pt-5 pl-5">
                    See all collection{" "}
                  </p>
                  <div className="absolute top-5 right-5">
                    <p>{products?.length} products</p>
                  </div>
                  <div className="absolute top-5 left-5">
                    <img
                      src={iconImg + result?.icon}
                      alt=""
                      className="h-20 w-20 rounded-full"
                    />
                  </div>
                  <div className="absolute bottom-5 right-5">
                    <img src={bgImg} alt="" className="h-48" />
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedTwentySeven;

const ProductsCount = ({ subId }: any) => {
  // console.log(subId, "subId");
  // const { product, category } = useTheme();
  // const [products, setProducts] = useState([])

  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.post(
        "https://admin.ebitans.com/api/v1/" + `getsubcatproduct`,
        { id: subId }
      );
      setResult(data?.data?.total);
    };
    fetchData();
  }, [subId]);

  return (
    <div>
      <p>{result === undefined ? 0 : result} products</p>
    </div>
  );
};

const FeatureCatSix = ({ item, setCatId, catId }: any) => {
  return (
    <div>
      <div
        onClick={() => setCatId(item?.id)}
        className={`flex items-center gap-2 py-2 lg:px-5 px-3 rounded-full  ${
          catId === item?.id && "bg-gray-800 text-white"
        }`}
      >
        <div>
          <img src={iconImg + item.icon} className="lg:h-5 h-3" alt="" />
        </div>
        <div className="">
          <h1
            className={`lg:text-lg text-sm font-semibold menu-hover lg:cursor-pointer`}
          >
            {item.name}
          </h1>
        </div>
      </div>
    </div>
  );
};
