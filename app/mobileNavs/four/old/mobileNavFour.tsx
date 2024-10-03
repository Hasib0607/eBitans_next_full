// "use client";
// import {
//   HomeIcon,
//   MagnifyingGlassIcon,
//   ShoppingCartIcon,
//   UserIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/solid";
// import React, { useState } from "react";
// import Link from "next/link";
// import { BottomCart } from "@/components/shopping-cart/cart-popup-three";
// import { motion, AnimatePresence } from "framer-motion";
// import { MinusIcon, PlusIcon,  } from "@heroicons/react/24/outline";
// import useTheme from "@/hooks/use-theme";
// import { useSelector } from "react-redux";
// import Search from "@/components/headers/header-seven/search";
// import { iconImg } from "@/site-settings/siteUrl";

// const MobileNavFour = () => {
//   const { category, design } = useTheme();
//   const [cart, setCart] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [searchshow, setSearchshow] = useState(false);

//   const cartList = useSelector((state:any) => state.cart.cartList);

//   const styleCss = `

//       .cart-color {
//           background: ${design?.header_color};
//           color: ${design?.text_color};
//        }

//       `;

//   return (
//     <>
//       <style>{styleCss}</style>
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
//         ></div>
//       )}
//       <div className="lg:hidden h-[65px] bg-white shadow-lg drop-shadow-xl border border-t border-gray-100 grid grid-cols-5 px-1 items-center fixed bottom-0 left-0 right-0 z-10 py-2">
//         <div
//           onClick={() => {
//             setOpen(!open);
//             setSearchshow(false);
//           }}
//           className={
//             "rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
//           }
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="sm:h-5 h-4"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
//             />
//           </svg>
//           {/* <ViewGridIcon className="sm:h-5 h-4" /> */}
//           <h3 className="font-semibold sm:text-base text-xs">Category</h3>
//         </div>
//         <div
//           onClick={() => {
//             setSearchshow(!searchshow);
//             setOpen(false);
//           }}
//           className={
//             "rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
//           }
//         >
//           <MagnifyingGlassIcon className="sm:h-5 h-4" />
//           <h3 className="font-semibold sm:text-base text-xs">Search</h3>
//         </div>
//         <Link
//           onClick={() => setOpen(false)}
//           href="/"
//           className={
//             "rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
//           }
//         >
//           <HomeIcon className="sm:h-5 h-4" />
//           <h3 className="font-semibold sm:text-base text-xs">Home</h3>
//         </Link>
//         <div
//           onClick={() => {
//             setCart(!cart);
//             setOpen(false);
//           }}
//           className={
//             "rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
//           }
//         >
//           <div className="relative">
//             <ShoppingCartIcon className="sm:h-5 h-4" />
//             <h3 className="font-semibold sm:text-base text-xs">Cart</h3>
//             {cartList.length > 0 && (
//               <div className="sm:h-6 h-4 w-4 sm:w-6 absolute top-0 -right-2 rounded-full cart-color flex items-center justify-center">
//                 <p className="sm:text-sm text-xs">{cartList.length}</p>
//               </div>
//             )}
//           </div>
//           <BottomCart open={cart} setOpen={setCart} />
//         </div>
//         <Link
//           onClick={() => setOpen(false)}
//           href={"/profile"}
//           className={
//             "rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
//           }
//         >
//           <UserIcon className="sm:h-5 h-4" />
//           <h3 className="font-semibold sm:text-base text-xs">User</h3>
//         </Link>
//       </div>

//       {/* tablet and mobile view  */}

//       <div className={`px-4 z-[7]`}>
//         <ul
//           className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-[7] lg:cursor-pointer ${
//             open ? "left-0 " : "left-[-140%] "
//           }`}
//         >
//           <div className="pb-7 pt-3 px-6">
//             <div className=" text-xl border-b-[2px] pb-5 text-center text-color flex justify-between items-center">
//               <p className="">Category</p>
//               <XMarkIcon onClick={() => setOpen(!open)} className="h-8" />
//             </div>
//             <div className="flex flex-col gap-3 w-[90%]">
//               {category?.map((item:any) => (
//                 <SingleCat
//                   key={item?.id}
//                   item={item}
//                   open={open}
//                   setOpen={setOpen}
//                 />
//               ))}
//             </div>
//           </div>
//         </ul>
//       </div>

//       <AnimatePresence>
//         {searchshow && <SearchDiv setSearchshow={setSearchshow} />}
//       </AnimatePresence>
//     </>
//   );
// };

// export default MobileNavFour;

// // Define the props interface for SearchDiv
// interface SearchDivProps {
//   setSearchshow: (show: boolean) => void; // Function to set the visibility of the search
// }

// const SearchDiv: React.FC<SearchDivProps> = ({ setSearchshow }) => {
//   const [searchTxt, setSearchTxt] = useState("");

//   return (
//     <>
//       <div
//         onClick={() => setSearchshow(false)}
//         className="fixed top-0 bottom-0 left-0 right-0 text-right"
//       ></div>
//       <motion.nav
//         initial={{ y: -42, opacity: 0 }}
//         animate={{ y: 42, opacity: 1 }}
//         exit={{ y: 74, opacity: 0 }}
//         transition={{ ease: "easeOut", duration: 0.8 }}
//         className="w-full h-8 fixed px-2 -top-9 left-0 right-0 z-[11]"
//       >
//         <input
//           type="text"
//           value={searchTxt}
//           onChange={(e) => setSearchTxt(e.target.value)}
//           className="w-full py-3 rounded-md px-10 border-0 outline-0 focus:outline-0 focus:border focus:border-gray-300 z-10 focus:ring-0"
//           placeholder="Search"
//         />
//         <MagnifyingGlassIcon className="h-5 w-5 absolute top-4 left-4 font-bold z-10" />
//         <XMarkIcon
//           onClick={() => {
//             setSearchTxt("");
//             setSearchshow(false);
//           }}
//           className="h-4 w-4 absolute top-4 right-4 font-bold z-[4]"
//         />
//         <div className="w-[95%] absolute top-10 left-1/2 -translate-x-1/2 ">
//           {searchTxt && <Search search={searchTxt} setSearch={setSearchTxt} />}
//         </div>
//       </motion.nav>
//     </>
//   );
// };
// ;
// // gpt code start
// interface SubCategory {
//     id: number;
//     icon: string;
//     name: string;
//   }

//   interface Category {
//     id: number;
//     icon: string;
//     name: string;
//     cat?: SubCategory[];
//   }

//   interface SingleCatProps {
//     item: Category;           // Use the defined Category type here
//     open: boolean;
//     setOpen: (open: boolean) => void;
//   }

//   const SingleCat: React.FC<SingleCatProps> = ({ item, open, setOpen }) => { //gpt code end
//   const [show, setShow] = useState(false);
//   return (
//     <>
//       <div className="w-full flex py-3 lg:cursor-pointer">
//         <Link
//           onClick={() => setOpen(!open)}
//           href={"/category/" + item.id}
//           className="flex-1 flex items-center gap-x-2 text-sm text-gray-900 font-medium w-max"
//         >
//           <img src={iconImg + item?.icon} alt="" className="h-5" />
//           <p>{item.name}</p>
//         </Link>
//         {item?.cat ? (
//           <div className="px-4 h-full">
//             {show ? (
//               <MinusIcon
//                 onClick={() => setShow(!show)}
//                 className="h-4 w-4 text-gray-800"
//               />
//             ) : (
//               <PlusIcon
//                 onClick={() => setShow(!show)}
//                 className="h-4 w-4 text-gray-800"
//               />
//             )}
//           </div>
//         ) : null}
//       </div>

//       {show && (
//         <>
//           <div className="ml-8">
//             {item?.cat?.map((sub:any) => (
//               <div className="py-2">
//                 <Link
//                   onClick={() => setOpen(!open)}
//                   href={"/category/" + sub?.id}
//                   className="flex items-center gap-x-2 pb-2"
//                 >
//                   <img src={iconImg + sub?.icon} alt="" className="h-5" />
//                   <p className="text-sm text-gray-500">{sub?.name}</p>
//                 </Link>
//                 <div className="pr-4">
//                   <div className="h-[1px] bg-gray-200 w-full"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </>
//   );
// };
