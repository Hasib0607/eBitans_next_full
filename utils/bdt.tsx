"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

const BDT = ({ price }: any) => {
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

  console.log(data?.data?.currency?.code, "currency code");
  return (
    <>
      {error ? "BDT" : data?.data?.currency?.code} {price}
    </>
  );
};

export default BDT;
