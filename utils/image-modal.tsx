import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CgClose } from "react-icons/cg";

export default function ImageModal({ open, children, setOpen }: any) {
  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-95" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform bg-white text-left align-middle shadow-xl transition-all relative">
                  <>{children}</>
                  <div
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 lg:cursor-pointer h-6 w-6 flex justify-center items-center"
                  >
                    <CgClose className="text-lg font-medium text-black" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
