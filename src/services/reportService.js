import axiosInstance from "@libs/helpers/axiosInstance";

export const attendanceReport = async (fecha_inicio, fecha_fin, grupo_id=null, alumno_id = null) => {
  try {
    const token = localStorage.getItem('token_studify');
    if (!token) throw new Error("Falta token");
    const response = await axiosInstance.get(`reports/asistencia`, {
      params: { fecha_inicio, fecha_fin, grupo_id, alumno_id },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    throw error;
  }
};

export const assessmentReport = async (grupo_id, fecha_inicio = null, fecha_fin = null, alumno_id = null) => {
  try {
    const token = localStorage.getItem('token_studify');
    if (!token) throw new Error("Falta token");
    const response = await axiosInstance.get(`reports/tareas`, {
      params: { fecha_inicio, fecha_fin, grupo_id, alumno_id },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching assessment report:", error);
    throw error;
  }
}

export const performanceReport = async (grupo_id=null, fecha_inicio = null, fecha_fin = null) => {
  try {
    const token = localStorage.getItem('token_studify');
    if (!token) throw new Error("Falta token");
    const response = await axiosInstance.get(`reports/desempeno`, {
      params: { fecha_inicio, fecha_fin, grupo_id },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching performance report:", error);
    throw error;
  }
}