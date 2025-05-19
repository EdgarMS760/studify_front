import axiosInstance from "@libs/helpers/axiosInstance";

export const postGroup = async (newGroup) => {
    try {
        const storedUser = JSON.parse(localStorage.getItem('user_studify'));
        const token = localStorage.getItem('token_studify');
        const id = storedUser?._id;

        if (!id || !token) throw new Error("Faltan datos del usuario o token");

        newGroup.maestro_id = id;

        const response = await axiosInstance.post(
            "/groups",
            newGroup,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error al crear el grupo:", error);
        throw error;
    }
};
export const getGroups = async (page = 1, limit = 10, estado = "activo") => {
    try {
        const storedUser = JSON.parse(localStorage.getItem('user_studify'));
        const token = localStorage.getItem('token_studify');
        const id = storedUser?._id;

        if (!id || !token) throw new Error("Faltan datos del usuario o token");

        const response = await axiosInstance.get("/groups", {
            params: {
                page,
                limit,
                estado,
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
};

export const archiveGroup = async (idGroup) => {
    try {

        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.post(
            `/groups/${idGroup}/archive`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error al archivar el grupo:", error);
        throw error;
    }
};
export const dearchiveGroup = async (idGroup) => {
    try {

        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.post(
            `/groups/${idGroup}/dearchive`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error al desarchivar el grupo:", error);
        throw error;
    }
};

export const getGroupById = async (idGroup) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.get(
            `/groups/${idGroup}`,
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

        throw {
            status: status || 500,
            message: backendMessage || "Error inesperado al registrar la asistencia",
            critical: ![400, 403, 404, 409].includes(status),
        };
    }
};
export const updateGroup = async (idGroup, newGroup) => {
    try {
        const token = localStorage.getItem('token_studify');

        if (!token) throw new Error("Falta token");

        const response = await axiosInstance.patch(
            `/groups/${idGroup}`,
            newGroup,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error al actualizar el grupo:", error);
        throw error;
    }
};
