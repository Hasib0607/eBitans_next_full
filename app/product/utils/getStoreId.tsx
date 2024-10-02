import axios from "axios";
import { getClientUrl } from "./getClientUrl";

const getStoreId = async () => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL +
      `getsubdomain/name?name=${getClientUrl()}&head=store_id`
  );
  return res.data;
};

export default getStoreId;
