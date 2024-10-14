// import { MenuIcon, MinusIcon, PlusIcon } from "@heroicons/react/outline";
// import React, { useEffect, useState } from "react";
// import useTheme from "../../../../hooks/useTheme";
// import httpReq from "../../../../services/http.service";
// import { Card45, Card6 } from "../../../components/card";
// import OvalLoader from "../../../components/Loader/OvalLoader";
// import { AnimatePresence, motion } from "framer-motion";
// import { NavLink } from "react-router-dom";
// import { IoGridSharp } from "react-icons/io5";
// import Pagination from "../Pagination";
// import FilterByColor from "../../../components/filterByColor/FilterByColor";
// import FilterByPrice from "../../../components/filterByPrice/FilterByPrice";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { ThreeDots } from "react-loader-spinner";

// const CategoryTwentyOne = ({ data }) => {
//   const { category, module, design } = useTheme();

//   const paginateModule = module.find((item) => item?.modulus_id === 105);

//   const [grid, setGrid] = useState("H");
//   const [sort, setSort] = useState("");
//   const [paginate, setPaginate] = useState({});
//   const [products, setProducts] = useState([]);
//   const [shops, setShops] = useState({});
//   const [select, setSelect] = useState(parseInt(data?.id));
//   const [val, setVal] = useState(0);
//   const [colors, setColors] = useState(null);
//   const [activeColor, setActiveColor] = useState(null);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [dataId, setDataId] = useState(null);

//   const shop_load = parseInt(paginateModule?.status);
//   const pageShop = shop_load === 1 ? data?.page : page;

//   useEffect(() => {
//     setPage(1);
//     setHasMore(true);
//     setDataId(data);
//   }, [data]);

//   const styleCss = `
//     .grid-active {
//       color:  ${design.header_color};
//       border: 1px solid ${design.header_color};
//   }
//  `;

//   return (
//     <div>
//       <Location category={shops} />

//       <div className="sm:container px-5 sm:py-10 py-5">
//         <style>{styleCss}</style>
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
//           <div className=" hidden lg:block col-span-3 ">
//             <div className="w-full rounded-xl h-max p-4 shadow-2xl">
//               <h3 className="font-medium text-[#252525] text-xl px-4 mb-4 ">
//                 Categories
//               </h3>
//               {category?.map((item) => (
//                 <SingleCat
//                   key={item?.id}
//                   item={item}
//                   select={select}
//                   setSelect={setSelect}
//                 />
//               ))}
//             </div>
//             <div className="bg-white my-6 rounded-xl h-max p-4 shadow-2xl">
//               <FilterByColor
//                 id={data?.id}
//                 setActiveColor={setActiveColor}
//                 colors={colors}
//                 activeColor={activeColor}
//                 shop_load={shop_load}
//                 setPage={setPage}
//                 setHasMore={setHasMore}
//               />
//             </div>
//             <div className="bg-white rounded-xl h-max p-4 shadow-2xl">
//               <FilterByPrice
//                 id={data?.id}
//                 setVal={setVal}
//                 val={val}
//                 setPage={setPage}
//                 setHasMore={setHasMore}
//               />
//             </div>
//           </div>
//           <div className="col-span-1 lg:col-span-9 flex flex-col min-h-[100vh-200px] h-full ">
//             <Filter
//               onChange={(e) => {
//                 setSort(e.target.value);
//                 setPage(1);
//                 setHasMore(true);
//               }}
//               grid={grid}
//               setGrid={setGrid}
//               paginate={paginate}
//             />
//             <div className="flex-1">
//               <Product
//                 dataId={dataId}
//                 page={pageShop}
//                 sort={sort}
//                 grid={grid}
//                 products={products}
//                 setShops={setShops}
//                 setProducts={setProducts}
//                 setPaginate={setPaginate}
//                 setColors={setColors}
//                 activeColor={activeColor}
//                 val={val}
//                 setPage={setPage}
//                 shop_load={shop_load}
//                 setHasMore={setHasMore}
//                 hasMore={hasMore}
//               />
//             </div>
//             {shop_load === 1 && (
//               <div className="my-5">
//                 <Pagination data={data} paginate={paginate} />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryTwentyOne;

// const Product = ({
//   products,
//   grid,
//   sort,
//   page,
//   setProducts,
//   setPaginate,
//   setShops,
//   dataId,
//   setColors,
//   activeColor,
//   val,
//   setPage,
//   shop_load,
//   setHasMore,
//   hasMore,
// }) => {
//   const [load, setLoad] = useState(false);
//   const [error, setError] = useState(null);
//   const { category, subcategory } = useTheme();

//   useEffect(() => {
//     setLoad(true);
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     shop_load === 1 && page,
//     category,
//     dataId,
//     setPaginate,
//     setProducts,
//     setShops,
//     sort,
//     subcategory,
//     setColors,
//     activeColor,
//     val,
//   ]);

//   const fetchData = async () => {
//     // get the data from the api
//     const { colors, data } = await httpReq.post(
//       `getcatproducts${page ? (shop_load === 1 ? page : `?page=${page}`) : `?page=1`}&filter=${sort}&priceFilter=${Number(val) !== 0 ? Number(val) : ""}&colorFilter=${activeColor ? encodeURIComponent(activeColor) : ""}`,
//       { id: dataId?.id }
//     );
//     if (data?.data?.length == 0) {
//       const { colors, data, error } = await httpReq.post(
//         `getsubcatproduct${page ? (shop_load === 1 ? page : `?page=${page}`) : `?page=1`}&filter=${sort}&priceFilter=${Number(val) !== 0 ? Number(val) : ""}&colorFilter=${activeColor ? encodeURIComponent(activeColor) : ""}`,
//         { id: dataId?.id }
//       );
//       if (error) {
//         // console.log("hdfshsd");
//         setHasMore(false);
//         setLoad(false);
//         setPaginate(null);
//         if (!shop_load && page !== 1) {
//           setProducts([...products, ...data?.data]);
//         } else {
//           setProducts([]);
//           setPaginate(null);
//         }
//         setColors(colors);
//         return setError(error);
//       } else if (data?.data?.length > 0) {
//         setColors(colors);
//         setHasMore(true);

//         if (!shop_load) {
//           if (data?.current_page === 1) {
//             setProducts(data?.data);
//           } else {
//             setProducts([...products, ...data?.data]);
//           }
//           setPage(page + 1);
//         } else {
//           setProducts(data?.data);
//         }
//         setPaginate(data);
//         setLoad(false);
//         setError(null);
//         setShops(
//           subcategory?.find((c) => parseInt(c?.id) === parseInt(dataId?.id))
//         );
//       }
//     } else if (data?.data?.length > 0) {
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
//       setShops(category?.find((c) => parseInt(c?.id) === parseInt(dataId?.id)));
//       setColors(colors);
//     } else {
//       setHasMore(false);
//     }
//     setLoad(false);
//   };

//   if (load) {
//     return (
//       <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
//         <Skeleton />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
//         {error}
//       </div>
//     );
//   }
//   return (
//     <>
//       {!shop_load ? (
//         <div>
//           <InfiniteScroll
//             style={{ height: "auto", overflow: "hidden" }}
//             dataLength={products?.length}
//             next={fetchData}
//             hasMore={hasMore}
//             loader={
//               <div className="flex justify-center items-center">
//                 <ThreeDots
//                   height="80"
//                   width="80"
//                   radius="9"
//                   color="#f1593a"
//                   ariaLabel="three-dots-loading"
//                   wrapperStyle={{}}
//                   wrapperClassName=""
//                   visible={true}
//                 />
//               </div>
//             }
//             endMessage={
//               <p className="text-center mt-5 text-xl font-bold pb-3">
//                 No More Products
//               </p>
//             }
//           >
//             {grid === "H" && (
//               <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-4">
//                 {products.map((item) => (
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     exit={{ scale: 0 }}
//                     transition={{ duration: 0.5, ease: "linear" }}
//                   >
//                     <Card45 item={item} />
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//             <AnimatePresence>
//               {grid === "V" && (
//                 <div className="grid grid-cols-1 gap-1 sm:gap-4">
//                   {products.map((item) => (
//                     <motion.div
//                       initial={{ translateX: 200 }}
//                       animate={{ translateX: 0 }}
//                       transition={{
//                         duration: 0.5,
//                         ease: "linear",
//                         type: "tween",
//                       }}
//                     >
//                       <Card6 item={item} />
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </AnimatePresence>
//           </InfiniteScroll>
//         </div>
//       ) : (
//         <div>
//           {grid === "H" && (
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-4">
//               {products.map((item) => (
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   exit={{ scale: 0 }}
//                   transition={{ duration: 0.5, ease: "linear" }}
//                 >
//                   <Card45 item={item} />
//                 </motion.div>
//               ))}
//             </div>
//           )}
//           <AnimatePresence>
//             {grid === "V" && (
//               <div className="grid grid-cols-1 gap-1 sm:gap-4">
//                 {products.map((item) => (
//                   <motion.div
//                     initial={{ translateX: 200 }}
//                     animate={{ translateX: 0 }}
//                     transition={{
//                       duration: 0.5,
//                       ease: "linear",
//                       type: "tween",
//                     }}
//                   >
//                     <Card6 item={item} />
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </AnimatePresence>
//         </div>
//       )}
//     </>
//   );
// };

// const Location = ({ category }) => {
//   return (
//     <div className="w-full bg-[#f1f1f1] flex flex-col justify-center items-center py-5 mb-5">
//       <h1 className="text-3xl font-medium ">Product</h1>
//       <div className="flex items-center gap-1">
//         <p>Home</p>
//         <p>/ {category?.name}</p>
//       </div>
//     </div>
//   );
// };

// const Filter = ({ paginate, onChange, setGrid, grid }) => {
//   return (
//     <div className="border-t border-b border-[#f1f1f1] py-3 mb-5 flex flex-wrap justify-between items-center px-2">
//       <div className="text-gray-500 font-medium">
//         Showing {paginate?.from}-{paginate?.to} of {paginate?.total} results{" "}
//       </div>
//       <div className="flex items-center gap-1 mb-3 md:mb-0">
//         <div
//           onClick={() => setGrid("H")}
//           className={` rounded-full p-2 ${grid === "H" ? "grid-active" : "border"}`}
//         >
//           <IoGridSharp className="h-4 w-4 " />
//         </div>
//         <div
//           onClick={() => setGrid("V")}
//           className={`rounded-full p-2 ${grid === "V" ? "grid-active" : "border"}`}
//         >
//           <MenuIcon className="h-4 w-4" />
//         </div>
//       </div>
//       {/* Short by  */}
//       <div className="flex items-center gap-2 text-sm max-w-md w-full">
//         <label className="max-w-fit"> Sort by:</label>
//         <select
//           onChange={onChange}
//           className="h-9 border border-gray-200 rounded  outline-0 ring-0 focus:ring-0 text-xs flex-1 bg-white"
//         >
//           <option>Select One</option>
//           <option value="az">Name, A to Z</option>
//           <option value="za">Name, Z to A</option>
//           <option value="lh">Price, Low to High</option>
//           <option value="hl">Price, High to Low</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// const SingleCat = ({ item, setSelect, select }) => {
//   const [show, setShow] = useState(false);
//   return (
//     <div className="">
//       <div className="w-full border mb-2">
//         <div className="flex items-center px-4 py-3">
//           <NavLink
//             onClick={() => setSelect(item.id)}
//             to={"/category/" + item?.id}
//             className={`flex-1 text-lg font-medium ${select === item.id ? "text-red-500" : "text-gray-800"}`}
//           >
//             {" "}
//             <p>{item.name}</p>
//           </NavLink>
//           {item?.cat ? (
//             <div className="px-4 h-full">
//               {show ? (
//                 <MinusIcon
//                   onClick={() => setShow(!show)}
//                   className="h-4 w-4 lg:cursor-pointer text-gray-800"
//                 />
//               ) : (
//                 <PlusIcon
//                   onClick={() => setShow(!show)}
//                   className="h-4 w-4 lg:cursor-pointer text-gray-800"
//                 />
//               )}
//             </div>
//           ) : null}
//         </div>
//         {show && (
//           <>
//             <div className="">
//               {item?.cat?.map((sub) => (
//                 <div className="border-t">
//                   <NavLink
//                     onClick={() => setSelect(sub.id)}
//                     to={"/category/" + sub?.id}
//                   >
//                     {" "}
//                     <p
//                       className={`py-2 px-4 text-sm ${select === sub.id ? "text-red-500" : "text-gray-500"}`}
//                     >
//                       {sub?.name}
//                     </p>
//                   </NavLink>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
