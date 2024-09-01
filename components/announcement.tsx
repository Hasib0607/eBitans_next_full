"use client";

import { getClientUrl } from "@/app/product/utils/getClientUrl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Announcement = ({ design }: any) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["announcement", { url: getClientUrl() }],
    queryFn: () =>
      axios.post(process.env.NEXT_PUBLIC_API_URL + "get-announcement", {
        name: getClientUrl(),
      }),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>error from annoucement.. </p>;
  }

  const anArry = data?.data?.data || [];

  // Create a new array that alternates between items
  const alternatedArry = [];
  for (let i = 0; i < anArry.length * 4; i++) {
    alternatedArry.push(anArry[i % anArry.length]);
  }
  return (
    <div style={{ background: design?.header_color }}>
      <div className="relative flex overflow-x-hidden container">
        <div className="py-2 animate-marquee whitespace-nowrap">
          {alternatedArry.map((an: any, index: number) => (
            <span key={index} className="text-xl mx-4">
              {an.announcement}
            </span>
          ))}
        </div>

        <div
          style={{ background: design?.header_color }}
          className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap"
        >
          {alternatedArry.map((an: any, index: number) => (
            <span key={index} className="text-xl mx-4">
              {an.announcement}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
