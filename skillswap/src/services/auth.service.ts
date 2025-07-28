import type { registerData } from "@/components/forms/SignUpForm";
import { apiService } from "./api.service";
import type { loginData } from "@/components/forms/LoginForm";

export const authService = {
    signup: async (data: registerData) => apiService.post('/auth/signup', data),
    login: async (data: loginData) => apiService.post('/auth/login', data)
}