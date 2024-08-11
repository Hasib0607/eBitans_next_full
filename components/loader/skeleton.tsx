import React from "react";

const Skeleton = () => {
  return (
    <div>
      <section className="bg-white ">
        <div className="sm:container px-5 sm:py-10 py-5 mx-auto animate-pulse">
          {/* <performance className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700" /> */}

          <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
          <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

              <p className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

              <p className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

              <p className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

              <p className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

              <p className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

              <p className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

              <p className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

              <p className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skeleton;
