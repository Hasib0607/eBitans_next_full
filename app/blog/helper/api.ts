import { getClientUrl } from "@/app/product/utils/getClientUrl";

// pricing api
export const fetchPricingData = async () => {
  try {
    const response = await fetch(
      `https://admin.ebitans.com/api/v1/plan-details`,
      {
        next: { revalidate: 10 },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
  }
};

// Themes api
export const fetchThemeData = async () => {
  try {
    const response = await fetch(`https://admin.ebitans.com/api/v1/templates`, {
      next: { revalidate: 10 },
    });
    const data = await response.json();
    return data?.templates;
  } catch (error) {
    console.error("There was an error fetching the data", error);
  }
};

// Blog api start
export const fetchBlogSitemapData = async () => {
  try {
    const response = await fetch(
      `https://admin.ebitans.com/api/v1/blog/site-map`,
      {
        next: { revalidate: 10 },
      }
    );
    const data = await response.json();
    return data?.results;
  } catch (error) {
    console.error("There was an error fetching the data", error);
  }
};

export const fetchBlogData = async (url: string) => {
  try {
    const response = await fetch(
      `https://admin.ebitans.com/api/v1/blog/get?name=${url}`,
      {
        next: { revalidate: 10 },
      }
    );
    const data = await response.json();
    return data?.results?.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
  }
};

export const fetchBlogPopularData = async (url: string) => {
  try {
    const response = await fetch(
      `https://admin.ebitans.com/api/v1/blog/popular?name=${url}`,
      {
        next: { revalidate: 10 },
      }
    );
    const data = await response.json();
    return data?.results?.data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
  }
};

export const fetchBlogTypeData = async (url: string) => {
  try {
    const response = await fetch(
      `https://admin.ebitans.com/api/v1/blog/types?name=${url}`,
      {
        next: { revalidate: 10 },
      }
    );
    const data = await response.json();
    return data?.blogTypes;
  } catch (error) {
    console.error("There was an error fetching the data", error);
  }
};

export const fetchTypeWiseBlogData = async (blogTypeId: any, typePage: any) => {
  try {
    const response = await fetch(
      `https://admin.ebitans.com/api/v1/blog/types/${blogTypeId}${typePage}&name=${getClientUrl()}`,
      { next: { revalidate: 10 } }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
  }
};

// single blog data
export const fetchBlogDetailsData = async (params: any, url: string) => {
  try {
    const response = await fetch(
      "https://admin.ebitans.com/api/v1/blog/details/" +
        params?.slug +
        `?name=${url}`,
      {
        next: { revalidate: 10 },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
  }
};

// Blog api end

// Product khujo api start

export const fetchPseCategory = async () => {
  try {
    const response = await fetch(
      `https://admin.ebitans.com/api/v1/pse/products/categories`,
      {
        next: { revalidate: 10 },
      }
    );
    const data = await response.json();
    return data?.results;
  } catch (error) {
    console.error("There was an error fetching the data", error);
  }
};

export const fetchPseSearch = async (searchTxt: any, allProductSlug: any) => {
  try {
    const response = await fetch(
      `https://admin.ebitans.com/api/v1/pse/products/product-by-category?name=${searchTxt}&slug=${allProductSlug?.slug}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error fetching the data", error);
  }
};

export const fetchIp = async () => {
  try {
    const response = await fetch(`https://api.bigdatacloud.net/data/client-ip`);
    const data = await response.json();
    return data.ipString;
  } catch (error) {
    console.error("There was an error fetching the data", error);
  }
};

export const visitorData = async (item: any, ip: any) => {
  if (item) {
    const data = {
      store_id: item?.store_id,
      pse_id: item?.id,
      product_id: item?.product_id,
      ip: ip,
      domain: item?.store_url,
    };
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `https://admin.ebitans.com/api/v1/pse/products/visitor`,
        requestOptions
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error; // rethrow the error to the caller
    }
  }
  return null;
};

// Product khujo api end
