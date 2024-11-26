import { apiSlice } from "../api/apiSlice";

export const settingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSetting: builder.query({
            query: ({domain,slug}) => ({
                url: `/get-domain/${domain}/${slug}`,
                method: "GET",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                } catch (err) {
                    // do nothing
                }
            },
            keepUnusedDataFor: 3600,
        }),
    }),
});

export const { useGetSettingQuery } = settingApi;
