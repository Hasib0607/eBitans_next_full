import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Pagination({ data, paginate }: any) {
  const scroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div className=" px-4 py-3 flex items-center justify-between sm:px-6">
      <div className="flex-1 flex items-center justify-center">
        <div>
          <nav
            className="relative z-0 flex flex-wrap rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {paginate?.links?.map((item: any, id: any) => {
              return (
                <div key={id}>
                  <Link
                    href={
                      !item?.url
                        ? ""
                        : `/category/${data?.id}=${encodeURIComponent(
                            item?.url
                          )}`
                    }
                  >
                    <button
                      disabled={!item?.url}
                      onClick={() => scroll()}
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
                      {item.label.includes("pagination.previous") ? (
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : item.label.includes("pagination.next") ? (
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        item?.label
                      )}
                    </button>
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
