import axiosInstance from '@/config/axios-instance';
import type { Evento, EventoWithoutId } from '../data/schema';

const API_URL = '/api/Eventos';

const getAll = async () => {
  try {
    const response = await axiosInstance.get<Evento[]>(`${API_URL}/Listar`);
    return response.data;
  } catch (error: any) {
    console.error("Error en getAll:", error);
    throw error.response?.data || "Error al obtener usuarios";
  }
};

const getById = async (id: string) => {
  try {
    const response = await axiosInstance.get<Evento>(`${API_URL}/Buscar/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error en getById:", error);
    throw error.response?.data || "Evento no encontrado";
  }
};

const create = async (data: EventoWithoutId) => {
  try {
    const response = await axiosInstance.post<Evento>(`${API_URL}/Insertar`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error en create:", error);
    throw error.response?.data || "Error al crear usuario";
  }
};

const update = async (values: Partial<Evento>) => {
  if (!values.id) return;

  try {
    const response = await axiosInstance.put<Evento>(`${API_URL}/Actualizar/${values.id}`, values);
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
