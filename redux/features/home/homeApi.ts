import { apiSlice } from "../api/apiSlice";

export const settingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSetting: builder.query({
      query: ({ domain, slug }) => ({
        url: `/get-domain/${domain}/${slug}`,
        method: "GET",
      }),

      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetSettingQuery } = settingApi;
