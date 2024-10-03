"use client";
import { getClientUrl } from "@/app/product/utils/getClientUrl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useHeaderSettings = () => {
  const query = useQuery({
    queryKey: ["header-settings", { url: window.location.host }],
    queryFn: () =>
      axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          "header-settings?name=" +
          getClientUrl()
      ),
  });
  return query;
};

export default useHeaderSettings;
