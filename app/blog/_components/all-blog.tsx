"use client";
import { getClientUrl } from "@/app/product/utils/getClientUrl";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import BlogCard from "./blog-card";

const AllBlog = () => {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [allBlog, setAllBlog] = useState<any>([]);

  useEffect(() => {
    fetchAllBlogData();
  }, []);

  const fetchAllBlogData = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL_BLOG +
          `blog/get?page=${page}&name=${getClientUrl()}`,
        {
          cache: "no-store",
        }
      );
      const data = await response.json();
      if (data?.results?.data?.length > 0) {
        if (data?.results?.current_page === 1) {
          setAllBlog(data?.results?.data);
          setPage(page + 1);
        } else {
          setAllBlog([...allBlog, ...data?.results?.data]);
          setPage(page + 1);
        }
      } else {
        setHasMore(false);
        setPage(1);
      }
    } catch (error) {
      console.error("There was an error fetching the data", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl mb-5 font-bold">All Blogs</h1>
      <InfiniteScroll
        style={{ height: "auto", overflow: "hidden" }}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#f1593a"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          </div>
        }
        dataLength={allBlog?.length}
        next={fetchAllBlogData}
        endMessage={
          <p className="text-center mt-5 text-xl font-bold pb-3">
            No More Blog
          </p>
        }
      >
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8">
          {allBlog?.map((item: any) => {
            return <BlogCard key={item?.id} item={item} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default AllBlog;
