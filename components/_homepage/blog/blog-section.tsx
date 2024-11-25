"use client";

import BlogCard from "@/app/blog/_components/blog-card";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogSection = () => {
  const [allBlogs, setBlogs] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const getBlogs = (domain: any) => {
      axios
        .get(
          process.env.NEXT_PUBLIC_API_URL_BLOG +
            `blog/get?page=${1}&name=${domain}`
        )
        .then((response) => {
          setLoading(false);
          const responseData = response?.data || {};
          setBlogs(responseData);
        })
        .then((err) => {
          // console.log("err")
        });
    };

    if (typeof window !== "undefined") {
      const domain = window.location.host.startsWith("www.")
        ? window.location.host.slice(4)
        : window.location.host;

      getBlogs(domain);
    }
  }, []);

  if (loading && allBlogs.length <= 0) {
    return null;
  }

  let content = null;

  if (!loading && allBlogs.length > 0) {
    content = (
      <div className="container px-5">
        <h2 className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center">
          Blog
        </h2>

        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8">
          {allBlogs?.slice(0, 6).map((item: any) => {
            return <BlogCard key={item?.id} item={item} />;
          })}
        </div>

        <div className="py-10 text-center">
          <Link
            className="bg-[#f1593a] px-4 py-2 font-semibold rounded-sm"
            href={"/blog"}
          >
            View All Blogs
          </Link>
        </div>
      </div>
    );
  }

  return content;
};

export default BlogSection;
