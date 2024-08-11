"use client";

import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useTheme from "@/hooks/use-theme";
import Link from "next/link";
import { productImg } from "@/site-settings/siteUrl";
import { decrementQty, incrementQty } from "@/redux/features/product.slice";
import { ToastContainer, toast } from "react-toastify";

const CartPopUpThree = () => {
  const { design } = useTheme();
  const [open, setOpen] = useState(false);
  const cartList = useSelector((state: any) => state.cart.cartList);

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
          className="fixed z-30 p-2 right-6 bottom-20  shadow-lg rounded-full lg:cursor-pointer md:block w-20 h-20 pb-3"
          style={{ backgroundColor: design?.header_color }}
        >
          <div className="flex flex-col justify-center items-center  ">
            <div className="flex justify-center gap-x-1 items-center">
              <ShoppingBagIcon
                width={25}
                color={design?.text_color}
                className="font-semibold text-sm"
              />
            </div>
            <h3 style={{ color: design?.text_color }} className="font-bold m-0">
              Cart
            </h3>
            <span
              className="text-sm  font-bold ab absolute -top-[4px] right-0 rounded-full w-5 h-5 text-center"
              style={{
                backgroundColor: design?.text_color,
                color: design?.header_color,
              }}
            >
              {cartList.length}
            </span>
          </div>
        </div>
      </div>
      <BottomCart open={open} setOpen={setOpen} />
      <ToastContainer />
    </>
  );
};

export default CartPopUpThree;

export const BottomCart = (props: any) => {
  return (
    <Drawer {...props}>
      <ShoppingCart {...props} />
    </Drawer>
  );
};

export const Drawer = ({ open, setOpen, children }: any) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[110]" onClose={setOpen}>
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

const ShoppingCart = ({ setOpen }: any) => {
  const cartList = useSelector((state: any) => state.cart.cartList);
  const priceList = cartList?.map((p: any) => Number(p.qty) * Number(p.price));
  const total = priceList.reduce(
    (previousValue: any, currentValue: any) => previousValue + currentValue,
    0
  );

  const { design } = useTheme();

  return (
    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl relative">
      <div className="flex-1">
        <div className="flex items-start justify-between bg-black py-3 px-3  top-0  right-0 w-full">
          <Dialog.Title className="text-lg font-medium text-white uppercase">
            {" "}
            Your Cart
          </Dialog.Title>
          <XMarkIcon
            onClick={() => setOpen(false)}
            width={20}
            color={"white"}
            className="h-6 w-6 lg:cursor-pointer"
            aria-hidden="true"
          />
        </div>

        <div className="my-[80px] px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cartList?.map((product: any) => (
                <SingleCartProduct
                  key={product?.id}
                  product={product}
                  setOpen={setOpen}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className=" flex justify-center bottom-0 right-0 w-full">
        <Link
          onClick={() => setOpen(false)}
          href="/checkout"
          className="w-full flex justify-between items-center py-4 divide-x-2 my-3 mx-6 px-6 rounded-md"
          style={{
            color: design?.text_color,
            backgroundColor: design?.header_color,
          }}
        >
          <p className="sm:text-base text-sm font-bold ">
            {design?.template_id === "29" ? "অর্ডার করুন" : "Checkout"}
          </p>{" "}
          <p className="pl-4 sm:text-base text-sm">{total} BDT</p>
        </Link>
      </div>
    </div>
  );
};

const SingleCartProduct = ({ product, setOpen }: any) => {
  const dispatch = useDispatch();

  const { design } = useTheme();
  const deleteBtn = () => {
    toast("Remove from cart this item", {
      type: "warning",
      autoClose: 1000,
    });
    setOpen(true);
  };

  const addCartBtn = () => {
    toast("Successfully you have to added cart", {
      type: "success",
      autoClose: 1000,
    });
  };
  // console.log(product, 'product');
  return (
    <motion.li
      initial={{ y: 0, opacity: 1 }}
      // exit={{ y: 10, opacity: 0, transition: 2 }}
      key={product?.id}
      className="py-6"
    >
      <div className="flex">
        <div className="h-[70px] w-[62px] sm:h-[112px] sm:w-[112px] mr-4 flex-shrink-0 overflow-hidden rounded-xl ">
          <img
            src={productImg + product?.image[0]}
            alt={product?.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex justify-around flex-col">
          <div className="flex flex-col">
            <Link
              href={"/product/" + product?.id + "/" + product?.slug}
              className="sm:text-sm text-xs text-gray-900 focus:outline-none"
            >
              {" "}
              {product?.name}{" "}
            </Link>
            <div className="flex items-center">
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
            <p className="sm:text-sm text-xs text-gray-600">
              Unit Price: {parseInt(product?.price)} BDT
            </p>
          </div>
          <div className="hidden sm:flex gap-3 items-center justify-between text-sm">
            <div
              className="flex h-9 w-24 justify-between items-center rounded-md font-semibold"
              style={{
                backgroundColor: design?.header_color,
                color: design?.text_color,
              }}
            >
              <div
                onClick={() => {
                  dispatch(decrementQty(product?.cartId));
                  deleteBtn();
                }}
                className="hover:bg-gray-800 hover:rounded-md lg:cursor-pointer py-2 h-full w-8 flex justify-center items-center"
              >
                <MinusIcon color={design?.text_color} width={15} />
              </div>
              <div
                style={{ color: design?.text_color }}
                className={"text-gray-700"}
              >
                {product?.qty}
              </div>
              <div
                onClick={() => {
                  dispatch(incrementQty(product?.cartId));
                  addCartBtn();
                }}
                className="hover:bg-gray-800 hover:rounded-md lg:cursor-pointer py-2 h-full w-8 flex justify-center items-center"
              >
                <PlusIcon color={`${design?.text_color}`} width={15} />
              </div>
            </div>
            <p className="text-gray-900 flex text-center font-semibold text-base">
              {" "}
              {parseInt(product?.price) * product?.qty} BDT
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-3 gap-3 justify-between text-sm sm:hidden">
        <div
          className="flex h-9 w-24 justify-between items-center rounded-md font-semibold"
          style={{
            backgroundColor: design?.header_color,
            color: design?.text_color,
          }}
        >
          <div className="hover:bg-gray-800 hover:rounded-md py-2 h-full w-8 flex justify-center items-center">
            <MinusIcon
              color={design?.text_color}
              onClick={() => dispatch(decrementQty(product?.cartId))}
              width={15}
            />
          </div>
          <div
            style={{ color: design?.text_color }}
            className={"text-gray-700"}
          >
            {product?.qty}
          </div>
          <div className="hover:bg-gray-800 hover:rounded-md py-2 h-full w-8 flex justify-center items-center">
            <PlusIcon
              color={`${design?.text_color}`}
              onClick={() => dispatch(incrementQty(product?.cartId))}
              width={15}
            />
          </div>
        </div>
        <p className="text-gray-900 flex text-center font-semibold text-base">
          {" "}
          {parseInt(product?.price) * product?.qty} BDT
        </p>
      </div>
    </motion.li>
  );
};
