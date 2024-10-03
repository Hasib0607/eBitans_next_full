import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function BlogPagination({ paginate, setPage, section_id }: any) {
  return (
    <div className=" px-4 py-3 flex items-center justify-between sm:px-6">
      <div className="flex-1 flex items-center justify-center">
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {paginate?.map((item: any, id: any) => {
              return (
                <a key={id} href={`/resources/blogs#${section_id}`}>
                  <div>
                    <button
                      onClick={() => setPage(item?.url)}
                      disabled={!item?.url}
                      aria-current="page"
                      className={`${item?.active ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"} ${item?.url ? "lg:cursor-pointer" : "cursor-not-allowed opacity-50"}  relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                    >
                      {item.label.includes("pagination.previous") ? (
                        <IoIosArrowBack
                          className="text-xl"
                          aria-hidden="true"
                        />
                      ) : item.label.includes("pagination.next") ? (
                        <IoIosArrowForward
                          className="text-xl"
                          aria-hidden="true"
                        />
                      ) : (
                        item?.label
                      )}
                    </button>
                  </div>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
