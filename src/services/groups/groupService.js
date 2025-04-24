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
export const getGroups = async (page = 1, limit = 10) => {
    try {
        const storedUser = JSON.parse(localStorage.getItem('user_studify'));
        const token = localStorage.getItem('token_studify');
        const id = storedUser?._id;

        if (!id || !token) throw new Error("Faltan datos del usuario o token");

        const response = await axiosInstance.get("/groups", {
            params: {
                page,
                limit,
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

