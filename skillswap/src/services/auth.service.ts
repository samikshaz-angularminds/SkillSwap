import type { registerData } from "@/components/forms/SignUpForm";
import { apiService } from "./api.service";
import type { loginData } from "@/components/forms/LoginForm";



export const authService = {
    signup: async (data: registerData) => apiService.post('/users/signup', data),
    login: async (data: loginData) => apiService.post('/users/login', data)
}