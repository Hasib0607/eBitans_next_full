"use client";
import useTheme from "@/hooks/use-theme";
import { productImg } from "@/site-settings/siteUrl";
import { getPrice } from "@/utils/get-price";
import httpReq from "@/utils/http/axios/http.service";
import Taka from "@/utils/taka";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Search = ({ search, setSearch, setSearchInput }: any) => {
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
      className="min-h-max shadow-xl w-full rounded-md bg-white absolute top-12 z-50 left-0 right-0"
    >
      <style>{styleCss}</style>
      <h3 className="text-lg font-semibold mx-6 py-1">
        {result?.length} results for{" "}
        <span className="font-bold text-red-400">{search}</span>
      </h3>
      <div
        style={{}}
        className="w-full flex flex-col gap-2 my-4 h-[500px] overflow-y-auto"
      >
        {result?.map((res, idx) => (
          <Single
            key={idx}
            item={res}
            setSearch={setSearch}
            setSearchInput={setSearchInput}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Search;

const Single = ({ item, setSearch, setSearchInput }: any) => {
  const price = getPrice(
    item?.regular_price,
    item?.discount_price,
    item?.discount_type
  );

  return (
    <Link
      href={"/product/" + item?.id + "/" + item?.slug}
      onClick={() => {
        setSearch("");
        setSearchInput(false);
      }}
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="flex flex-col border-b-2 items-center bg-white md:flex-row z-40 px-4 border border-gray-100 last:border-b-0"
      >
        <img
          className="object-cover h-24 rounded-t-lg w-24 "
          src={productImg + item?.image}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <div className="mb-2 text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
            {item.name.slice(0, 100)}
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <Taka tk={price} />
          </p>
        </div>
      </motion.div>
    </Link>
  );
};
