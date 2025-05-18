import axiosInstance from "@libs/helpers/axiosInstance";
import { TIMEZONE } from "@libs/constants/timezone";
export const getAttendance = async (grupo_id, fecha) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.get("/attendance", {
            params: { grupo_id, fecha, timezone: TIMEZONE },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return { notFound: true, message: error.response.data.message };
        }

        throw error;
    }
};

export const postAttendance = async (asistencia) => {
    try {
        const token = localStorage.getItem('token_studify');
        if (!token) throw { critical: true, message: "Falta token" };

        const response = await axiosInstance.post(
            "/attendance",
            asistencia,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        const status = error?.response?.status;
        const backendMessage = error?.response?.data?.message;

        if ([400, 403, 404, 409].includes(status)) {
            throw { critical: false, message: backendMessage || "Error de validación" };
        } else {
            throw { critical: true, message: "Error inesperado al registrar la asistencia" };
        }
    }
};
