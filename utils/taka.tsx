"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

const Taka = ({ tk }: any) => {
  const { data, status, error } = useQuery({
    queryKey: ["currency_key", { url: window.location.host }],
    queryFn: async () =>
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          `header-settings?name=${window.location.host.startsWith("www.") ? window.location.host.slice(4) : window.location.host}`
      ),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: true,
  });

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Currency not defined.</p>;
  }

  // ৳ default
  return (
    <>
      {data?.data?.currency?.symbol} {tk}
    </>
  );
};

export default Taka;
