import httpReq from "./axios/http.service";

export const getCampaignProduct = async (product: any, store_id: any) => {
  if (product) {
    const offerData = {
      id: product?.id,
      store_id,
    };

    try {
      const response = await httpReq.post("get/offer/product", offerData);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return null;
};
