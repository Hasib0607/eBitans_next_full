"use client";

import { useEffect, useState } from "react";
import RenderSection from "./_homepage/render-section";
import axios from "axios";

const HomePage = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    const getHomeData = (domain: any) => {
      const head =
        "layout,layoutposition,slider,category,banner,brand,testimonials,design";

      axios
        .post(process.env.NEXT_PUBLIC_API_URL + "getsubdomain/name", {
          name: domain,
          head: head,
        })
        .then((response) => {
          setLoading(false);
          const responseData = response?.data || {};
          setData(responseData);
        })
        .then((err) => {
          // console.log("err")
        });
    };

    if (typeof window !== "undefined") {
      const domain = window.location.host.startsWith("www.")
        ? window.location.host.slice(4)
        : window.location.host;

      getHomeData(domain);
    }
  }, []);

  if (loading) {
    return (
      <p className="h-screen flex justify-center items-center bg-[#ffffff]"></p>
    );
  }

  // let content = null;

  if (!loading && data?.layout) {
    const layout = data?.layout;
    const layoutposition = data?.layoutposition;

    const sortedLayout = layout
      ? layout.sort((a: any, b: any) => layoutposition[a] - layoutposition[b])
      : []; // Default to an empty array if layout is undefined

    return (
      <div>
        {sortedLayout.length > 0 &&
          sortedLayout?.map((item: any, index: number) => (
            <RenderSection key={index} component={item} data={data} />
          ))}
      </div>
    );
  } else {
    <p className="h-screen flex justify-center items-center bg-[#e74c3c]">
      Somwthing wrong...
    </p>;
  }

  // return content;
};

export default HomePage;
