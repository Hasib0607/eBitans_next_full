"use client";
import { getClientUrl } from "@/app/product/utils/getClientUrl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useHeaderSettings = () => {
  const query = useQuery({
    queryKey: ["header-settings", { url: window.location.host }],
    queryFn: async () => {
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL +
            "header-settings?name=" +
            getClientUrl()
        );
        return response.data; // Return the response data
      } catch (error) {
        console.error("Error fetching header settings:", error);
        throw error; // Rethrow the error to be handled by react-query
      }
    },
    // Optional: You can set options here
    retry: false, // Disable retry on failure if you want
    refetchOnWindowFocus: false, // Adjust based on your needs
  });

  return query;
};

export default useHeaderSettings;

