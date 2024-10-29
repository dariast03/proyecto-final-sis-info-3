import axiosInstance from '@/config/axios-instance';
import type { Role, RoleWithoutId } from '../data/schema';

const API_URL = '/api/Roles';

const getAll = async () => {
  try {
    const response = await axiosInstance.get<Role[]>(`${API_URL}/Listar`);
    return response.data;
  } catch (error: any) {
    console.error("Error en getAll:", error);
    throw error.response?.data || "Error al obtener usuarios";
  }
};

const getById = async (id: string) => {
  try {
    const response = await axiosInstance.get<Role>(`${API_URL}/Buscar/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error en getById:", error);
    throw error.response?.data || "Role no encontrado";
  }
};

const create = async (data: RoleWithoutId) => {
  try {
    const response = await axiosInstance.post<Role>(`${API_URL}/Insertar`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error en create:", error);
    throw error.response?.data || "Error al crear usuario";
  }
};

const update = async (values: Partial<Role>) => {
  if (!values.id) return;

  try {
    const response = await axiosInstance.put<Role>(`${API_URL}/Actualizar/${values.id}`, values);
    return response.data;
  } catch (error: any) {
    console.error("Error en update:", error);
    throw error.response?.data || "Error al actualizar usuario";
  }
};

const remove = async (id: number) => {
  try {
    await axiosInstance.delete(`${API_URL}/Eliminar/${id}`);
  } catch (error: any) {
    console.error("Error en remove:", error);
    throw error.response?.data || "No se pudo eliminar el usuario";
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
