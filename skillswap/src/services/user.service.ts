import { apiService } from "./api.service";

export const userService = {

    getAllUsers : async () => apiService.get('/users')
}