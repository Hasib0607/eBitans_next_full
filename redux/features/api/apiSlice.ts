import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// type RootState = any;

// const ORIGIN = process.env.NEXT_PUBLIC_ALLOWED_ORIGIN as any;
// const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME as any;

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_V2,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    // const state = getState() as RootState;
    // const token = state?.auth?.accessToken || Cookies.get(cookieName);
    // if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    // }

    // headers.set("Access-Control-Allow-Origin", ORIGIN);
    // headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // headers.set(
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept"
    // );
    // headers.set("Access-Control-Allow-Credentials", "true");

    return headers;
  },
  // credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // if (result?.error?.status === 401) {
    //     api.dispatch(userLoggedOut());
    //     Cookies.remove(cookieName);
    // }
    return result;
  },
  // tagTypes: ["Project"],
  endpoints: (builder) => ({}),
});

export const {} = apiSlice;
