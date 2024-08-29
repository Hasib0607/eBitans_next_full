import httpReq from "@/utils/http/axios/http.service";

export const getProductDetails = async (updatedData: any) => {
  return await httpReq.post("/product-details", updatedData);
};
