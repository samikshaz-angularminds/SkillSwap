import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

let accessToken : string | null = null;

api.interceptors.request.use(async (config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response.status === 403 && !original._retry) {
      original._retry = true;

      try {
        const res = await api.post("/users/refresh-token"); // Make sure this matches your actual route
        accessToken = res.data.accessToken;

        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
      } catch (refreshError) {
        // Optional: clear session, redirect to login, or emit an event
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(err);
  }
);

export const login = async (email: string, password: string) => {
    console.log({email,password});
    
    const res = await api.post("/users/login",{email,password});
    accessToken = res.data.accessToken;
};
