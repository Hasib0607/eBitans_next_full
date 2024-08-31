import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { fetchBlogData, fetchBlogDetailsData } from "../helper/api";

export async function generateMetadata({ params }: any) {
  const { details } = (await fetchBlogDetailsData(params)) ?? [];
  return {
    title: details.title,
    description: details?.sub_title,
    openGraph: {
      images: [
        {
          url: details?.image,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

// Utility function to truncate the title
const truncateTitle = (title: any, maxLength: any) => {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + "...";
  }
  return title;
};

const BlogDetails = async ({ params }: any) => {
  const blogData = (await fetchBlogData()) ?? [];
  const { details } = (await fetchBlogDetailsData(params)) ?? [];

  const filterBlog = blogData?.filter(
    (blog: any) => blog?.type === details?.type && blog?.id !== details?.id
  );

  const truncatedTitle = truncateTitle(details?.title || "", 80);
  const markup = { __html: details?.description };

  return (
    <div className="bg-[#f7f7f7] sm:pt-[85px] pt-[50px] container px-5 lg:px-10 relative z-[1]">
      <div className="relative">
        <div>
          <Image
            width={500}
            height={500}
            src={details?.image}
            alt={truncatedTitle}
            className="h-auto min-w-full"
          />
        </div>
        <div className="bg-black bg-opacity-50 lg:absolute bottom-0 left-0 w-full md:p-10 p-5">
          <h1 className="lg:text-4xl text-xl font-bold my-2 text-white">
            {details?.title}
          </h1>
          <p className="xl:text-lg text-sm font-medium my-2 text-white">
            {details?.sub_title}
          </p>
          <p className="text-white">
            Date:{" "}
            {moment(new Date(details?.created_at)).format("MMMM Do, YYYY")}
          </p>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-5 py-10">
        <div className="lg:w-[70%] w-full">
          <div dangerouslySetInnerHTML={markup} className="apiHtml"></div>
        </div>
        <div className="lg:w-[30%] w-full">
          <h1 className="text-2xl pb-5">Related Blogs</h1>
          {filterBlog?.length > 0 ? (
            <div>
              {filterBlog?.slice(0, 4).map((blog: any) => {
                return (
                  <Link href={`/resources/blogs/${blog?.slug}`} key={blog?.id}>
                    <div key={blog?.id} className="flex gap-2 border-b-2 py-5">
                      <div className="h-28 w-28">
                        <img
                          src={blog?.thumbnail}
                          alt={truncateTitle(blog?.title || "blog", 80)}
                          className="max-h-28 w-28 rounded-lg"
                        />
                      </div>
                      <div className="w-full h-full">
                        <p className="text-lg text-[#f1593a] font-medium xl:mb-3">
                          {blog?.type}
                        </p>
                        <h3 className="xl:text-base text-sm font-semibold">
                          {blog?.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div>
              <h1>No Blog Available</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
