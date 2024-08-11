// "use client";
// /* eslint-disable no-cond-assign */
// /* eslint-disable jsx-a11y/no-redundant-roles */

// import useTheme from "@/hooks/use-theme";
// import { removeToCartList } from "@/redux/features/product.slice";
// import { productImg } from "@/site-settings/siteUrl";
// import { Dialog, Transition } from "@headlessui/react";
// import { TrashIcon } from "@heroicons/react/24/outline";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Fragment, useEffect, useState } from "react";
// import { GiShoppingCart } from "react-icons/gi";
// import { useDispatch, useSelector } from "react-redux";
// import { XIcon } from "react-share";
// import { toast } from "react-toastify";
// import "./six.css";

// const CartPopUpSix = () => {
//   const { design } = useTheme();
//   const [open, setOpen] = useState(false);
//   const [active, setActive] = useState(false);
//   const cartList = useSelector((state: any) => state.cart.cartList);

//   useEffect(() => {
//     if (cartList.length > 0) {
//       setActive(true);
//       setTimeout(() => {
//         setActive(false);
//       }, 1000);
//     } else {
//       return setActive(false);
//     }
//   }, [cartList.length]);

//   return (
//     <>
//       <div
//         className={`${
//           open
//             ? "invisible opacity-0 "
//             : "invisible sm:opacity-100 relative  lg:visible transition-all duration-1000 ease-linear"
//         } `}
//       >
//         <div
//           onClick={() => setOpen(!open)}
//           className={`${
//             active === true ? "second_button" : ""
//           } fixed z-30 h-20 p-2 right-10 bottom-10  shadow-lg rounded-md lg:cursor-pointer md:block w-20 pb-3`}
//           style={{ backgroundColor: design?.header_color }}
//         >
//           <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
//             <GiShoppingCart
//               style={{ color: design?.text_color }}
//               className="font-semibold text-5xl"
//             />
//           </div>

//           <span
//             className={`${
//               active === true ? "first_button" : ""
//             } font-semibold text-sm  ab absolute -top-[10px] -right-1 rounded-full w-5 h-5 text-center`}
//             style={{
//               backgroundColor: design?.text_color,
//               color: design?.header_color,
//             }}
//           >
//             {cartList.length}
//           </span>
//         </div>

//         {/*
//          */}
//       </div>
//       <Drawer open={open} setOpen={setOpen}>
//         <ShoppingCart setOpen={setOpen} />
//       </Drawer>
//     </>
//   );
// };

// export default CartPopUpSix;

// const ShoppingCart = ({ setOpen }: any) => {
//   const cartList = useSelector((state: any) => state.cart.cartList);

//   const priceList = cartList?.map(
//     (p: any) => parseInt(p.qty) * parseInt(p.price)
//   );
//   const total = priceList.reduce(
//     (previousValue: any, currentValue: any) => previousValue + currentValue,
//     0
//   );
//   const { design } = useTheme();
//   return (
//     <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//       <div className="flex-1 ">
//         <div className="flex items-start justify-between bg-black py-3 px-3 ">
//           <Dialog.Title className="text-lg font-medium text-white uppercase">
//             {" "}
//             Your Cart{" "}
//           </Dialog.Title>
//           <XIcon
//             onClick={() => setOpen(false)}
//             color={"white"}
//             className="h-6 w-6"
//             aria-hidden="true"
//           />
//         </div>

//         <div className="my-20 mb-24 px-6">
//           <div className="flow-root">
//             <ul role="list" className="-my-6 divide-y divide-gray-200">
//               {cartList?.map((product: any, id: any) => (
//                 <SingleCartProduct key={id} product={product} />
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col border border-t border-gray-100 w-full ">
//         <div className="grid grid-cols-2 bg-white shadow-lg py-3 px-6">
//           <p className="text-sm font-medium text-gray-900 text-right">Total</p>
//           <p className="text-sm font-medium text-gray-900 text-right">
//             {parseInt(total)} BDT
//           </p>
//         </div>

//         <Link
//           onClick={() => setOpen(false)}
//           href="/checkout"
//           className="w-full flex justify-center items-center py-2"
//           style={{
//             color: design?.text_color,
//             backgroundColor: design?.header_color,
//           }}
//         >
//           <p className="text-center text-base font-bold">Checkout</p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export const Drawer = ({ open, setOpen, children }: any) => {
//   return (
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog as="div" className="relative z-30" onClose={setOpen}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-in-out duration-500"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in-out duration-500"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//               <Transition.Child
//                 as={Fragment}
//                 enter="transform transition ease-in-out duration-500 sm:duration-700"
//                 enterFrom="translate-x-full"
//                 enterTo="translate-x-0"
//                 leave="transform transition ease-in-out duration-500 sm:duration-700"
//                 leaveFrom="translate-x-0"
//                 leaveTo="translate-x-full"
//               >
//                 <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
//                   {children}
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };

// const SingleCartProduct = ({ product }: any) => {
//   const dispatch = useDispatch();
//   const deleteBtn = () => {
//     toast("Remove from cart this item", {
//       type: "warning",
//       autoClose: 1000,
//     });
//   };
//   return (
//     <motion.li exit={{ y: 10 }} key={product.id} className="flex py-6">
//       <div className="h-[65px] w-[65px] mr-4 flex-shrink-0 overflow-hidden rounded-md ">
//         <img
//           src={productImg + product.image[0]}
//           alt={product.name}
//           className="h-full w-full object-cover object-center"
//         />
//       </div>

//       <div className="ml-4 flex flex-1 flex-col">
//         <div>
//           <div className="flex justify-between items-center text-base  text-gray-900">
//             <Link
//               href={"/product/" + product?.id + "/" + product?.slug}
//               className="focus:outline-none font-bold"
//             >
//               {" "}
//               {product?.name}{" "}
//             </Link>

//             <div className="ml-4 min-w-fit lg:cursor-pointer">
//               <TrashIcon
//                 onClick={() => {
//                   dispatch(removeToCartList(product?.cartId));
//                   deleteBtn();
//                 }}
//                 width={15}
//                 className={"text-gray-700"}
//               />{" "}
//             </div>
//           </div>
//           <div className="flex items-center my-1">
//             {product?.color ? (
//               <div className="flex items-center gap-2 pr-2">
//                 <p className="font-semibold text-sm">Color: </p>
//                 <p
//                   style={{ backgroundColor: product?.color }}
//                   className="w-4 h-4 rounded-full ring-1 ring-offset-2 ring-gray-600"
//                 ></p>
//               </div>
//             ) : null}
//             {product?.size ? (
//               <p className="font-semibold text-sm">
//                 Size:{" "}
//                 <span className="font-normal text-sm">{product?.size}</span>
//               </p>
//             ) : null}
//             {product?.unit ? (
//               <p className="font-semibold text-sm">
//                 Unit:{" "}
//                 <span className="font-normal text-sm">
//                   {product?.volume + " " + product?.unit}
//                 </span>
//               </p>
//             ) : null}
//           </div>
//         </div>
//         <div className="flex flex-1 items-end justify-start text-sm">
//           {/* <p className="text-gray-500">Qty {product.qty}</p> */}
//           <p className="text-gray-900 font-bold flex text-center text-sm">
//             {parseInt(product?.regular_price)} BDT {product?.qty} ={" "}
//             {parseInt(product?.regular_price) * parseFloat(product?.qty)} BDT
//           </p>
//         </div>
//       </div>
//     </motion.li>
//   );
// };

/* eslint-disable no-cond-assign */
/* eslint-disable jsx-a11y/no-redundant-roles */

import useTheme from "@/hooks/use-theme";
import { removeToCartList } from "@/redux/features/product.slice";
import { productImg } from "@/site-settings/siteUrl";
import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./six.css";

const CartPopUpSix = () => {
  const { design } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const cartList = useSelector((state: any) => state.cart.cartList);

  useEffect(() => {
    if (cartList.length > 0) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 1000);
    } else {
      return setActive(false);
    }
  }, [cartList.length]);

  return (
    <>
      <div
        className={`${
          open
            ? "invisible opacity-0 "
            : "invisible sm:opacity-100 relative  lg:visible transition-all duration-1000 ease-linear"
        } `}
      >
        <div
          onClick={() => setOpen(!open)}
          className={`${
            active === true ? "second_button" : ""
          } fixed z-30 h-20 p-2 right-10 bottom-10  shadow-lg rounded-md lg:cursor-pointer md:block w-20 pb-3`}
          style={{ backgroundColor: design?.header_color }}
        >
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
            <GiShoppingCart
              style={{ color: design?.text_color }}
              className="font-semibold text-5xl"
            />
          </div>

          <span
            className={`${
              active === true ? "first_button" : ""
            } font-semibold text-sm  ab absolute -top-[10px] -right-1 rounded-full w-5 h-5 text-center`}
            style={{
              backgroundColor: design?.text_color,
              color: design?.header_color,
            }}
          >
            {cartList.length}
          </span>
        </div>

        {/*
         */}
      </div>
      <Drawer open={open} setOpen={setOpen}>
        <ShoppingCart setOpen={setOpen} />
      </Drawer>
    </>
  );
};

export default CartPopUpSix;

const ShoppingCart = ({ setOpen }: any) => {
  const cartList: any = useSelector((state: any) => state.cart.cartList);

  const priceList = cartList?.map((p: any) => p.qty * p.price);
  const total = priceList.reduce(
    (previousValue: any, currentValue: any) => previousValue + currentValue,
    0
  );
  const { design } = useTheme();
  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1 ">
        {/* fixed top-0 right-0 left-0 */}
        <div className="flex items-start justify-between bg-black py-3 px-3 ">
          <Dialog.Title className="text-lg font-medium text-white uppercase">
            {" "}
            Your Cart{" "}
          </Dialog.Title>
          <XMarkIcon
            onClick={() => setOpen(false)}
            width={20}
            color={"white"}
            className="h-6 w-6"
            aria-hidden="true"
          />
        </div>

        <div className="my-20 mb-24 px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartList?.map((product: any, id: any) => (
                <SingleCartProduct key={id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* fixed bottom-0 left-0 right-0 */}
      <div className="flex flex-col border border-t border-gray-100 w-full ">
        <div className="grid grid-cols-2 bg-white shadow-lg py-3 px-6">
          <p className="text-sm font-medium text-gray-900 text-right">Total</p>
          <p className="text-sm font-medium text-gray-900 text-right">
            {total} BDT
          </p>
        </div>

        <Link
          onClick={() => setOpen(false)}
          href="/checkout"
          className="w-full flex justify-center items-center py-2"
          style={{
            color: design?.text_color,
            backgroundColor: design?.header_color,
          }}
        >
          <p className="text-center text-base font-bold">Checkout</p>
        </Link>
      </div>
    </div>
  );
};

export const Drawer = ({ open, setOpen, children }: any) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const SingleCartProduct = ({ product }: any) => {
  const dispatch = useDispatch();
  const deleteBtn = () => {
    toast("Remove from cart this item", {
      type: "warning",
      autoClose: 1000,
    });
  };
  return (
    <motion.li exit={{ y: 10 }} key={product.id} className="flex py-6">
      <div className="h-[65px] w-[65px] mr-4 flex-shrink-0 overflow-hidden rounded-md ">
        <img
          src={productImg + product.image[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between items-center text-base  text-gray-900">
            <Link
              href={"/product/" + product?.id + "/" + product?.slug}
              className="focus:outline-none font-bold"
            >
              {" "}
              {product?.name}{" "}
            </Link>

            <div className="ml-4 min-w-fit lg:cursor-pointer">
              <TrashIcon
                onClick={() => {
                  dispatch(removeToCartList(product?.cartId));
                  deleteBtn();
                }}
                width={15}
                className={"text-gray-700"}
              />{" "}
            </div>
          </div>
          <div className="flex items-center my-1">
            {product?.color ? (
              <div className="flex items-center gap-2 pr-2">
                <p className="font-semibold text-sm">Color: </p>
                <p
                  style={{ backgroundColor: product?.color }}
                  className="w-4 h-4 rounded-full ring-1 ring-offset-2 ring-gray-600"
                ></p>
              </div>
            ) : null}
            {product?.size ? (
              <p className="font-semibold text-sm">
                Size:{" "}
                <span className="font-normal text-sm">{product?.size}</span>
              </p>
            ) : null}
            {product?.unit ? (
              <p className="font-semibold text-sm">
                Unit:{" "}
                <span className="font-normal text-sm">
                  {product?.volume + " " + product?.unit}
                </span>
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-1 items-end justify-start text-sm">
          {/* <p className="text-gray-500">Qty {product.qty}</p> */}
          <p className="text-gray-900 flex text-center text-sm">
            {parseInt(product?.price)} BDT{" "}
            <XMarkIcon width={15} className="mx-1" /> {product?.qty} ={" "}
            {parseInt(product?.price) * product?.qty} BDT
          </p>
        </div>
      </div>
    </motion.li>
  );
};
