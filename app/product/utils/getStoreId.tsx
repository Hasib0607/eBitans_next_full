import axios from "axios";
import { getClientUrl } from "./getClientUrl";

const getStoreId = async () => {
  try{
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL +
        `getsubdomain/name?name=${getClientUrl()}&head=store_id`
    );
    return res.data;
  } catch(error){
    console.error("Error fetching store ID:", error);
  }
};

export default getStoreId;
