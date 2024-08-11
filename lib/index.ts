import axios from "axios";

const getSubdomainName = async (url: string, head: string = "") => {
  const res = await axios.post(
    "https://admin.ebitans.com/api/v1/getsubdomain/name",
    {
      name: url,
      head: head,
    }
  );
  return res?.data;
};

const getProductDetails = async ({
  store_id,
  product_id,
}: {
  store_id: number;
  product_id: string;
}) => {
  const { data } = await axios.post(
    "https://admin.ebitans.com/api/v1/product-details",
    { store_id, product_id }
  );
  const { product: productDetails } = data;
  return productDetails;
};

const getSiteInfo = async () => {};
export { getSubdomainName, getProductDetails };
