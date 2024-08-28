"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Taka = ({ tk }: any) => {
  const { data, status, error } = useQuery({
    queryKey: ["currency_key", { url: window.location.host }],
    queryFn: async () =>
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          `header_settings?name=${window.location.host.startsWith("www.") ? window.location.host.slice(4) : window.location.host}`
      ),
  });

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Money symbol not defined.</p>;
  }

  // ৳ default
  return (
    <>
      {data?.data?.currency?.symbol} {tk}
    </>
  );
};

export default Taka;
