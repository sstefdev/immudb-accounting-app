import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    }
    throw error;
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await api.post("/auth/register", { username, password });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    }
    throw error;
  }
};

export const getAccounts = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await api.get("/accounting", { params: { page, limit } });
    return response.data;
  } catch (error: any) {
    console.error(`Failed to get Accounts: ${error.message}`);
  }
};

export const createAccount = async (accountData: any) => {
  try {
    const response = await api.post("/accounting", accountData);
    return response.data;
  } catch (error: any) {
    console.error(`Failed to create Account: ${error.message}`);
  }
};

export default api;
