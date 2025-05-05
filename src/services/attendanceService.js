import axiosInstance from "@libs/helpers/axiosInstance";

export const getAttendance = async (grupo_id, fecha) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.get("/attendance", {
            params: {
                grupo_id,
                fecha,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        console.error("Error al obtener los grupos:", error);
        throw error;
    }
}