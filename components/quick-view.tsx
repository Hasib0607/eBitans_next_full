import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CgClose } from "react-icons/cg";

export default function QuikView({ children, open, setOpen, design }: any) {
  const cancelButtonRef = useRef(null);
  function closeModal() {
    setOpen(false);
  }

  const styleCss = `
    ::-webkit-scrollbar {
        width: 3px;
      }
  `;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 flex justify-center items-center">
          <div className="flex relative items-end sm:items-center justify-center h-full max-h-[70vh] lg:max-w-[60%] max-w-[90%] w-full p-4 sm:p-0">
            <div
              onClick={closeModal}
              className="absolute -top-6 -right-4 lg:cursor-pointer h-6 w-6 rounded-full bg-red-500 flex justify-center items-center z-[100]"
            >
              <CgClose className="text-lg font-medium text-white" />
            </div>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`${
                  design?.template_id === "34" ? "bg-thirty-one" : "bg-white"
                } rounded-lg text-left h-full overflow-y-auto scrollbar-thin shadow-xl transform transition-all sm:container px-5 py-5`}
              >
                <style>{styleCss}</style>
                <div
                  className={`sm:text-left w-full ${
                    design?.template_id === "34" ? "bg-thirty-one" : "bg-white"
                  }`}
                >
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
