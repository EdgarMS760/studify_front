import axiosInstance from "@libs/helpers/axiosInstance";

export const getAttendance = async (grupo_id, fecha) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.get("/attendance", {
            params: { grupo_id, fecha },
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

export const postAttendance = async ( asistencia) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.post(
            "/attendance",
             asistencia ,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error al guardar la asistencia:", error);
        throw error;
    }
};