"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({ setPage, paginate }: any) {
  const scroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div className=" px-4 py-3 flex items-center justify-between sm:px-6">
      <div className="flex-1 flex items-center justify-center">
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {paginate?.links?.map((item: any, id: any) => {
              return (
                <div key={id}>
                  <button
                    disabled={!item?.url}
                    onClick={() => {
                      setPage(item?.url);
                      scroll();
                    }}
                    aria-current="page"
                    className={`${
                      item?.active
                        ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    } ${
                      item?.url
                        ? "lg:cursor-pointer"
                        : "cursor-not-allowed opacity-50"
                    }  relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                  >
                    {item.label.includes("Previous") ? (
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    ) : item.label.includes("Next") ? (
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      item?.label
                    )}
                  </button>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
