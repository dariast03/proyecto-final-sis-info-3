import axiosInstance from "@/config/axios-instance";
import { LoginForm, UserAuth } from "../data/schema";
import { User } from "@/modules/admin/users/data/schema";

const login = async (data: LoginForm) => {
  try {
    const response = await axiosInstance.post<UserAuth>('/api/Auth/login', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || 'Error en el inicio de sesión';
  }
};

const logout = async () => {
  try {
    const response = await axiosInstance.post('/api/Auth/logout');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || 'Error al cerrar sesión';
  }
};

export default {
  login,
  logout,
};
