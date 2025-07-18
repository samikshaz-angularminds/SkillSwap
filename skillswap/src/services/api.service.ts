import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "./token.service";

const API_BASE_URL = import.meta.env.BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});


apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const token = getAccessToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

const retryRequest = async <T>(
  fn: () => Promise<AxiosResponse<T>>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    const response = await fn();
    return response.data;
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay))
      return retryRequest(fn, retries - 1, delay)
    }
    throw error;
  }
}

const handleError = (error: AxiosError): { error: string } => {
  if (error.response) {
    const data = error.response.data as { message?: string };
    return { error: data?.message || "An error has occured" }
  }
  else if (error.request) {
    return { error: 'Network error. Please try again later.' }
  }
  else {
    return { error: error.message || 'something went wrong' }
  }
}

const get = async <T>(
  url: string,
  retries: number = 3
): Promise<T | { error: string }> => {
  return retryRequest(() => apiClient.get<T>(url), retries).catch(handleError)
}

const post = async <T>(
  url: string,
  data: any,
  retries: number = 3
): Promise<T | { error: string }> => {
  return retryRequest(() => apiClient.post<T>(url, data), retries).catch(handleError)
}

const put = async <T>(
  url: string,
  data: any,
  retries: number = 3
): Promise<T | { error: string }> => {
  return retryRequest(() => apiClient.put<T>(url, data), retries).catch(handleError)
}

const patch = async <T>(
  url: string,
  data: any,
  retries: number = 3
): Promise<T | { error: string }> => {
  return retryRequest(() => apiClient.patch<T>(url, data), retries).catch(handleError)
}

type DeleteResponse = {
  status: 'success' | 'error'
  message?: string
}

const deleteRequest = async (url: string, retries: number = 3): Promise<DeleteResponse | { error: string }> => {
  return retryRequest<DeleteResponse>(async () => {
    const response = await apiClient.delete<DeleteResponse>(url)
    response.data = { status: 'success', message: 'successfully deleted' }
    return response
  }, retries).catch(handleError)
}

const publicPost = async <T>(
  url: string,
  data:any,
  retries: number = 3
) => {
return retryRequest(() => axios.post<T>(`${API_BASE_URL}/${url}`,data),retries).catch(handleError)
}

export const apiService  = {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
  publicPost
}