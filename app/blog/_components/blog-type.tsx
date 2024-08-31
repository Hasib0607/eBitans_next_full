"use client";
import { useEffect, useState } from "react";
import { fetchTypeWiseBlogData } from "../helper/api";
import BlogCard from "./blog-card";
import BlogPagination from "./blog-pagination";

const BlogType = ({ blogTypeData }: any) => {
  const [blogType, setBlogType] = useState<any>("");
  const [blogTypeId, setBlogTypeId] = useState(1);
  const [typePage, setTypePage] = useState("?page=1");
  const [paginationType, setTypePagination] = useState(null);

  useEffect(() => {
    fetchTypeWiseBlogData(blogTypeId, typePage)
      .then((data) => {
        setBlogType(data?.blogTypes?.posts?.data);
        setTypePagination(data?.blogTypes?.posts?.links);
      })
      .catch((error) => {
        setBlogType([]);
        console.error("Error fetching data:", error);
      });
  }, [blogTypeId, typePage]);

  return (
    <>
      <div id="type-blog" className="flex flex-wrap gap-3 items-center mb-10">
        {blogTypeData?.map((blog: any) => (
          <p
            key={blog?.id}
            onClick={() => {
              setBlogTypeId(blog?.id);
              setTypePage("?page=1");
            }}
            className={`${blogTypeId === blog?.id ? "bg-[#f1593a] text-white" : "bg-gray-200 text-[#f1593a]"} text-xl  font-semibold  hover:bg-[#f1593a] hover:text-white duration-300 lg:cursor-pointer border px-5 py-2`}
          >
            {blog?.type}
          </p>
        ))}
      </div>
      <div>
        {blogType?.length > 0 ? (
          <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8">
            {blogType?.map((item: any) => {
              return <BlogCard key={item?.id} item={item} />;
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-3xl">
            <h1>No Blog Available</h1>
          </div>
        )}
        {blogType?.length > 0 && (
          <div>
            <BlogPagination
              setPage={setTypePage}
              paginate={paginationType}
              section_id={"type-blog"}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BlogType;
