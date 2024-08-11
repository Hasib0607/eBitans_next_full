"use client";
import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { getPrice } from "@/utils/get-price";
import { productImg } from "@/site-settings/siteUrl";
import Taka from "@/utils/taka";
import Link from "next/link";

const Search = ({ search, setSearch }: any) => {
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

  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="min-h-max shadow-xl w-full rounded-md bg-white absolute top-2 z-50 left-0 right-0"
    >
      <h3 className="text-lg font-semibold mx-6 py-1">
        {result?.length} results for{" "}
        <span className="font-bold text-red-400">{search}</span>
      </h3>
      <div className="w-full flex flex-col sm:grid grid-cols-2 md:grid-cols-2 gap-2 sm:my-4 h-[500px] overflow-y-auto">
        {result?.slice(0, 10).map((res, idx) => (
          <Single item={res} setSearch={setSearch} key={idx} />
        ))}
      </div>
    </motion.div>
  );
};

export default Search;

const Single = ({ item, setSearch }: any) => {
  const price = getPrice(
    item?.regular_price,
    item?.discount_price,
    item?.discount_type
  );

  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="flex sm:flex-col gap-x-4 border-b-2 md:items-center bg-white md:flex-row z-40 px-4 border-gray-100 last:border-b-0"
    >
      <img
        className="sm:h-48 sm:w-full h-20 w-20 rounded-t-lg md:h-28 md:w-28 "
        src={productImg + item?.image}
        alt=""
      />
      <div className="flex flex-col md:justify-between md:p-4 leading-normal pt-4 md:pt-0">
        <Link
          href={"/product/" + item?.id + "/" + item?.slug}
          onClick={() => setSearch("")}
          className="mb-2 capitalize text-sm font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          {item.name.slice(0, 20)}
          {item?.name?.length > 20 && "..."}
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <Taka tk={price} />
        </p>
      </div>
    </motion.div>
  );
};
