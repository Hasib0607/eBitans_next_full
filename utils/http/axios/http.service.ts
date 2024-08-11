import axiosInstance from "./axios-instance";
class Request {
  async get(url: any) {
    return axiosInstance.get(url).then((res) => res.data);
  }
  async post(url: any, body?: any) {
    return axiosInstance.post(url, body).then((res) => res.data);
  }
  async update(url: any, body: any) {
    return axiosInstance.patch(url, body).then((res) => res.data);
  }
  async delete(url: any) {
    return axiosInstance.delete(url).then((res) => res.data);
  }
}

const httpReq = new Request();

export default httpReq;
