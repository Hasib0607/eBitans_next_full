"use client";
import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import Card21 from "@/components/card/card21";
import Card6 from "@/components/card/card6";
import useTheme from "@/hooks/use-theme";
import httpReq from "@/utils/http/axios/http.service";
import { PlusIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { RiMenuFill } from "react-icons/ri";
import FilterByColorNew from "./filter-by-color-new";
import FilterByPriceNew from "./filter-by-price-new";
import PaginationComponent from "./pagination-new";

const fetchData = async (
  id: any,
  sort: string,
  page: number,
  activeColor: any,
  priceValue: any
) => {
  try {
    const encodedColor = encodeURIComponent(activeColor);
    const categoryResponse = await httpReq.post(
      `getcatproducts?page=${page}&filter=${sort}&colorFilter=${encodedColor}&priceFilter=${priceValue}`,
      { id }
    );
    const { colors, data } = categoryResponse;

    console.log(data, "categorydata");

    if (!data) {
      try {
        // Encode activeColor using encodeURIComponent
        const encodedColor = encodeURIComponent(activeColor);

        const subcategoryResponse = await httpReq.post(
          `getsubcatproduct?page=${page}&filter=${sort}&colorFilter=${encodedColor}&priceFilter=${priceValue}`,
          { id }
        );

        const { colors, data } = subcategoryResponse;

        console.log(data, "subcategorydata");

        return { colors, data };
      } catch (err) {
        console.error(err);
      }
    }

    return { colors, data };
  } catch (error) {
    console.error(error);
  }
};

const CategoryEight = () => {
  const { category, design } = useTheme();

  // const paginateModule = module.find((item: any) => item?.modulus_id === 105);

  const [grid, setGrid] = useState("H");
  // const [paginate, setPaginate] = useState({});
  // const [products, setProducts] = useState([]);
  // const [sort, setSort] = useState("");
  // const [open, setOpen] = useState(false);
  // const [val, setVal] = useState(0);
  // const [colors, setColors] = useState(null);
  // const [activeColor, setActiveColor] = useState(null);
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);
  // const [dataId, setDataId] = useState(null);

  // const shop_load = parseInt(paginateModule?.status);
  // const pageShop = shop_load === 1 ? data?.page : page;

  // useEffect(() => {
  //   setPage(1);
  //   setHasMore(true);
  //   setDataId(data);
  // }, [data]);

  const [open, setOpen] = useState(false);

  const { id } = useParams<{ id: string }>();

  // filtering state
  const [sort, setSort] = useState("za");
  const [page, setPage] = useState(1);
  const [activeColor, setActiveColor] = useState("");
  const [priceValue, setPriceValue] = useState("");

  const { data, status } = useQuery({
    queryKey: ["category-products-8", id, sort, page, activeColor, priceValue],
    queryFn: () => fetchData(id, sort, page, activeColor, priceValue),
    placeholderData: keepPreviousData,
  });

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

  const styleCss = `
    .text-hover:hover {
      color:  ${bgColor};
    }
    .filter {
        color:${textColor};
        background:${bgColor};
    }
    .border-hover:hover {
        border: 1px solid  ${bgColor};
    }
 
    `;

  console.log(data?.data?.data, "category data");

  // return <p>hello</p>;
  return (
    <div className="sm:container px-5 sm:py-10 py-5">
      <style>{styleCss}</style>
      <div className="grid grid-cols-9">
        {/* filter side design  */}
        <div className="lg:col-span-2 px-4 w-full items-end lg:block hidden">
          <div className="w-full bg-gray-100 border-2 border-gray-200 text-black  my-6 pl-6 pt-7 pb-6 ">
            <h1 className="font-semibold ">FILTER BY</h1>
            {category?.map((item: any) => (
              <SingleCat key={item?.id} item={item} />
            ))}
          </div>

          <div className="bg-gray-100 border-2 border-gray-200 my-6 p-4">
            <FilterByColorNew
              colors={data?.colors}
              setActiveColor={setActiveColor}
              activeColor={activeColor}
            />
          </div>
          <div className="bg-gray-100 border-2 border-gray-200 p-4">
            <FilterByPriceNew
              priceValue={priceValue}
              setPriceValue={setPriceValue}
            />
          </div>
        </div>

        {/* filter side design finishes  */}

        <div className="relative lg:col-span-7 col-span-9 ">
          {/* Sort by bar start  */}

          <div>
            <Filter
              setGrid={setGrid}
              onChange={(e: any) => {
                setSort(e.target.value);
              }}
            />
          </div>
          {/* All product card  */}

          <div className="mt-4 mb-6 mx-4 md:mx-0 ">
            <Product
              products={data?.data?.data}
              grid={grid}
              status={status}
              sort={sort}
              activeColor={activeColor}
            />
            <div className="md:mt-12 flex justify-center">
              <PaginationComponent
                lastPage={data?.data?.last_page}
                setPage={setPage}
                currentPage={data?.data?.current_page}
                initialPage={page}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEight;

const Product = ({ products, grid, open, shop_load, hasMore }: any) => {
  const { category } = useTheme();

  // useEffect(() => {
  //   setLoad(true);
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   shop_load === 1 && page,
  //   category,
  //   dataId,
  //   setPaginate,
  //   setProducts,
  //   sort,
  //   subcategory,
  //   setColors,
  //   activeColor,
  //   val,
  // ]);

  // const fetchData = async () => {
  //   // get the data from the api
  //   const { colors, data, error } = await httpReq.post(
  //     `getcatproducts${
  //       page ? (shop_load === 1 ? page : `?page=${page}`) : `?page=1`
  //     }&filter=${sort}&priceFilter=${
  //       Number(val) !== 0 ? Number(val) : ""
  //     }&colorFilter=${activeColor ? encodeURIComponent(activeColor) : ""}`,
  //     { id: dataId?.id }
  //   );

  //   if (error) {
  //     const { colors, data, error } = await httpReq.post(
  //       `getsubcatproduct${
  //         page ? (shop_load === 1 ? page : `?page=${page}`) : `?page=1`
  //       }&filter=${sort}&priceFilter=${
  //         Number(val) !== 0 ? Number(val) : ""
  //       }&colorFilter=${activeColor ? encodeURIComponent(activeColor) : ""}`,
  //       { id: dataId?.id }
  //     );
  //     if (error) {
  //       // console.log("hdfshsd");
  //       setHasMore(false);
  //       setLoad(false);

  //       if (!shop_load && page !== 1) {
  //         setProducts([...products, ...data?.data]);
  //       } else {
  //         setProducts([]);
  //         setPaginate(null);
  //       }
  //       setColors(colors);
  //       return setError(error);
  //     } else if (data?.data?.length > 0) {
  //       setColors(colors);
  //       setHasMore(true);
  //       if (!shop_load) {
  //         if (data?.current_page === 1) {
  //           setProducts(data?.data);
  //         } else {
  //           setProducts([...products, ...data?.data]);
  //         }
  //         setPage(page + 1);
  //       } else {
  //         setProducts(data?.data);
  //       }
  //       setPaginate(data);
  //       setLoad(false);
  //       setError(null);
  //     }
  //   } else if (data?.data?.length > 0) {
  //     setHasMore(true);
  //     if (!shop_load) {
  //       if (data?.current_page === 1) {
  //         setProducts(data?.data);
  //       } else {
  //         setProducts([...products, ...data?.data]);
  //       }
  //       setPage(page + 1);
  //     } else {
  //       setProducts(data?.data);
  //     }
  //     setColors(colors);
  //     setPaginate(data);
  //     setLoad(false);
  //     setError(null);
  //   } else {
  //     setHasMore(false);
  //   }
  //   setLoad(false);
  // };

  // if (load) {
  //   return (
  //     <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
  //       <OvalLoader />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
  //       {error}
  //     </div>
  //   );
  // }
  return (
    <>
      {open && (
        <div className="py-4 px-10 border-[1px] ">
          <div className="text-lg font-medium py-3 flex flex-col gap-2">
            <h1>Categories</h1>
            <p className="h-[1px] w-14 bg-black"></p>
          </div>
          <div className="flex flex-col gap-3 md:w-[40%] w-[90%]">
            {category?.map((item: any, idx: any) => (
              <SingleCat item={item} key={idx} />
            ))}
          </div>
        </div>
      )}

      <div>
        {grid === "H" && (
          <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 xl:grid-cols-3 md:gap-5 grid-cols-1 gap-2 mt-10">
            {products?.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, ease: "linear" }}
              >
                <Card21 item={item} />
              </motion.div>
            ))}
          </div>
        )}
        <AnimatePresence>
          {grid === "V" && (
            <div className="grid grid-cols-1 lg:gap-5 md:gap-5 gap-2 mt-10">
              {products?.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  className="border-hover"
                  initial={{ translateX: 200 }}
                  animate={{ translateX: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "linear",
                    type: "tween",
                  }}
                >
                  <Card6 item={item} />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const Filter = ({ onChange, setGrid, setOpen, open }: any) => {
  return (
    <div>
      <div className="md:flex md:flex-row justify-between md:mt-6 items-center ">
        <div className="md:block hidden">
          <p>Sort By:</p>
        </div>
        <div className="flex items-center gap-3 lg:-ml-28 xl:-ml-0 md:-ml-0 ml-2 justify-center">
          {/* Short by  */}
          <div className="">
            <select
              onChange={onChange}
              className="xl:w-96 lg:w-80 md:w-52 w-40 lg:cursor-pointer h-8 px-2 p-0 text-sm border-gray-200 focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none flex items-center"
              id="category"
              name="category"
            >
              <option className="lg:cursor-pointer">Featured</option>
              <option className="lg:cursor-pointer" value="az">
                Name, A to Z
              </option>
              <option className="lg:cursor-pointer" value="za">
                Name, Z to A
              </option>
              <option className="lg:cursor-pointer" value="lh">
                Price, Low to High
              </option>
              <option className="lg:cursor-pointer" value="hl">
                Price, High to Low
              </option>
            </select>
          </div>

          <p
            onClick={() => setOpen(!open)}
            className={`px-10 py-1 md:hidden flex  text-sm font-semibold bg-black text-white ${
              open === true
                ? "filter border-transparent "
                : "bg-black border-black"
            } lg:cursor-pointer`}
          >
            FILTER
          </p>
        </div>

        <div className="hidden text-gray-300 gap-1 md:flex">
          <CgMenuGridO
            onClick={() => setGrid("H")}
            className="h-6 w-6 text-hover lg:cursor-pointer"
          />
          <RiMenuFill
            onClick={() => setGrid("V")}
            className="h-6 w-6 text-hover lg:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

const SingleCat = ({ item }: any) => {
  const [show, setShow] = useState(false);

  const styleCss = `
    .category-page .active{
        color:#f1593a;
        font-weight: 700;
       }
    `;
  return (
    <>
      <style>{styleCss}</style>
      <div className="w-full flex py-3 lg:cursor-pointer category-page">
        <Link
          href={"/category/" + item?.id}
          className={`flex-1 text-sm font-medium text-gray-900`}
        >
          {" "}
          <p>{item.name}</p>
        </Link>
        {item?.cat ? (
          <div className="px-4 h-full">
            {show ? (
              <TableCellsIcon
                onClick={() => setShow(!show)}
                className="h-4 w-4 text-gray-800"
              />
            ) : (
              <PlusIcon
                onClick={() => setShow(!show)}
                className="h-4 w-4 text-gray-800"
              />
            )}
          </div>
        ) : null}
      </div>

      {show && (
        <>
          <div className="ml-8">
            {item?.cat?.map((sub: any, idx: number) => (
              <div className="py-2 category-page" key={idx}>
                <Link href={"/category/" + sub?.id}>
                  <p className={`pb-2 text-sm text-gray-600`}>{sub?.name}</p>
                </Link>
                <div className="pr-4">
                  <div className="h-[1px] bg-gray-200 w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
