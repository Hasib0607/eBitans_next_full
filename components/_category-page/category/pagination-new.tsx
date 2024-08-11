import React, { useEffect, useState } from "react";

const PaginationComponent = ({ lastPage, setPage, initialPage }: any) => {
  const [activePage, setActivePage] = useState(initialPage); // Track the active page
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  const handlePageClick = (page: any) => {
    setPage(page);
    setActivePage(page); // Update the active page state
  };

  useEffect(() => {
    // Scroll to the top when activePage changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]); // Trigger effect on activePage change

  return (
    <div className="flex justify-center items-center gap-5">
      <button
        onClick={() => handlePageClick(1)}
        className={`px-3 py-2 rounded ${
          activePage === 1
            ? "bg-blue-500 text-white cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        disabled={activePage === 1} // Disable the button if it's the active page
      >
        &lt;
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-3 py-2 rounded ${
            activePage === page
              ? "bg-blue-500 text-white cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          disabled={activePage === page} // Disable the button if it's the active page
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageClick(lastPage)}
        className={`px-3 py-2 rounded ${
          activePage === lastPage
            ? "bg-blue-500 text-white cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        disabled={activePage === lastPage} // Disable the button if it's the active page
      >
        &gt;
      </button>
    </div>
  );
};

export default PaginationComponent;
