import axiosInstance from "./axios-instance";

const signUp = (store_id: any, phone: any) => {
  return axiosInstance.post("userinfo", {
    store_id,
    phone,
  });
};

const verify_phone = (otp: any, token: any) => {
  return axiosInstance.post("users/checkotp", { otp, token });
};

const login = (store_id: any, phone: any, password: any) => {
  return axiosInstance
    .post("login", {
      store_id,
      phone,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  return axiosInstance.post("logout").then((response) => {
    return response.data;
  });
};

const authService = {
  signUp,
  login,
  verify_phone,
  logout,
};

export default authService;
