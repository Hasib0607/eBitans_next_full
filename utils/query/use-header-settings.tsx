"use client";
// import { getClientUrl } from "@/app/product/utils/getClientUrl";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const useHeaderSettings = () => {
//   const query = useQuery({
//     queryKey: ["header-settings", { url: window.location.host }],
//     queryFn: () =>
//       axios.post(
//         process.env.NEXT_PUBLIC_API_URL +
//           "header-settings?name=" +
//           getClientUrl()
//       ),
//   });
//   return query;
// };

// export default useHeaderSettings;

import { getClientUrl } from "@/app/product/utils/getClientUrl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useHeaderSettings = () => {
  const fetchHeaderSettings = async () => {
    const clientUrl = getClientUrl();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl || !clientUrl) {
      throw new Error("API URL or Client URL is missing");
    }

    const response = await axios.post(
      `${apiUrl}header-settings?name=${clientUrl}`
    );
    
    return response.data;
  };

  const query = useQuery({
    queryKey: ["header-settings", getClientUrl()],
    queryFn: fetchHeaderSettings,
    enabled: typeof window !== "undefined", // Ensure it only runs in the browser
    retry: 3, // Retry the query up to 3 times if it fails
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  return query;
};

export default useHeaderSettings;
