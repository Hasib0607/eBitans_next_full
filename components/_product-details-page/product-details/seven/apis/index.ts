import httpReq from "@/utils/http/axios/http.service";

export const getProductDetails = async (updatedData: any) => {
  return await httpReq.post("/product-details", updatedData);
};

export const getRelatedProducts = async (id: any) => {
  return await httpReq.post("related-product", { id });
};

export const getReviews = (updatedData: any) => {
  return httpReq.post("get/review", updatedData);
};
