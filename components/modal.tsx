import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CgClose } from "react-icons/cg";

export default function MyModal({
  isOpen,
  onFileChange,
  closeModal,
  handleFile,
  setDescription,
  files,
  index,
}: any) {
  const file = files.find((i: any) => i.cartId === index);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                  <>
                    <div className="p-10 space-y-10">
                      <div>
                        <input
                          className="focus:outline-none focus:border-0 focus:ring-0"
                          type="file"
                          name="files"
                          accept=".ai, .psd, .pdf, .jpg, .jpeg, .png, .webp"
                          multiple
                          onChange={(e) => onFileChange(e)}
                        />
                        {file?.files && <span>{file?.files.length} files</span>}
                      </div>
                      <div>
                        <textarea
                          onChange={(e) => setDescription(e.target.value)}
                          name=""
                          id=""
                          className="w-full"
                          placeholder="Please share your asking size, color and customize details"
                        >
                          {file?.description && file?.description}
                        </textarea>
                        <button
                          onClick={() => {
                            closeModal();
                            handleFile();
                          }}
                          className="px-4 py-1 bg-green-500 rounded-md mt-2"
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                  </>
                  <div
                    onClick={closeModal}
                    className="absolute -top-4 -right-4 lg:cursor-pointer h-6 w-6 rounded-full bg-red-500 flex justify-center items-center"
                  >
                    <CgClose className="text-lg font-medium text-white" />
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
