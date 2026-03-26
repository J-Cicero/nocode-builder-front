import axios from "./axios";

export const authApi = {
  login: (email, password) => axios.post("/auth/login", { email, password }),

  registerFree: (payload) => axios.post("/auth/register/free", payload),

  registerEnterprise: (payload) => axios.post("/auth/register/enterprise", payload),

  refresh: (refresh_token) => axios.post("/auth/refresh", { refresh_token }),

  me: () => axios.get("/auth/me"),
};

export default authApi;
