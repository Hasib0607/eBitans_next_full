"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { motion, AnimatePresence } from "framer-motion";
import useTheme from "@/hooks/use-theme";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { iconImg } from "@/site-settings/siteUrl";

export default function Right({ open, setOpen }: any) {
  const { category } = useTheme();
  // const [open, setOpen] = useState(false)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-xs">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4"></div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900 flex justify-between items-center">
                        <p>Category</p>
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(!open)}
                        >
                          <span className="sr-only">Category</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div
                          className="h-full border-gray-200"
                          aria-hidden="true"
                        >
                          <aside className="" aria-label="Sidebar">
                            <div className="overflow-y-auto py-4 px-3  rounded dark:bg-gray-800">
                              <div className="space-y-2">
                                {category?.map((item: any) => (
                                  <Subcategory
                                    key={item?.id}
                                    item={item}
                                    setOpen={setOpen}
                                    open={open}
                                  />
                                ))}
                              </div>
                            </div>
                          </aside>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const Subcategory = ({ item, open, setOpen }: any) => {
  const [showSub, setShowSub] = useState(false);
  return (
    <div
      key={item.id}
      onMouseEnter={() => setShowSub(true)}
      onMouseLeave={() => setShowSub(false)}
    >
      <AnimatePresence>
        <Link
          onClick={() => setOpen(!open)}
          href={"/category/" + item.id}
          className="flex justify-between p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="flex">
            <img src={iconImg + item.icon} className={"h-6 w-6"} alt="" />

            <p className="ml-3">{item.name}</p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "linear" }}
          >
            {item?.cat ? (
              showSub ? (
                <ChevronDownIcon width={20} />
              ) : (
                <ChevronRightIcon width={20} />
              )
            ) : null}
          </motion.div>
        </Link>
        {showSub &&
          item?.cat &&
          item?.cat.map((sub: any) => (
            <motion.div
              key={sub?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "linear" }}
            >
              <Link
                onClick={() => setOpen(!open)}
                href={"/category/" + sub?.id}
                className="flex p-2 ml-4 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img src={iconImg + sub?.icon} className={"h-6 w-6"} alt="" />

                <p className="ml-3">{sub?.name}</p>
              </Link>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};
