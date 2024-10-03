import BlogCard from "@/app/blog/_components/blog-card";
import getUrl from "@/utils/get-url";
import axios from "axios";
import Link from "next/link";

const BlogSection = async () => {
  const url = getUrl();

  let allBlogs;
  try {
    const data = await axios.get(
      // we are getting the blogs from here
      process.env.NEXT_PUBLIC_API_URL_BLOG + `blog/get?page=${1}&name=${url}`
    );

    allBlogs = data.data.results.data;
  } catch (error) {
    console.log(error);
  }

  if (allBlogs.length <= 0) {
    return null;
  }

  return (
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
};

export default BlogSection;
