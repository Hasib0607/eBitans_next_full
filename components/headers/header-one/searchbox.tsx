"use client";
import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getPrice } from "@/utils/get-price";
import Link from "next/link";
import Taka from "@/utils/taka";
import { productImg } from "@/site-settings/siteUrl";

const SearchBox = ({ search, setSearch }: any) => {
  const { store_id } = useTheme();
  const [result, setResult] = useState([]);

  // const result = product.filter(item => item?.name.toLowerCase().includes(search?.toLowerCase()))

  useEffect(() => {
    async function handleSearch() {
      try {
        const response = await httpReq.post(
          `product/search?store_id=${store_id}&search=${search}`
        );
        if (!response?.error) {
          setResult(response);
        } // the API response object
      } catch (error) {
        console.error(error);
      }
    }

    handleSearch();
  }, [search, store_id]);

  const styleCss = `
    ::-webkit-scrollbar {
        width: 3px;
      }
  `;

  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="min-h-max shadow-xl w-full overflow-hidden bg-white absolute top-8 sm:top-14 left-0 right-0 z-10"
    >
      <style>{styleCss}</style>
      <h3 className="text-xs sm:text-lg font-semibold mx-6 py-1">
        {result?.length} results for{" "}
        <span className="font-bold" style={{ color: "#AD171A" }}>
          {search}
        </span>
      </h3>
      <div className="w-full flex flex-col gap-2 my-4 h-[500px] overflow-y-auto">
        {result?.map((res, idx) => (
          <Single item={res} setSearch={setSearch} key={idx} />
        ))}
      </div>
    </motion.div>
  );
};

export default SearchBox;

const Single = ({ item, setSearch }: any) => {
  const price = getPrice(
    item?.regular_price,
    item?.discount_price,
    item?.discount_type
  );

  return (
    <Link
      href={"/product/" + item?.id + "/" + item?.slug}
      onClick={() => setSearch("")}
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="flex gap-2 items-center bg-white rounded-lg border shadow-md flex-row mx-1 sm:mx-4 hover:bg-gray-100 "
      >
        <img
          className="object-cover w-16 h-16 sm:w-24 sm:h-24 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={productImg + item?.image}
          alt=""
        />
        <div className="flex flex-col justify-between ">
          <div className="mb-1sm:mb-2 text-xs sm:text-sm tracking-tight">
            {item.name.slice(0, 100)}
          </div>
          <p className="mb-1 sm:mb-3 font-normal text-xs  text-gray-700 dark:text-gray-400">
            <Taka tk={price} />
          </p>
        </div>
      </motion.div>
    </Link>
  );
};
