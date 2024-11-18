import axios from "axios";

const getSubdomainName = async (url: string, head: string = "") => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "getsubdomain/name",
      {
        name: url,
        head: head,
      }
    );
    return res?.data;
  } catch (error) {
    // console.log(error);
  }
};

const getProductDetails = async ({
  store_id,
  product_id,
}: {
  store_id: number;
  product_id: string;
}) => {
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "product-details",
    { store_id, product_id }
  );
  const { product: productDetails } = data;
  return productDetails;
};

const getQuickViewProductDetails = async ({
  store_id,
  product_id,
}: {
  store_id: number;
  product_id: string;
}) => {
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "product-details",
    { store_id, product_id }
  );

  return data;
};

// const getSiteInfo = async () => {};
export { getProductDetails, getSubdomainName, getQuickViewProductDetails };
